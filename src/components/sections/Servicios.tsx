"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Film, Shirt, Building2, BookOpen, Music, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const servicios = [
  {
    icon: Film,
    title: "Producción Publicitaria",
    description:
      "Campañas cinematográficas de alto impacto, desde la conceptualización creativa hasta la post-producción final.",
  },
  {
    icon: Shirt,
    title: "Moda & Lifestyle",
    description:
      "Contenido editorial, lookbooks y campañas de moda con dirección de arte cuidada al detalle.",
  },
  {
    icon: Building2,
    title: "Contenido Corporativo",
    description:
      "Videos institucionales y piezas de comunicación que transmiten los valores de tu empresa con calidad cinematográfica.",
  },
  {
    icon: BookOpen,
    title: "Documentales",
    description:
      "Historias reales con sensibilidad cinematográfica. Narrativas que conectan con la audiencia.",
  },
  {
    icon: Music,
    title: "Cobertura de Eventos",
    description:
      "Festivales, conciertos y eventos corporativos con producción multi-cámara y un enfoque dinámico.",
  },
  {
    icon: Sparkles,
    title: "Post-Producción & VFX",
    description:
      "Color grading, motion graphics, diseño sonoro y efectos visuales que potencian el resultado final.",
  },
];

const titleWords =
  "Producción audiovisual completa desde la idea hasta la entrega final".split(
    " "
  );

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

      gsap.to(".servicios-line-left", {
        scaleX: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power3.inOut",
        scrollTrigger: st,
      });
      gsap.to(".servicios-line-right", {
        scaleX: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power3.inOut",
        scrollTrigger: st,
      });

      gsap.to(".servicios-label", {
        opacity: 1,
        y: 0,
        scale: 1,
        letterSpacing: "0.25em",
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: st,
      });

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

      gsap.to(".servicios-accent", {
        scaleX: 1,
        opacity: 1,
        duration: 1,
        ease: "power3.inOut",
        delay: 1,
        scrollTrigger: st,
      });

      gsap.utils
        .toArray<HTMLElement>(".servicio-card")
        .forEach((card, i) => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.6 + i * 0.1,
            scrollTrigger: st,
          });
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="servicios" ref={sectionRef}>
      <div
        className="container"
        style={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}
      >
        <div style={{ textAlign: "center" }}>
          <div className="servicios-label-row">
            <span className="servicios-line-left" />
            <div className="label servicios-label">Servicios</div>
            <span className="servicios-line-right" />
          </div>
          <h2
            style={{
              marginTop: "1.5rem",
              maxWidth: 800,
              marginLeft: "auto",
              marginRight: "auto",
              perspective: "800px",
            }}
          >
            {titleWords.map((word, i) => (
              <span key={i} className="servicios-word">
                {word}
              </span>
            ))}
          </h2>
          <div className="servicios-accent" />
        </div>

        <div className="servicios-grid">
          {servicios.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="servicio-card">
                <div className="servicio-card-icon">
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <h3 className="servicio-card-title">{s.title}</h3>
                <p className="servicio-card-desc">{s.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
