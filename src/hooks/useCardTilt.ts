import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from './useReducedMotion';

/**
 * Gentle cursor-tied image drift inside a hover card — desktop/fine pointers
 * only. `cardRef` listens for mouse position, `imageRef` is the layer that
 * moves (combined with the existing hover scale so both compose in one
 * transform). Range is small on purpose: a tactile detail, not a tilt effect.
 */
export function useCardTilt<C extends HTMLElement = HTMLDivElement, I extends HTMLElement = HTMLDivElement>(
  range = 9
) {
  const cardRef = useRef<C | null>(null);
  const imageRef = useRef<I | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    if (!card || !image) return;
    if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;

    image.style.transition = 'transform 0.25s ease-out';

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      image.style.transform = `translate3d(${px * range}px, ${py * range}px, 0) scale(1.045)`;
    };
    const handleLeave = () => {
      image.style.removeProperty('transform');
    };

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);
    return () => {
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, [range]);

  return { cardRef, imageRef };
}
