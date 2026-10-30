import { Brain, MousePointer, Cpu, Route, Lightbulb, ChevronRight, TrendingUp, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const insights = [
  {
    icon: Route,
    title: 'Navigation Bottleneck Detected',
    desc: '73% of users traverse Dashboard to Portfolio to Reports within 90s. Surface a combined view to cut switching.',
    impact: 'high',
    metric: '73%',
    metricLabel: 'journey rate',
  },
  {
    icon: Users,
    title: 'User Adoption Accelerating',
    desc: 'Active users up 28% this month. CRM and Portfolio Creation modules driving the surge across teams.',
    impact: 'medium',
    metric: '+28%',
    metricLabel: 'adoption',
  },
  {
    icon: MousePointer,
    title: 'Workflow Friction Identified',
    desc: 'Average 4.2 clicks to complete a portfolio creation. Optimal path requires 2 clicks — restructure recommended.',
    impact: 'high',
    metric: '4.2x',
    metricLabel: 'click depth',
  },
  {
    icon: Lightbulb,
    title: 'Productivity Opportunity',
    desc: 'Auto-pin Reports module for users with over 5 daily visits. Projected 18% efficiency gain per session.',
    impact: 'suggestion',
    metric: '+18%',
    metricLabel: 'productivity',
  },
];

const impactConfig = {
  high:       { badge: 'bg-amber-400/12 text-amber-400 border-amber-400/25', icon: 'text-amber-400', card: 'hover:border-amber-400/25', label: 'High Impact' },
  medium:     { badge: 'bg-primary/12 text-primary border-primary/25', icon: 'text-primary', card: 'hover:border-primary/25', label: 'Medium' },
  suggestion: { badge: 'bg-emerald-400/12 text-emerald-400 border-emerald-400/25', icon: 'text-emerald-400', card: 'hover:border-emerald-400/25', label: 'Suggestion' },
};

export default function CognitiveInsights() {
  return (
    <div className="glass-panel rounded-2xl p-6 relative overflow-hidden intelligence-glow">
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-purple-500/4 to-transparent pointer-events-none" />

      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-400/20">
            <Brain className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h2 className="text-[15px] font-semibold text-foreground tracking-wide">Behavioral Intelligence</h2>
            <p className="text-xs text-muted-foreground mt-0.5">User adoption and workflow analytics</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-purple-500/8 border border-purple-400/18">
          <TrendingUp className="w-3 h-3 text-purple-400" />
          <span className="text-[10px] text-purple-400 font-semibold">4 insights active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {insights.map(({ icon: Icon, title, desc, impact, metric, metricLabel }, i) => {
          const cfg = impactConfig[impact];
          return (
            <div
              key={i}
              className={cn(
                'rounded-xl p-4 border border-border/30 bg-muted/15 transition-all duration-300 cursor-pointer group',
                cfg.card
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-muted/30">
                    <Icon className={cn('w-3.5 h-3.5', cfg.icon)} />
                  </div>
                  <span className={cn('text-[9.5px] px-2 py-0.5 rounded-full border font-semibold uppercase tracking-wider', cfg.badge)}>
                    {cfg.label}
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/25 group-hover:text-muted-foreground/60 transition-colors mt-0.5" />
              </div>

              <p className="text-[12.5px] font-semibold text-foreground/90 mb-1.5 leading-snug">{title}</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">{desc}</p>

              <div className="flex items-center justify-between pt-2.5 border-t border-border/20">
                <span className="text-[10px] text-muted-foreground/60">{metricLabel}</span>
                <span className={cn('text-sm font-bold font-mono', cfg.icon)}>{metric}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}