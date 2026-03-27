"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioItems, filterCategories, getThumbUrl } from "@/lib/data";
import { useVideoModal } from "@/components/providers/VideoModalProvider";
import { CircularGallery, GalleryItem } from "@/components/ui/circular-gallery";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const { openVideo } = useVideoModal();

  // All items for the circular gallery (never filtered)
  const allGalleryItems: GalleryItem[] = useMemo(() => {
    return portfolioItems.map((item) => ({
      common: item.title,
      binomial: item.category.charAt(0).toUpperCase() + item.category.slice(1),
      photo: {
        url: getThumbUrl(item),
        text: item.title,
        pos: "center",
        by: "M14 Studio",
      },
      onClick: () => openVideo(item.videoId),
    }));
  }, [openVideo]);

  // Filtered items for the grid gallery
  const filteredItems = useMemo(() => {
    return portfolioItems.filter(
      (item) => activeFilter === "all" || item.category === activeFilter
    );
  }, [activeFilter]);

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

      gsap.to(".portfolio-gallery-section", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".portfolio-gallery-section",
          start: "top 80%",
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
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: row * 0.15 + col * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const isFilteringRef = useRef(false);

  const handleFilter = (filter: string) => {
    if (filter === activeFilter || isFilteringRef.current) return;
    isFilteringRef.current = true;

    const grid = document.querySelector<HTMLElement>(".portfolio-grid");
    if (!grid) return;

    gsap.to(grid, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActiveFilter(filter);
        requestAnimationFrame(() => {
          gsap.to(grid, {
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
            onComplete: () => {
              isFilteringRef.current = false;
              ScrollTrigger.refresh();
            },
          });
        });
      },
    });
  };

  return (
    <section id="portfolio" ref={sectionRef}>
      <div className="container" style={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        {/* Header with title */}
        <div className="portfolio-header">
          <div className="label">Trabajos Seleccionados</div>
          <h2 style={{ marginTop: "1rem" }}>Portfolio</h2>
        </div>

        {/* Circular 3D Gallery - always shows all videos */}
        <div style={{ width: "100%", height: "600px", position: "relative" }}>
          <CircularGallery
            items={allGalleryItems}
            autoRotateSpeed={0.12}
          />
        </div>

        {/* Gallery section with filters + grid */}
        <div className="portfolio-gallery-section">
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

          <div className="portfolio-grid">
            {filteredItems.map((item) => (
              <div
                key={item.videoId}
                className="portfolio-item"
                data-category={item.category}
                onClick={() => openVideo(item.videoId)}
              >
                <div
                  className="portfolio-item-image"
                  style={{
                    backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.3), rgba(10, 10, 10, 0.5)), url('${getThumbUrl(item)}')`,
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
      </div>
    </section>
  );
}
