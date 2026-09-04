import type { CSSProperties, ReactNode } from 'react';
import { useReveal, type RevealVariant } from '../../hooks/useReveal';

type RevealProps = {
  delay?: number;
  variant?: RevealVariant;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/**
 * Generic scroll-reveal wrapper — the only place motion-in is defined outside
 * Section/Hero. `variant="mask"` renders an overflow-hidden outer shell with
 * the content translating up from behind it (same technique as the hero's
 * H1 lines), so headlines can "rise into place" instead of fading.
 */
export function Reveal({ delay = 0, variant = 'rise', children, className, style }: RevealProps) {
  const { ref, style: revealStyle } = useReveal<HTMLDivElement>(delay, variant);

  if (variant === 'mask') {
    return (
      <div className={className} style={{ overflow: 'hidden', ...style }}>
        <div ref={ref} style={revealStyle}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ ...revealStyle, ...style }}>
      {children}
    </div>
  );
}
