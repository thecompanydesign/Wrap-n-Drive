export function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="13"
      height="8"
      viewBox="0 0 13 8"
      fill="none"
      aria-hidden="true"
      className={`accordion-row__chevron ${open ? 'accordion-row__chevron--open' : ''}`}
    >
      <path d="M1 1.5 L6.5 6.5 L12 1.5" stroke="#8a8a8a" strokeWidth="1.4" />
    </svg>
  );
}
