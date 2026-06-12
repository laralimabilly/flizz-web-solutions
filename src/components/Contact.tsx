import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Mail, Phone, MapPin, Send, Clock, Users } from 'lucide-react';
import type { ContactForm } from '../types';

gsap.registerPlugin(ScrollTrigger, SplitText);

const contactDetails = [
  { icon: Mail, label: 'Email', value: 'felipe@flizz.com.br', href: 'mailto:felipe@flizz.com.br' },
  { icon: Phone, label: 'Phone / WhatsApp', value: '+55 (17) 98144-9654', href: 'tel:+5517981449654' },
  { icon: MapPin, label: 'Location', value: 'Brazil & US — Remote Worldwide' },
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    company: '',
    message: '',
  });

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
        gsap.from(split.chars, {
          yPercent: 110,
          opacity: 0,
          stagger: 0.025,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        });

        gsap.from([eyebrowRef.current, subtitleRef.current], {
          opacity: 0,
          y: 40,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        });

        gsap.from(leftContentRef.current, {
          opacity: 0,
          x: -60,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: leftContentRef.current, start: 'top 85%' },
        });

        gsap.from(formWrapRef.current, {
          opacity: 0,
          x: 60,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // No backend yet — hand off to the user's mail client with everything pre-filled
    const subject = encodeURIComponent(`Project inquiry from ${formData.name}${formData.company ? ` (${formData.company})` : ''}`);
    const body = encodeURIComponent(`${formData.message}\n\n—\n${formData.name}\n${formData.email}${formData.company ? `\n${formData.company}` : ''}`);
    window.location.href = `mailto:felipe@flizz.com.br?subject=${subject}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClasses =
    'w-full px-4 py-3.5 bg-night/60 border border-line rounded-xl text-light placeholder:text-muted/50 focus:border-accent focus:shadow-glow focus:outline-none transition-all duration-300';

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 md:py-40 bg-night bg-noise overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/3 w-[34rem] h-[34rem] bg-accent/10 rounded-full blur-[180px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section heading */}
        <div className="max-w-4xl mb-20">
          <p ref={eyebrowRef} className="font-mono text-accent text-sm tracking-[0.3em] uppercase mb-6">
            {'//'} 04 — Get in touch
          </p>
          <h2 ref={titleRef} className="text-6xl md:text-8xl font-display font-bold text-light leading-[0.95] overflow-hidden">
            LET'S TALK
          </h2>
          <p ref={subtitleRef} className="text-lg md:text-xl text-muted max-w-2xl mt-6 leading-relaxed">
            Ready to transform your digital presence? Let's discuss your project and bring your vision to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Information */}
          <div ref={leftContentRef} className="space-y-10">
            <p className="text-muted text-lg leading-relaxed max-w-lg">
              Whether you need a complete digital transformation or want to enhance your existing
              platform, we're ready to make it happen — in English or Portuguese.
            </p>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactDetails.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <>
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center border border-accent/25 group-hover:bg-accent/20 group-hover:shadow-glow transition-all duration-300 shrink-0">
                      <Icon className="w-5 h-5 text-accent" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="font-mono text-xs uppercase tracking-widest text-muted">{label}</div>
                      <div className="text-light font-medium mt-0.5 group-hover:text-accent transition-colors duration-300">{value}</div>
                    </div>
                  </>
                );

                return href ? (
                  <a key={label} href={href} className="group flex items-center gap-4 bg-surface/60 border border-line rounded-2xl p-4 hover:border-accent/40 transition-colors duration-300">
                    {inner}
                  </a>
                ) : (
                  <div key={label} className="group flex items-center gap-4 bg-surface/60 border border-line rounded-2xl p-4">
                    {inner}
                  </div>
                );
              })}
            </div>

            {/* Additional Info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="spotlight-card bg-surface/60 rounded-2xl p-6 border border-line hover:border-accent/40 transition-colors duration-300">
                <Clock className="w-7 h-7 text-accent mb-3" aria-hidden="true" />
                <h3 className="font-bold text-light mb-1">Response Time</h3>
                <p className="text-muted text-sm">We typically respond within 24 hours</p>
              </div>

              <div className="spotlight-card bg-surface/60 rounded-2xl p-6 border border-line hover:border-accent/40 transition-colors duration-300">
                <Users className="w-7 h-7 text-accent mb-3" aria-hidden="true" />
                <h3 className="font-bold text-light mb-1">Free Consultation</h3>
                <p className="text-muted text-sm">30-minute strategy session included</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formWrapRef} className="bg-surface/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-line">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-light/80 font-mono text-xs uppercase tracking-widest mb-2">
                    Name *
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
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-light/80 font-mono text-xs uppercase tracking-widest mb-2">
                    Email *
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
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-light/80 font-mono text-xs uppercase tracking-widest mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  autoComplete="organization"
                  className={inputClasses}
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-light/80 font-mono text-xs uppercase tracking-widest mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={`${inputClasses} resize-none`}
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                className="group w-full bg-accent text-night px-8 py-4 rounded-full font-bold text-lg hover:shadow-glow hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
              >
                Send Message
                <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
