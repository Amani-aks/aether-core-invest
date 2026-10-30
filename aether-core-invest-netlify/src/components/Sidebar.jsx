import { Link, useLocation } from 'react-router-dom';
import { Activity, Map, TrendingUp, Cpu, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Activity, label: 'Executive Overview', path: '/', desc: 'Management dashboard' },
  { icon: Map, label: 'User Activity Map', path: '/pulse-map', desc: 'Module interaction map' },
  { icon: Cpu, label: 'UX Intelligence Lab', path: '/ux-intelligence-lab', desc: 'Workflow optimization' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-[72px] lg:w-[228px] h-screen flex flex-col border-r border-border/20 bg-background/50 backdrop-blur-2xl fixed left-0 top-0 z-40" style={{ boxShadow: '20px 0 60px hsl(223,30%,3%,0.3)' }}>
      {/* Top ambient glow */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-4 lg:px-5 border-b border-border/30 relative">
        <div className="relative shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/25 to-primary/5 flex items-center justify-center animate-glow border border-primary/20">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-background shadow-[0_0_8px_hsl(160,60%,45%,0.8)]" />
        </div>
        <div className="hidden lg:block min-w-0">
          <p className="text-sm font-bold tracking-[0.15em] text-foreground/95">ÆTHER X</p>
          <p className="text-[9px] text-muted-foreground/60 tracking-[0.25em] uppercase font-medium">Intelligence Suite</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-2.5 lg:px-3.5 space-y-1 overflow-y-auto relative">
        {/* Section label */}
        <p className="hidden lg:block text-[9px] text-muted-foreground/65 tracking-[0.3em] uppercase font-semibold px-3 mb-3">
          Intelligence
        </p>
        {navItems.map(({ icon: Icon, label, path, desc }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                'flex items-center gap-3 px-3 py-3.5 rounded-xl text-[12.5px] font-medium transition-all duration-300 group relative overflow-hidden',
                active
                  ? 'text-primary'
                  : 'text-muted-foreground/75 hover:text-foreground/95'
              )}
            >
              {/* Active background */}
              {active && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/12 via-primary/6 to-transparent rounded-xl" />
              )}
              {/* Hover background */}
              {!active && (
                <div className="absolute inset-0 bg-gradient-to-r from-muted/0 via-muted/0 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:from-muted/30" />
              )}
              {/* Left accent bar */}
              <div className={cn(
                'absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-r-full transition-all duration-300',
                active
                  ? 'h-8 bg-primary shadow-[0_0_12px_hsl(210,100%,58%,0.8)]'
                  : 'h-0 bg-primary group-hover:h-4 group-hover:opacity-40'
              )} />

              {/* Icon */}
              <div className={cn(
                'relative z-10 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 shrink-0',
                active
                  ? 'bg-primary/15 shadow-[0_0_16px_hsl(210,100%,58%,0.25)]'
                  : 'bg-transparent group-hover:bg-muted/40'
              )}>
                <Icon className={cn(
                  'w-4 h-4 transition-all duration-300',
                  active ? 'text-primary' : 'text-muted-foreground/60 group-hover:text-foreground/80'
                )} />
              </div>

              {/* Label + desc */}
              <div className="hidden lg:flex flex-col min-w-0 relative z-10">
                <span className={cn(
                  'leading-tight tracking-wide whitespace-nowrap transition-colors duration-200',
                  active ? 'text-primary font-semibold' : 'font-medium'
                )}>{label}</span>
                <span className={cn(
                  'text-[9.5px] tracking-wider transition-colors duration-200 mt-0.5',
                  active ? 'text-primary/65' : 'text-muted-foreground/55 group-hover:text-muted-foreground/80'
                )}>{desc}</span>
              </div>

              {/* Active indicator dot */}
              {active && (
                <div className="hidden lg:flex ml-auto items-center relative z-10 shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft shadow-[0_0_10px_hsl(210,100%,58%,0.9)]" />
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* System status bar */}
      <div className="mx-3 mb-3 hidden lg:block">
        <div className="glass-panel rounded-xl p-3 border-border/25">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] text-muted-foreground/70 tracking-[0.2em] uppercase font-semibold">System</span>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse-soft" />
              <span className="text-[9px] text-emerald-400/70 font-medium">Online</span>
            </div>
          </div>
          <div className="space-y-1.5">
            {[{ l: 'AI Engine', v: 94 }, { l: 'Data Feed', v: 100 }, { l: 'Analytics', v: 87 }].map(({ l, v }) => (
              <div key={l} className="flex items-center gap-2">
                <span className="text-[9px] text-muted-foreground/65 w-14 shrink-0">{l}</span>
                <div className="flex-1 h-0.5 bg-muted/30 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary/80 to-primary/40 rounded-full transition-all duration-700" style={{ width: `${v}%` }} />
                </div>
                <span className="text-[9px] font-mono text-muted-foreground/65">{v}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User profile */}
      <div className="p-3.5 lg:px-4 border-t border-border/25 relative">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/8 flex items-center justify-center text-[11px] font-bold text-primary border border-primary/20 shadow-[0_0_14px_hsl(210,100%,58%,0.18)] shrink-0">
            JK
          </div>
          <div className="hidden lg:block min-w-0">
            <p className="text-[11px] font-semibold text-foreground tracking-wide truncate">J. Kovac</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse-soft" />
              <p className="text-[9px] text-emerald-400/90 tracking-wide">Executive Access</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}