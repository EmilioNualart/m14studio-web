"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use (pointer: fine) to detect real mouse — maxTouchPoints > 0 is unreliable
    // because Windows laptops with touchscreens report touch support even when
    // using a mouse, which would hide the cursor and leave no cursor at all.
    const hasFineMouse = window.matchMedia("(pointer: fine)").matches;

    if (!hasFineMouse) {
      if (dotRef.current) dotRef.current.style.display = "none";
      if (circleRef.current) circleRef.current.style.display = "none";
      return;
    }

    let mouseX = 0,
      mouseY = 0;
    let circleX = 0,
      circleY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    function animateCursor() {
      const lerpFactor = 0.15;
      circleX += (mouseX - circleX) * lerpFactor;
      circleY += (mouseY - circleY) * lerpFactor;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${circleX}px, ${circleY}px)`;
      }
      animId = requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const interactiveSelector =
      'a, button, [role="button"], .portfolio-item, .servicio-item, .filter-btn, input, select, textarea';
    const elements = document.querySelectorAll(interactiveSelector);

    const onEnter = () => circleRef.current?.classList.add("hover");
    const onLeave = () => circleRef.current?.classList.remove("hover");

    elements.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-circle" ref={circleRef} />
    </>
  );
}
