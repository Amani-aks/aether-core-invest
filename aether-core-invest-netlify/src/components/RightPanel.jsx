import { AlertTriangle, TrendingUp, Brain, ChevronRight, Users, Zap, Cpu, Radio, Activity, FileText, GitBranch } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const alerts = [
  { severity: 'high', icon: GitBranch, title: 'Approval Workflow Bottleneck', desc: '12 portfolio approval requests exceeding target response by 2.8hrs', time: '4m ago', color: 'text-red-400', bg: 'bg-red-500/6 border-red-500/18' },
  { severity: 'medium', icon: TrendingUp, title: 'High Traffic Journey Detected', desc: 'Dashboard to Portfolio to Reports path sees 340 daily sessions', time: '12m ago', color: 'text-amber-400', bg: 'bg-amber-400/6 border-amber-400/18' },
  { severity: 'low', icon: Users, title: 'User Adoption Surge', desc: 'Active users up 28% this month across CRM and Portfolio modules', time: '28m ago', color: 'text-primary', bg: 'bg-primary/5 border-primary/18' },
  { severity: 'info', icon: Brain, title: 'Productivity Opportunity', desc: 'Predicted 24% workflow acceleration by reducing Portfolio Creation steps', time: '1h ago', color: 'text-emerald-400', bg: 'bg-emerald-400/5 border-emerald-400/15' },
  { severity: 'low', icon: FileText, title: 'Document Utilization Pattern', desc: '68% of document views concentrate on 12 files — auto-surface ready', time: '2h ago', color: 'text-primary', bg: 'bg-primary/5 border-primary/18' },
];

export default function RightPanel() {
  const [pulse, setPulse] = useState(0);
  const [metrics, setMetrics] = useState({ cognitive: 68, cpu: 34, memory: 2.1, network: 98 });

  useEffect(() => {
    const id = setInterval(() => {
      setPulse(p => (p + 1) % 100);
      setMetrics({
        cognitive: 65 + Math.floor(Math.sin(pulse / 10) * 8),
        cpu: 30 + Math.floor(Math.sin(pulse / 15) * 8),
        memory: 2.0 + Math.sin(pulse / 20) * 0.3,
        network: 95 + Math.floor(Math.cos(pulse / 25) * 5),
      });
    }, 2000);
    return () => clearInterval(id);
  }, [pulse]);

  return (
    <aside className="w-[300px] h-screen fixed right-0 top-0 border-l border-border/18 bg-background/35 backdrop-blur-2xl hidden xl:flex flex-col z-40" style={{ boxShadow: '-20px 0 60px hsl(223,30%,3%,0.35)' }}>
      {/* Ambient top glow */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-primary/4 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-border/20 relative">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Cpu className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_6px_hsl(160,60%,45%,0.7)]" />
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-wider text-foreground">AI INTELLIGENCE</p>
            <p className="text-[9px] text-muted-foreground/70 tracking-wide">Adaptive cognitive feed</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-400/8 border border-emerald-400/18">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
          <span className="text-[9px] text-emerald-400 font-semibold tracking-widest">LIVE</span>
        </div>
      </div>

      {/* Live Metrics */}
      <div className="px-5 py-5 border-b border-border/15 relative">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/6 to-transparent rounded-bl-3xl" />
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-3.5 h-3.5 text-primary/60" />
          <p className="text-xs font-semibold text-foreground/90 tracking-wide">Operational Pulse</p>
        </div>
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground/85">User Activity</span>
            <div className="flex items-center gap-2.5">
              <div className="w-20 h-1 bg-muted/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-700"
                  style={{ width: `${metrics.cognitive}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-primary w-8 text-right">{metrics.cognitive}%</span>
            </div>
          </div>
          {[
            { label: 'Processing', value: `${metrics.cpu}%`, color: 'text-foreground/80' },
            { label: 'Memory', value: `${metrics.memory.toFixed(1)} GB`, color: 'text-foreground/80' },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground/85">{label}</span>
              <span className={cn('text-[10px] font-mono', color)}>{value}</span>
            </div>
          ))}
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground/85">Network</span>
            <div className="flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse-soft" />
              <span className="text-[10px] font-mono text-emerald-400">{metrics.network}%</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-3.5 border-t border-border/15 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
          <span className="text-[9.5px] text-emerald-400/90 font-medium tracking-wide">All systems nominal</span>
        </div>
      </div>

      {/* Intelligence Feed */}
      <div className="flex-1 overflow-y-auto py-4 px-4 space-y-2.5">
        <p className="text-[9px] text-muted-foreground/65 tracking-[0.25em] uppercase font-semibold px-1 mb-3">Intelligence Feed</p>
        {alerts.map((alert, i) => {
          const Icon = alert.icon;
          return (
            <div
              key={i}
              className={cn(
                'rounded-xl p-4 border transition-all duration-300 cursor-pointer group hover:brightness-110',
                alert.bg
              )}
            >
              <div className="flex items-start gap-3">
                <Icon className={cn('w-3.5 h-3.5 mt-0.5 shrink-0', alert.color)} />
                <div className="flex-1 min-w-0">
                  <p className="text-[11.5px] font-semibold text-foreground leading-snug">{alert.title}</p>
                  <p className="text-[10.5px] text-muted-foreground/80 mt-1.5 leading-relaxed">{alert.desc}</p>
                  <p className="text-[9.5px] text-muted-foreground/60 mt-2 font-mono">{alert.time}</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/20 group-hover:text-muted-foreground/60 transition-colors mt-1 shrink-0" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Cognitive Engine Score */}
      <div className="p-5 border-t border-border/15">
        <div className="floating-surface rounded-2xl p-5 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/6 to-transparent" />
          <div className="relative">
            <p className="text-[9px] text-muted-foreground/65 tracking-[0.28em] uppercase mb-3">Cognitive Engine</p>
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="text-3xl font-bold text-foreground">{94 + Math.floor(Math.sin(pulse / 15) * 0.7)}</span>
              <span className="text-sm text-muted-foreground/65 font-normal">/ 100</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
              <p className="text-[10px] text-emerald-400/95 font-medium">Operational health optimal</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}