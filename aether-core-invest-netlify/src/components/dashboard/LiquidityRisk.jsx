import { AreaChart, Area, LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FileText, Users, FolderOpen, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const activityData = Array.from({ length: 30 }, (_, i) => ({
  d: i + 1,
  documents: Math.round((72 + Math.sin(i / 4) * 12 + Math.random() * 5) * 10) / 10,
  reports: Math.round((48 + Math.cos(i / 3) * 15 + Math.random() * 8) * 10) / 10,
  crm: Math.round((60 + Math.sin(i / 2.5) * 18 + Math.random() * 6) * 10) / 10,
}));

const indicators = [
  { icon: FolderOpen, label: 'Documents Processed', value: '1,284', status: 'On Track', color: 'text-emerald-400', bg: 'bg-emerald-400/8 border-emerald-400/18' },
  { icon: FileText, label: 'Reports Generated', value: '342', status: 'Active', color: 'text-primary', bg: 'bg-primary/8 border-primary/18' },
  { icon: Users, label: 'CRM Activities', value: '2,108', status: 'High Volume', color: 'text-amber-400', bg: 'bg-amber-400/8 border-amber-400/18' },
  { icon: CheckCircle, label: 'Workflow Completion', value: '94.2%', status: 'Optimal', color: 'text-emerald-400', bg: 'bg-emerald-400/8 border-emerald-400/18' },
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-panel rounded-xl px-3.5 py-3 border-border/50 shadow-xl text-xs space-y-1">
      {payload.map(p => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
          <span className="text-muted-foreground capitalize">{p.dataKey}</span>
          <span className="font-mono font-semibold text-foreground ml-auto pl-3">{p.value?.toFixed(1)}</span>
        </div>
      ))}
    </div>
  );
};

export default function LiquidityRisk() {
  return (
    <div className="glass-panel rounded-2xl p-6 relative overflow-hidden intelligence-glow">
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-primary/4 to-transparent pointer-events-none" />

      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="text-[15px] font-semibold text-foreground tracking-wide">Operational Activity Intelligence</h2>
            <p className="text-xs text-muted-foreground mt-0.5">30-day document, report and CRM throughput</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-400/8 border border-emerald-400/18">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
          <span className="text-[10px] text-emerald-400 font-semibold">Active</span>
        </div>
      </div>

      <div className="h-[145px] -mx-2 mb-5">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={activityData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="docGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(210,100%,62%)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="hsl(210,100%,62%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="d" hide />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="documents" stroke="hsl(210,100%,62%)" fill="url(#docGrad)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="reports" stroke="hsl(160,60%,50%)" strokeWidth={1.5} dot={false} strokeDasharray="4 4" strokeOpacity={0.7} />
            <Line type="monotone" dataKey="crm" stroke="hsl(45,90%,58%)" strokeWidth={1} dot={false} strokeOpacity={0.45} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-5 px-1">
        {[
          { color: 'bg-primary', label: 'Documents' },
          { color: 'bg-emerald-400', label: 'Reports', dashed: true },
          { color: 'bg-amber-400', label: 'CRM' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={cn('w-5 h-0.5 rounded-full', color)} />
            <span className="text-[9.5px] text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {indicators.map(({ icon: Icon, label, value, status, color, bg }) => (
          <div key={label} className={cn('rounded-xl p-3.5 border flex items-start gap-2.5 hover:brightness-110 transition-all duration-200', bg)}>
            <Icon className={cn('w-3.5 h-3.5 mt-0.5 shrink-0', color)} />
            <div>
              <p className="text-[10px] text-muted-foreground font-medium">{label}</p>
              <p className="text-sm font-bold text-foreground mt-0.5">{value}</p>
              <p className={cn('text-[10px] mt-0.5 font-medium', color)}>{status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}