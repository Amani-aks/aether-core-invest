import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, Cell, YAxis } from 'recharts';
import { GitBranch, AlertTriangle } from 'lucide-react';

const congestionData = [
  { area: 'Portfolio',   intensity: 82, approvals: 8 },
  { area: 'Approvals',   intensity: 94, approvals: 14 },
  { area: 'CRM',         intensity: 56, approvals: 3 },
  { area: 'Documents',   intensity: 71, approvals: 6 },
  { area: 'Reports',     intensity: 38, approvals: 2 },
  { area: 'Deal Mgmt',   intensity: 67, approvals: 5 },
];

const getBarColor = (v) => v > 85 ? 'hsl(0,72%,58%)' : v > 65 ? 'hsl(45,90%,58%)' : 'hsl(210,100%,62%)';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-panel rounded-xl px-3.5 py-3 border-border/50 shadow-xl text-xs">
      <p className="font-semibold text-foreground/90 mb-1.5">{label}</p>
      <p className="text-muted-foreground">Traffic: <span className="font-mono font-bold text-foreground">{payload[0]?.value}%</span></p>
    </div>
  );
};

export default function WorkflowCongestion() {
  const criticalCount = congestionData.filter(d => d.intensity > 85).length;
  const totalApprovals = congestionData.reduce((s, d) => s + d.approvals, 0);

  return (
    <div className="glass-panel rounded-2xl p-6 relative overflow-hidden intelligence-glow">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-amber-400/4 to-transparent pointer-events-none" />

      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-400/10 border border-amber-400/20">
            <GitBranch className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h2 className="text-[15px] font-semibold text-foreground tracking-wide">Module Traffic Intensity</h2>
            <p className="text-xs text-muted-foreground mt-0.5">User activity concentration by module</p>
          </div>
        </div>
        {criticalCount > 0 && (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-500/8 border border-red-500/20">
            <AlertTriangle className="w-3 h-3 text-red-400" />
            <span className="text-[10px] text-red-400 font-semibold">{criticalCount} bottleneck</span>
          </div>
        )}
      </div>

      <div className="h-[190px] -mx-1 mb-5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={congestionData} barSize={22} barGap={4}>
            <XAxis
              dataKey="area"
              tick={{ fontSize: 10, fill: 'hsl(215,20%,62%)', fontFamily: 'Inter' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide domain={[0, 110]} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(222,20%,16%,0.4)', radius: 6 }} />
            <Bar dataKey="intensity" radius={[6, 6, 2, 2]}>
              {congestionData.map((entry, i) => (
                <Cell key={i} fill={getBarColor(entry.intensity)} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border/30">
        <div className="flex items-center gap-4">
          {[
            { color: 'bg-red-400', label: 'Bottleneck (>85%)' },
            { color: 'bg-amber-400', label: 'High Traffic (>65%)' },
            { color: 'bg-primary', label: 'Active' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${color}`} />
              <span className="text-[10px] text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-foreground/80">{totalApprovals}</span>
          <span className="text-[10px] text-muted-foreground ml-1">pending approvals</span>
        </div>
      </div>
    </div>
  );
}