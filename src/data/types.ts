export type NavItem = { label: string; href: string };

export type Stat = { value: string; label: string };

export type Service = { number: string; title: string; body: string };

export type ProjectCategory = 'full wrap' | 'accent' | 'protection' | 'branding';

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  categories: ProjectCategory[];
  image: { src: string; alt: string; aspect: '805/469' | '393/191' | '393/204' };
  badge?: string;
  size: 'feature' | 'stack' | 'grid';
};

export type Step = { number: string; title: string; body: string };

export type Testimonial = { quote: string; name: string; role: string; featured?: boolean };

export type PriceTier = {
  number: string;
  label: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  emphasis?: boolean;
};

export type Faq = { question: string; answer: string };

export type FooterCol = { heading: string; links: { label: string; href: string }[] };

export type SiteConfig = {
  brand: { name: string; accent: string };
  contact: { email: string; phoneDisplay: string; phoneHref: string; location: string; city: string };
  legal: { copyright: string; links: NavItem[] };
  railSections: { id: string; number: string }[];
};
