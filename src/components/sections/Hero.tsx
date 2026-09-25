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
        <div className="hero-firma">
          <h1 className="display">Nos encargamos</h1>
          <p>de contar tu historia.</p>
        </div>
        <div className="hero-meta placa">Reel 2026</div>
      </div>
    </section>
  );
}
