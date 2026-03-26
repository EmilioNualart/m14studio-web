"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const divider = ref.current;

    const trigger = ScrollTrigger.create({
      trigger: divider,
      start: "top 90%",
      onEnter: () => divider.classList.add("revealed"),
      once: true,
    });

    return () => { trigger.kill(); };
  }, []);

  return (
    <div className="section-divider" ref={ref}>
      <div className="divider-line" />
    </div>
  );
}
