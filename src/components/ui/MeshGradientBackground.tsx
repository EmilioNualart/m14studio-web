"use client";

import { useEffect, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

export default function MeshGradientBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          background: "#0a0a0a",
        }}
      />
    );
  }

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
