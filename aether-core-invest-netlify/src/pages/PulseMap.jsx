import { useState } from 'react';
import { Map, Layers } from 'lucide-react';
import NetworkCanvas from '../components/pulsemap/NetworkCanvas';
import NodeDetailPanel from '../components/pulsemap/NodeDetailPanel';
import InsightsStream from '../components/pulsemap/InsightsStream';
import StabilityMetrics from '../components/pulsemap/StabilityMetrics';

const LEGEND = [
  { color: 'bg-primary', label: 'Low Usage', desc: 'Module has limited user interaction' },
  { color: 'bg-amber-400', label: 'Active', desc: 'Module is regularly used' },
  { color: 'bg-orange-400', label: 'High Usage', desc: 'One of the most frequently used areas' },
  { color: 'bg-red-500', label: 'Attention Required', desc: 'AI detected unusual behavior, abandonment, or workflow friction' },
];

export default function PulseMap() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [showInsights, setShowInsights] = useState(true);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <Map className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-semibold tracking-[0.22em] text-primary uppercase">Module Interaction Map</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-1.5">User Activity Map</h1>
          <p className="text-sm text-muted-foreground/55">How users move between modules and workflows</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowInsights(v => !v)}
            className={`flex items-center gap-1.5 text-xs px-4 py-2 rounded-xl border transition-all
              ${showInsights ? 'border-primary/30 bg-primary/8 text-primary' : 'border-border/30 text-muted-foreground/55 hover:text-foreground/80 hover:border-border/50'}`}
          >
            <Layers className="w-3.5 h-3.5" />
            AI Insights
          </button>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-400/8 border border-emerald-400/18">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
            <span className="text-[10px] text-emerald-400 font-semibold tracking-wider">LIVE MONITORING</span>
          </div>
        </div>
      </div>

      {/* Main canvas + sidebar */}
      <div className="flex gap-5 flex-1 min-h-0">

        {/* Network canvas — hero area */}
        <div className="flex-1 floating-surface rounded-2xl relative overflow-hidden min-w-0">
          <NetworkCanvas onNodeSelect={setSelectedNode} selectedNode={selectedNode} />

          {selectedNode && (
            <NodeDetailPanel nodeId={selectedNode} onClose={() => setSelectedNode(null)} />
          )}

          {/* Risk legend */}
          <div className="absolute bottom-5 left-5 flex items-center gap-3 glass-panel rounded-xl px-4 py-2.5">
            {LEGEND.map(({ color, label, desc }) => (
              <div key={label} className="flex items-center gap-1.5" title={desc}>
                <div className={`w-2 h-2 rounded-full ${color}`} />
                <span className="text-[10px] text-muted-foreground/65">{label}</span>
              </div>
            ))}
          </div>

          {/* Map badge */}
          <div className="absolute top-5 left-5 flex items-center gap-1.5 bg-background/55 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-border/35">
            <span className="text-[9px] font-mono text-muted-foreground/55 uppercase tracking-widest">User Activity Network</span>
            <span className="text-[9px] font-mono text-primary/80">v2.4</span>
          </div>
        </div>

        {/* Right intelligence sidebar */}
        {showInsights && (
          <div className="w-[280px] shrink-0 flex flex-col gap-4">
            <div className="floating-surface rounded-2xl p-5 shrink-0">
              <StabilityMetrics />
            </div>
            <div className="floating-surface rounded-2xl p-5 flex-1 overflow-hidden flex flex-col">
              <InsightsStream />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}