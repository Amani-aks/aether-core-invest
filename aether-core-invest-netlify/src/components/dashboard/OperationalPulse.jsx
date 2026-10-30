import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Activity, Users, Gauge, TrendingUp, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const generateData = () => Array.from({ length: 24 }, (_, i) => ({
  t: `${String(i).padStart(2, '0')}:00`,
  activeUsers: Math.round(40 + Math.sin(i / 3) * 25 + Math.random() * 12),
  workflowActivity: Math.round(30 + Math.cos(i / 4) * 20 + Math.random() * 8),
  productivity: Math.round(70 + Math.sin(i / 5) * 15 + Math.random() * 6),
}));

const metrics = [
  { icon: Users, label: 'Active Users', value: '2,847', change: '+12.4%', positive: true },
  { icon: Activity, label: 'Workflows', value: '342', change: '+8.1%', positive: true },
  { icon: TrendingUp, label: 'Productivity', value: '94.7', change: '+2.3%', positive: true },
  { icon: CheckCircle, label: 'Completion', value: '91%', change: '+4.0%', positive: true },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-panel rounded-xl p-3 border-border/40 shadow-xl text-[11px]">
      <p className="text-muted-foreground/60 font-mono mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-muted-foreground/70 capitalize">{p.dataKey}</span>
          <span className="font-semibold text-foreground/85 ml-auto pl-3">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function OperationalPulse() {
  const [data] = useState(generateData);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="glass-panel rounded-2xl p-5 intelligence-glow relative overflow-hidden">
      {/* Ambient top glow */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-primary/4 to-transparent pointer-events-none" />

      <div className="flex items-center justify-between mb-5 relative">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-primary/70" />
            <h2 className="text-sm font-semibold text-foreground/90 tracking-wide">Operational Pulse</h2>
          </div>
          <p className="text-[11px] text-muted-foreground/50 tracking-wide">24-hour user activity and productivity stream</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 glass-panel rounded-lg px-2.5 py-1.5 border-border/25">
            <div className="flex gap-1 items-end h-3.5">
              {[3, 5, 4, 6, 5, 7, 5].map((h, i) => (
                <div
                  key={i}
                  className="w-0.5 bg-primary/60 rounded-full transition-all duration-500"
                  style={{ height: `${h * (tick % 2 === 0 ? 1 : 0.85)}px` }}
                />
              ))}
            </div>
            <span className="text-[10px] text-emerald-400 font-medium">LIVE</span>
          </div>
        </div>
      </div>

      <div className="h-[168px] -mx-1 mb-4 relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(210,100%,58%)" stopOpacity={0.35} />
                <stop offset="60%" stopColor="hsl(210,100%,58%)" stopOpacity={0.08} />
                <stop offset="100%" stopColor="hsl(210,100%,58%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(160,60%,45%)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="hsl(160,60%,45%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="pressGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(45,90%,55%)" stopOpacity={0.15} />
                <stop offset="100%" stopColor="hsl(45,90%,55%)" stopOpacity={0} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <XAxis dataKey="t" hide />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="workflowActivity" stroke="hsl(45,90%,55%)" fill="url(#pressGrad)" strokeWidth={1} dot={false} strokeOpacity={0.5} />
            <Area type="monotone" dataKey="productivity" stroke="hsl(160,60%,45%)" fill="url(#healthGrad)" strokeWidth={1.5} dot={false} strokeOpacity={0.7} />
            <Area type="monotone" dataKey="activeUsers" stroke="hsl(210,100%,58%)" fill="url(#actGrad)" strokeWidth={2} dot={false} filter="url(#glow)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 px-1">
        {[
          { color: 'bg-primary', label: 'Active Users' },
          { color: 'bg-emerald-400', label: 'Productivity' },
          { color: 'bg-amber-400', label: 'Workflow Activity' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={cn('w-5 h-0.5 rounded-full', color)} />
            <span className="text-[9.5px] text-muted-foreground/45">{label}</span>
          </div>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {metrics.map(({ icon: Icon, label, value, change, positive }) => (
          <div key={label} className="bg-muted/20 rounded-xl p-3.5 border border-border/20 hover:border-border/40 transition-all duration-300 group">
            <div className="flex items-center gap-1.5 mb-2.5">
              <Icon className="w-3 h-3 text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors" />
              <span className="text-[9.5px] text-muted-foreground/40 tracking-[0.15em] uppercase font-medium group-hover:text-muted-foreground/55 transition-colors">{label}</span>
            </div>
            <p className="text-[15px] font-bold text-foreground/90 font-mono leading-none">{value}</p>
            <p className={cn('text-[10px] mt-1.5 font-medium', positive ? 'text-emerald-400' : 'text-red-400')}>{change}</p>
          </div>
        ))}
      </div>
    </div>
  );
}