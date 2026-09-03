import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'solid' | 'solid-small' | 'onDark' | 'light' | 'text';

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

const classFor: Record<Variant, string> = {
  solid: 'btn btn-solid',
  'solid-small': 'btn btn-solid btn-solid--small',
  onDark: 'btn btn-onDark',
  light: 'btn btn-light',
  text: 'btn-text',
};

export function Button(props: ButtonAsButton | ButtonAsAnchor) {
  const { variant = 'solid', children, className = '', ...rest } = props;
  const classes = `${classFor[variant]} ${className}`.trim();

  if ('href' in rest && rest.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
