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

export default function Servicios() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".servicios-header", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: "#servicios", start: "top 75%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="servicios" ref={sectionRef}>
      <div className="container" style={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        <div className="servicios-header" style={{ textAlign: "center" }}>
          <div className="label">Servicios</div>
          <h2 style={{ marginTop: "1rem", maxWidth: 800, marginLeft: "auto", marginRight: "auto" }}>
            Producción audiovisual completa desde la idea hasta la entrega final
          </h2>
        </div>

        <div style={{ width: "100%", height: "600px", marginTop: "2rem" }}>
          <RadialOrbitalTimeline timelineData={serviciosTimeline} />
        </div>
      </div>
    </section>
  );
}
