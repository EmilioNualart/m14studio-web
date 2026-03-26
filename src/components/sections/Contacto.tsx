"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contacto() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contacto-info",
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#contacto",
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".contacto-form",
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#contacto",
            start: "top 70%",
            toggleActions: "play none none none",
          },
          delay: 0.2,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log("Form submitted:", data);
    alert("¡Gracias! Hemos recibido tu mensaje. Te contactaremos pronto.");
    e.currentTarget.reset();
  };

  return (
    <section id="contacto" ref={sectionRef}>
      <div className="container" style={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        <div className="contacto-header-mobile">
          <div className="label">Hablemos</div>
          <h2>¿Tienes una historia que contar?</h2>
          <p>
            Estamos listos para escucharla. Cuéntanos sobre tu proyecto y
            hagamos algo memorable juntos.
          </p>
        </div>
        <div className="contacto-split">
          <div className="contacto-info">
            <div className="contacto-header-desktop">
              <div className="label">Hablemos</div>
              <h2>¿Tienes una historia que contar?</h2>
              <p>
                Estamos listos para escucharla. Cuéntanos sobre tu proyecto y
                hagamos algo memorable juntos.
              </p>
            </div>

            <div className="contacto-detalles">
              <div className="contacto-item">
                <div className="label">Email</div>
                <a href="mailto:contacto@m14studio.com">contacto@m14studio.com</a>
              </div>
              <div className="contacto-item">
                <div className="label">Instagram</div>
                <a href="https://www.instagram.com/m14studio/" target="_blank" rel="noopener noreferrer">
                  @m14studio
                </a>
              </div>
              <div className="contacto-item">
                <div className="label">Santiago, Chile</div>
                <p style={{ opacity: 0.7 }}>Oficina disponible bajo petición</p>
              </div>
              <div className="contacto-item">
                <div className="label">Barcelona, España</div>
                <p style={{ opacity: 0.7 }}>Oficina disponible bajo petición</p>
              </div>
            </div>
          </div>

          <form className="contacto-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" name="nombre" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="proyecto">Tipo de proyecto</label>
              <select id="proyecto" name="proyecto" required>
                <option value="">Selecciona una opción</option>
                <option value="publicidad">Producción Publicitaria</option>
                <option value="moda">Moda &amp; Lifestyle</option>
                <option value="corporativo">Contenido Corporativo</option>
                <option value="documental">Documental</option>
                <option value="eventos">Cobertura de Eventos</option>
                <option value="post">Post-Producción &amp; VFX</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea id="mensaje" name="mensaje" required />
            </div>
            <button type="submit" className="btn btn-vino form-submit">
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
