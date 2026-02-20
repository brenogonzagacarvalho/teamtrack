/// <reference lib="webworker" />
import cv from '@techstark/opencv-js';

type Point = { x: number; y: number };

// Pipeline de Visão Computacional Local (Worker)
// Este worker rodará em uma thread separada para não bloquear a UI do PWA.

let isOpenCvLoaded = false;
let bgSubtractor: any = null;

// Mock OpenCV loading handler
cv['onRuntimeInitialized'] = () => {
  console.log('[CV Worker] OpenCV.js carregado com sucesso!');
  isOpenCvLoaded = true;
  // Initialize MOG2
  // @ts-ignore
  bgSubtractor = new cv.BackgroundSubtractorMOG2(500, 16, true);
};

// Helper: maping pixel coordinate to court 2D coordinate
function mapToCourt(pixelX: number, pixelY: number, transformMatrix: any) {
  if (!transformMatrix) return null;
  const srcMat = cv.matFromArray(1, 1, cv.CV_32FC2, [pixelX, pixelY]);
  const dstMat = new cv.Mat();
  cv.perspectiveTransform(srcMat, dstMat, transformMatrix);
  const result = {
    x: dstMat.data32F[0], // Scale corresponds to 1m = 50px
    y: dstMat.data32F[1]
  };
  srcMat.delete();
  dstMat.delete();
  return result;
}

