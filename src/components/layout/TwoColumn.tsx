import type { CSSProperties, ReactNode } from 'react';

type TwoColumnProps = {
  label: ReactNode;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/** The label/heading (42%) + content (58%) split used across Services, Portfolio, Process, Pricing, Contact. */
export function TwoColumn({ label, children, className, style }: TwoColumnProps) {
  return (
    <div
      className={`flex flex-wrap ${className ?? ''}`}
      style={{ gap: '32px 40px', ...style }}
    >
      {/* flex-basis 0% + grow ratio (not a % basis) so the 40px gap doesn't push the pair
          past 100% width and force a spurious wrap at wide viewports. */}
      <div style={{ flex: '42 1 0%', minWidth: 'min(100%, 320px)' }}>{label}</div>
      <div style={{ flex: '58 1 0%', minWidth: 'min(100%, 320px)' }}>{children}</div>
    </div>
  );
}
