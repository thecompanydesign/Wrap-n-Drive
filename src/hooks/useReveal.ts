import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { prefersReducedMotion } from './useReducedMotion';

/**
 * Scroll-reveal contract — BUILD-SPEC.md §5.2.
 * IMPLEMENTATION DECISION: IntersectionObserver stands in for the reference's
 * rAF sweep, as explicitly sanctioned by the spec. The 2.5s failsafe is kept
 * so content can never be stranded invisible; reduced motion renders visible
 * immediately with no observer at all.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(delayMs = 0) {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setRevealed(true);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
          }
        });
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0 }
    );
    observer.observe(el);

    const failsafe = window.setTimeout(reveal, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  const style: CSSProperties = revealed
    ? {
        opacity: 1,
        transform: 'translate3d(0,0,0)',
        transition: 'opacity 1.1s var(--ease-expo), transform 1.1s var(--ease-expo)',
        transitionDelay: `${delayMs * 0.75}ms`,
      }
    : {
        opacity: 0,
        transform: 'translate3d(0,14px,0)',
        transition: 'opacity 1.1s var(--ease-expo), transform 1.1s var(--ease-expo)',
        transitionDelay: `${delayMs * 0.75}ms`,
        willChange: 'opacity, transform',
        backfaceVisibility: 'hidden',
      };

  return { ref, style, revealed };
}
