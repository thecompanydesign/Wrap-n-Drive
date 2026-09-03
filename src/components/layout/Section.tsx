import type { ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';

type SectionProps = {
  id?: string;
  noTopRule?: boolean;
  /** CSS value overriding the standard clamp(72px,9vw,130px) top padding — hero uses clamp(72px,10.4vw,150px). */
  topPadding?: string;
  /** Hero owns its own §5.1 load entrance; skip the generic §5.2 scroll-reveal wrapper so the two don't stack. */
  skipReveal?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Owns page geometry: the 1216 content column inside the 1276 divider rail,
 * the section padding ramp, and the hairline top rule. BUILD-SPEC.md §2.5, §3.
 */
export function Section({
  id,
  noTopRule,
  topPadding,
  skipReveal,
  className,
  children,
}: SectionProps) {
  const { ref, style } = useReveal<HTMLDivElement>(0);
  return (
    <section id={id} className={className}>
      {/* wnd-container: outer-pad only, no border — its content-box is the 1276 "rail". */}
      <div className="wnd-container">
        {/* wnd-section: fills the rail exactly, so the border-top is what's wider than content. */}
        <div
          ref={skipReveal ? undefined : ref}
          style={{
            ...(skipReveal ? undefined : style),
            ...(topPadding ? { paddingTop: topPadding } : undefined),
          }}
          className={`wnd-section ${noTopRule ? 'wnd-section--no-rule' : ''}`}
        >
          <div className="wnd-content">{children}</div>
        </div>
      </div>
    </section>
  );
}
