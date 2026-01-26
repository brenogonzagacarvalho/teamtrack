# Planejamento do TeamTrack (Sistema de Análise de Vôlei)

## Visão Geral
Sistema de análise estatística de vôlei focado em alta disponibilidade (offline-first), usabilidade em quadra e análise de dados avançada. O objetivo é superar a usabilidade de softwares tradicionais (como o Data Volley mencionado na referência) com tecnologias web modernas e interfaces táteis.

## 1. Stack Tecnológica Recomendada

Para garantir funcionalidade offline robusta, performance e portabilidade (Tablet/Notebook):

### Frontend (Aplicação Local)
*   **Framework**: **React** com **TypeScript** e **Vite**.
    *   *Por que?* Ecossistema rico, tipagem forte para eventos complexos, performance excelente.
*   **Plataforma**: **PWA (Progressive Web App)** instalável.
    *   *Por que?* Funciona offline nativamente, atualizações fáceis, roda em iPad/Android/Windows/Mac sem builds nativos complexos.
*   **UI/UX**: **Tailwind CSS** + **Shadcn/UI** (base) + Framer Motion (animações de feedback).
    *   *Foco*: Botões grandes, feedback visual imediato (toque), temas alto contraste (ginásios iluminados ou escuros).

### Banco de Dados Local (O Coração Offline)
Considerando seu interesse em SQLite e arquitetura offline-first:
*   **Opção A (Recomendada - Moderna)**: **SQLite (WASM)** com **ElectricSQL** ou **PowerSync**.
    *   *Vantagem*: SQLite real no browser. Sincronização bidirecional automática com o backend (Postgres) quando online. Resolve o problema difícil de "conflict resolution".
*   **Opção B (Simples/Tradicional)**: **Dexie.js (IndexedDB)**.
    *   *Vantagem*: Muito fácil de usar com JSON/JS Objects.
    *   *Desvantagem*: Menos poderoso para queries complexas analíticas SQL no cliente.
*   **Decisão sugerida**: **SQLite via WASM** (para manter compatibilidade SQL e robustez).

### Backend & Cloud
*   **BaaS**: **Supabase** (PostgreSQL).
    *   *Por que?* Banco relacional forte (bom para estatísticas), Auth pronto, Storage para vídeos, e funciona perfeitamente com ferramentas de "Local-First" como ElectricSQL/PowerSync.

## 2. Arquitetura de Dados (Eventos Esportivos)

A estrutura deve ser "Event Sourcing" simplificado. O jogo é uma sequência de eventos.

### Entidades Principais (Modelo Relacional Simplificado)

1.  **Match (Partida)**
    *   `id`, `date`, `opponent`, `location`, `team_a_id`, `team_b_id`, `status`
2.  **Set**
    *   `id`, `match_id`, `number` (1-5), `score_a`, `score_b`, `start_time`, `end_time`
3.  **Rally (Opcional, mas bom para agrupamento)**
    *   `id`, `set_id`, `winning_team_id`
4.  **GameEvent (A tabela gigante de fatos)**
    *   `id`, `match_id`, `set_id`, `timestamp`
    *   `player_id` (quem executou)
    *   `skill` (Serve, Reception, Set, Attack, Block, Dig, Freeball)
    *   `grade` (Nota: = Error, - Poor, / OK, + Good, # Perfect - simbologia padrão DataVolley)
    *   `start_zone` (1-9), `end_zone` (1-9)
    *   `coordinates_x`, `coordinates_y` (para heatmaps precisos)
    *   `rotation_team_a`, `rotation_team_b` (contexto tático vital)
    *   `score_context` (placar no momento da ação)

## 3. Funcionalidades de Uso Real em Jogo

### Interface de Entrada (Scouting)
*   **Layout de Quadra Visual**: Input clicando na quadra para origem/destino.
*   **Gestos (Mobile/Tablet)**:
    *   *Tap*: Ação neutra.
    *   *Swipe Cima*: Ação positiva/Ponto (# ou +).
    *   *Swipe Baixo*: Erro (=).
    *   *Swipe Lado*: Continuidade.
*   **Botões de Ação Rápida**: "Sideout", "Transition", "Ace", "Kill Block".
*   **Undo/Redo Infinito**: Essencial para corrigir erros de digitação na velocidade do jogo.
*   **Voice Input (Futuro)**: "Zé Saque Erro".

### Funcionalidades Auxiliares
*   **Rotação Automática**: O sistema deve sugerir a rotação atual e avançar automaticamente ao ganhar o ponto/serviço.
*   **Vídeo Sync (Pós-jogo)**: Associar timestamp do evento com arquivo de vídeo local.

## 4. Análise Avançada (Pós-Sincronização)

Uma vez que os dados estão no Supabase (Postgres):
*   **Eficiência por Rotação**: "Na P1 rodamos 30%, na P5 rodamos 60%".
*   **Setter Distribution**: Para onde o levantador manda a bola em situações de Passe A vs Passe B/C?
*   **Heatmaps de Ataque**: Onde o oposto adversário mais ataca na diagonal?
*   **Tendências**: Filtros como "Saque flutuante no jogador X" -> Qual a performance de recepção?

## Próximos Passos (Sugestão)

1.  **Setup do Projeto**: Criar repositório React + Vite + Tailwind.
2.  **Database Layer**: Configurar SQLite local e definindo o Schema inicial.
3.  **Prototipar a Tela de Input**: Criar o grid de botões e a quadra visual para testar a ergonomia (é a parte mais crítica).
