export default function Hero() {
  return (
    <section id="home">
      <video
        className="hero-video"
        src="/videos/hero-reel.mp4"
        poster="/images/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
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
