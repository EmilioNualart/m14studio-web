"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fundadores } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function SobreNosotros() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    const ctx = gsap.context(() => {
      // Manifiesto scrub text reveal
      gsap.utils.toArray<HTMLElement>(".manifiesto-texto .line").forEach((line, index) => {
        gsap.fromTo(
          line,
          { opacity: 0, y: 30, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: ".manifiesto",
              start: `${15 + index * 18}% 70%`,
              end: `${35 + index * 18}% 50%`,
              scrub: 1,
            },
          }
        );
      });

      // Fundadores stagger
      gsap.utils.toArray<HTMLElement>(".fundador").forEach((fundador, index) => {
        gsap.fromTo(
          fundador,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".fundadores-grid",
              start: "top 75%",
              toggleActions: "play none none none",
            },
            delay: index * 0.2,
          }
        );

        gsap.to(fundador, {
          y: -20 - index * 10,
          ease: "none",
          scrollTrigger: {
            trigger: fundador,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });

    }, sectionRef);

    // 3D tilt on founder photos (desktop only)
    if (!isTouchDevice) {
      const fotos = sectionRef.current.querySelectorAll<HTMLElement>(".fundador-foto");
      const handlers = new Map<HTMLElement, { move: (e: MouseEvent) => void; leave: () => void }>();

      fotos.forEach((foto) => {
        const move = (e: MouseEvent) => {
          const rect = foto.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          foto.style.transform = `scale(1.05) rotateY(${x * 15}deg) rotateX(${-y * 15}deg)`;
          foto.style.transition = "none";
        };
        const leave = () => {
          foto.style.transform = "scale(1) rotateY(0) rotateX(0)";
          foto.style.transition = "transform 0.5s ease";
        };
        foto.addEventListener("mousemove", move);
        foto.addEventListener("mouseleave", leave);
        handlers.set(foto, { move, leave });
      });

      return () => {
        ctx.revert();
        handlers.forEach(({ move, leave }, foto) => {
          foto.removeEventListener("mousemove", move);
          foto.removeEventListener("mouseleave", leave);
        });
      };
    }

    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre-nosotros" ref={sectionRef}>
      <div className="container" style={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        <div className="label" style={{ textAlign: "center" }}>Sobre Nosotros</div>

        <div className="manifiesto">
          <div className="manifiesto-texto">
            <span className="line">Somos una productora audiovisual con base en Santiago, Chile.</span>
            <span className="line">Creemos que cada marca tiene una historia única.</span>
            <span className="line">Nuestro trabajo es descubrirla, pulirla</span>
            <span className="line">y contarla de forma inolvidable.</span>
          </div>
        </div>

        <div className="fundadores-grid">
          {fundadores.map((f) => (
            <div className="fundador" key={f.nombre}>
              <div className="fundador-foto">
                <img
                  src={f.foto}
                  alt={`${f.nombre} — ${f.rol} de M14 Studio, productora audiovisual en Santiago`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <h3 className="fundador-nombre">{f.nombre}</h3>
              <div className="fundador-rol">{f.rol}</div>
              <p className="fundador-bio">{f.bio}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
