"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Reel() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "#reel",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#reel",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.to(".reel-header", {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#reel",
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });

      const reelTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".reel-video-wrapper",
          start: "top 80%",
          end: "top 30%",
          scrub: 0.8,
          onEnter: () => {
            document.querySelector(".reel-frame")?.classList.add("visible");
          },
        },
      });

      reelTl
        .fromTo(
          ".reel-video-wrapper",
          { x: 80, opacity: 0, scale: 0.9 },
          { x: 0, opacity: 1, scale: 1, ease: "power2.out" }
        )
        .fromTo(
          ".reel-video",
          { clipPath: "inset(30% 30% 30% 30%)", scale: 1.2, opacity: 0 },
          { clipPath: "inset(0% 0% 0% 0%)", scale: 1, opacity: 1, ease: "power2.out" },
          0.1
        );

      gsap.to(".reel-header", {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: "#reel",
          start: "top center",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(".reel-video-wrapper", {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: "#reel",
          start: "top center",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="reel" ref={sectionRef}>
      <div className="reel-container">
        <div className="reel-header">
          <div className="reel-subtitle">Nuestro trabajo</div>
          <h2 className="reel-title">
            Showreel<br />2025
          </h2>
          <p className="reel-description">
            Una selección de nuestros mejores proyectos. Historias que conectan,
            producción que inspira.
          </p>
        </div>

        <div className="reel-video-wrapper">
          <div className="reel-frame" />
          <div className="reel-video">
            <div
              className={`reel-thumbnail${showIframe ? " hidden" : ""}`}
              onClick={() => setShowIframe(true)}
            >
              <div className="reel-play-btn">
                <div className="reel-play-icon" />
                <div className="reel-play-text">Reproducir</div>
              </div>
            </div>
            <iframe
              className={`reel-iframe${showIframe ? " active" : ""}`}
              src="https://www.youtube.com/embed/F6D0G5v2lB8?autoplay=1&controls=1&rel=0&modestbranding=1"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
