"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React no escribe el atributo `muted` en el HTML; iOS lo exige para el autoplay.
    video.muted = true;
    video.setAttribute("muted", "");

    const tryPlay = () => video.play().catch(() => {});
    tryPlay();

    // Si iOS bloquea el autoplay (Instagram, modo ahorro), parte con el primer gesto del usuario.
    const events = ["touchstart", "scroll", "click"] as const;
    const onGesture = () => {
      tryPlay();
      events.forEach((e) => window.removeEventListener(e, onGesture));
    };
    events.forEach((e) => window.addEventListener(e, onGesture, { passive: true, once: true }));

    return () => events.forEach((e) => window.removeEventListener(e, onGesture));
  }, []);

  return (
    <section id="home">
      <div className="hero-poster" aria-hidden="true" />
      <video
        ref={videoRef}
        className={`hero-video${playing ? " is-playing" : ""}`}
        src="/videos/hero-reel.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        onPlaying={() => setPlaying(true)}
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="hero-firma display">
          <span className="linea">Nos encargamos</span>{" "}
          <span className="linea">de contar tu historia.</span>
        </h1>
        <div className="hero-meta placa">Reel 2026</div>
      </div>
    </section>
  );
}
