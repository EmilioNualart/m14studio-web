"use client";

import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.pageYOffset > 100) {
          navRef.current.classList.add("scrolled");
        } else {
          navRef.current.classList.remove("scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const links = [
    { href: "#home", label: "Home" },
    { href: "#servicios", label: "Servicios" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#sobre-nosotros", label: "Nosotros" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <nav ref={navRef} id="navbar">
      <a href="#" className="nav-logo" onClick={(e) => handleLinkClick(e, "#home")}>
        M14 <span className="studio-text">STUDIO</span>
      </a>
      <ul className={`nav-links${menuOpen ? " active" : ""}`}>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={(e) => handleLinkClick(e, link.href)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <button
        className={`nav-menu-toggle${menuOpen ? " active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
