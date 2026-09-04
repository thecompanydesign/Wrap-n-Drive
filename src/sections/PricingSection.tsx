import { Section } from '../components/layout/Section';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import { priceTiers } from '../data/content';
import type { PriceTier } from '../data/types';

function PriceCard({ tier, delay }: { tier: PriceTier; delay: number }) {
  const emphasis = Boolean(tier.emphasis);

  return (
    <Reveal delay={delay} variant="scale" style={{ height: '100%' }}>
      <div className={`price-card ${emphasis ? 'price-card--emphasis' : ''}`}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <span style={{ fontSize: '11px', letterSpacing: '0.04em', color: emphasis ? '#6f6f6f' : 'var(--price-numeral)' }}>
              {tier.number}
            </span>
            <span
              className="eyebrow"
              style={{ color: emphasis ? 'var(--muted-dark)' : 'var(--muted)' }}
            >
              {tier.label}
            </span>
          </div>
          {emphasis && <span className="price-chip">Most popular</span>}
        </div>

        <p className={`price ${emphasis ? 'price--onDark' : ''}`} style={{ marginTop: '26px' }}>
          {tier.price}
        </p>
        <p
          className="body-p"
          style={{ marginTop: '16px', lineHeight: 1.6, color: emphasis ? 'var(--muted-dark)' : 'var(--body)' }}
        >
          {tier.description}
        </p>

        <ul style={{ marginTop: '34px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {tier.features.map((f) => (
            <li key={f} className="price-feature">
              <span
                className="price-feature__marker"
                style={{ color: emphasis ? 'var(--on-dark-marker)' : 'var(--muted)' }}
              >
                *
              </span>
              <span style={{ fontSize: '15px', color: emphasis ? '#ffffff' : 'var(--ink)' }}>{f}</span>
            </li>
          ))}
        </ul>

        <div style={{ margin: 'auto 0 0', paddingTop: '24px' }}>
          <Button variant={emphasis ? 'onDark' : 'light'}>{tier.cta}</Button>
        </div>
      </div>
    </Reveal>
  );
}

export function PricingSection() {
  return (
    <Section id="pricing">
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '20px 24px',
        }}
      >
        <SectionHeader eyebrow="PRICING" heading="Transparent pricing." />
        <Reveal delay={140} style={{ marginTop: '6px' }}>
          <p
            className="body-p"
            style={{ maxWidth: 'min(100%, 42ch)', textAlign: 'right', marginLeft: 'auto' }}
          >
            Every quote is fixed before we start. No surprises at collection.
          </p>
        </Reveal>
      </div>

      <div
        style={{
          marginTop: '40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
          gap: '20px',
          alignItems: 'center',
        }}
      >
        {priceTiers.map((tier, i) => (
          <PriceCard key={tier.number} tier={tier} delay={i * 90} />
        ))}
      </div>
    </Section>
  );
}
