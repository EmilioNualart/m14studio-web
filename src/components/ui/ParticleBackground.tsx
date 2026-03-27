"use client";

import { useEffect, useRef, useState } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    function resizeCanvas() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: Particle[] = [];
    const particleCount = 50;
    const maxDistance = 160;
    const mouse = { x: null as number | null, y: null as number | null, radius: 100 };

    const onMove = (e: MouseEvent) => { mouse.x = e.x; mouse.y = e.y; };
    const onLeave = () => { mouse.x = null; mouse.y = null; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    class Particle {
      x: number; y: number; vx: number; vy: number; size: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 1.8 + 0.8;
      }
      update() {
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x, dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.vx -= Math.cos(angle) * force * 0.2;
            this.vy -= Math.sin(angle) * force * 0.2;
          }
        }
        this.x += this.vx; this.y += this.vy;
        this.vx *= 0.99; this.vy *= 0.99;
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
        this.x = Math.max(0, Math.min(canvas!.width, this.x));
        this.y = Math.max(0, Math.min(canvas!.height, this.y));
      }
      draw() {
        ctx!.fillStyle = "#F5F0E8";
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.35;
            const gradient = ctx!.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            gradient.addColorStop(0, `rgba(245, 240, 232, ${opacity})`);
            gradient.addColorStop(1, `rgba(122, 0, 18, ${opacity * 0.3})`);
            ctx!.strokeStyle = gradient;
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }
    }

    let animId: number;
    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      particles.forEach((p) => { p.update(); p.draw(); });
      connectParticles();
      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [isMobile]);

  if (isMobile) return null;
  return <canvas ref={canvasRef} id="bgCanvas" />;
}
