"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioItems, filterCategories } from "@/lib/data";
import { useVideoModal } from "@/components/providers/VideoModalProvider";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const { openVideo } = useVideoModal();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".portfolio-header", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#portfolio",
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      gsap.utils.toArray<HTMLElement>(".portfolio-item").forEach((item, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;

        gsap.fromTo(
          item,
          { opacity: 0, scale: 0.8, y: 80, rotateX: 8 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".portfolio-grid",
              start: "top 78%",
              toggleActions: "play none none none",
            },
            delay: row * 0.15 + col * 0.1,
          }
        );

      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    const items = document.querySelectorAll<HTMLElement>(".portfolio-item");

    gsap.to(items, {
      opacity: 0,
      scale: 0.95,
      y: 20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        items.forEach((item) => {
          const category = item.dataset.category;
          item.style.display =
            filter === "all" || category === filter ? "block" : "none";
        });

        const visibleItems = Array.from(items).filter(
          (item) => item.style.display !== "none"
        );
        gsap.fromTo(
          visibleItems,
          { opacity: 0, scale: 0.9, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            onComplete: () => ScrollTrigger.refresh(),
          }
        );
      },
    });
  };

  return (
    <section id="portfolio" ref={sectionRef}>
      <div className="container" style={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        <div className="portfolio-header">
          <div className="label">Trabajos Seleccionados</div>
          <h2 style={{ marginTop: "1rem" }}>Portfolio</h2>

          <div className="portfolio-filters">
            {filterCategories.map((cat) => (
              <button
                key={cat.key}
                className={`filter-btn${activeFilter === cat.key ? " active" : ""}`}
                data-filter={cat.key}
                onClick={() => handleFilter(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="portfolio-grid">
          {portfolioItems.map((item) => (
            <div
              key={item.videoId}
              className="portfolio-item"
              data-category={item.category}
              data-video={item.videoId}
              onClick={() => openVideo(item.videoId)}
            >
              <div
                className="portfolio-item-image"
                style={{
                  background: `linear-gradient(rgba(10, 10, 10, 0.3), rgba(10, 10, 10, 0.5)), url('https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="portfolio-item-overlay">
                <h3 className="portfolio-item-title">{item.title}</h3>
                <div className="portfolio-item-category">
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
