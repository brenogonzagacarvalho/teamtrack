import { Check, Edit2, PlayCircle, Trash2 } from "lucide-react";
import { useEffect } from "react";

export type GameEventType = {
  id: string;
  timeSeconds: number;
  actionType: "serve" | "reception" | "set" | "attack" | "block" | "dig" | "freeball";
  evaluation?: "#" | "+" | "!" | "-" | "/" | "=";
  playerId?: string;
  reviewStatus: "pending" | "confirmed" | "user_created";
  aiConfidence?: number;
};

interface EventTimelineProps {
  events: GameEventType[];
  currentTime: number;
  onSeekTo: (seconds: number) => void;
  onConfirmEvent: (id: string) => void;
  onEditEvent: (id: string, updates: Partial<GameEventType>) => void;
  onDeleteEvent?: (id: string) => void;
}

export function EventTimeline({ events, currentTime, onSeekTo, onConfirmEvent, onEditEvent, onDeleteEvent }: EventTimelineProps) {

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getActionColor = (action: string) => {
    const colors: Record<string, string> = {
      serve: "bg-blue-100 text-blue-800 border-blue-200",
      reception: "bg-orange-100 text-orange-800 border-orange-200",
      set: "bg-purple-100 text-purple-800 border-purple-200",
      attack: "bg-red-100 text-red-800 border-red-200",
      block: "bg-slate-100 text-slate-800 border-slate-200",
      dig: "bg-green-100 text-green-800 border-green-200",
      freeball: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[action] || "bg-gray-100 text-gray-800";
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'SELECT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === 'Enter' || e.key === 'Delete' || e.key === 'Backspace') {
        const pendingEvents = events.filter(ev => ev.reviewStatus === 'pending');
        if (pendingEvents.length === 0) return;

        let closestEvent = pendingEvents[0];
        let minDiff = Math.abs(currentTime - closestEvent.timeSeconds);

        for (let i = 1; i < pendingEvents.length; i++) {
          const diff = Math.abs(currentTime - pendingEvents[i].timeSeconds);
          if (diff < minDiff) {
            minDiff = diff;
            closestEvent = pendingEvents[i];
          }
        }

        // Apply if near the current video time (e.g. within 5 seconds)
        if (minDiff < 5) {
          if (e.key === 'Enter') {
            e.preventDefault();
            onConfirmEvent(closestEvent.id);
          } else if ((e.key === 'Delete' || e.key === 'Backspace') && onDeleteEvent) {
            e.preventDefault();
            onDeleteEvent(closestEvent.id);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [events, currentTime, onConfirmEvent, onDeleteEvent]);

  return (
    <div className="flex flex-col h-full bg-card rounded-xl border shadow-sm">
      <div className="p-4 border-b flex justify-between items-center bg-card rounded-t-xl">
        <div>
          <h3 className="font-semibold text-lg hover:text-primary transition-colors">Timeline de Ações</h3>
          <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">Atalhos: [Enter] Confirma / [Del] Exclui (prox. de {formatTime(currentTime)})</p>
        </div>
        <span className="text-xs font-medium px-2 py-1 bg-muted rounded-full text-muted-foreground">
          {events.filter(e => e.reviewStatus === 'pending').length} pendentes
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {events.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center text-muted-foreground text-sm">
            <p>Nenhum evento detectado ainda.</p>
            <p className="mt-1">Clique em "Analisar Vídeo" para gerar a timeline.</p>
          </div>
        ) : (
          events.map((event) => {
            const isNearCurrentTime = Math.abs(currentTime - event.timeSeconds) < 2;
            const isPending = event.reviewStatus === 'pending';

            return (
              <div
                key={event.id}
                className={`flex gap-3 p-3 rounded-lg border transition-all ${isNearCurrentTime ? 'ring-2 ring-primary bg-primary/5' : 'bg-background hover:bg-muted/50'
                  } ${!isPending ? 'opacity-70 grayscale-[30%]' : ''}`}
              >
                {/* Time Indicator */}
                <button
                  onClick={() => onSeekTo(event.timeSeconds)}
                  className="flex flex-col items-center justify-center min-w-[50px] text-primary hover:text-primary/80 transition-colors"
                >
                  <PlayCircle className="w-6 h-6 mb-1" />
                  <span className="text-xs font-mono font-medium">{formatTime(event.timeSeconds)}</span>
                </button>

                {/* Event Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded border capitalize ${getActionColor(event.actionType)}`}>
                        {event.actionType}
                      </span>
                      {event.aiConfidence && isPending && (
                        <span className="text-[10px] text-muted-foreground ml-2">
                          IA: {Math.round(event.aiConfidence * 100)}%
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1">
                      {isPending ? (
                        <button
                          onClick={() => onConfirmEvent(event.id)}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                          title="Confirmar Evento"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      ) : (
                        <span className="text-[10px] text-green-600 font-medium px-1.5 py-0.5 bg-green-50 rounded flex items-center">
                          <Check className="w-3 h-3 mr-1" /> Confirmado
                        </span>
                      )}
                      <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-50 rounded">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteEvent && onDeleteEvent(event.id)}
                        className="p-1.5 text-slate-400 hover:text-destructive hover:bg-red-50 rounded"
                        title="Excluir Evento"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Quick Edit Row */}
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      placeholder="Jogador #"
                      className="w-20 text-xs px-2 py-1 rounded border bg-background"
                      value={event.playerId || ''}
                      onChange={(e) => onEditEvent(event.id, { playerId: e.target.value })}
                    />
                    <div className="flex gap-1 ml-1">
                      {(['#', '+', '!', '-', '=', '/'] as const).map((evalType) => (
                        <button
                          key={evalType}
                          onClick={() => onEditEvent(event.id, { evaluation: evalType })}
                          className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold transition-colors ${event.evaluation === evalType
                              ? evalType === '#' || evalType === '+' ? 'bg-green-600 text-white'
                                : evalType === '-' || evalType === '=' ? 'bg-red-600 text-white'
                                  : 'bg-yellow-500 text-white'
                              : 'bg-muted text-muted-foreground hover:bg-secondary'
                            }`}
                          title={`Avaliar com ${evalType}`}
                        >
                          {evalType}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
