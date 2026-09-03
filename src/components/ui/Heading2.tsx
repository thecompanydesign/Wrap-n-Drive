import type { ReactNode } from 'react';

type Heading2Props = {
  children: ReactNode;
  /** ch measure that forces the authored line count (e.g. 16 -> 3 lines on Services). */
  measureCh?: number;
  /** text-wrap: balance for the three balanced headings (Services, FAQ, Contact). */
  balance?: boolean;
  multiline?: boolean;
  className?: string;
};

export function Heading2({ children, measureCh, balance, multiline, className }: Heading2Props) {
  return (
    <h2
      className={`h2 ${multiline ? 'h2--multiline' : ''} ${className ?? ''}`}
      style={{
        maxWidth: measureCh ? `min(100%, ${measureCh}ch)` : undefined,
        textWrap: balance ? 'balance' : 'pretty',
      }}
    >
      {children}
    </h2>
  );
}
