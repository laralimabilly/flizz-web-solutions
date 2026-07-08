import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, Mail, Phone, Send, X } from 'lucide-react';
import type { ContactForm } from '../types';
import type { Lang } from '../i18n/ui';
import { useTranslations } from '../i18n/utils';

/* Slide-over contact form for the service pages. Any link on the page whose
   href ends in "#contact" opens it instead of navigating to the home page;
   without JS those links still work as a normal fallback. Submission hands
   off to the visitor's mail client, same as the home Contact section. */
const ContactPanel: React.FC<{ lang?: Lang }> = ({ lang = 'en' }) => {
  const t = useTranslations(lang);
  const [open, setOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [honeypot, setHoneypot] = useState('');

  // Intercept every "#contact" link on the page.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.('a[href$="#contact"]');
      if (!link) return;
      e.preventDefault();
      setOpen(true);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Escape closes; body scroll locks while open; first field gets focus.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => nameRef.current?.focus(), 350);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  // Mail-client fallback, offered when the endpoint is unreachable.
  const mailtoHref = () => {
    const subject = encodeURIComponent(`${t.contact.mailSubject} ${formData.name}${formData.company ? ` (${formData.company})` : ''}`);
    const body = encodeURIComponent(`${formData.message}\n\n--\n${formData.name}\n${formData.email}${formData.company ? `\n${formData.company}` : ''}`);
    return `mailto:felipe@flizz.com.br?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, website: honeypot }),
      });
      const data = await res.json();
      if (!res.ok || data.ok !== true) throw new Error('send_failed');
      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClasses =
    'w-full bg-transparent border-0 border-b border-line rounded-none px-0 py-3.5 text-light text-lg placeholder:text-light/25 focus:border-accent focus:outline-none transition-colors duration-300';
  const labelClasses = 'block text-muted font-mono text-xs uppercase tracking-widest mb-1.5';

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[75] bg-night/70 backdrop-blur-sm transition-opacity duration-500 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.contact.title}
        className={`fixed inset-y-0 right-0 z-[80] w-full max-w-lg bg-night border-l border-line shadow-card flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Accent edge glow */}
        <span className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-accent/60 to-transparent" aria-hidden="true" />

        <div className="flex items-start justify-between gap-6 px-8 md:px-10 pt-8 md:pt-10">
          <div>
            <p className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-4">
              {'//'} {t.contact.eyebrow}
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-light leading-[0.95]">
              {t.contact.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t.servicePage.close}
            className="shrink-0 w-11 h-11 rounded-full border border-line flex items-center justify-center text-muted hover:text-accent hover:border-accent/60 hover:rotate-90 transition-all duration-300 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 md:px-10 py-8">
          <form onSubmit={handleSubmit} className="relative space-y-6">
            {/* Honeypot: humans never see it, bots fill it */}
            <div className="absolute -left-[9999px] top-0" aria-hidden="true">
              <label htmlFor="panel-website">Website</label>
              <input
                type="text"
                id="panel-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="panel-name" className={labelClasses}>{t.contact.nameLabel}</label>
                <input
                  ref={nameRef}
                  type="text"
                  id="panel-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className={inputClasses}
                  placeholder={t.contact.namePlaceholder}
                />
              </div>
              <div>
                <label htmlFor="panel-email" className={labelClasses}>{t.contact.emailFieldLabel}</label>
                <input
                  type="email"
                  id="panel-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className={inputClasses}
                  placeholder={t.contact.emailPlaceholder}
                />
              </div>
            </div>

            <div>
              <label htmlFor="panel-company" className={labelClasses}>{t.contact.companyLabel}</label>
              <input
                type="text"
                id="panel-company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                autoComplete="organization"
                className={inputClasses}
                placeholder={t.contact.companyPlaceholder}
              />
            </div>

            <div>
              <label htmlFor="panel-message" className={labelClasses}>{t.contact.messageLabel}</label>
              <textarea
                id="panel-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className={`${inputClasses} resize-none`}
                placeholder={t.contact.messagePlaceholder}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="group w-full flex items-center justify-center gap-3 bg-accent text-night py-5 rounded-full font-display font-bold text-lg hover:shadow-glow hover:scale-[1.02] transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-wait"
            >
              {status === 'sending' ? t.contact.sending : t.contact.submit}
              <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden="true" />
            </button>

            <div aria-live="polite">
              {status === 'success' && (
                <p className="flex items-center gap-3 border border-accent/30 bg-accent/10 text-accent rounded-xl px-5 py-4 font-medium">
                  <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                  {t.contact.success}
                </p>
              )}
              {status === 'error' && (
                <p className="border border-line bg-surface/60 text-light rounded-xl px-5 py-4">
                  {t.contact.error}{' '}
                  {t.contact.errorFallback}{' '}
                  <a href={mailtoHref()} className="font-semibold text-accent underline underline-offset-4">
                    felipe@flizz.com.br
                  </a>
                </p>
              )}
            </div>
          </form>

          {/* Direct channels */}
          <div className="mt-10 pt-8 border-t border-line space-y-4">
            <a
              href="mailto:felipe@flizz.com.br"
              className="group flex items-center justify-between gap-4 text-light hover:text-accent transition-colors duration-300"
            >
              <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted">
                <Mail className="w-4 h-4 text-accent" aria-hidden="true" />
                {t.contact.emailLabel}
              </span>
              <span className="flex items-center gap-1.5">
                felipe@flizz.com.br
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </span>
            </a>
            <a
              href="tel:+5517981449654"
              className="group flex items-center justify-between gap-4 text-light hover:text-accent transition-colors duration-300"
            >
              <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted">
                <Phone className="w-4 h-4 text-accent" aria-hidden="true" />
                {t.contact.phoneLabel}
              </span>
              <span>+55 (17) 98144-9654</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPanel;
