"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Film, Shirt, Building2, BookOpen, Music, Sparkles } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

gsap.registerPlugin(ScrollTrigger);

const serviciosTimeline = [
  {
    id: 1,
    title: "Producción Publicitaria",
    date: "01",
    content: "Desarrollamos campañas cinematográficas de alto impacto, desde la conceptualización creativa y el guion hasta el rodaje y la post-producción final, para marcas que buscan destacar.",
    category: "Producción",
    icon: Film,
    relatedIds: [2, 6],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Moda & Lifestyle",
    date: "02",
    content: "Producimos contenido editorial, lookbooks y campañas de moda con dirección de arte cuidada al detalle, creando piezas visuales que elevan la identidad de cada marca.",
    category: "Moda",
    icon: Shirt,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 3,
    title: "Contenido Corporativo",
    date: "03",
    content: "Creamos videos institucionales, reportajes internos y piezas de comunicación corporativa que transmiten los valores y la cultura de tu empresa con calidad cinematográfica.",
    category: "Corporativo",
    icon: Building2,
    relatedIds: [2, 4],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 4,
    title: "Documentales",
    date: "04",
    content: "Contamos historias reales con sensibilidad cinematográfica. Desde la investigación y el guion hasta la dirección y edición, damos vida a narrativas que conectan con la audiencia.",
    category: "Documentales",
    icon: BookOpen,
    relatedIds: [3, 5],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 5,
    title: "Cobertura de Eventos",
    date: "05",
    content: "Cubrimos festivales, conciertos, conferencias y eventos corporativos con producción multi-cámara, capturando cada momento clave con un enfoque dinámico y profesional.",
    category: "Eventos",
    icon: Music,
    relatedIds: [4, 6],
    status: "completed" as const,
    energy: 80,
  },
  {
    id: 6,
    title: "Post-Producción & VFX",
    date: "06",
    content: "Llevamos cada proyecto al siguiente nivel con color grading cinematográfico, motion graphics, diseño sonoro y efectos visuales que potencian el resultado final.",
    category: "Post",
    icon: Sparkles,
    relatedIds: [5, 1],
    status: "completed" as const,
    energy: 90,
  },
];

const titleWords = "Producción audiovisual completa desde la idea hasta la entrega final".split(" ");

export default function Servicios() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const st = {
        trigger: "#servicios",
        start: "top 70%",
        toggleActions: "play none none none",
      };

      // 1. Lines draw outward from center
      gsap.to(".servicios-line-left", {
        scaleX: 1, opacity: 1, duration: 0.8, ease: "power3.inOut",
        scrollTrigger: st,
      });
      gsap.to(".servicios-line-right", {
        scaleX: 1, opacity: 1, duration: 0.8, ease: "power3.inOut",
        scrollTrigger: st,
      });

      // 2. Label scales up and fades in
      gsap.to(".servicios-label", {
        opacity: 1, y: 0, scale: 1, letterSpacing: "0.25em",
        duration: 0.8, ease: "power3.out", delay: 0.2,
        scrollTrigger: st,
      });

      // 3. Each word reveals with clip-path mask + blur + 3D rotation
      gsap.utils.toArray<HTMLElement>(".servicios-word").forEach((word, i) => {
        gsap.to(word, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          filter: "blur(0px)",
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "power4.out",
          delay: 0.4 + i * 0.08,
          scrollTrigger: st,
        });
      });

      // 4. Accent line below title draws in
      gsap.to(".servicios-accent", {
        scaleX: 1, opacity: 1, duration: 1, ease: "power3.inOut", delay: 1,
        scrollTrigger: st,
      });

      // 5. Orbital fades in
      gsap.to(".orbital-wrapper", {
        opacity: 1, scale: 1, filter: "blur(0px)",
        duration: 1.4, ease: "back.out(1.2)", delay: 0.8,
        scrollTrigger: st,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="servicios" ref={sectionRef}>
      <div className="container" style={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        <div style={{ textAlign: "center" }}>
          <div className="servicios-label-row">
            <span className="servicios-line-left" />
            <div className="label servicios-label">Servicios</div>
            <span className="servicios-line-right" />
          </div>
          <h2 style={{ marginTop: "1.5rem", maxWidth: 800, marginLeft: "auto", marginRight: "auto", perspective: "800px" }}>
            {titleWords.map((word, i) => (
              <span key={i} className="servicios-word">{word}</span>
            ))}
          </h2>
          <div className="servicios-accent" />
        </div>

        <div
          className="orbital-wrapper"
          style={{ width: "100%", height: "700px", marginTop: "2rem" }}
        >
          <RadialOrbitalTimeline timelineData={serviciosTimeline} />
        </div>
      </div>
    </section>
  );
}
