import { useRef, useState, useEffect, useCallback } from 'react';
import { nodes, edges } from './networkData';
import { AlertTriangle } from 'lucide-react';

const RISK_COLORS = {
  low:      { fill: 'hsl(210,100%,58%)',  glow: 'hsl(210,100%,58%,0.25)',  label: '#60a5fa' },
  medium:   { fill: 'hsl(45,90%,55%)',    glow: 'hsl(45,90%,55%,0.25)',    label: '#fbbf24' },
  high:     { fill: 'hsl(25,90%,55%)',    glow: 'hsl(25,90%,55%,0.25)',    label: '#fb923c' },
  critical: { fill: 'hsl(0,72%,55%)',     glow: 'hsl(0,72%,55%,0.4)',      label: '#f87171' },
};

function getCongestionColor(c) {
  if (c > 0.8) return 'hsl(0,72%,55%)';
  if (c > 0.55) return 'hsl(45,90%,55%)';
  return 'hsl(210,100%,58%)';
}

function lerp(a, b, t) { return a + (b - a) * t; }

export default function NetworkCanvas({ onNodeSelect, selectedNode }) {
  const svgRef = useRef(null);
  const [dims, setDims] = useState({ w: 800, h: 600 });
  const [hovered, setHovered] = useState(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [tick, setTick] = useState(0);
  const panRef = useRef(pan);
  panRef.current = pan;

  useEffect(() => {
    let frame;
    const animate = () => { setTick(t => t + 1); frame = requestAnimationFrame(animate); };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setDims({ w: width, h: height });
    });
    if (svgRef.current?.parentElement) obs.observe(svgRef.current.parentElement);
    return () => obs.disconnect();
  }, []);

  const getNodePos = useCallback((node) => ({
    x: node.x * dims.w,
    y: node.y * dims.h,
  }), [dims]);

  const handleWheel = (e) => {
    e.preventDefault();
    setZoom(z => Math.min(3, Math.max(0.4, z - e.deltaY * 0.001)));
  };

  const handleMouseDown = (e) => {
    if (e.target.closest('.node-group')) return;
    setDragging(true);
    setDragStart({ x: e.clientX - panRef.current.x, y: e.clientY - panRef.current.y });
  };

  const handleMouseMove = (e) => {
    if (!dragging || !dragStart) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => { setDragging(false); setDragStart(null); };

  const t = tick * 0.012;

  const hoveredNode = nodes.find(n => n.id === hovered);
  const showTooltip = hoveredNode && hoveredNode.risk === 'critical' && hoveredNode.attentionReasons;
  const tooltipPos = hoveredNode ? {
    left: pan.x + hoveredNode.x * dims.w * zoom,
    top: pan.y + hoveredNode.y * dims.h * zoom,
  } : null;

  return (
    <div className="relative w-full h-full">
    <svg
      ref={svgRef}
      width="100%" height="100%"
      style={{ cursor: dragging ? 'grabbing' : 'grab' }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <defs>
        {nodes.map(n => {
          const col = RISK_COLORS[n.risk];
          return (
            <radialGradient key={`rg-${n.id}`} id={`rg-${n.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={col.fill} stopOpacity="0.22" />
              <stop offset="100%" stopColor={col.fill} stopOpacity="0" />
            </radialGradient>
          );
        })}
        <filter id="glow-soft">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-strong">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="hsl(210,100%,58%)" fillOpacity="0.4" />
        </marker>
      </defs>

      <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>
        {/* Background grid */}
        <g opacity="0.035">
          {Array.from({ length: 20 }, (_, i) => (
            <line key={`gh-${i}`} x1={0} y1={i * dims.h / 19} x2={dims.w} y2={i * dims.h / 19}
              stroke="hsl(210,20%,80%)" strokeWidth="1" />
          ))}
          {Array.from({ length: 20 }, (_, i) => (
            <line key={`gv-${i}`} x1={i * dims.w / 19} y1={0} x2={i * dims.w / 19} y2={dims.h}
              stroke="hsl(210,20%,80%)" strokeWidth="1" />
          ))}
        </g>

        {/* Edges */}
        {edges.map((edge, i) => {
          const from = nodes.find(n => n.id === edge.from);
          const to = nodes.find(n => n.id === edge.to);
          if (!from || !to) return null;
          const fp = getNodePos(from);
          const tp = getNodePos(to);
          const col = getCongestionColor(edge.congestion);
          const isHighlighted = hovered === from.id || hovered === to.id || selectedNode === from.id || selectedNode === to.id;
          const alpha = isHighlighted ? 0.7 : 0.2;
          const strokeW = edge.congestion > 0.7 ? 2 : 1;

          // Animated particle along edge
          const particleT = (t * (0.5 + edge.congestion) + i * 0.4) % 1;
          const px = lerp(fp.x, tp.x, particleT);
          const py = lerp(fp.y, tp.y, particleT);

          return (
            <g key={`edge-${i}`}>
              <line
                x1={fp.x} y1={fp.y} x2={tp.x} y2={tp.y}
                stroke={col} strokeWidth={strokeW} strokeOpacity={alpha}
                strokeDasharray={edge.congestion > 0.75 ? '4 4' : 'none'}
                markerEnd="url(#arrow)"
              />
              {isHighlighted && (
                <circle cx={px} cy={py} r={2.5} fill={col} opacity={0.9} filter="url(#glow-soft)" />
              )}
              {edge.congestion > 0.75 && (
                <circle cx={px} cy={py} r={2} fill={col} opacity={0.6} />
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map(node => {
          const pos = getNodePos(node);
          const col = RISK_COLORS[node.risk];
          const isHov = hovered === node.id;
          const isSel = selectedNode === node.id;
          const pulseR = node.size * (1 + 0.08 * Math.sin(t * 2 + node.x * 5));
          const outerR = node.size * 1.6;

          return (
            <g
              key={node.id}
              className="node-group"
              transform={`translate(${pos.x},${pos.y})`}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onNodeSelect(node.id === selectedNode ? null : node.id)}
            >
              {/* Outer halo */}
              <circle r={outerR} fill={`url(#rg-${node.id})`} opacity={isHov || isSel ? 1 : 0.5} />

              {/* Pulse ring */}
              {(node.risk === 'critical' || node.risk === 'high') && (
                <circle
                  r={pulseR * 0.85}
                  fill="none"
                  stroke={col.fill}
                  strokeWidth="1"
                  strokeOpacity={0.25 + 0.15 * Math.sin(t * 3)}
                />
              )}

              {/* Activity arc */}
              <circle
                r={node.size * 0.78}
                fill="none"
                stroke={col.fill}
                strokeWidth="1.5"
                strokeOpacity={0.15}
                strokeDasharray={`${2 * Math.PI * node.size * 0.78 * node.activity / 100} 999`}
                transform="rotate(-90)"
              />

              {/* Core */}
              <circle
                r={node.size * 0.58}
                fill="hsl(222,22%,9%)"
                stroke={col.fill}
                strokeWidth={isSel ? 2 : 1.5}
                strokeOpacity={isSel ? 1 : 0.6}
                filter={isHov || isSel ? 'url(#glow-soft)' : undefined}
              />

              {/* Pressure fill */}
              <circle
                r={node.size * 0.46}
                fill={col.fill}
                fillOpacity={0.06 + (node.pressure / 100) * 0.1}
              />

              {/* Label */}
              <text
                y={-3} textAnchor="middle"
                fontSize={node.size > 44 ? 11 : 10}
                fontWeight="600"
                fontFamily="Inter, sans-serif"
                fill={col.label}
                opacity={0.95}
              >{node.label}</text>
              <text
                y={10} textAnchor="middle"
                fontSize={8.5}
                fontFamily="Inter, sans-serif"
                fill="hsl(215,15%,55%)"
              >{node.sub}</text>

              {/* Pressure indicator */}
              <text
                y={node.size * 0.58 + 14} textAnchor="middle"
                fontSize={9}
                fontFamily="JetBrains Mono, monospace"
                fill={col.label}
                opacity={0.7}
              >{node.pressure}%</text>

              {/* Critical badge */}
              {node.risk === 'critical' && (
                <circle cx={node.size * 0.45} cy={-node.size * 0.45} r={5} fill="hsl(0,80%,50%)" stroke="hsl(222,22%,9%)" strokeWidth="1.5">
                  <animate attributeName="opacity" values="1;0.4;1" dur="1.2s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        })}
      </g>

      {/* Zoom hint */}
      <text x="16" y={dims.h - 12} fontSize="10" fill="hsl(215,15%,40%)" fontFamily="Inter, sans-serif">
        Scroll to zoom · Drag to pan · Click node to inspect
      </text>
    </svg>

    {showTooltip && tooltipPos && (
      <div
        className="absolute z-30 pointer-events-none"
        style={{
          left: hoveredNode.x > 0.65 ? tooltipPos.left - 240 : tooltipPos.left + 20,
          top: tooltipPos.top,
          transform: 'translateY(-50%)',
        }}
      >
        <div className="glass-panel rounded-xl p-3 w-[220px] shadow-2xl border-red-500/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span className="text-[10px] font-bold tracking-wider uppercase text-red-400">Attention Required</span>
          </div>
          <p className="text-[10px] text-muted-foreground/60 mb-2">AI detected the following issues:</p>
          <div className="space-y-1.5">
            {hoveredNode.attentionReasons.map((reason, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <div className="w-1 h-1 rounded-full bg-red-400 mt-1.5 shrink-0" />
                <span className="text-[10px] text-foreground/75 leading-relaxed">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
    </div>
  );
}