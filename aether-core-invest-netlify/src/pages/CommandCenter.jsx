import { useState, useEffect } from 'react';
import { Clock, TrendingUp, AlertTriangle, Users, Brain, Activity, ChevronRight, Layers, Target, GitBranch, FileText, CheckCircle } from 'lucide-react';
import OperationalPulse from '../components/dashboard/OperationalPulse';
import WorkflowCongestion from '../components/dashboard/WorkflowCongestion';
import LiquidityRisk from '../components/dashboard/LiquidityRisk';
import CognitiveInsights from '../components/dashboard/CognitiveInsights';
import { cn } from '@/lib/utils';

const STATUS_ITEMS = [
  { label: 'Active Users', value: '2,847', color: 'text-primary' },
  { label: 'Portfolios Managed', value: '184', color: 'text-emerald-400' },
  { label: 'Reports Generated', value: '342', color: 'text-emerald-400' },
  { label: 'Documents Processed', value: '1,284', color: 'text-primary' },
  { label: 'Approval Requests', value: '12', color: 'text-amber-400' },
  { label: 'CRM Activities', value: '2,108', color: 'text-emerald-400' },
  { label: 'Workflow Completion', value: '94.2%', color: 'text-emerald-400' },
  { label: 'Productivity Score', value: '87.4', color: 'text-primary' },
];

const PRIORITY_SIGNALS = [
  { icon: AlertTriangle, label: 'Approval Queue', value: '12 pending', color: 'text-red-400', bg: 'bg-red-500/8 border-red-500/20' },
  { icon: Users, label: 'User Adoption', value: '+28%', color: 'text-emerald-400', bg: 'bg-emerald-400/8 border-emerald-400/20' },
  { icon: GitBranch, label: 'Workflow Bottleneck', value: '3 detected', color: 'text-amber-400', bg: 'bg-amber-400/8 border-amber-400/20' },
  { icon: FileText, label: 'Document Activity', value: '1,284', color: 'text-primary', bg: 'bg-primary/8 border-primary/20' },
];

