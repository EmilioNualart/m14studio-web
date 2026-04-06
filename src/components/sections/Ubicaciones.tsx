"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe } from "@/components/ui/cobe-globe";

gsap.registerPlugin(ScrollTrigger);

export default function Ubicaciones() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const ubTrigger = { trigger: ".ubicaciones-section", start: "top 75%" };

      gsap.to(".ub-label", {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: ubTrigger,
      });

      gsap.to(".ub-title", {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        delay: 0.15,
        scrollTrigger: ubTrigger,
      });

      gsap.utils.toArray<HTMLElement>(".ub-city").forEach((city, i) => {
        gsap.fromTo(
          city,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.4 + i * 0.1,
            scrollTrigger: ubTrigger,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="ubicaciones-section" id="ubicacionesSection" ref={sectionRef}>
      <div className="ubicaciones-content">
        <div className="ub-label">Presencia</div>
        <h2 className="ub-title">Productora audiovisual en Santiago y Barcelona</h2>
        <div className="ub-globe-wrapper" style={{ opacity: 1 }}>
          <Globe
            markers={[
              { id: "santiago", location: [-33.45, -70.66], label: "Santiago" },
              { id: "barcelona", location: [41.39, 2.15], label: "Barcelona" },
            ]}
            arcs={[
              { id: "route", from: [-33.45, -70.66], to: [41.39, 2.15] },
            ]}
            baseColor={[1, 1, 1]}
            markerColor={[0.3, 0.45, 0.85]}
            glowColor={[0.94, 0.93, 0.91]}
            arcColor={[0.3, 0.45, 0.85]}
            dark={0}
            diffuse={1.2}
            mapSamples={16000}
            mapBrightness={10}
            markerSize={0.025}
            arcWidth={0.5}
            arcHeight={0.3}
            speed={0.003}
            theta={0.2}
          />
        </div>
        <div className="ub-cities">
          <div className="ub-city">
            <div className="ub-city-name">Santiago</div>
            <div className="ub-city-country">Chile</div>
            <div className="ub-city-coords">Francisco de Aguirre 3630</div>
          </div>
          <div className="ub-city">
            <div className="ub-city-name">Barcelona</div>
            <div className="ub-city-country">España</div>
            <div className="ub-city-coords">41°23&apos;N · 2°10&apos;E</div>
          </div>
        </div>
      </div>
    </section>
  );
}
