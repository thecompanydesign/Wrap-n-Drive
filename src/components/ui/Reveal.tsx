import type { CSSProperties, ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';

type RevealProps = {
  delay?: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/** Generic scroll-reveal wrapper — the only place motion-in is defined outside Section/Hero. */
export function Reveal({ delay = 0, children, className, style }: RevealProps) {
  const { ref, style: revealStyle } = useReveal<HTMLDivElement>(delay);
  return (
    <div ref={ref} className={className} style={{ ...revealStyle, ...style }}>
      {children}
    </div>
  );
}
