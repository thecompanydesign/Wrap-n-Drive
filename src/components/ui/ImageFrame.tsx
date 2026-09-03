import type { Ref } from 'react';

type ImageFrameProps = {
  aspect: string;
  caption: string;
  parallax?: boolean;
  className?: string;
  frameRef?: Ref<HTMLDivElement>;
  fillRef?: Ref<HTMLDivElement>;
};

/**
 * Placeholder image frame — BUILD-SPEC.md §6.
 * IMPLEMENTATION DECISION: real vehicle photography is not generated; the
 * striped placeholder fill + mono caption ships until the studio supplies assets.
 */
export function ImageFrame({
  aspect,
  caption,
  parallax,
  className,
  frameRef,
  fillRef,
}: ImageFrameProps) {
  return (
    <div
      ref={frameRef}
      className={`image-frame ${className ?? ''}`}
      style={{ aspectRatio: aspect }}
    >
      <div
        ref={fillRef}
        className={`image-frame__fill ${parallax ? 'image-frame__fill--parallax' : ''}`}
      >
        <span className="placeholder-caption">{caption}</span>
      </div>
    </div>
  );
}
