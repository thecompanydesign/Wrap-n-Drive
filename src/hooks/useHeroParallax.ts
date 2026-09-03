import { useRef, type RefObject } from 'react';
import { useRafLoop } from './useRafLoop';
import { prefersReducedMotion } from './useReducedMotion';

/** Continuous rAF parallax on the hero image fill — BUILD-SPEC.md §5.3. */
export function useHeroParallax(
  frameRef: RefObject<HTMLDivElement | null>,
  fillRef: RefObject<HTMLDivElement | null>
) {
  const currentRef = useRef(0);

  useRafLoop(() => {
    const frame = frameRef.current;
    const fill = fillRef.current;
    if (!frame || !fill) return;

    const rect = frame.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.bottom < -300 || rect.top > vh + 300) return;

    const p = (rect.top + rect.height / 2 - vh / 2) / vh;
    const target = -p * 26;
    currentRef.current += (target - currentRef.current) * 0.075;
    fill.style.transform = `translate3d(0, ${currentRef.current}px, 0) scale(1.06)`;
  }, !prefersReducedMotion());
}
