import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import '../utils/scrollTriggerSetup';
import { Mail, Phone, MapPin, Send, Clock, Users, CheckCircle2 } from 'lucide-react';
import type { ContactForm } from '../types';
import type { Lang } from '../i18n/ui';
import { useTranslations } from '../i18n/utils';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Contact: React.FC<{ lang?: Lang }> = ({ lang = 'en' }) => {
  const t = useTranslations(lang);

  const contactDetails = [
    { icon: Mail, label: t.contact.emailLabel, value: 'felipe@flizz.com.br', href: 'mailto:felipe@flizz.com.br' },
    { icon: Phone, label: t.contact.phoneLabel, value: '+55 (17) 98144-9654', href: 'tel:+5517981449654' },
    { icon: MapPin, label: t.contact.locationLabel, value: t.contact.locationValue },
  ];

  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [honeypot, setHoneypot] = useState('');

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const formWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const split = new SplitText(titleRef.current, { type: 'chars' });
        gsap.fromTo(split.chars, {
          yPercent: 110,
          opacity: 0,
        }, {
          yPercent: 0,
          opacity: 1,
          stagger: 0.025,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        });

        gsap.fromTo([eyebrowRef.current, subtitleRef.current], {
          opacity: 0,
          y: 40,
        }, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        });

        gsap.fromTo(leftContentRef.current, {
          opacity: 0,
          x: -60,
        }, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: leftContentRef.current, start: 'top 85%' },
        });

        gsap.fromTo(formWrapRef.current, {
          opacity: 0,
          x: 60,
        }, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: formWrapRef.current, start: 'top 85%' },
        });

        return () => split.revert();
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

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
    'w-full bg-transparent border-0 border-b border-night/15 rounded-none px-0 py-4 text-night text-lg placeholder:text-night/30 focus:border-night focus:outline-none transition-colors duration-300';

  return (
    <section ref={sectionRef} id="contact" className="relative py-36 md:py-52 bg-light text-night">
      <div className="container mx-auto px-6">
        {/* Section heading */}
        <div className="max-w-4xl mb-24 md:mb-28">
          <p ref={eyebrowRef} className="font-mono text-accent-deep text-sm tracking-[0.3em] uppercase mb-6">
            {'//'} 04 / {t.contact.eyebrow}
          </p>
          <h2 ref={titleRef} className="text-6xl md:text-8xl font-display font-bold leading-[0.95] overflow-hidden">
            {t.contact.title}
          </h2>
          <p ref={subtitleRef} className="text-lg md:text-xl text-night/60 max-w-2xl mt-6 leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Information */}
          <div ref={leftContentRef} className="space-y-10">
            <p className="text-night/60 text-lg leading-relaxed max-w-lg">
              {t.contact.intro}
            </p>

            {/* Contact Details: hairline index rows */}
            <div>
              {contactDetails.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <>
                    <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-night/50">
                      <Icon className="w-4 h-4 text-accent-deep" aria-hidden="true" />
                      {label}
                    </span>
                    <span className="text-night text-lg group-hover:text-accent-deep transition-colors duration-300 text-right">
                      {value}
                    </span>
                  </>
                );

                return href ? (
                  <a key={label} href={href} className="group flex items-center justify-between gap-6 border-t border-night/10 py-6">
                    {inner}
                  </a>
                ) : (
                  <div key={label} className="group flex items-center justify-between gap-6 border-t border-night/10 py-6">
                    {inner}
                  </div>
                );
              })}

              <div className="flex items-center justify-between gap-6 border-t border-night/10 py-6">
                <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-night/50">
                  <Clock className="w-4 h-4 text-accent-deep" aria-hidden="true" />
                  {t.contact.responseTimeLabel}
                </span>
                <span className="text-night text-lg text-right">{t.contact.responseTimeValue}</span>
              </div>
              <div className="flex items-center justify-between gap-6 border-y border-night/10 py-6">
                <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-night/50">
                  <Users className="w-4 h-4 text-accent-deep" aria-hidden="true" />
                  {t.contact.freeConsultLabel}
                </span>
                <span className="text-night text-lg text-right">{t.contact.freeConsultValue}</span>
              </div>
            </div>
          </div>

          {/* Contact Form: editorial, no box */}
          <div ref={formWrapRef}>
            <form onSubmit={handleSubmit} className="relative space-y-6">
              {/* Honeypot: humans never see it, bots fill it */}
              <div className="absolute -left-[9999px] top-0" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-night/50 font-mono text-xs uppercase tracking-widest mb-2">
                    {t.contact.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="name"
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
                  <label htmlFor="email" className="block text-night/50 font-mono text-xs uppercase tracking-widest mb-2">
                    {t.contact.emailFieldLabel}
                  </label>
                  <input
                    type="email"
                    id="email"
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
                <label htmlFor="company" className="block text-night/50 font-mono text-xs uppercase tracking-widest mb-2">
                  {t.contact.companyLabel}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  autoComplete="organization"
                  className={inputClasses}
                  placeholder={t.contact.companyPlaceholder}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-night/50 font-mono text-xs uppercase tracking-widest mb-2">
                  {t.contact.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={`${inputClasses} resize-none`}
                  placeholder={t.contact.messagePlaceholder}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group relative w-full overflow-hidden border border-night/15 hover:border-night transition-colors duration-300 mt-4 cursor-pointer disabled:opacity-60 disabled:cursor-wait"
              >
                <span
                  className="absolute inset-0 bg-night translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
                  aria-hidden="true"
                />
                <span className="relative z-10 flex items-center justify-center gap-3 py-6 font-display font-bold text-xl md:text-2xl text-night group-hover:text-accent transition-colors duration-300">
                  {status === 'sending' ? t.contact.sending : t.contact.submit}
                  <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </button>

              <div aria-live="polite">
                {status === 'success' && (
                  <p className="flex items-center gap-3 border border-accent-deep/30 bg-accent/10 text-accent-deep rounded-xl px-5 py-4 font-medium">
                    <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                    {t.contact.success}
                  </p>
                )}
                {status === 'error' && (
                  <p className="border border-night/15 bg-night/[0.04] text-night rounded-xl px-5 py-4">
                    {t.contact.error}{' '}
                    {t.contact.errorFallback}{' '}
                    <a href={mailtoHref()} className="font-semibold text-accent-deep underline underline-offset-4">
                      felipe@flizz.com.br
                    </a>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
