import { useState, type FormEvent } from 'react';
import { Section } from '../components/layout/Section';
import { Eyebrow } from '../components/ui/Eyebrow';
import { Heading2 } from '../components/ui/Heading2';
import { Field } from '../components/ui/Field';
import { Reveal } from '../components/ui/Reveal';
import { useReveal } from '../hooks/useReveal';
import { siteConfig } from '../data/content';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = 'idle' | 'pending' | 'success';

const emptyForm = { name: '', email: '', vehicle: '', service: '', message: '' };

export function ContactSection() {
  const [form, setForm] = useState(emptyForm);
  const [fieldErrors, setFieldErrors] = useState({ name: false, email: false, vehicle: false });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const formReveal = useReveal<HTMLFormElement>(70);

  const setField = (key: keyof typeof form) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (key in fieldErrors) {
      setFieldErrors((e) => ({ ...e, [key]: false }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const missing: string[] = [];
    const errors = { name: false, email: false, vehicle: false };

    if (!form.name.trim()) {
      missing.push('your name');
      errors.name = true;
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      missing.push('a valid email');
      errors.email = true;
    }
    if (!form.vehicle.trim()) {
      missing.push('your vehicle');
      errors.vehicle = true;
    }

    if (missing.length > 0) {
      setFieldErrors(errors);
      setErrorMessage(`Please add ${missing.join(', ')}.`);
      setStatus('idle');
      return;
    }

    setFieldErrors({ name: false, email: false, vehicle: false });
    setErrorMessage('');
    setStatus('pending');

    // SPEC: reference build has no backend (§5.10 IMPLEMENTATION DECISION).
    // Swap this timeout for a real POST (Formspree, Resend, API route) when one exists,
    // keeping the same pending -> success -> error states.
    window.setTimeout(() => {
      setStatus('success');
      setForm(emptyForm);
    }, 900);
  };

  const statusLine = errorMessage
    ? { text: errorMessage, className: 'form-status--error' }
    : status === 'pending'
      ? { text: 'Sending…', className: 'form-status--pending' }
      : status === 'success'
        ? {
            text: "Thanks — we'll come back to you within one business day.",
            className: 'form-status--success',
          }
        : null;

  return (
    <Section id="contact">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '56px 64px',
          alignItems: 'stretch',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 'clamp(36px, 4vw, 56px)',
          }}
        >
          <div>
            <Reveal delay={0}>
              <Eyebrow>CONTACT</Eyebrow>
            </Reveal>
            <Reveal delay={70} style={{ marginTop: '22px' }}>
              <Heading2 measureCh={20} balance>
                Let&rsquo;s talk about your vehicle.
              </Heading2>
            </Reveal>
            <Reveal delay={140} style={{ marginTop: '20px' }}>
              <p className="body-p" style={{ maxWidth: 'min(100%, 44ch)' }}>
                Book a free 30-minute consultation. We&rsquo;ll talk through your vision, walk you
                through the options, and give you an honest recommendation — no obligation.
              </p>
            </Reveal>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Reveal delay={0} className="contact-detail-row">
              <span className="contact-detail-row__label">Email</span>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="contact-detail-row__value contact-link"
              >
                {siteConfig.contact.email}
              </a>
            </Reveal>
            <Reveal delay={60} className="contact-detail-row">
              <span className="contact-detail-row__label">Phone</span>
              <a href={siteConfig.contact.phoneHref} className="contact-detail-row__value contact-link">
                {siteConfig.contact.phoneDisplay}
              </a>
            </Reveal>
            <Reveal delay={120} className="contact-detail-row">
              <span className="contact-detail-row__label">Location</span>
              <span className="contact-detail-row__value">
                <span className="location-full">{siteConfig.contact.location}</span>
                <span className="location-short">
                  {siteConfig.contact.location.replace(' Supermarket', '')}
                </span>
              </span>
            </Reveal>
          </div>
        </div>

        <form
          ref={formReveal.ref}
          onSubmit={handleSubmit}
          noValidate
          style={{
            ...formReveal.style,
            position: 'relative',
            maxWidth: '543px',
            justifySelf: 'end',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '17px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
              gap: '17px',
            }}
          >
            <Field
              label="Name"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={setField('name')}
              error={fieldErrors.name}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={setField('email')}
              error={fieldErrors.email}
            />
          </div>

          <Field
            label="Vehicle"
            name="vehicle"
            placeholder="Vehicle (e.g. BMW M4 Competition, 2023)"
            value={form.vehicle}
            onChange={setField('vehicle')}
            error={fieldErrors.vehicle}
          />

          <Field
            label="Service interest"
            name="service"
            placeholder="Service interest"
            value={form.service}
            onChange={setField('service')}
          />

          <Field
            as="textarea"
            label="Message"
            name="message"
            placeholder="Tell us about your project..."
            value={form.message}
            onChange={setField('message')}
            rows={4}
          />

          <button type="submit" className="btn btn-form" disabled={status === 'pending'}>
            {status === 'pending' ? 'Sending…' : status === 'success' ? 'Enquiry sent' : 'Send enquiry  →'}
          </button>

          {statusLine && (
            <p role="status" aria-live="polite" className={`form-status ${statusLine.className}`}>
              {statusLine.text}
            </p>
          )}
        </form>
      </div>
    </Section>
  );
}
