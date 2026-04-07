"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import CustomCursor from "@/components/ui/CustomCursor";

export default function Gracias() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gracias-icon",
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)", delay: 0.3 }
      );
      gsap.fromTo(
        ".gracias-content",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.5 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
    <CustomCursor />
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--negro, #0A0A0A)",
        color: "var(--crema, #F5F0E8)",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <Link
        href="/"
        style={{
          position: "absolute",
          top: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "1.3rem",
          fontWeight: 400,
          letterSpacing: "0.05em",
          color: "var(--crema, #F5F0E8)",
          textDecoration: "none",
        }}
      >
        M14 <span style={{ color: "var(--vino, #7A0012)", fontWeight: 300 }}>STUDIO</span>
      </Link>

      <div
        className="gracias-icon"
        style={{
          width: 80,
          height: 80,
          border: "2px solid var(--vino, #7A0012)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "2rem",
          fontSize: "2.2rem",
          color: "var(--vino, #7A0012)",
          opacity: 0,
        }}
      >
        &#10003;
      </div>

      <div className="gracias-content" style={{ opacity: 0, maxWidth: 500 }}>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 200,
            letterSpacing: "-0.02em",
            marginBottom: "1.5rem",
            lineHeight: 1.2,
          }}
        >
          Gracias por contactarnos
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: 1.8,
            opacity: 0.7,
            marginBottom: "2.5rem",
          }}
        >
          Hemos recibido tu mensaje. Nuestro equipo se pondrá en contacto contigo
          a la brevedad para conversar sobre tu proyecto.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "1rem 2.5rem",
            border: "1px solid var(--vino, #7A0012)",
            background: "transparent",
            color: "var(--vino, #7A0012)",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "all 0.4s ease",
          }}
        >
          Volver al inicio
        </Link>
      </div>
    </div>
    </>
  );
}
