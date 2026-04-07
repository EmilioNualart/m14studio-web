"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: LucideIcon;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeElsRef = useRef<Record<number, HTMLDivElement | null>>({});
  const angleRef = useRef(0);
  const autoRotateRef = useRef(true);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
    setIsMobileView(window.innerWidth < 768);
  }, []);

  // Direct DOM manipulation for rotation - no React re-renders
  useEffect(() => {
    if (!mounted) return;

    const isMobile = window.innerWidth < 768;
    const radius = isMobile ? 130 : 280;
    const total = timelineData.length;
    let lastTime = 0;

    const tick = (time: number) => {
      if (autoRotateRef.current) {
        if (lastTime) {
          const delta = time - lastTime;
          angleRef.current = (angleRef.current + delta * 0.006) % 360;
        }
        lastTime = time;
      } else {
        lastTime = 0;
      }

      // Update each node position directly via DOM
      for (let i = 0; i < total; i++) {
        const item = timelineData[i];
        const el = nodeElsRef.current[item.id];
        if (!el) continue;

        const a = ((i / total) * 360 + angleRef.current) % 360;
        const rad = (a * Math.PI) / 180;
        const x = radius * Math.cos(rad);
        const y = radius * Math.sin(rad);
        const opacity = Math.max(0.4, 0.4 + 0.6 * ((1 + Math.sin(rad)) / 2));
        const z = Math.round(100 + 50 * Math.cos(rad));

        el.style.transform = `translate(${x}px, ${y}px)`;
        el.style.zIndex = String(z);
        el.style.opacity = String(opacity);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mounted, timelineData]);

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const centerViewOnNode = useCallback((nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const total = timelineData.length;
    const targetAngle = (nodeIndex / total) * 360;
    angleRef.current = 270 - targetAngle;
  }, [timelineData]);

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = {};
      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        autoRotateRef.current = false;

        const related = getRelatedItems(id);
        const pulse: Record<number, boolean> = {};
        related.forEach((relId) => { pulse[relId] = true; });
        setPulseEffect(pulse);

        centerViewOnNode(id);

        // Override opacity/zIndex for expanded node
        const el = nodeElsRef.current[id];
        if (el) {
          el.style.opacity = "1";
          el.style.zIndex = "200";
        }
      } else {
        setActiveNodeId(null);
        autoRotateRef.current = true;
        setPulseEffect({});
      }

      return newState;
    });
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      autoRotateRef.current = true;
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: "1000px" }}
        >
          {/* Center nucleus */}
          <div className="absolute w-16 h-16 rounded-full animate-pulse flex items-center justify-center z-10" style={{ background: "linear-gradient(135deg, #7A0012, #a8192e, #4a000b)" }}>
            <div className="absolute w-20 h-20 rounded-full border border-white/20 animate-ping opacity-70" />
            <div className="absolute w-24 h-24 rounded-full border border-white/10 animate-ping opacity-50" style={{ animationDelay: "0.5s" }} />
            <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md" />
          </div>

          {/* Orbit ring */}
          <div className="absolute rounded-full border border-white/10" style={{ width: isMobileView ? 260 : 560, height: isMobileView ? 260 : 560 }} />

          {/* Nodes */}
          {mounted && timelineData.map((item) => {
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => { nodeElsRef.current[item.id] = el; }}
                className="absolute cursor-pointer"
                style={{ willChange: "transform" }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${isPulsing ? "animate-pulse duration-1000" : ""}`}
                  style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                />

                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${isExpanded ? "bg-white text-black border-white shadow-lg shadow-white/30 scale-150" : isRelated ? "bg-white/50 text-black border-white animate-pulse" : "bg-black text-white border-white/40"}
                  `}
                >
                  <Icon size={16} strokeWidth={2} />
                </div>

                <div
                  className={`absolute top-12 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300 ${isExpanded ? "text-white scale-125" : "text-white/70"}`}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <div
                    style={{
                      position: "absolute",
                      top: 80,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 260,
                      background: "rgba(10, 10, 10, 0.95)",
                      backdropFilter: "blur(16px)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: 12,
                      padding: "16px",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                      zIndex: 300,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", width: 1, height: 12, background: "rgba(255,255,255,0.3)" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.05em", padding: "2px 8px", borderRadius: 20, background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}>
                        {item.date}
                      </span>
                    </div>
                    <h4 style={{ fontSize: 14, fontWeight: 600, color: "#fff", margin: "8px 0 6px" }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.5, margin: 0 }}>
                      {item.content}
                    </p>

                    {item.relatedIds.length > 0 && (
                      <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
                          Otros servicios
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                          {item.relatedIds.map((relatedId) => {
                            const relatedItem = timelineData.find((i) => i.id === relatedId);
                            return (
                              <button
                                key={relatedId}
                                style={{
                                  fontSize: 11,
                                  color: "rgba(255,255,255,0.7)",
                                  background: "rgba(255,255,255,0.05)",
                                  border: "1px solid rgba(255,255,255,0.15)",
                                  borderRadius: 4,
                                  padding: "3px 8px",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 4,
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleItem(relatedId);
                                }}
                              >
                                {relatedItem?.title}
                                <ArrowRight size={8} style={{ opacity: 0.5 }} />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
