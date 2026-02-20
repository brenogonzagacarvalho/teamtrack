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

          {/* Data Volley Style Scout Table */}
          <div className="bg-card rounded-2xl border border-border/50 p-6 flex flex-col shadow-sm lg:col-span-2 overflow-hidden">
            <h3 className="text-lg font-bold mb-4">Relatório Completo de Fundamentos</h3>
            <div className="overflow-x-auto pb-4">
              <table className="w-full text-[11px] text-center border-collapse min-w-[800px]">
                <thead>
                  {/* Top Level Headers */}
                  <tr className="bg-muted/50 text-muted-foreground uppercase">
                    <th rowSpan={2} className="px-2 py-2 border border-border bg-card sticky left-0 font-bold z-10 w-24">Atleta</th>
                    <th colSpan={7} className="px-2 py-1 border border-border bg-blue-100 text-blue-900">Saque</th>
                    <th colSpan={7} className="px-2 py-1 border border-border bg-orange-100 text-orange-900">Recepção</th>
                    <th colSpan={6} className="px-2 py-1 border border-border bg-red-100 text-red-900">Ataque</th>
                    <th colSpan={6} className="px-2 py-1 border border-border bg-slate-200 text-slate-900">Bloqueio</th>
                  </tr>
                  {/* Sub Level Headers */}
                  <tr className="bg-muted/30 font-bold text-muted-foreground">
                    <td className="w-6 border border-border text-green-700 bg-green-50">#</td>
                    <td className="w-6 border border-border text-green-600 bg-green-50">+</td>
                    <td className="w-6 border border-border text-yellow-600 bg-yellow-50">!</td>
                    <td className="w-6 border border-border text-red-500 bg-red-50">-</td>
                    <td className="w-6 border border-border text-red-700 bg-red-50">=</td>
                    <td className="w-8 border border-border bg-muted/50 font-black">TOT</td>
                    <td className="w-10 border border-border bg-muted/80 font-black">%</td>

                    <td className="w-6 border border-border text-green-700 bg-green-50">#</td>
                    <td className="w-6 border border-border text-green-600 bg-green-50">+</td>
                    <td className="w-6 border border-border text-yellow-600 bg-yellow-50">!</td>
                    <td className="w-6 border border-border text-red-500 bg-red-50">-</td>
                    <td className="w-6 border border-border text-red-700 bg-red-50">=</td>
                    <td className="w-8 border border-border bg-muted/50 font-black">TOT</td>
                    <td className="w-10 border border-border bg-muted/80 font-black">%</td>

                    <td className="w-6 border border-border text-green-700 bg-green-50">#</td>
                    <td className="w-6 border border-border text-green-600 bg-green-50">+</td>
                    <td className="w-6 border border-border text-red-500 bg-red-50">-</td>
                    <td className="w-6 border border-border text-red-700 bg-red-50">=</td>
                    <td className="w-8 border border-border bg-muted/50 font-black">TOT</td>
                    <td className="w-10 border border-border bg-muted/80 font-black">%</td>

                    <td className="w-6 border border-border text-green-700 bg-green-50">#</td>
                    <td className="w-6 border border-border text-green-600 bg-green-50">+</td>
                    <td className="w-6 border border-border text-red-500 bg-red-50">-</td>
                    <td className="w-6 border border-border text-red-700 bg-red-50">=</td>
                    <td className="w-8 border border-border bg-muted/50 font-black">TOT</td>
                    <td className="w-10 border border-border bg-muted/80 font-black">%</td>
                  </tr>
                </thead>
                <tbody className="font-medium text-foreground">
                  {[
                    { name: '7 Wallace', s: [2, 1, 0, 0, 1], r: [0, 0, 0, 0, 0], a: [12, 3, 1, 2], b: [2, 1, 0, 1] },
                    { name: '18 Lucarelli', s: [1, 4, 1, 1, 2], r: [8, 3, 1, 0, 1], a: [9, 4, 2, 1], b: [1, 2, 0, 0] },
                    { name: '14 Douglas', s: [0, 2, 2, 0, 1], r: [5, 4, 2, 1, 0], a: [6, 5, 0, 0], b: [0, 0, 1, 0] },
                  ].map((p, i) => {
                    const sTot = p.s.reduce((a, b) => a + b, 0); const sEfc = sTot ? Math.round(((p.s[0] * 100) + (p.s[1] * 50)) / sTot) : 0;
                    const rTot = p.r.reduce((a, b) => a + b, 0); const rEfc = rTot ? Math.round(((p.r[0] * 100) + (p.r[1] * 50)) / rTot) : 0;
                    const aTot = p.a.reduce((a, b) => a + b, 0); const aEfc = aTot ? Math.round((p.a[0] * 100) / aTot) : 0;
                    const bTot = p.b.reduce((a, b) => a + b, 0); const bEfc = bTot ? Math.round((p.b[0] * 100) / bTot) : 0;
                    return (
                      <tr key={i} className="hover:bg-muted/30 transition-colors">
                        <td className="px-2 py-1.5 border border-border bg-card sticky left-0 text-left font-bold">{p.name}</td>
                        {p.s.map((v, j) => <td key={`s${j}`} className="border border-border text-muted-foreground">{v || '-'}</td>)}
                        <td className="border border-border bg-muted/20 font-bold">{sTot || '-'}</td><td className="border border-border bg-muted/20">{sEfc}%</td>
                        {p.r.map((v, j) => <td key={`r${j}`} className="border border-border text-muted-foreground">{v || '-'}</td>)}
                        <td className="border border-border bg-muted/20 font-bold">{rTot || '-'}</td><td className="border border-border bg-muted/20">{rEfc}%</td>
                        {p.a.map((v, j) => <td key={`a${j}`} className="border border-border text-muted-foreground">{v || '-'}</td>)}
                        <td className="border border-border bg-muted/20 font-bold">{aTot || '-'}</td><td className="border border-border bg-muted/20">{aEfc}%</td>
                        {p.b.map((v, j) => <td key={`b${j}`} className="border border-border text-muted-foreground">{v || '-'}</td>)}
                        <td className="border border-border bg-muted/20 font-bold">{bTot || '-'}</td><td className="border border-border bg-muted/20">{bEfc}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Split Tables: Points & Errors */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:w-3/4 mx-auto">

              {/* Pontos Totais */}
              <div className="flex flex-col border border-border rounded-lg overflow-hidden shadow-sm">
                <div className="bg-blue-50 border-b border-border flex text-blue-900 font-bold">
                  <div className="flex-1 px-4 py-2 text-center uppercase text-sm border-r border-border tracking-wider">Pontos</div>
                  <div className="w-16 px-2 py-2 text-center font-black bg-blue-100 text-blue-700">#</div>
                </div>
                <div className="flex border-b border-border/50 text-sm">
                  <div className="flex-1 px-4 py-1.5 font-medium border-r border-border text-muted-foreground bg-slate-50">SAQUE</div>
                  <div className="w-16 px-2 py-1.5 text-center font-bold">3</div>
                </div>
                <div className="flex border-b border-border/50 text-sm">
                  <div className="flex-1 px-4 py-1.5 font-medium border-r border-border text-muted-foreground bg-slate-50">ATAQUE</div>
                  <div className="w-16 px-2 py-1.5 text-center font-bold">27</div>
                </div>
                <div className="flex text-sm">
                  <div className="flex-1 px-4 py-1.5 font-medium border-r border-border text-muted-foreground bg-slate-50">BLOQUEIO</div>
                  <div className="w-16 px-2 py-1.5 text-center font-bold">3</div>
                </div>
              </div>

              {/* Erros Totais */}
              <div className="flex flex-col border border-border rounded-lg overflow-hidden shadow-sm">
                <div className="bg-red-50 border-b border-border flex text-red-900 font-bold">
                  <div className="w-16 px-2 py-2 text-center font-black bg-red-100 text-red-700 border-r border-border">=</div>
                  <div className="flex-1 px-4 py-2 text-center uppercase text-sm tracking-wider">Erros</div>
                </div>
                <div className="flex border-b border-border/50 text-sm">
                  <div className="w-16 px-2 py-1.5 text-center font-bold border-r border-border">4</div>
                  <div className="flex-1 px-4 py-1.5 font-medium text-white bg-red-600/90 text-right">SAQUE</div>
                </div>
                <div className="flex border-b border-border/50 text-sm">
                  <div className="w-16 px-2 py-1.5 text-center font-bold border-r border-border">3</div>
                  <div className="flex-1 px-4 py-1.5 font-medium text-white bg-red-600/90 text-right">ATAQUE</div>
                </div>
                <div className="flex border-b border-border/50 text-sm">
                  <div className="w-16 px-2 py-1.5 text-center font-bold border-r border-border">1</div>
                  <div className="flex-1 px-4 py-1.5 font-medium text-white bg-red-600/90 text-right">BLOQUEIO</div>
                </div>
                <div className="flex text-sm">
                  <div className="w-16 px-2 py-1.5 text-center font-bold border-r border-border">2</div>
                  <div className="flex-1 px-4 py-1.5 font-medium text-white bg-red-600/90 text-right">RECEPÇÃO</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
