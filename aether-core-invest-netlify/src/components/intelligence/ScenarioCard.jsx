import { AlertTriangle, Lightbulb, BarChart3, ArrowRight, CheckCircle, Clock, Zap, MousePointerClick, TrendingUp, ChevronRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const SEVERITY_STYLE = {
  high: { text: 'text-red-400', bg: 'bg-red-500/8', border: 'border-red-400/20', dot: 'bg-red-400', bar: 'bg-red-400' },
  medium: { text: 'text-amber-400', bg: 'bg-amber-400/8', border: 'border-amber-400/20', dot: 'bg-amber-400', bar: 'bg-amber-400' },
  low: { text: 'text-primary', bg: 'bg-primary/8', border: 'border-primary/20', dot: 'bg-primary', bar: 'bg-primary' },
};

const IMPACT_METRICS = [
  { key: 'clicksReduced', label: 'Clicks Reduced', icon: MousePointerClick, color: 'bg-primary' },
  { key: 'timeSaved', label: 'Time Saved', icon: Clock, color: 'bg-emerald-400' },
  { key: 'adoption', label: 'Adoption Gain', icon: TrendingUp, color: 'bg-emerald-400' },
  { key: 'frictionReduced', label: 'Friction Reduced', icon: Zap, color: 'bg-amber-400' },
];

export default function ScenarioCard({ scenario, isSubmitted, onSubmit }) {
  const sev = SEVERITY_STYLE[scenario.issue.severity] || SEVERITY_STYLE.medium;
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await base44.entities.Recommendation.create({
        title: scenario.recommendation.title,
        issue: scenario.issue.title,
        recommendation: scenario.recommendation.description,
        expected_benefit: `Clicks -${scenario.simulation.clicksReduced}%, Time +${scenario.simulation.timeSaved}%, Adoption +${scenario.simulation.adoption}%, Friction -${scenario.simulation.frictionReduced}%`,
        confidence: scenario.simulation.confidence,
        category: scenario.recommendation.type,
        effort: scenario.recommendation.effort,
        status: 'pending_review',
      });
      toast({ title: 'Submitted for Review', description: 'Recommendation sent to the Product/UX review queue for stakeholder approval.' });
      onSubmit();
    } catch (error) {
      toast({ title: 'Submission Failed', description: error.message, variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={cn('floating-surface rounded-2xl overflow-hidden transition-all duration-500', isSubmitted && 'ring-1 ring-primary/30')}>
      {/* Mobile step labels */}
      <div className="lg:hidden flex items-center gap-1.5 px-5 pt-4 pb-1 flex-wrap">
        {['Detected Issue', 'AI Recommendation', 'Simulation Impact'].map((label, i) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-primary/15 flex items-center justify-center text-[8px] font-bold text-primary">{i + 1}</div>
            <span className="text-[8px] text-muted-foreground/50 uppercase tracking-wider">{label.split(' ')[0]}</span>
            {i < 2 && <ArrowRight className="w-2.5 h-2.5 text-muted-foreground/20" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border/15">
        {/* Left: Detected Issue */}
        <div className="p-5 lg:p-6 relative">
          <div className={cn('absolute top-0 left-0 w-1 h-full', sev.bar)} />
          <div className="flex items-center gap-2 mb-3">
            <div className={cn('p-1.5 rounded-lg', sev.bg)}>
              <AlertTriangle className={cn('w-3.5 h-3.5', sev.text)} />
            </div>
            <span className={cn('text-[9px] font-bold tracking-[0.2em] uppercase', sev.text)}>Detected Issue</span>
          </div>
          <h3 className="text-sm font-semibold text-foreground/90 mb-2 leading-snug">{scenario.issue.title}</h3>
          <p className="text-xs text-muted-foreground/60 leading-relaxed mb-3">{scenario.issue.description}</p>
          <div className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono', sev.bg, sev.border, sev.text)}>
            <div className={cn('w-1 h-1 rounded-full', sev.dot)} />
            {scenario.issue.signal} · {scenario.issue.metric}
          </div>
        </div>

        {/* Center: AI Recommendation */}
        <div className="p-5 lg:p-6 relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-primary/8">
              <Lightbulb className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-primary">AI Recommendation</span>
          </div>
          <h3 className="text-sm font-semibold text-foreground/90 mb-2 leading-snug">{scenario.recommendation.title}</h3>
          <p className="text-xs text-muted-foreground/60 leading-relaxed mb-2">{scenario.recommendation.description}</p>
          <p className="text-[10px] text-primary/50 italic mb-3">Recommended improvement identified based on user behavior analysis.</p>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-muted/30 border border-border/20 text-[10px] text-muted-foreground/70">{scenario.recommendation.type}</span>
            <span className="px-2 py-0.5 rounded-full bg-muted/30 border border-border/20 text-[10px] text-muted-foreground/70">Effort: {scenario.recommendation.effort}</span>
          </div>
        </div>

        {/* Right: Simulation Impact */}
        <div className="p-5 lg:p-6 relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-400" />
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-emerald-400/8">
              <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-emerald-400">Simulation Impact</span>
          </div>
          <p className="text-[10px] text-muted-foreground/45 mb-3 leading-relaxed">If implemented, the predicted result would be:</p>
          <div className="space-y-2.5">
            {IMPACT_METRICS.map(m => {
              const Icon = m.icon;
              const value = scenario.simulation[m.key];
              return (
                <div key={m.key}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <Icon className="w-3 h-3 text-muted-foreground/40" />
                      <span className="text-[10px] text-muted-foreground/60">{m.label}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-foreground/80">+{value}%</span>
                  </div>
                  <div className="h-1 bg-muted/25 rounded-full overflow-hidden">
                    <div className={cn('h-full rounded-full transition-all duration-1000', m.color)} style={{ width: `${value}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decision footer */}
      <div className="px-5 lg:px-6 py-3.5 border-t border-border/15 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse-soft" />
            <span className="text-[10px] text-muted-foreground/50">Confidence</span>
          </div>
          <span className="text-xs font-mono font-bold text-primary">{scenario.simulation.confidence}%</span>
        </div>
        <div className="flex items-center gap-2">
          {isSubmitted ? (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/30">
              <CheckCircle className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary">Submitted for Review</span>
            </div>
          ) : (
            <button onClick={handleSubmit} disabled={submitting} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed">
              {submitting ? (
                <><Loader2 className="w-3 h-3 animate-spin" /> Submitting...</>
              ) : (
                <>Submit for Review <ChevronRight className="w-3 h-3" /></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}