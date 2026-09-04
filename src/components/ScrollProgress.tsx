import { useRef } from 'react';
import { useRafLoop } from '../hooks/useRafLoop';

/**
 * Thin scroll-position indicator — a direct, user-driven reflection of scroll
 * position rather than decorative motion, so it stays active under reduced
 * motion too (the global CSS guard already collapses its transition to
 * near-zero there, so it simply stops easing between steps).
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const lastRef = useRef(-1);

  useRafLoop(() => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    if (Math.abs(progress - lastRef.current) < 0.002) return;
    lastRef.current = progress;
    if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
  });

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={barRef} className="scroll-progress__bar" />
    </div>
  );
}
