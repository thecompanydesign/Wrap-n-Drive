/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      // SPEC: the design has no breakpoints (fluid-first via clamp/ch/auto-fit).
      // These exist only for the rare defect-driven media query, per §9.
      sm: '600px',
      md: '834px',
      lg: '1200px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: 'var(--white)',
      ink: 'var(--ink)',
      'ink-btn': 'var(--ink-btn)',
      'ink-btn-hover': 'var(--ink-btn-hover)',
      'ink-chip': 'var(--ink-chip)',
      body: 'var(--body)',
      muted: 'var(--muted)',
      'muted-dark': 'var(--muted-dark)',
      numeral: 'var(--numeral)',
      placeholder: 'var(--placeholder)',
      'hero-ghost': 'var(--hero-ghost)',
      'rail-idle': 'var(--rail-idle)',
      'price-numeral': 'var(--price-numeral)',
      frame: 'var(--frame)',
      surface: 'var(--surface)',
      field: 'var(--field)',
      'field-hover': 'var(--field-hover)',
      tint: 'var(--tint)',
      rule: 'var(--rule)',
      'rule-strong': 'var(--rule-strong)',
      'rule-hover': 'var(--rule-hover)',
      error: 'var(--error)',
      'error-bg': 'var(--error-bg)',
      accent: 'var(--accent)',
    },
    fontFamily: {
      sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      mono: ['ui-monospace', '"SF Mono"', 'Menlo', 'monospace'],
    },
    borderRadius: {
      none: '0',
      input: '10px',
      frame: '12px',
      card: '14px',
      pill: '999px',
      full: '9999px',
    },
    maxWidth: {
      page: '1440px',
      rail: '1276px',
      content: '1216px',
    },
    extend: {
      transitionTimingFunction: {
        expo: 'cubic-bezier(.16,1,.3,1)',
      },
      zIndex: {
        header: '60',
        rail: '55',
        veil: '200',
      },
    },
  },
  corePlugins: {
    // SPEC: reset is authored by hand in tokens.css to match §2 exactly.
    preflight: false,
  },
  plugins: [],
}
