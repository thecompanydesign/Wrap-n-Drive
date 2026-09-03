export function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className={`menu-icon ${open ? 'menu-icon--open' : ''}`} aria-hidden="true">
      <span className="menu-icon__bar" />
      <span className="menu-icon__bar" />
      <span className="menu-icon__bar" />
    </span>
  );
}
