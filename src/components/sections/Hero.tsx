"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;
    section.style.opacity = "1";
    section.style.transform = "translateY(0)";

    const ctx = gsap.context(() => {
      gsap.to(".hero-logo", {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.8,
        ease: "power4.out",
        delay: 0.3,
      });

      gsap.to(".hero-tagline .word", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.08,
        delay: 1.2,
      });

      gsap.to(".hero-video", {
        y: "30%",
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-content", {
        scale: 0.8,
        opacity: 0,
        y: -100,
        filter: "blur(10px)",
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-overlay", {
        opacity: 1.5,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-scroll-indicator", {
        opacity: 0,
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "20% top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const taglineWords = ["Nos", "encargamos", "de", "contar", "tu", "historia"];

  return (
    <section id="home" ref={sectionRef}>
      <div className="hero-video-wrapper">
        <iframe
          className="hero-video"
          src="https://www.youtube.com/embed/2qByFoSHahI?autoplay=1&mute=1&loop=1&playlist=2qByFoSHahI&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3"
          allow="autoplay; encrypted-media"
          allowFullScreen
          frameBorder="0"
          title="Hero background video"
        />
        <div className="hero-video-mobile-fallback" />
        <div className="hero-overlay" />
      </div>

      <div className="hero-content">
        <div className="hero-logo">
          <span className="m14">M14</span>
          <span className="studio"> STUDIO</span>
        </div>
        <div className="hero-tagline">
          {taglineWords.map((word, i) => (
            <span key={i} className="word">
              {word}{" "}
            </span>
          ))}
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="hero-scroll-text">Scroll</div>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
