import { useState } from 'react';
import { ArrowRight, CheckCircle, AlertTriangle, Lightbulb, BarChart3, Target, Sparkles, TrendingUp } from 'lucide-react';
import ScenarioCard from '../components/intelligence/ScenarioCard';
import { cn } from '@/lib/utils';

const SCENARIOS = [
  {
    id: 1,
    issue: {
      title: 'Users switch between Reports and Documents frequently',
      description: 'AI detected repeated navigation between Reports and Documents modules, indicating users need both at the same time.',
      signal: 'High cross-module traffic',
      severity: 'medium',
      metric: '2,847 switches/week',
    },
    recommendation: {
      title: 'Create a Quick Access Panel',
      description: 'Add a side panel linking related reports and documents so users can access both without switching modules.',
      type: 'Navigation',
      effort: 'Low',
    },
    simulation: { clicksReduced: 34, timeSaved: 22, adoption: 18, frictionReduced: 28, confidence: 91 },
  },
  {
    id: 2,
    issue: {
      title: 'Approval queue causes delays for low-value portfolios',
      description: 'AI observed that low-complexity portfolios wait in L1 and L2 approval queues, creating unnecessary bottlenecks.',
      signal: 'Queue bottleneck',
      severity: 'high',
      metric: '12 pending approvals',
    },
    recommendation: {
      title: 'Auto-route low-complexity portfolios',
      description: 'Skip L1 approval for portfolios under $500K to eliminate the majority of queue volume and speed up workflows.',
      type: 'Workflow',
      effort: 'Medium',
    },
    simulation: { clicksReduced: 45, timeSaved: 31, adoption: 15, frictionReduced: 60, confidence: 88 },
  },
  {
    id: 3,
    issue: {
      title: 'New users abandon dashboard before completing setup',
      description: 'AI detected high abandonment rates among new users navigating the dashboard for the first time.',
      signal: 'Onboarding friction',
      severity: 'high',
      metric: '38% abandon rate',
    },
    recommendation: {
      title: 'Progressive disclosure for new users',
      description: 'Reveal workflow steps contextually instead of all at once, reducing cognitive load at each decision point.',
      type: 'Interface',
      effort: 'Medium',
    },
    simulation: { clicksReduced: 15, timeSaved: 12, adoption: 28, frictionReduced: 22, confidence: 84 },
  },
  {
    id: 4,
    issue: {
      title: 'Data validation happens too late in the entry process',
      description: 'AI found users re-entering data after validation errors appear at the end of the form, causing frustration.',
      signal: 'Late validation',
      severity: 'medium',
      metric: '1,284 re-entries/week',
    },
    recommendation: {
      title: 'Inline real-time validation',
      description: 'Shift data validation to real-time feedback at the entry stage so users fix errors as they type.',
      type: 'Interface',
      effort: 'Low',
    },
    simulation: { clicksReduced: 12, timeSaved: 8, adoption: 10, frictionReduced: 18, confidence: 93 },
  },
  {
    id: 5,
    issue: {
      title: 'CRM and Portfolio Management accessed separately',
      description: 'AI detected users opening CRM and Portfolio Management in separate sessions to view client information together.',
      signal: 'Module separation',
      severity: 'medium',
      metric: '1,562 dual-sessions/week',
    },
    recommendation: {
      title: 'Unified client view',
      description: 'Combine CRM contact details and portfolio data into a single client view to eliminate context switching.',
      type: 'Navigation',
      effort: 'High',
    },
    simulation: { clicksReduced: 25, timeSaved: 19, adoption: 22, frictionReduced: 20, confidence: 86 },
  },
];

const FLOW_STEPS = [
  { icon: AlertTriangle, label: 'Detected Issue', desc: 'AI observes user behavior', color: 'text-amber-400' },
  { icon: Lightbulb, label: 'AI Recommendation', desc: 'Suggested improvement', color: 'text-primary' },
  { icon: BarChart3, label: 'Simulation Impact', desc: 'Predicted result', color: 'text-emerald-400' },
  { icon: CheckCircle, label: 'Submit for Review', desc: 'Sent to Product/UX queue', color: 'text-foreground/70' },
];

