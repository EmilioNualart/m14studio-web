import React, { useState, useEffect, useRef, useMemo, HTMLAttributes } from 'react';

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
}

export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
  onClick?: () => void;
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  autoRotateSpeed?: number;
}

const CARD_SIZE = 280;
const CARD_SIZE_MOBILE = 220;
const GAP = 30;

function computeRadius(count: number, cardWidth: number, gap: number): number {
  if (count <= 1) return 0;
  const minRadius = (cardWidth + gap) / (2 * Math.sin(Math.PI / count));
  return Math.round(minRadius);
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, autoRotateSpeed = 0.15, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const dragStartRef = useRef<number>(0);
    const dragRotationRef = useRef<number>(0);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < 768);
      check();
      window.addEventListener('resize', check);
      return () => window.removeEventListener('resize', check);
    }, []);

    const cardSize = isMobile ? CARD_SIZE_MOBILE : CARD_SIZE;
    const radius = useMemo(
      () => computeRadius(items.length, cardSize, GAP),
      [items.length, cardSize]
    );

    // Auto-rotation
    useEffect(() => {
      const autoRotate = () => {
        if (!isScrolling && !isDragging) {
          setRotation(prev => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isScrolling, isDragging, autoRotateSpeed]);

    // Drag to rotate
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const handlePointerDown = (e: PointerEvent) => {
        setIsDragging(true);
        dragStartRef.current = e.clientX;
        dragRotationRef.current = rotation;
      };

      const handlePointerMove = (e: PointerEvent) => {
        if (!isDragging) return;
        const delta = e.clientX - dragStartRef.current;
        setRotation(dragRotationRef.current + delta * 0.3);
      };

      const handlePointerUp = () => {
        setIsDragging(false);
      };

      container.addEventListener('pointerdown', handlePointerDown);
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);

      return () => {
        container.removeEventListener('pointerdown', handlePointerDown);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      };
    }, [isDragging, rotation]);

    const anglePerItem = 360 / items.length;

    return (
      <div
        ref={(node) => {
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn("relative w-full h-full", className)}
        {...props}
      >
        {/* 3D Carousel — perspective container */}
        <div
          ref={containerRef}
          className="relative w-full h-full flex items-center justify-center"
          style={{
            perspective: '2000px',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        >
          <div
            className="relative w-full h-full"
            style={{
              transform: `rotateY(${rotation}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {items.map((item, i) => {
              const itemAngle = i * anglePerItem;
              const totalRotation = rotation % 360;
              const relativeAngle = (itemAngle + totalRotation + 360) % 360;
              const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
              const opacity = Math.max(0.3, 1 - (normalizedAngle / 180));
              const half = cardSize / 2;

              return (
                <div
                  key={item.photo.url + i}
                  role="group"
                  aria-label={item.common}
                  className="absolute"
                  style={{
                    width: `${cardSize}px`,
                    height: `${cardSize}px`,
                    transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                    left: '50%',
                    top: '50%',
                    marginLeft: `-${half}px`,
                    marginTop: `-${half}px`,
                    opacity: opacity,
                    transition: 'opacity 0.3s linear',
                    cursor: 'pointer',
                  }}
                  onClick={() => item.onClick?.()}
                >
                  <div
                    className="relative w-full h-full overflow-hidden group"
                    style={{
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                    }}
                  >
                    <img
                      src={item.photo.url}
                      alt={item.photo.text}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ objectPosition: item.photo.pos || 'center' }}
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0"
                      style={{
                        padding: '1.5rem',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
                      }}
                    >
                      <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: isMobile ? '1.1rem' : '1.3rem',
                        fontWeight: 400,
                        color: '#fff',
                        margin: 0,
                        marginBottom: '0.4rem',
                        letterSpacing: '-0.01em',
                      }}>
                        {item.common}
                      </h3>
                      <div style={{
                        fontSize: '0.65rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#fff',
                        opacity: 0.9,
                      }}>
                        {item.binomial}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
