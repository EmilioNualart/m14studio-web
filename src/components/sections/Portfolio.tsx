"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioItems, filterCategories } from "@/lib/data";
import { useVideoModal } from "@/components/providers/VideoModalProvider";
import { CircularGallery, GalleryItem } from "@/components/ui/circular-gallery";

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredItems = useMemo(() => {
    return portfolioItems.filter(
      (item) => activeFilter === "all" || item.category === activeFilter
    );
  }, [activeFilter]);

  const galleryItems: GalleryItem[] = useMemo(() => {
    return filteredItems.map((item) => ({
      common: item.title,
      binomial: item.category.charAt(0).toUpperCase() + item.category.slice(1),
      photo: {
        url: `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`,
        text: item.title,
        pos: "center",
        by: "M14 Studio",
      },
      onClick: () => openVideo(item.videoId),
    }));
  }, [filteredItems, openVideo]);

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
                onClick={() => setActiveFilter(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ width: "100%", height: "600px", position: "relative" }}>
          <CircularGallery
            items={galleryItems}
            autoRotateSpeed={0.12}
          />
        </div>
      </div>
    </section>
  );
}
