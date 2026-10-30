import { X, Activity, AlertTriangle, GitBranch, TrendingUp } from 'lucide-react';
import { nodes, edges } from './networkData';
import { cn } from '@/lib/utils';

const RISK_STYLE = {
  low:      { badge: 'bg-primary/10 text-primary border border-primary/20',      bar: 'bg-primary',     label: 'Low Usage' },
  medium:   { badge: 'bg-amber-400/10 text-amber-400 border border-amber-400/20', bar: 'bg-amber-400',   label: 'Active' },
  high:     { badge: 'bg-orange-400/10 text-orange-400 border border-orange-400/20', bar: 'bg-orange-400', label: 'High Usage' },
  critical: { badge: 'bg-red-500/15 text-red-400 border border-red-500/30',       bar: 'bg-red-500',     label: 'Attention Required' },
};

export default function NodeDetailPanel({ nodeId, onClose }) {
  const node = nodes.find(n => n.id === nodeId);
  if (!node) return null;

  const rs = RISK_STYLE[node.risk];
  const connected = edges
    .filter(e => e.from === nodeId || e.to === nodeId)
    .map(e => {
      const otherId = e.from === nodeId ? e.to : e.from;
      const other = nodes.find(n => n.id === otherId);
      return { ...e, other, direction: e.from === nodeId ? 'out' : 'in' };
    });

  return (
    <div className="absolute right-4 top-4 w-[280px] glass-panel rounded-2xl p-4 z-20 shadow-2xl">
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className={cn('text-[9px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider', rs.badge)}>
            {rs.label}
          </span>
          <h3 className="text-sm font-bold text-foreground mt-1.5">{node.label}</h3>
          <p className="text-[11px] text-muted-foreground">{node.sub}</p>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted/50 text-muted-foreground transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3 mb-4">
        {[
          { icon: Activity, label: 'Module Activity', value: node.activity, color: 'text-primary' },
          { icon: AlertTriangle, label: 'Traffic Index', value: node.pressure, color: node.pressure > 80 ? 'text-red-400' : 'text-amber-400' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <Icon className={cn('w-3 h-3', color)} />
                <span className="text-[10px] text-muted-foreground">{label}</span>
              </div>
              <span className={cn('text-[10px] font-mono font-semibold', color)}>{value}%</span>
            </div>
            <div className="h-1 bg-muted/40 rounded-full overflow-hidden">
              <div className={cn('h-full rounded-full transition-all', rs.bar)} style={{ width: `${value}%` }} />
            </div>
          </div>
        ))}
      </div>

      {node.risk === 'critical' && node.attentionReasons && (
        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-2">
            <AlertTriangle className="w-3 h-3 text-red-400" />
            <span className="text-[10px] text-red-400 uppercase tracking-wider font-semibold">Why Attention Required</span>
          </div>
          <div className="space-y-1.5">
            {node.attentionReasons.map((reason, i) => (
              <div key={i} className="flex items-start gap-1.5 text-[10px] text-foreground/70">
                <div className="w-1 h-1 rounded-full bg-red-400 mt-1.5 shrink-0" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <GitBranch className="w-3 h-3 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">User Journeys</span>
        </div>
        <div className="space-y-1.5 max-h-[160px] overflow-y-auto">
          {connected.map((c, i) => {
            const cong = c.congestion;
            const congColor = cong > 0.8 ? 'text-red-400' : cong > 0.55 ? 'text-amber-400' : 'text-primary';
            return (
              <div key={i} className="flex items-center justify-between text-[11px] bg-muted/20 rounded-lg px-2.5 py-1.5">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className={cn('w-2.5 h-2.5', c.direction === 'out' ? 'text-primary' : 'text-muted-foreground', 'shrink-0')} style={c.direction === 'in' ? { transform: 'rotate(180deg)' } : {}} />
                  <span className="text-foreground/80 truncate">{c.other?.label}</span>
                </div>
                <span className={cn('font-mono text-[10px]', congColor)}>{Math.round(cong * 100)}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}