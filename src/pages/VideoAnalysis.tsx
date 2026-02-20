import { BrainCircuit, Check, MousePointer2 } from "lucide-react";
import type { MouseEvent } from "react";
import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import type { GameEventType } from "../components/EventTimeline";
import { EventTimeline } from "../components/EventTimeline";

const Player: any = ReactPlayer;

type Point = { x: number; y: number };

export default function VideoAnalysis() {
  const [url, setUrl] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  // Player Reference for Seeking
  const playerRef = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState(0);

  // Calibration State
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [corners, setCorners] = useState<Point[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Timeline State
  const [events, setEvents] = useState<GameEventType[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLoad = () => {
    setUrl(inputUrl);
    setCorners([]);
    setIsCalibrating(false);
  };

  const handleVideoClick = (e: MouseEvent) => {
    if (!isCalibrating || !containerRef.current) return;

    // Max 4 corners
    if (corners.length >= 4) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setCorners([...corners, { x, y }]);
  };

  const undoLastCorner = () => {
    setCorners(prev => prev.slice(0, -1));
  };

  const getCornerLabel = (index: number) => {
    const labels = ["Superior Esq.", "Superior Dir.", "Inferior Dir.", "Inferior Esq."];
    return labels[index];
  };

  const handleSeek = (seconds: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(seconds, 'seconds');
      setIsPlaying(true);
    }
  };

  const generateMockEvents = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const mockData: GameEventType[] = [
        { id: "1", timeSeconds: 45, actionType: "serve", reviewStatus: "pending", aiConfidence: 0.95 },
        { id: "2", timeSeconds: 48, actionType: "reception", reviewStatus: "pending", aiConfidence: 0.88 },
        { id: "3", timeSeconds: 49, actionType: "set", reviewStatus: "pending", aiConfidence: 0.92 },
        { id: "4", timeSeconds: 51, actionType: "attack", reviewStatus: "pending", aiConfidence: 0.89 },
        { id: "5", timeSeconds: 120, actionType: "serve", reviewStatus: "pending", aiConfidence: 0.97 },
        { id: "6", timeSeconds: 125, actionType: "attack", reviewStatus: "pending", aiConfidence: 0.75 },
      ];
      setEvents(mockData);
      setIsProcessing(false);
    }, 1500); // UI feel
  };

  const updateEvent = (id: string, updates: Partial<GameEventType>) => {
    setEvents(events.map(ev => ev.id === id ? { ...ev, ...updates } : ev));
  };

  const confirmEvent = (id: string) => {
    updateEvent(id, { reviewStatus: "confirmed" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col p-6">
      <div className="max-w-6xl mx-auto w-full space-y-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Video Analysis Setup</h1>
          <p className="text-muted-foreground">Colar a URL do vídeo de fundo de quadra e calibrar.</p>
        </header>

        {/* Input Control */}
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Cole o link do Google Drive ou YouTube..."
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md border border-input bg-background/50 text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          <button
            onClick={handleLoad}
            className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors shadow-sm"
          >
            Carregar Vídeo
          </button>
        </div>

        {/* Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Main Video Area */}
          <div className="lg:col-span-3">
            <div
              ref={containerRef}
              onClick={handleVideoClick}
              className={`bg-black rounded-xl overflow-hidden aspect-video border relative shadow-sm ${isCalibrating ? 'cursor-crosshair ring-2 ring-primary' : ''}`}
            >
              {url ? (
                <>
                  <Player
                    ref={playerRef}
                    url={url}
                    width="100%"
                    height="100%"
                    controls={!isCalibrating}
                    playing={isPlaying}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onProgress={(state: any) => setCurrentTime(state.playedSeconds)}
                    config={{ youtube: { playerVars: { showinfo: 1 } as any } as any }}
                  />

                  {/* SVG Calibration Overlay */}
                  {isCalibrating && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 font-mono">
                      {/* Draw polygon if 4 points exist */}
                      {corners.length === 4 && (
                        <polygon
                          points={corners.map(c => `${c.x}%,${c.y}%`).join(' ')}
                          fill="rgba(59, 130, 246, 0.2)"
                          stroke="rgb(59, 130, 246)"
                          strokeWidth="2"
                        />
                      )}

                      {/* Draw points */}
                      {corners.map((p, i) => (
                        <g key={i}>
                          <circle cx={`${p.x}%`} cy={`${p.y}%`} r="6" fill="#ef4444" />
                          <text x={`${p.x}%`} y={`${p.y}%`} dx="12" dy="5" fill="white" className="text-xs font-bold drop-shadow-md">
                            {getCornerLabel(i)}
                          </text>
                        </g>
                      ))}
                    </svg>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                  <span className="text-5xl mb-3">🎥</span>
                  <p>Nenhum vídeo carregado</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4 flex flex-col h-[calc(100vh-140px)]">
            {/* Calibration Panel */}
            <div className="p-5 border rounded-xl bg-card shadow-sm shrink-0">
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <MousePointer2 className="w-5 h-5 text-primary" />
                  Calibração
                </h3>
                {url && corners.length === 4 && (
                  <button
                    onClick={generateMockEvents}
                    disabled={isProcessing}
                    className="text-xs px-3 py-1.5 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md font-medium flex items-center gap-1 transition-colors"
                  >
                    <BrainCircuit className="w-3 h-3" />
                    {isProcessing ? 'Analisando...' : 'IA: Gerar Scout'}
                  </button>
                )}
              </div>

              {!url ? (
                <p className="text-sm text-muted-foreground text-center my-4">
                  Carregue um vídeo no player primeiro.
                </p>
              ) : (
                <div className="space-y-4">
                  {isPlaying && isCalibrating ? (
                    <div className="p-3 bg-yellow-500/10 text-yellow-600 rounded-md border border-yellow-500/20 text-sm">
                      Pause o vídeo para selecionar os pontos.
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsCalibrating(!isCalibrating)}
                      className={`w-full py-2 font-medium rounded-md transition-colors text-sm ${isCalibrating
                        ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
                        }`}
                    >
                      {isCalibrating ? 'Cancelar/Voltar' : 'Iniciar Calibração da Quadra'}
                    </button>
                  )}

                  {isCalibrating && (
                    <div className="space-y-3 pt-4 border-t">
                      <ul className="text-sm space-y-2 text-muted-foreground grid grid-cols-2">
                        {[0, 1, 2, 3].map(i => (
                          <li key={i} className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white shrink-0 ${corners.length > i ? 'bg-green-500' : corners.length === i ? 'bg-primary animate-pulse' : 'bg-slate-300'}`}>
                              {corners.length > i ? <Check className="w-3 h-3" /> : i + 1}
                            </div>
                            <span className={`text-xs ${corners.length > i ? 'line-through opacity-50' : corners.length === i ? 'text-primary font-medium' : ''}`}>
                              {getCornerLabel(i)}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex gap-2 pt-2">
                        <button onClick={undoLastCorner} disabled={corners.length === 0} className="flex-1 py-1.5 bg-secondary text-secondary-foreground rounded text-xs disabled:opacity-50">
                          Refazer Último
                        </button>
                        {corners.length === 4 && (
                          <button onClick={() => setIsCalibrating(false)} className="flex-1 py-1.5 bg-green-600 text-white rounded text-xs font-medium hover:bg-green-700">
                            Concluir
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Events Timeline */}
            <div className="flex-1 min-h-[300px]">
              <EventTimeline
                events={events}
                currentTime={currentTime}
                onSeekTo={handleSeek}
                onConfirmEvent={confirmEvent}
                onEditEvent={updateEvent}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
