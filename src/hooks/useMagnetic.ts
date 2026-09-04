import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from './useReducedMotion';

/**
 * Subtle "magnetic" pull toward the cursor for primary CTAs — desktop/fine
 * pointers only. Deliberately restrained (small max offset, no rotation or
 * scale) so it reads as responsiveness rather than a gimmick. Uses a CSS
 * transition rather than the shared rAF loop: each mousemove just sets a new
 * target and lets the transition ease toward it, which is enough for this
 * effect and avoids adding a per-button frame subscription.
 */
export function useMagnetic<T extends HTMLElement = HTMLDivElement>(
  strength = 0.25,
  maxOffset = 10
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;

    el.style.transition = 'transform 0.35s var(--ease-expo)';
    el.style.willChange = 'transform';

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      const x = Math.max(-maxOffset, Math.min(maxOffset, relX * strength));
      const y = Math.max(-maxOffset, Math.min(maxOffset, relY * strength));
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const handleLeave = () => {
      el.style.transform = 'translate3d(0,0,0)';
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength, maxOffset]);

  return ref;
}
