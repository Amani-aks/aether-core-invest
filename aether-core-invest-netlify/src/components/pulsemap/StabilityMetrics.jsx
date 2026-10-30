import { useState, useEffect } from 'react';
import { nodes } from './networkData';
import { cn } from '@/lib/utils';

const SCORE_COLOR = (v) => v >= 80 ? 'text-emerald-400' : v >= 60 ? 'text-amber-400' : 'text-red-400';
const SCORE_BAR = (v) => v >= 80 ? 'bg-emerald-400' : v >= 60 ? 'bg-amber-400' : 'bg-red-400';

export default function StabilityMetrics() {
  const [score, setScore] = useState(71);
  useEffect(() => {
    const interval = setInterval(() => {
      setScore(s => Math.max(55, Math.min(88, s + (Math.random() - 0.5) * 1.5)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const criticalCount = nodes.filter(n => n.risk === 'critical').length;
  const highCount = nodes.filter(n => n.risk === 'high').length;
  const avgPressure = Math.round(nodes.reduce((a, n) => a + n.pressure, 0) / nodes.length);

  const metrics = [
    { label: 'Adoption Score', value: score.toFixed(1), unit: '/100', color: SCORE_COLOR(score) },
    { label: 'Avg Traffic', value: avgPressure, unit: '%', color: avgPressure > 75 ? 'text-red-400' : 'text-amber-400' },
    { label: 'Attention Required', value: criticalCount, unit: ' nodes', color: criticalCount > 0 ? 'text-red-400' : 'text-emerald-400' },
    { label: 'High Usage', value: highCount, unit: ' nodes', color: highCount > 2 ? 'text-amber-400' : 'text-emerald-400' },
  ];

  return (
    <div>
      <p className="text-[10px] font-semibold tracking-widest text-foreground/70 uppercase mb-3">Adoption Monitor</p>

      {/* Radial score */}
      <div className="flex flex-col items-center mb-4">
        <div className="relative w-20 h-20">
          <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
            <circle cx="40" cy="40" r="32" fill="none" stroke="hsl(222,18%,14%)" strokeWidth="6" />
            <circle
              cx="40" cy="40" r="32"
              fill="none"
              stroke={score >= 70 ? 'hsl(160,60%,45%)' : 'hsl(45,90%,55%)'}
              strokeWidth="6"
              strokeDasharray={`${2 * Math.PI * 32 * score / 100} 999`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 1.5s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn('text-lg font-bold', SCORE_COLOR(score))}>{score.toFixed(0)}</span>
            <span className="text-[9px] text-muted-foreground">score</span>
          </div>
        </div>
        <p className={cn('text-[10px] font-medium mt-1', SCORE_COLOR(score))}>
          {score >= 80 ? 'Optimal' : score >= 65 ? 'Active Usage' : 'High Usage'}
        </p>
      </div>

      <div className="space-y-2">
        {metrics.map(({ label, value, unit, color }) => (
          <div key={label} className="flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">{label}</span>
            <span className={cn('font-mono font-semibold', color)}>{value}<span className="text-muted-foreground font-normal text-[9px]">{unit}</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}