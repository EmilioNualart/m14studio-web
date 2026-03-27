"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Film, Shirt, Building2, BookOpen, Music, Sparkles } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { VaporizeAnimationText } from "@/components/ui/vaporize-animation-text";

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

      gsap.to(".servicios-label", {
        opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
        scrollTrigger: st,
      });

      gsap.to(".servicios-word", {
        opacity: 1, y: 0, rotateX: 0,
        duration: 0.7, ease: "power3.out",
        stagger: 0.06, delay: 0.15,
        scrollTrigger: st,
      });

      gsap.to(".orbital-wrapper", {
        opacity: 1, scale: 1, filter: "blur(0px)",
        duration: 1.4, ease: "back.out(1.2)", delay: 0.5,
        scrollTrigger: st,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="servicios" ref={sectionRef}>
      <div className="container" style={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        <div style={{ textAlign: "center" }}>
          <div className="label servicios-label">Servicios</div>
          <VaporizeAnimationText
            texts={[
              "Producción Publicitaria",
              "Moda & Lifestyle",
              "Contenido Corporativo",
              "Documentales",
              "Cobertura de Eventos",
              "Post-Producción & VFX",
            ]}
          />
          <h2 style={{ marginTop: "1rem", maxWidth: 800, marginLeft: "auto", marginRight: "auto", perspective: "600px" }}>
            {titleWords.map((word, i) => (
              <span key={i} className="servicios-word">{word}</span>
            ))}
          </h2>
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