export default function UXIntelligenceLab() {
  const [submitted, setSubmitted] = useState(new Set());

  const handleSubmit = (id) => setSubmitted(prev => new Set([...prev, id]));

  const appliedCount = submitted.size;
  const totalScenarios = SCENARIOS.length;
  const avgConfidence = Math.round(SCENARIOS.reduce((a, s) => a + s.simulation.confidence, 0) / totalScenarios);
  const avgImpact = Math.round(SCENARIOS.reduce((a, s) => a + (s.simulation.clicksReduced + s.simulation.timeSaved + s.simulation.adoption + s.simulation.frictionReduced) / 4, 0) / totalScenarios);

  return (
    <div className="space-y-8 relative">
      {/* Header */}
      <div className="relative">
        <div className="absolute -top-10 left-0 right-0 h-28 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none rounded-full blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="flex items-center gap-1">
              <div className="w-1 h-6 rounded-full bg-primary shadow-[0_0_12px_hsl(210,100%,58%,0.7)]" />
              <div className="w-1 h-4 rounded-full bg-primary/50" />
              <div className="w-1 h-2.5 rounded-full bg-primary/25" />
            </div>
            <span className="text-[10px] font-semibold tracking-[0.3em] text-primary uppercase">Workflow Optimization</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            <span className="text-foreground/95">UX Intelligence </span>
            <span className="text-shimmer">Lab</span>
          </h1>
          <p className="text-sm text-muted-foreground/55 tracking-wide max-w-2xl">
            AI analyzes real usage data to identify workflow issues, suggest improvements, and simulate expected outcomes. Recommendations are advisory and go through Product, UX, and Development review before implementation.
          </p>
        </div>
      </div>

      {/* Flow indicator */}
      <div className="floating-surface rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-primary/50" />
          <span className="text-[10px] font-semibold tracking-[0.22em] text-muted-foreground/40 uppercase">How It Works</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {FLOW_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="flex items-center gap-3">
                <div className="flex-1 flex items-center gap-3 p-3 rounded-xl bg-muted/8 border border-border/15">
                  <div className="p-2 rounded-lg bg-muted/25 shrink-0">
                    <Icon className={cn('w-4 h-4', step.color)} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-foreground/85 leading-tight">{step.label}</p>
                    <p className="text-[10px] text-muted-foreground/45 mt-0.5">{step.desc}</p>
                  </div>
                </div>
                {i < FLOW_STEPS.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground/20 shrink-0 hidden md:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: AlertTriangle, label: 'Issues Detected', value: String(totalScenarios), color: 'text-amber-400', bg: 'bg-amber-400/8 border-amber-400/20' },
          { icon: Lightbulb, label: 'Recommendations Ready', value: String(totalScenarios), color: 'text-primary', bg: 'bg-primary/8 border-primary/20' },
          { icon: TrendingUp, label: 'Avg Productivity Gain', value: `+${avgImpact}%`, color: 'text-emerald-400', bg: 'bg-emerald-400/8 border-emerald-400/20' },
          { icon: CheckCircle, label: 'Submitted for Review', value: `${appliedCount}/${totalScenarios}`, color: 'text-primary', bg: 'bg-primary/8 border-primary/20' },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className={cn('floating-surface rounded-2xl p-5 border', bg)}>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-muted/25">
                <Icon className={cn('w-4 h-4', color)} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground/60 mb-1.5 tracking-wide">{label}</p>
            <p className={cn('text-lg font-bold font-mono', color)}>{value}</p>
          </div>
        ))}
      </div>

      {/* Scenario cards */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <Target className="w-3.5 h-3.5 text-primary/50" />
          <span className="text-[10px] font-semibold tracking-[0.22em] text-muted-foreground/40 uppercase">Intelligence Scenarios</span>
          <div className="flex-1 h-px bg-gradient-to-r from-border/20 to-transparent" />
        </div>
        {SCENARIOS.map(scenario => (
          <ScenarioCard
            key={scenario.id}
            scenario={scenario}
            isSubmitted={submitted.has(scenario.id)}
            onSubmit={() => handleSubmit(scenario.id)}
          />
        ))}
      </div>

      {/* Footer note */}
      <div className="glass-panel rounded-xl p-4 text-center">
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <div className="w-1 h-1 rounded-full bg-primary/50 animate-pulse-soft" />
          <span className="text-[9px] text-muted-foreground/35 tracking-wider font-mono">AETHER UX INTELLIGENCE ENGINE</span>
          <div className="w-1 h-1 rounded-full bg-primary/50 animate-pulse-soft" />
        </div>
        <p className="text-[9px] text-muted-foreground/25">Advisory recommendations only · All changes require stakeholder approval · {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}