import { Section } from '../components/layout/Section';
import { TwoColumn } from '../components/layout/TwoColumn';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Reveal } from '../components/ui/Reveal';
import { steps } from '../data/content';

export function ProcessSection() {
  return (
    <Section id="process">
      <TwoColumn label={<SectionHeader eyebrow="PROCESS" heading="How we work." />}>
        <div
          style={{
            marginTop: '-36px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            columnGap: '47px',
            rowGap: 0,
          }}
        >
          {steps.map((s, i) => (
            <Reveal key={s.number} delay={i * 80}>
              {/* Bottom-border only, on the first two rows (i<4) — a mixed
                  bottom+top scheme doubled the rule at the row2/row3 seam
                  since both edges met at the same boundary. */}
              <div className={`process-step ${i < 4 ? 'process-step--bottom-border' : ''}`}>
                <p className="numeral-text">{s.number}</p>
                <p className="row-title" style={{ marginTop: '16px' }}>
                  {s.title}
                </p>
                <p className="body-p" style={{ marginTop: '12px' }}>
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </TwoColumn>
    </Section>
  );
}
