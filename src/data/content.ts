import type {
  NavItem,
  Stat,
  Service,
  Project,
  Step,
  Testimonial,
  PriceTier,
  Faq,
  FooterCol,
  SiteConfig,
} from './types';

export const siteConfig: SiteConfig = {
  brand: { name: 'Wrap & Drive', accent: '#e8261c' },
  contact: {
    email: 'wrapndrivelimited@gmail.com',
    phoneDisplay: '0792 391610',
    phoneHref: 'tel:+254792391610',
    location: 'Northern Bypass, Opp Quickmart Supermarket',
    city: 'Nairobi, Kenya',
  },
  legal: {
    copyright: '© 2026 Wrap & Drive Ltd. All rights reserved.',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Cookies', href: '#' },
    ],
  },
  railSections: [
    { id: 'top', number: '01' },
    { id: 'services', number: '02' },
    { id: 'portfolio', number: '03' },
    { id: 'process', number: '04' },
    { id: 'pricing', number: '05' },
    { id: 'contact', number: '06' },
  ],
};

export const navItems: NavItem[] = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
];

export const stats: Stat[] = [
  { value: '100+', label: 'Vehicles completed' },
  { value: '3 years', label: 'In operation' },
  { value: '4.98 / 5', label: 'Average rating' },
  { value: '1 year', label: 'Aftercare support' },
];

export const services: Service[] = [
  {
    number: '01',
    title: 'Full Vehicle Wraps',
    body: 'Every panel covered in premium cast vinyl, with edges wrapped and tucked rather than trimmed at the seam. Over ten finishes including matte, satin, gloss and colour-shift.',
  },
  {
    number: '02',
    title: 'Paint Protection Film',
    body: "Self-healing clear film applied to the full body or to high-impact zones — bonnet, bumper, wings and mirrors. It guards against stone chips and swirls while leaving your paint visible.",
  },
  {
    number: '03',
    title: 'Ceramic Coating',
    body: 'A 9H coating that locks in gloss, repels water and road grime, and makes washing far easier. Applied over factory paint, PPF or a freshly installed wrap.',
  },
  {
    number: '04',
    title: 'Partial Wraps & Accents',
    body: "Roofs, bonnets, mirrors, stripes and accent panels — the quickest way to change a car's character without committing to a full wrap.",
  },
  {
    number: '05',
    title: 'Commercial Fleet',
    body: 'Consistent branding across vans, pickups and cars, scheduled around your operation to keep vehicles on the road. Design, print and installation are handled in-house.',
  },
  {
    number: '06',
    title: 'Custom Design',
    body: 'Our designers work from your reference or brief and mock the artwork onto your exact vehicle model, so you approve the finished look before anything is printed.',
  },
];

export const projects: Project[] = [
  {
    id: 'audi-q5-pink-ppf',
    title: 'Pink Colored PPF',
    subtitle: 'Audi Q5 S line',
    categories: ['full wrap', 'protection'],
    image: { src: '', alt: 'Pink colored PPF wrap on an Audi Q5 S line', aspect: '805/469' },
    badge: 'Full Wrap',
    size: 'feature',
  },
  {
    id: 'porsche-911-red',
    title: 'Red Custom Wrap',
    subtitle: 'Porsche 911 GT3',
    categories: ['full wrap', 'branding'],
    image: { src: '', alt: 'Red custom wrap on a Porsche 911 GT3', aspect: '393/191' },
    size: 'stack',
  },
  {
    id: 'bmw-z4-anime',
    title: 'Custom Anime Wrap',
    subtitle: 'BMW Z4 Roadster',
    categories: ['full wrap'],
    image: { src: '', alt: 'Custom anime wrap on a BMW Z4 Roadster', aspect: '393/191' },
    size: 'stack',
  },
  {
    id: 'maybach-clear-ppf',
    title: 'Clear PPF',
    subtitle: 'Mercedes-Maybach S-Class',
    categories: ['protection'],
    image: { src: '', alt: 'Clear PPF on a Mercedes-Maybach S-Class', aspect: '393/204' },
    size: 'grid',
  },
  {
    id: 'peugeot-208-honey',
    title: 'Custom Honey Wrap',
    subtitle: 'Peugeot 208',
    categories: ['full wrap'],
    image: { src: '', alt: 'Custom honey wrap on a Peugeot 208', aspect: '393/204' },
    size: 'grid',
  },
  {
    id: 'mazda-cx5-turquoise',
    title: 'Turquoise Gradient Wrap',
    subtitle: 'Mazda CX-5',
    categories: ['accent'],
    image: { src: '', alt: 'Turquoise gradient wrap on a Mazda CX-5', aspect: '393/204' },
    size: 'grid',
  },
];

