import { useRef } from 'react';
import { Section } from '../components/layout/Section';
import { Button } from '../components/ui/Button';
import { ImageFrame } from '../components/ui/ImageFrame';
import { StatsBar } from './StatsBar';
import { useHeroParallax } from '../hooks/useHeroParallax';
import { useMagnetic } from '../hooks/useMagnetic';

export function Hero() {
  const frameRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  useHeroParallax(frameRef, fillRef);
  const ctaRef = useMagnetic<HTMLSpanElement>();

  return (
    <Section id="top" skipReveal topPadding="clamp(72px, 10.4vw, 150px)">
      <h1 className="h1">
        <span style={{ display: 'block', overflow: 'hidden' }}>
          <span style={{ display: 'block', animation: 'wndRise 1.25s var(--ease-expo) 0.16s both' }}>
            Your vehicle,
          </span>
        </span>
        <span style={{ display: 'block', overflow: 'hidden' }}>
          <span
            className="h1-ghost"
            style={{ display: 'block', animation: 'wndRise 1.25s var(--ease-expo) 0.28s both' }}
          >
            reinvented.
          </span>
        </span>
      </h1>

      <div style={{ overflow: 'hidden', marginTop: 'clamp(32px, 3.8vw, 55px)' }}>
        <div
          style={{
            animation: 'wndRise 1.15s var(--ease-expo) 0.44s both',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '32px 40px',
          }}
        >
          <p className="hero-p" style={{ maxWidth: 'min(100%, 60ch)' }}>
            Precision wraps, paint protection film, and ceramic coatings — installed by
            certified technicians with an obsession for detail.
          </p>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span ref={ctaRef} className="magnetic-wrap">
              <Button href="#contact" variant="solid">
                Book a consultation &nbsp;→
              </Button>
            </span>
            <Button href="#portfolio" variant="text">
              View portfolio →
            </Button>
          </div>
        </div>
      </div>

      <div style={{ overflow: 'hidden', marginTop: 'clamp(36px, 4.4vw, 64px)' }}>
        <div style={{ animation: 'wndRise 1.35s var(--ease-expo) 0.56s both' }}>
          <ImageFrame
            aspect="1214 / 670"
            caption="HERO IMAGE — WRAPPED MERCEDES E-CLASS"
            parallax
            className="hero-image-frame"
            frameRef={frameRef}
            fillRef={fillRef}
          />
        </div>
      </div>

      <div style={{ marginTop: 'clamp(24px, 2.8vw, 40px)' }}>
        <StatsBar />
      </div>
    </Section>
  );
}
