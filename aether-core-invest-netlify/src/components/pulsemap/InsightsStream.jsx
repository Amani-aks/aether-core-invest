import { Cpu, AlertTriangle, TrendingUp, Info, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { insights } from './networkData';

const SEVERITY_CONFIG = {
  critical: { icon: ShieldAlert, color: 'text-red-400',   bar: 'bg-red-500',     dot: 'bg-red-500' },
  high:     { icon: AlertTriangle, color: 'text-amber-400', bar: 'bg-amber-400',   dot: 'bg-amber-400' },
  medium:   { icon: TrendingUp,   color: 'text-primary',   bar: 'bg-primary',     dot: 'bg-primary' },
  low:      { icon: Info,         color: 'text-emerald-400',bar: 'bg-emerald-400', dot: 'bg-emerald-400' },
  info:     { icon: Cpu,          color: 'text-purple-400', bar: 'bg-purple-400',  dot: 'bg-purple-400' },
};

export default function InsightsStream() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 shrink-0">
        <div>
          <p className="text-[10px] font-semibold tracking-widest text-foreground/70 uppercase">AI Insights</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Operational intelligence feed</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
          <span className="text-[10px] text-emerald-400 font-medium">LIVE</span>
        </div>
      </div>

      <div className="space-y-2 flex-1 overflow-y-auto">
        {insights.map((insight) => {
          const cfg = SEVERITY_CONFIG[insight.severity];
          const Icon = cfg.icon;
          return (
            <div
              key={insight.id}
              className="glass-panel rounded-xl p-3 hover:border-primary/20 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start gap-2.5">
                <div className={cn('p-1.5 rounded-lg bg-muted/40 mt-0.5 shrink-0', cfg.color)}>
                  <Icon className="w-3 h-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-foreground/90 leading-snug">{insight.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">{insight.desc}</p>
                  <p className="text-[9px] text-muted-foreground/50 mt-1.5">{insight.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}