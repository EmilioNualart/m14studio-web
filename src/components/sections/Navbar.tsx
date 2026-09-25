"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "#trabajo", label: "Trabajo" },
  { href: "#quienes-somos", label: "Quiénes somos" },
  { href: "#como-trabajamos", label: "Cómo trabajamos" },
  { href: "#agendar", label: "Agendar reunión" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = usePathname() === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false);
    if (!isHome) return;
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav id="navbar" className={scrolled || !isHome ? "scrolled" : ""} aria-label="Principal">
      <a
        href={isHome ? "#home" : "/"}
        className="nav-logo"
        aria-label="M14 Studio, inicio"
        onClick={(e) => handleLinkClick(e, "#home")}
      >
        <img src="/brand/m14-cuadrado-negativo.svg" alt="M14 Studio" />
      </a>
      <ul id="nav-links" className={`nav-links${menuOpen ? " active" : ""}`}>
        {links.map((link, i) => (
          <li key={link.href}>
            <a
              href={isHome ? link.href : `/${link.href}`}
              className={`placa${i === links.length - 1 ? " acento-negro" : ""}`}
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={`nav-toggle${menuOpen ? " active" : ""}`}
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuOpen}
        aria-controls="nav-links"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
      </button>
    </nav>
  );
}
