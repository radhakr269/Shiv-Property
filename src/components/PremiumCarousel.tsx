import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

export interface PremiumCarouselProps {
  id: string;
  items: React.ReactNode[];
  direction?: 'rtl' | 'ltr'; // 'rtl' = right-to-left, 'ltr' = left-to-right
  speed?: number; // pixels per second (e.g. 35 is relaxed, 50 is medium)
  ariaLabel?: string;
  className?: string;
  cardWidthClass?: string; // e.g. "w-[280px] sm:w-[320px]"
  gap?: number; // px gap between items, default 20
  showManualControls?: boolean;
}

export const PremiumCarousel: React.FC<PremiumCarouselProps> = ({
  id,
  items,
  direction = 'rtl',
  speed = 36,
  ariaLabel = 'Real estate carousel',
  className = '',
  cardWidthClass = 'w-[280px] sm:w-[320px]',
  gap = 20,
  showManualControls = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Position state tracked in ref for 60fps performance without re-renders
  const posRef = useRef<number>(0);
  const halfWidthRef = useRef<number>(0);

  // Interaction states
  const [isPaused, setIsPaused] = useState(false);
  const [userInteracting, setUserInteracting] = useState(false);
  const isInteractingRef = useRef(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Touch & Drag state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startPosRef = useRef(0);
  const isVisibleRef = useRef(true);

  // Accessibility reduced-motion
  const prefersReducedMotion = useRef(false);

  // Measure content width (half width since we duplicate the list)
  const measureTrack = useCallback(() => {
    if (trackRef.current) {
      // The total width of all children divided by 2
      const fullWidth = trackRef.current.scrollWidth;
      halfWidthRef.current = fullWidth / 2;
      // Initialize position if LTR so it travels rightward smoothly
      if (direction === 'ltr' && posRef.current === 0) {
        posRef.current = -halfWidthRef.current;
      }
    }
  }, [direction]);

  // Handle Resize
  useEffect(() => {
    measureTrack();
    const handleResize = () => measureTrack();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [measureTrack, items.length]);

  // Reduced motion check
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mq.matches;
    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  // IntersectionObserver to pause offscreen
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Document visibility change
  useEffect(() => {
    const handleVisibility = () => {
      isVisibleRef.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Animation Loop (requestAnimationFrame with translate3d)
  useEffect(() => {
    const step = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }
      const delta = Math.min((time - lastTimeRef.current) / 1000, 0.1); // cap delta
      lastTimeRef.current = time;

      const shouldAnimate =
        !isPaused &&
        !isInteractingRef.current &&
        isVisibleRef.current &&
        !prefersReducedMotion.current &&
        halfWidthRef.current > 0;

      if (shouldAnimate) {
        const moveDist = speed * delta;
        if (direction === 'rtl') {
          // Move leftward
          posRef.current -= moveDist;
          if (posRef.current <= -halfWidthRef.current) {
            posRef.current += halfWidthRef.current;
          }
        } else {
          // Move rightward
          posRef.current += moveDist;
          if (posRef.current >= 0) {
            posRef.current -= halfWidthRef.current;
          }
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
        }
      }

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      lastTimeRef.current = null;
    };
  }, [direction, speed, isPaused]);

  // Touch and Drag Handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    isInteractingRef.current = true;
    isDraggingRef.current = true;
    setUserInteracting(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    startXRef.current = clientX;
    startPosRef.current = posRef.current;
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const diff = clientX - startXRef.current;

    let nextPos = startPosRef.current + diff;
    if (halfWidthRef.current > 0) {
      if (nextPos <= -halfWidthRef.current) {
        nextPos += halfWidthRef.current;
      } else if (nextPos > 0) {
        nextPos -= halfWidthRef.current;
      }
    }

    posRef.current = nextPos;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    // Delay resuming autoplay so user can inspect card
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
      setUserInteracting(false);
    }, 1800);
  };

  // Manual Nudge
  const nudge = (stepDirection: 'prev' | 'next') => {
    const cardStep = 300;
    const shift = stepDirection === 'next' ? -cardStep : cardStep;
    let nextPos = posRef.current + shift;

    if (halfWidthRef.current > 0) {
      if (nextPos <= -halfWidthRef.current) {
        nextPos += halfWidthRef.current;
      } else if (nextPos > 0) {
        nextPos -= halfWidthRef.current;
      }
    }

    posRef.current = nextPos;
    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.4s ease-out';
      trackRef.current.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
      setTimeout(() => {
        if (trackRef.current) trackRef.current.style.transition = '';
      }, 420);
    }

    // Pause briefly after manual button click
    isInteractingRef.current = true;
    setUserInteracting(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
      setUserInteracting(false);
    }, 2200);
  };

  // Duplicate items twice to achieve continuous seamless loop
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none group/carousel ${className}`}
      aria-label={ariaLabel}
      role="region"
      onMouseEnter={() => {
        isInteractingRef.current = true;
        setUserInteracting(true);
      }}
      onMouseLeave={() => {
        if (!isDraggingRef.current) {
          isInteractingRef.current = false;
          setUserInteracting(false);
        }
      }}
      onFocus={() => {
        isInteractingRef.current = true;
        setUserInteracting(true);
      }}
      onBlur={() => {
        isInteractingRef.current = false;
        setUserInteracting(false);
      }}
    >
      {/* Edge gradient masks for luxurious seamless blend */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-inherit to-transparent z-10 pointer-events-none opacity-80" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-inherit to-transparent z-10 pointer-events-none opacity-80" />

      {/* Manual Control Header Pill (Pause/Play & Arrows) */}
      {showManualControls && (
        <div className="flex items-center justify-between mb-3 px-1 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-[11px] font-semibold text-slate-700">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  userInteracting || isPaused ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'
                }`}
              />
              <span>
                {direction === 'rtl' ? 'Right → Left' : 'Left → Right'} (
                {userInteracting || isPaused ? 'Paused' : 'Continuous'})
              </span>
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => nudge('prev')}
              className="w-7 h-7 rounded-full bg-white border border-slate-200 hover:border-[#d4a359] hover:text-[#b87834] text-slate-700 flex items-center justify-center transition shadow-xs active:scale-95"
              aria-label="Previous cards"
              title="Previous cards"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className="w-7 h-7 rounded-full bg-white border border-slate-200 hover:border-[#d4a359] hover:text-[#b87834] text-slate-700 flex items-center justify-center transition shadow-xs active:scale-95"
              aria-label={isPaused ? 'Resume auto movement' : 'Pause auto movement'}
              title={isPaused ? 'Play' : 'Pause'}
            >
              {isPaused ? <Play className="w-3 h-3 fill-current ml-0.5" /> : <Pause className="w-3 h-3 fill-current" />}
            </button>

            <button
              onClick={() => nudge('next')}
              className="w-7 h-7 rounded-full bg-white border border-slate-200 hover:border-[#d4a359] hover:text-[#b87834] text-slate-700 flex items-center justify-center transition shadow-xs active:scale-95"
              aria-label="Next cards"
              title="Next cards"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Moving Track */}
      <div
        className="cursor-grab active:cursor-grabbing touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
      >
        <div
          ref={trackRef}
          className="flex will-change-transform py-2"
          style={{ gap: `${gap}px` }}
        >
          {duplicatedItems.map((child, idx) => (
            <div
              key={`${id}-item-${idx}`}
              className={`shrink-0 ${cardWidthClass}`}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
