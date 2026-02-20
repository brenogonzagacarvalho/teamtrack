import { Activity, LayoutDashboard, PieChart, Settings } from 'lucide-react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { DbProvider } from './db/provider'
import Analytics from './pages/Analytics'
import VideoAnalysis from './pages/VideoAnalysis'

function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-xl w-full text-center space-y-8 relative z-10">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4">
            <Activity className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground">
            TeamTrack <span className="text-primary">Scout</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            Plataforma de análise tática offline-first com infraestrutura avançada de vídeo para Voleibol.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm text-card-foreground shadow-sm mb-6 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <p className="text-sm font-medium">Banco Estruturado PGLite Ativo Localmente</p>
        </div>

        <Link
          to="/scout"
          className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full shadow-lg hover:shadow-primary/25 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
        >
          <LayoutDashboard className="w-5 h-5 mr-2" />
          Acessar Painel de Vídeo
        </Link>
      </div>
    </div>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">TeamTrack</span>
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link to="/scout" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <LayoutDashboard className="w-4 h-4" />
              Scout / Vídeo
            </Link>
            <Link to="/analytics" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <PieChart className="w-4 h-4" />
              Analytics
            </Link>
            <button className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-muted">
              <Settings className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <DbProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scout" element={<VideoAnalysis />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </DbProvider>
  )
}


