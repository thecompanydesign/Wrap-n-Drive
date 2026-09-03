import type { ReactNode } from 'react';

type PillProps = {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

export function Pill({ active, onClick, children }: PillProps) {
  return (
    <button
      type="button"
      className={`pill ${active ? 'pill--active' : 'pill--idle'}`}
      onClick={onClick}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
