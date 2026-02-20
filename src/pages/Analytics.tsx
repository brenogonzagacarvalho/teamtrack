import { Activity, BarChart3, Target } from "lucide-react";

export default function Analytics() {
  return (
    <div className="flex-1 bg-background text-foreground flex flex-col p-6 border-t border-border/40 overflow-auto">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        <header>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-1">
            Dashboard <span className="text-primary">Estatístico</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Analytics pós-jogo baseado nos scouts validados da partida.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main KPI Cards */}
          <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-green-500/10 rounded-lg text-green-600">
                <Target className="w-6 h-6" />
              </div>
            </div>
            <div>
              <p className="text-4xl font-black mb-1">68%</p>
              <p className="text-sm font-medium text-muted-foreground">Eficácia de Ataque (Perf+Good)</p>
            </div>
          </div>

          <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600">
                <Activity className="w-6 h-6" />
              </div>
            </div>
            <div>
              <p className="text-4xl font-black mb-1">45%</p>
              <p className="text-sm font-medium text-muted-foreground">Passe Perfeito (#)</p>
            </div>
          </div>

          <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-600">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
            <div>
              <p className="text-4xl font-black mb-1">12</p>
              <p className="text-sm font-medium text-muted-foreground">Bloqueios Ponto</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Heatmap Area */}
          <div className="bg-card rounded-2xl border border-border/50 p-6 flex flex-col shadow-sm">
            <h3 className="text-lg font-bold mb-4">Mapa de Calor (Ataques Recebidos)</h3>
            <div className="flex-1 bg-gradient-to-br from-orange-100 to-red-50 rounded-xl relative border aspect-[2/1] overflow-hidden">
              {/* Volleyball Court Lines Mock */}
              <div className="absolute inset-0 border border-orange-300 opacity-50 m-4 rounded" />
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-orange-300 opacity-50" />

              {/* Heat Zones Mocks */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/40 rounded-full blur-2xl" />
              <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-orange-500/40 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-red-600/30 rounded-full blur-xl" />

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-orange-900/40 font-bold rotate-[-30deg] text-xl">SIMULAÇÃO CV</span>
              </div>
            </div>
          </div>

          {/* Action Distribution Table */}
          <div className="bg-card rounded-2xl border border-border/50 p-6 flex flex-col shadow-sm">
            <h3 className="text-lg font-bold mb-4">Distribuição de Ações (Top Jogadores)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50 rounded-t-lg">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Jogador</th>
                    <th className="px-4 py-3">Ataques</th>
                    <th className="px-4 py-3">Saques</th>
                    <th className="px-4 py-3 rounded-tr-lg">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-3 font-medium">#7 Wallace</td>
                    <td className="px-4 py-3">25</td>
                    <td className="px-4 py-3">12</td>
                    <td className="px-4 py-3 font-bold text-primary">18</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-3 font-medium">#18 Lucarelli</td>
                    <td className="px-4 py-3">22</td>
                    <td className="px-4 py-3">15</td>
                    <td className="px-4 py-3 font-bold text-primary">14</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">#14 Douglas</td>
                    <td className="px-4 py-3">18</td>
                    <td className="px-4 py-3">10</td>
                    <td className="px-4 py-3 font-bold text-primary">11</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
