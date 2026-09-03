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
              <div
                className={`process-step ${
                  i < 4 ? 'process-step--bottom-border' : 'process-step--top-border'
                }`}
              >
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
