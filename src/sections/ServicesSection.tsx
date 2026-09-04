import { useState } from 'react';
import { Section } from '../components/layout/Section';
import { TwoColumn } from '../components/layout/TwoColumn';
import { SectionHeader } from '../components/ui/SectionHeader';
import { AccordionRow } from '../components/ui/AccordionRow';
import { Reveal } from '../components/ui/Reveal';
import { services } from '../data/content';

export function ServicesSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Section id="services" topPadding="clamp(72px, 8.2vw, 118px)">
      <TwoColumn
        label={
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <SectionHeader
              eyebrow="SERVICES"
              heading="Everything your vehicle deserves."
              measureCh={16}
              balance
            />
            <Reveal delay={140} style={{ margin: 'auto 0 6px' }}>
              <p className="body-p" style={{ maxWidth: 'min(100%, 42ch)' }}>
                From a single accent panel to a full commercial fleet, every project receives the
                same standard of care.
              </p>
            </Reveal>
          </div>
        }
      >
        <div>
          {services.map((s, i) => (
            <Reveal key={s.number} delay={i * 60}>
              <AccordionRow
                id={`service-${s.number}`}
                numeral={s.number}
                title={s.title}
                open={openId === s.number}
                onToggle={() => setOpenId((cur) => (cur === s.number ? null : s.number))}
                isFirst={i === 0}
              >
                {s.body}
              </AccordionRow>
            </Reveal>
          ))}
        </div>
      </TwoColumn>
    </Section>
  );
}