export default function CommandCenter() {
  const [time, setTime] = useState(new Date());
  const [activeSignalIndex, setActiveSignalIndex] = useState(0);
  const [metricTick, setMetricTick] = useState(0);

  useEffect(() => {
    const tClock = setInterval(() => setTime(new Date()), 1000);
    const tSignal = setInterval(() => setActiveSignalIndex(i => (i + 1) % PRIORITY_SIGNALS.length), 3200);
    const tMetric = setInterval(() => setMetricTick(t => t + 1), 2800);
    return () => { clearInterval(tClock); clearInterval(tSignal); clearInterval(tMetric); };
  }, []);

  const cogScore = Math.round(94 + Math.sin(metricTick / 3) * 0.8);

  return (
    <div className="space-y-10 relative">

      {/* Header */}
      <div className="relative">
        <div className="absolute -top-10 left-0 right-0 h-28 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none rounded-full blur-3xl" />
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 relative">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center gap-1">
                <div className="w-1 h-6 rounded-full bg-primary shadow-[0_0_12px_hsl(210,100%,58%,0.7)]" />
                <div className="w-1 h-4 rounded-full bg-primary/50" />
                <div className="w-1 h-2.5 rounded-full bg-primary/25" />
              </div>
              <span className="text-[10px] font-semibold tracking-[0.3em] text-primary uppercase">Management Dashboard</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-3">
              <span className="text-foreground/95">Executive </span>
              <span className="text-shimmer">Overview</span>
            </h1>
            <p className="text-sm text-muted-foreground/55 tracking-wide">Management dashboard for platform activity, user engagement, and workflow performance</p>
          </div>

          <div className="flex flex-col items-end gap-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 floating-surface rounded-xl px-4 py-2.5">
                <Clock className="w-3.5 h-3.5 text-muted-foreground/40" />
                <span className="text-xs font-mono text-foreground/65">{time.toLocaleTimeString('en-US', { hour12: false })}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-400/8 border border-emerald-400/20">
                <div className="flex gap-0.5 items-end h-4">
                  {[3, 5, 4, 6, 5].map((h, i) => (
                    <div key={i} className="w-0.5 bg-emerald-400 rounded-full animate-pulse-soft" style={{ height: `${h}px`, animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold tracking-[0.2em]">ALL NOMINAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Status Bar */}
      <div className="floating-surface rounded-2xl overflow-hidden">
        <div className="px-6 py-3 border-b border-border/15 flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-primary/50" />
          <span className="text-[9px] font-semibold tracking-[0.28em] text-muted-foreground/40 uppercase">Live Operational Status</span>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-primary/50 animate-pulse-soft" />
            <span className="text-[9px] font-mono text-muted-foreground/35">{time.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 divide-x divide-border/15">
          {STATUS_ITEMS.map(({ label, value, color }, i) => (
            <div key={label} className="px-5 py-5 hover:bg-primary/2 transition-colors duration-300">
              <p className="text-[9.5px] text-muted-foreground/40 tracking-[0.2em] uppercase mb-2.5 font-medium">{label}</p>
              <p className={cn('text-lg font-bold font-mono tracking-tight', color)}>{value}</p>
              <div className="mt-2 h-0.5 bg-muted/15 rounded-full overflow-hidden w-14">
                <div
                  className={cn('h-full rounded-full transition-all duration-1000', i % 3 === 0 ? 'bg-emerald-400' : i % 3 === 1 ? 'bg-primary' : 'bg-amber-400')}
                  style={{ width: `${60 + (i * 8 + metricTick * 2) % 40}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Priority Intelligence Signals */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {PRIORITY_SIGNALS.map(({ icon: Icon, label, value, color, bg }, i) => (
          <div
            key={label}
            className={cn(
              'floating-surface rounded-2xl p-5 border transition-all duration-500 group cursor-pointer',
              bg,
              i === activeSignalIndex ? 'scale-[1.02] shadow-lg' : 'hover:border-border/40'
            )}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-muted/25">
                <Icon className={cn('w-4 h-4', color)} />
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/20 group-hover:text-muted-foreground/50 transition-colors" />
            </div>
            <p className="text-xs text-muted-foreground/60 mb-1.5 tracking-wide">{label}</p>
            <p className={cn('text-sm font-bold', color)}>{value}</p>
          </div>
        ))}
      </div>

      {/* Intelligence Zones Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3">
          <OperationalPulse />
        </div>
        <div className="xl:col-span-2">
          <div className="glass-panel rounded-2xl p-6 h-full intelligence-glow flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-[15px] font-semibold text-foreground tracking-wide">Cognitive Engine</h2>
                <p className="text-xs text-muted-foreground mt-0.5">AI health and readiness</p>
              </div>
              <Brain className="w-4 h-4 text-primary/50" />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-5 py-4">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(222,18%,12%)" strokeWidth="5" />
                  <circle
                    cx="50" cy="50" r="42" fill="none"
                    stroke="hsl(210,100%,62%)" strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 42}`}
                    strokeDashoffset={`${2 * Math.PI * 42 * (1 - cogScore / 100)}`}
                    style={{ filter: 'drop-shadow(0 0 10px hsl(210,100%,62%,0.45))', transition: 'stroke-dashoffset 1.2s ease' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-foreground">{cogScore}</span>
                  <span className="text-[10px] text-muted-foreground/45 font-mono">/100</span>
                </div>
              </div>
              <div className="w-full space-y-3">
                {[
                  { l: 'Pattern Recognition', v: 97 },
                  { l: 'Predictive Accuracy', v: cogScore },
                  { l: 'Signal Resolution', v: 88 },
                ].map(({ l, v }) => (
                  <div key={l} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground/60">{l}</span>
                      <span className="text-[11px] font-mono text-foreground/65">{v}%</span>
                    </div>
                    <div className="h-0.5 bg-muted/25 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${v}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-border/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
              <span className="text-[10px] text-emerald-400/75 font-medium tracking-wide">Optimal operational readiness</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Intelligence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WorkflowCongestion />
        <LiquidityRisk />
      </div>

      {/* Cognitive Insights */}
      <div className="pt-2">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-3.5 h-3.5 text-primary/50" />
          <span className="text-[10px] font-semibold tracking-[0.22em] text-muted-foreground/40 uppercase">AI Behavioral Intelligence</span>
          <div className="flex-1 h-px bg-gradient-to-r from-border/20 to-transparent" />
          <div className="flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-muted-foreground/25" />
            <span className="text-[9px] text-muted-foreground/25 font-mono">4 active insights</span>
          </div>
        </div>
        <CognitiveInsights />
      </div>

    </div>
  );
}