export const filterOptions: { label: string; value: 'all' | Project['categories'][number] }[] = [
  { label: 'All', value: 'all' },
  { label: 'Full Wrap', value: 'full wrap' },
  { label: 'Accent', value: 'accent' },
  { label: 'Protection', value: 'protection' },
  { label: 'Branding', value: 'branding' },
];

export const steps: Step[] = [
  {
    number: '01',
    title: 'Consultation',
    body: 'A detailed conversation about your vision, timeline, and vehicle — no sales pressure, just honest guidance on what’s achievable.',
  },
  {
    number: '02',
    title: 'Design & Quote',
    body: 'Our designers mock up your chosen finish on your exact vehicle model. You approve the design and receive a fixed, itemised quote.',
  },
  {
    number: '03',
    title: 'Preparation',
    body: 'The vehicle is deep-cleaned, paint-corrected, and inspected. Proper prep is the foundation of a wrap that lasts.',
  },
  {
    number: '04',
    title: 'Installation',
    body: "Certified installers work in a climate-controlled bay. Average full wrap: 3–5 days. We don't rush work that has to be perfect.",
  },
  {
    number: '05',
    title: 'Quality Control',
    body: 'Every edge, seam, and panel is reviewed under controlled lighting before the vehicle leaves our facility.',
  },
  {
    number: '06',
    title: 'Handover',
    body: 'You collect a finished vehicle with a written warranty. We walk you through care instructions and remain available for the life of the wrap.',
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "The matte black wrap on my M4 is flawless. Three years later, I still get people asking what paint it is. Wrap & Drive's work outlasted every alternative I'd considered.",
    name: 'James Whitfield',
    role: 'M4 Competition owner',
    featured: true,
  },
  {
    quote:
      'Fifty-two vans wrapped and branded in eleven days. Consistent graphics, no delays, zero rework.',
    name: 'Sophia Chen',
    role: 'Fleet Manager, Apex Logistics',
  },
  {
    quote:
      'The PPF installation on my 911 is genuinely invisible. The team explained every step and delivered exactly what they promised.',
    name: 'Marcus Bell',
    role: 'Porsche collector',
  },
];

export const priceTiers: PriceTier[] = [
  {
    number: '01',
    label: 'ACCENT',
    price: 'From KES 35,000',
    description: 'Partial wraps, accent panels and roof sections.',
    features: ['Up to 3 panels', '3M or Avery vinyl', '2-year warranty', 'Paint-safe removal'],
    cta: 'Get a quote',
  },
  {
    number: '02',
    label: 'FULL WRAP',
    price: 'From KES 80,000',
    description: 'Complete exterior transformation, bumper to bumper.',
    features: [
      'Full exterior',
      'Premium vinyl — 10+ finishes',
      '5-year warranty',
      'Paint correction included',
      'Design consultation',
    ],
    cta: 'Get a quote',
    emphasis: true,
  },
  {
    number: '03',
    label: 'PROTECTION',
    price: 'From KES 150,000',
    description: 'PPF, ceramic coating or a combination of both.',
    features: [
      'Full or zone PPF',
      '9H ceramic coating',
      'Up to 10-year warranty',
      'Self-healing film',
      'Annual inspection',
    ],
    cta: 'Get a quote',
  },
];

export const faqs: Faq[] = [
  {
    question: 'How long does a full wrap take?',
    answer:
      'Three to five days for most vehicles, covering prep, installation and quality control. Partial wraps and accent work are usually same-day or next-day.',
  },
  {
    question: 'Will a wrap damage my paint?',
    answer:
      'No. On factory paint in sound condition the vinyl protects the surface underneath, and removal is done with heat so the paint is left as it was.',
  },
  {
    question: 'How long will a wrap last?',
    answer:
      'Five years on a full wrap in premium cast vinyl and two years on accent work — longer again with a ceramic coating and garage parking.',
  },
  {
    question: 'Can I wrap a leased vehicle?',
    answer:
      'Yes, and it is one of the most common reasons owners wrap. Removal is paint-safe, so the vehicle goes back in its original colour at the end of the lease.',
  },
  {
    question: 'Do you offer a warranty?',
    answer:
      'Every job leaves with a written warranty — five years on full wraps, two on accents and up to ten years on protection packages. Aftercare support runs for a year.',
  },
];

export const footerColumns: FooterCol[] = [
  {
    heading: 'SERVICES',
    links: [
      { label: 'Vinyl wraps', href: '#services' },
      { label: 'PPF & Ceramic Coating', href: '#services' },
      { label: 'Tints', href: '#services' },
      { label: 'face-lift & Bodykits', href: '#services' },
    ],
  },
  {
    heading: 'STUDIO',
    links: [
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'Process', href: '#process' },
      { label: 'Services', href: '#services' },
      { label: 'Pricing', href: '#pricing' },
    ],
  },
];
