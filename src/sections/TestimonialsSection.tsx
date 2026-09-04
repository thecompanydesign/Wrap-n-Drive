import { Section } from '../components/layout/Section';
import { Eyebrow } from '../components/ui/Eyebrow';
import { Reveal } from '../components/ui/Reveal';
import { testimonials } from '../data/content';

export function TestimonialsSection() {
  const featured = testimonials.find((t) => t.featured) ?? testimonials[0];
  const secondary = testimonials.filter((t) => !t.featured);

  return (
    <Section>
      <Reveal delay={0}>
        <Eyebrow>WHAT CLIENTS SAY</Eyebrow>
      </Reveal>

      <Reveal delay={70} variant="mask" style={{ marginTop: 'clamp(28px, 3vw, 44px)' }}>
        <p className="pull-quote" style={{ maxWidth: 'min(100%, 56ch)' }}>
          &ldquo;{featured.quote}&rdquo;
        </p>
      </Reveal>
      <Reveal delay={140}>
        <div
          style={{
            borderLeft: '2px solid var(--rule-strong)',
            paddingLeft: '14px',
            marginTop: '34px',
          }}
        >
          <p className="row-title" style={{ fontWeight: 600, fontSize: '14px' }}>
            {featured.name}
          </p>
          <p className="small-print" style={{ marginTop: '5px' }}>
            {featured.role}
          </p>
        </div>
      </Reveal>

      <div className="quote-block" style={{ marginTop: 'clamp(48px, 5vw, 72px)' }}>
        {secondary.map((t, i) => (
          <Reveal
            key={t.name}
            delay={i * 90}
            variant="scale"
            className={`quote-cell ${i === 1 ? 'quote-cell--divided' : ''}`}
          >
            <p className="body-p" style={{ fontSize: '15px', lineHeight: 1.6 }}>
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="row-title" style={{ fontWeight: 600, fontSize: '14px', marginTop: '30px' }}>
              {t.name}
            </p>
            <p className="small-print" style={{ marginTop: '4px' }}>
              {t.role}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
