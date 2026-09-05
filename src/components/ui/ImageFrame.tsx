import type { Ref } from 'react';

type ImageFrameProps = {
  aspect: string;
  caption: string;
  parallax?: boolean;
  className?: string;
  frameRef?: Ref<HTMLDivElement>;
  fillRef?: Ref<HTMLDivElement>;
  /** Real photo — when omitted, the striped placeholder + caption ships instead. */
  src?: string;
  alt?: string;
  /** Hero image only: eager + high fetch priority, since it's the LCP element. */
  priority?: boolean;
  objectPosition?: string;
};

/**
 * Image frame — BUILD-SPEC.md §6. Ships the striped placeholder + mono
 * caption until a real photo is supplied via `src`; once supplied, the same
 * frame (aspect-ratio, radius, overflow:hidden, parallax target) now shows
 * the photo with object-fit:cover instead.
 */
export function ImageFrame({
  aspect,
  caption,
  parallax,
  className,
  frameRef,
  fillRef,
  src,
  alt,
  priority,
  objectPosition,
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
        {src ? (
          <img
            src={src}
            alt={alt ?? caption}
            loading={priority ? 'eager' : 'lazy'}
            className="image-frame__photo"
            style={objectPosition ? { objectPosition } : undefined}
            {...(priority ? { fetchpriority: 'high' } : {})}
          />
        ) : (
          <span className="placeholder-caption">{caption}</span>
        )}
      </div>
    </div>
  );
}
