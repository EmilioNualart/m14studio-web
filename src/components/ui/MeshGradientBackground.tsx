"use client";

import { MeshGradient } from "@paper-design/shaders-react";

export default function MeshGradientBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <MeshGradient
        className="w-full h-full"
        colors={["#0a0a0a", "#222222", "#0a0a0a", "#282828"]}
        speed={0.2}
        distortion={0.9}
        swirl={0.1}
        grainMixer={0}
        grainOverlay={0}
      />
    </div>
  );
}
