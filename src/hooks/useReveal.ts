import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { prefersReducedMotion } from './useReducedMotion';

export type RevealVariant = 'rise' | 'scale' | 'mask';

// Matches .load-veil's animation: wndVeil 0.85s ease 0.45s both (tokens.css) —
// delay + duration = 1.3s until the veil is fully transparent. Reveals wait
// this long before even attaching their observer, so a browser-restored
// scroll position (reload defaults to restoring it) can never let a section
// finish revealing while still hidden behind the veil — see main.tsx for the
// scrollRestoration fix this backs up.
const VEIL_CLEAR_MS = 1300;

/**
 * Scroll-reveal contract — BUILD-SPEC.md §5.2, extended with a small motion
 * vocabulary (rise/scale/mask) so sections don't all arrive the same way.
 * All three share one easing curve and duration family — variation in
 * choreography, not in the underlying system.
 *
 * IMPLEMENTATION DECISION: IntersectionObserver stands in for the reference's
 * rAF sweep, as explicitly sanctioned by the spec. The 2.5s failsafe is kept
 * so content can never be stranded invisible; reduced motion renders visible
 * immediately with no observer at all.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  delayMs = 0,
  variant: RevealVariant = 'rise'
) {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;

    let done = false;
    let observer: IntersectionObserver | undefined;
    let failsafe: number | undefined;

    const reveal = () => {
      if (done) return;
      done = true;
      setRevealed(true);
    };

    const start = window.setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              reveal();
              observer?.disconnect();
            }
          });
        },
        { rootMargin: '0px 0px -80px 0px', threshold: 0 }
      );
      observer.observe(el);

      failsafe = window.setTimeout(reveal, 2500);
    }, VEIL_CLEAR_MS);

    return () => {
      window.clearTimeout(start);
      observer?.disconnect();
      if (failsafe !== undefined) window.clearTimeout(failsafe);
    };
  }, []);

  const delay = `${delayMs * 0.75}ms`;
  const transition =
    variant === 'mask'
      ? `transform var(--reveal-duration) var(--ease-expo), opacity .6s ease`
      : `opacity var(--reveal-duration) var(--ease-expo), transform var(--reveal-duration) var(--ease-expo), filter var(--reveal-duration) var(--ease-expo)`;

  let hiddenTransform = 'translate3d(0,var(--reveal-distance),0)';
  if (variant === 'scale') hiddenTransform = 'translate3d(0,10px,0) scale(0.96)';
  if (variant === 'mask') hiddenTransform = 'translate3d(0,100%,0)';

  const style: CSSProperties = revealed
    ? {
        opacity: 1,
        transform: variant === 'mask' ? 'translate3d(0,0,0)' : 'translate3d(0,0,0) scale(1)',
        filter: variant === 'mask' ? undefined : 'blur(0)',
        transition,
        transitionDelay: delay,
      }
    : {
        opacity: variant === 'mask' ? 1 : 0,
        transform: hiddenTransform,
        filter: variant === 'mask' ? undefined : `blur(var(--reveal-blur))`,
        transition,
        transitionDelay: delay,
        willChange: variant === 'mask' ? 'transform' : 'opacity, transform, filter',
        backfaceVisibility: 'hidden',
      };

  return { ref, style, revealed };
}
