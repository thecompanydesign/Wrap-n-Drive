import type { ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';

type SectionProps = {
  id?: string;
  /** CSS value overriding the standard clamp(72px,9vw,130px) top padding — hero uses clamp(72px,10.4vw,150px). */
  topPadding?: string;
  /** Hero owns its own §5.1 load entrance; skip the generic §5.2 scroll-reveal wrapper so the two don't stack. */
  skipReveal?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Owns page geometry: the 1216 content column inside the 1276 divider rail
 * and the section padding ramp. BUILD-SPEC.md §2.5, §3.
 * IMPLEMENTATION OVERRIDE: the hairline top rule between sections has been
 * removed at the user's request (§1/§3 originally made it structural).
 */
export function Section({ id, topPadding, skipReveal, className, children }: SectionProps) {
  const { ref, style } = useReveal<HTMLDivElement>(0, 'container');
  return (
    <section id={id} className={className}>
      <div className="wnd-container">
        <div
          ref={skipReveal ? undefined : ref}
          style={{
            ...(skipReveal ? undefined : style),
            ...(topPadding ? { paddingTop: topPadding } : undefined),
          }}
          className="wnd-section"
        >
          <div className="wnd-content">{children}</div>
        </div>
      </div>
    </section>
  );
}
