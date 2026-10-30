import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import RightPanel from './RightPanel';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* === Ambient Environmental Layer === */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Primary intelligence halo */}
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[1400px] h-[800px] bg-[radial-gradient(ellipse_at_top,hsl(210,100%,62%,0.065),transparent_55%)]" />
        {/* Left warmth */}
        <div className="absolute top-0 left-0 w-[500px] h-full bg-[radial-gradient(ellipse_130%_40%_at_0%_20%,hsl(210,100%,62%,0.03),transparent)]" />
        {/* Right intelligence */}
        <div className="absolute top-0 right-0 w-[480px] h-full bg-[radial-gradient(ellipse_110%_35%_at_100%_15%,hsl(270,60%,60%,0.025),transparent)]" />
        {/* Mid-page core glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse,hsl(210,100%,62%,0.02),transparent_70%)]" />
        {/* Bottom depth */}
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[hsl(223,36%,4%,0.6)] to-transparent" />
        {/* Top-left edge light */}
        <div className="absolute top-16 left-[228px] w-[600px] h-px bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
        {/* Micro grid */}
        <div
          className="absolute inset-0 opacity-[0.014]"
          style={{
            backgroundImage: 'linear-gradient(hsl(210,25%,80%) 1px, transparent 1px), linear-gradient(90deg, hsl(210,25%,80%) 1px, transparent 1px)',
            backgroundSize: '96px 96px',
          }}
        />
        {/* Horizon scan */}
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-scan"
          style={{ top: '28%', animationDelay: '5s' }}
        />
      </div>

      <Sidebar />
      <RightPanel />

      <main className="ml-[72px] lg:ml-[228px] xl:mr-[300px] min-h-screen relative z-10">
        <div className="px-8 py-10 lg:px-10 lg:py-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}