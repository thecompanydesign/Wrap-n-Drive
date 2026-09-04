import { useEffect, useRef, type RefObject } from 'react';
import { useRafLoop } from './useRafLoop';
import { prefersReducedMotion } from './useReducedMotion';

const CURSOR_RANGE = 14; // px, max shift at the frame's edge
const CURSOR_LERP = 0.08;

/**
 * Continuous rAF parallax on the hero image fill — BUILD-SPEC.md §5.3,
 * extended with a subtle cursor-tied offset on desktop (fine pointers only)
 * so the image reads as a layer with real depth, not just a scroll effect.
 * Both inputs are combined into one lerped transform on the same shared loop.
 */
export function useHeroParallax(
  frameRef: RefObject<HTMLDivElement | null>,
  fillRef: RefObject<HTMLDivElement | null>
) {
  const scrollCurrent = useRef(0);
  const cursorTarget = useRef({ x: 0, y: 0 });
  const cursorCurrent = useRef({ x: 0, y: 0 });
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const frame = frameRef.current;
    if (!frame) return;

    const handleMove = (e: MouseEvent) => {
      const rect = frame.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      cursorTarget.current = { x: px * CURSOR_RANGE, y: py * CURSOR_RANGE };
    };
    const handleLeave = () => {
      cursorTarget.current = { x: 0, y: 0 };
    };

    frame.addEventListener('mousemove', handleMove);
    frame.addEventListener('mouseleave', handleLeave);
    return () => {
      frame.removeEventListener('mousemove', handleMove);
      frame.removeEventListener('mouseleave', handleLeave);
    };
  }, [frameRef, reduced]);

  useRafLoop(() => {
    const frame = frameRef.current;
    const fill = fillRef.current;
    if (!frame || !fill) return;

    const rect = frame.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.bottom < -300 || rect.top > vh + 300) return;

    const p = (rect.top + rect.height / 2 - vh / 2) / vh;
    const scrollTarget = -p * 26;
    scrollCurrent.current += (scrollTarget - scrollCurrent.current) * 0.075;

    cursorCurrent.current.x += (cursorTarget.current.x - cursorCurrent.current.x) * CURSOR_LERP;
    cursorCurrent.current.y += (cursorTarget.current.y - cursorCurrent.current.y) * CURSOR_LERP;

    const x = cursorCurrent.current.x;
    const y = scrollCurrent.current + cursorCurrent.current.y;
    fill.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.06)`;
  }, !reduced);
}
