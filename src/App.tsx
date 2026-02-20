import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { DbProvider } from './db/provider'
import VideoAnalysis from './pages/VideoAnalysis'

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-primary mb-2">TeamTrack</h1>
          <p className="text-muted-foreground">
            Volleyball Analytics System &bull; Offline-First PWA
          </p>
        </div>

        <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm mb-6">
          <p className="text-sm">Conectado ao Banco Local (PGlite)</p>
        </div>

        <Link
          to="/scout"
          className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-md hover:bg-primary/90 transition-all"
        >
          Iniciar Scout (Vídeo)
        </Link>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <DbProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scout" element={<VideoAnalysis />} />
        </Routes>
      </BrowserRouter>
    </DbProvider>
  )
}