self.onmessage = async (e: MessageEvent) => {
  const { type, payload } = e.data;

  if (type === 'START_ANALYSIS') {
    if (!isOpenCvLoaded) {
      self.postMessage({ type: 'STATUS_UPDATE', message: 'Aguardando inicialização do OpenCV...', progress: 0 });
      let tries = 0;
      while (!isOpenCvLoaded && tries < 50) {
        await sleep(100);
        tries++;
      }
    }

    const { videoUrl, corners } = payload;
    console.log(`[CV Worker] Iniciando análise para ${videoUrl} com ${corners?.length || 0} cantos.`);

    // 1. Calibração (Homografia)
    self.postMessage({ type: 'STATUS_UPDATE', message: 'Calculando matriz de calibração espacial (Homografia)...', progress: 10 });

    let transformMatrix: any = null;
    if (corners && corners.length === 4) {
      // Considerando os 4 cantos da quadra de vôlei (9m x 18m). 
      // Escala p/ pixels virtuais: 1 metro = 50 pixels -> (450 x 900)
      const dstCoords = [
        0, 0,
        450, 0,
        450, 900,
        0, 900
      ];

      // Assuming we get video dimensions later, here we use generic percentage mapping (1920x1080 dummy) 
      const videoW = 1920, videoH = 1080;
      const srcCoords = corners.flatMap((c: Point) => [
        (c.x / 100) * videoW,
        (c.y / 100) * videoH
      ]);

      const srcMat = cv.matFromArray(4, 1, cv.CV_32FC2, srcCoords);
      const dstMat = cv.matFromArray(4, 1, cv.CV_32FC2, dstCoords);

      transformMatrix = cv.getPerspectiveTransform(srcMat, dstMat);
      console.log(`[CV Worker] Matriz de Homografia calculada com sucesso.`);

      const testMap = mapToCourt(srcCoords[0], srcCoords[1], transformMatrix);
      console.log(`[CV Worker] Teste de Homografia -> Top-Left Pixel mapped to: X=${Math.round(testMap?.x || 0)}, Y=${Math.round(testMap?.y || 0)}`);

      srcMat.delete();
      dstMat.delete();
    }

    try {
      const mat = new cv.Mat(100, 100, cv.CV_8UC1);
      console.log(`[CV Worker] Sanity Check: Matriz criada com tamanho ${mat.cols}x${mat.rows}`);
      mat.delete();
    } catch (err) {
      console.error('[CV Worker] OpenCV falhou no sanity check:', err);
    }

    // Simulate initialization
    self.postMessage({ type: 'STATUS_UPDATE', message: 'Iniciando pipeline de Visão Computacional...', progress: 5 });
    await sleep(1000);

    // 1. Detecção de Rallies 
    self.postMessage({ type: 'STATUS_UPDATE', message: 'Detectando movimentação e cortando tempo morto...', progress: 25 });
    await sleep(2000);

    // 2. Rastreamento da Bola (Mock para modelo Tiny/Hough)
    self.postMessage({ type: 'STATUS_UPDATE', message: 'Rastreando trajetória da bola...', progress: 50 });
    await sleep(2500);

    // 3. Motor de Heurísticas
    self.postMessage({ type: 'STATUS_UPDATE', message: 'Inferindo ações baseadas na física e geometria da quadra...', progress: 75 });
    await sleep(2000);

    self.postMessage({ type: 'STATUS_UPDATE', message: 'Gerando Timeline de Eventos...', progress: 95 });
    await sleep(1000);

    // 4. Limpeza das matrizes base
    if (transformMatrix) {
      transformMatrix.delete();
    }

    // Mock Final Events payload
    const mockEvents = [
      { id: crypto.randomUUID(), timeSeconds: 45, actionType: "serve", reviewStatus: "pending", aiConfidence: 0.96 },
      { id: crypto.randomUUID(), timeSeconds: 48, actionType: "reception", reviewStatus: "pending", aiConfidence: 0.85 },
      { id: crypto.randomUUID(), timeSeconds: 49, actionType: "set", reviewStatus: "pending", aiConfidence: 0.90 },
      { id: crypto.randomUUID(), timeSeconds: 51, actionType: "attack", reviewStatus: "pending", aiConfidence: 0.88 },
      { id: crypto.randomUUID(), timeSeconds: 52, actionType: "dig", reviewStatus: "pending", aiConfidence: 0.70 },
      { id: crypto.randomUUID(), timeSeconds: 55, actionType: "attack", reviewStatus: "pending", aiConfidence: 0.91 },
    ];


    self.postMessage({ type: 'ANALYSIS_COMPLETE', events: mockEvents, progress: 100 });
  } else if (type === 'PROCESS_FRAME') {
    const { imageData } = payload;
    console.log(`[CV Worker] Recebeu frame com tamanho = ${imageData.width}x${imageData.height} e buffer longo = ${imageData.data.length}`);
    try {
      const src = cv.matFromImageData(imageData);
      const fgMask = new cv.Mat();

      if (bgSubtractor) {
        // Apply background subtraction
        const learningRate = 0.01;
        bgSubtractor.apply(src, fgMask, learningRate);

        // Use thresholding to clean the mask
        cv.threshold(fgMask, fgMask, 200, 255, cv.THRESH_BINARY);

        const whitePixels = cv.countNonZero(fgMask);
        const totalPixels = fgMask.cols * fgMask.rows;
        const activityRatio = whitePixels / totalPixels;

        console.log(`[CV Worker] Atividade (MOG2): ${(activityRatio * 100).toFixed(2)}% | Pixels brancos: ${whitePixels}`);

        if (activityRatio > 0.05) {
          console.log('[CV Worker] RALLY ATIVO detectado (muito movimento).');

          // 2. Ball Tracking Pipeline (Mock/Simulação de Contour Finding)
          const hsv = new cv.Mat();
          cv.cvtColor(src, hsv, cv.COLOR_RGBA2RGB);
          cv.cvtColor(hsv, hsv, cv.COLOR_RGB2HSV);

          // Yellow/Blue standard limits (Dummy values)
          const lowMat = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [20, 100, 100, 0]);
          const highMat = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [30, 255, 255, 0]);
          const mask = new cv.Mat();

          cv.inRange(hsv, lowMat, highMat, mask);

          const contours = new cv.MatVector();
          const hierarchy = new cv.Mat();
          cv.findContours(mask, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

          console.log(`[CV Worker] Rastreamento: ${contours.size()} contornos prováveis da bola encontrados.`);

          hsv.delete();
          lowMat.delete();
          highMat.delete();
          mask.delete();
          contours.delete();
          hierarchy.delete();
        } else {
          console.log('[CV Worker] TEMPO MORTO detectado (pouco movimento).');
        }
      }

      console.log(`[CV Worker] Frame processado com sucesso em Matriz e MOG2 aplicado.`);
      src.delete();
      fgMask.delete();
    } catch (e) {
      console.error('[CV Worker] Erro processando frame', e);
    }
  }
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
