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
  // Each card subtends an angle of 2π/count.
  // To avoid overlap: chord between adjacent centers >= cardWidth + gap
  // chord = 2 * R * sin(π / count)
  // R = (cardWidth + gap) / (2 * sin(π / count))
  const minRadius = (cardWidth + gap) / (2 * Math.sin(Math.PI / count));
  return Math.round(minRadius);
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, autoRotateSpeed = 0.15, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isSliderDragging, setIsSliderDragging] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const dragStartRef = useRef<number>(0);
    const dragRotationRef = useRef<number>(0);
    const sliderDragStartRef = useRef<number>(0);
    const sliderRotationRef = useRef<number>(0);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const sliderTrackRef = useRef<HTMLDivElement | null>(null);

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
        if (!isScrolling && !isDragging && !isSliderDragging) {
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
    }, [isScrolling, isDragging, isSliderDragging, autoRotateSpeed]);

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
        if (!isDragging || isSliderDragging) return;
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
    }, [isDragging, isSliderDragging, rotation]);

    // Slider drag to rotate
    useEffect(() => {
      const handleSliderMove = (e: PointerEvent) => {
        if (!isSliderDragging) return;
        const delta = e.clientX - sliderDragStartRef.current;
        const trackWidth = sliderTrackRef.current?.offsetWidth || 400;
        // Map full track width to 360 degrees
        const degreesPerPixel = 360 / trackWidth;
        setRotation(sliderRotationRef.current + delta * degreesPerPixel);
      };

      const handleSliderUp = () => {
        setIsSliderDragging(false);
      };

      window.addEventListener('pointermove', handleSliderMove);
      window.addEventListener('pointerup', handleSliderUp);

      return () => {
        window.removeEventListener('pointermove', handleSliderMove);
        window.removeEventListener('pointerup', handleSliderUp);
      };
    }, [isSliderDragging]);

    const handleSliderDown = (e: React.PointerEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setIsSliderDragging(true);
      sliderDragStartRef.current = e.clientX;
      sliderRotationRef.current = rotation;
    };

    // Thumb position: normalize rotation to 0–1 across the track
    const thumbPosition = ((rotation % 360 + 360) % 360) / 360;

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

        {/* Slider bar — positioned at bottom, outside perspective */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            maxWidth: '500px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            ref={sliderTrackRef}
            onPointerDown={handleSliderDown}
            style={{
              position: 'relative',
              width: '100%',
              height: '4px',
              background: 'rgba(255,255,255,0.12)',
              borderRadius: '2px',
              cursor: isSliderDragging ? 'grabbing' : 'grab',
              touchAction: 'none',
              userSelect: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: `${thumbPosition * 100}%`,
                transform: 'translate(-50%, -50%)',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.8)',
                boxShadow: '0 0 8px rgba(255,255,255,0.3)',
                transition: isSliderDragging ? 'none' : 'left 0.05s linear',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
