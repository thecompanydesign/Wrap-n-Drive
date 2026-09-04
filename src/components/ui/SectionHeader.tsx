import type { ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';
import { Heading2 } from './Heading2';
import { Reveal } from './Reveal';

type SectionHeaderProps = {
  eyebrow: string;
  heading: ReactNode;
  measureCh?: number;
  balance?: boolean;
  multiline?: boolean;
  headingGap?: string;
};

export function SectionHeader({
  eyebrow,
  heading,
  measureCh,
  balance,
  multiline,
  headingGap = '22px',
}: SectionHeaderProps) {
  return (
    <div>
      <Reveal delay={0}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={70} variant="mask" style={{ marginTop: headingGap }}>
        <Heading2 measureCh={measureCh} balance={balance} multiline={multiline}>
          {heading}
        </Heading2>
      </Reveal>
    </div>
  );
}
