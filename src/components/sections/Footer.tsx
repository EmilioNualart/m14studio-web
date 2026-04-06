"use client";

export default function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer>
      <div className="footer-content">
        <div>
          <div className="footer-logo">
            M14 <span className="studio-text">STUDIO</span>
          </div>
          <p className="footer-tagline">Nos encargamos de contar tu historia</p>
        </div>

        <div className="footer-section">
          <h4>Navegación</h4>
          <ul className="footer-links">
            <li><a href="#home" onClick={(e) => handleLinkClick(e, "#home")}>Home</a></li>
            <li><a href="#servicios" onClick={(e) => handleLinkClick(e, "#servicios")}>Servicios</a></li>
            <li><a href="#portfolio" onClick={(e) => handleLinkClick(e, "#portfolio")}>Portfolio</a></li>
            <li><a href="#sobre-nosotros" onClick={(e) => handleLinkClick(e, "#sobre-nosotros")}>Nosotros</a></li>
            <li><a href="#contacto" onClick={(e) => handleLinkClick(e, "#contacto")}>Contacto</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Ubicaciones</h4>
          <ul className="footer-links">
            <li>Francisco de Aguirre 3630</li>
            <li>Santiago, Chile</li>
            <li style={{ marginTop: "0.5rem" }}>Barcelona, España</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Síguenos</h4>
          <ul className="footer-links">
            <li><a href="https://www.instagram.com/m14studio/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="mailto:mercedeserrazuriz@m14studio.com">Email</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div>&copy; 2026 M14 Studio. Todos los derechos reservados.</div>
        <div className="footer-social">
          <a href="https://www.instagram.com/m14studio/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://vimeo.com/m14studio" target="_blank" rel="noopener noreferrer">Vimeo</a>
        </div>
      </div>
    </footer>
  );
}
