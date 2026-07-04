import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import '../utils/scrollTriggerSetup';
import { Palette, Code2, Smartphone, Cloud, ArrowUpRight, Plus } from 'lucide-react';
import type { Lang } from '../i18n/ui';
import { useTranslations } from '../i18n/utils';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Icons parallel the service order in the i18n dictionary (ui.solutions.services).
const serviceIcons = [Code2, Smartphone, Cloud, Palette];

const Solutions: React.FC<{ lang?: Lang }> = ({ lang = 'en' }) => {
  const t = useTranslations(lang);
  const services = t.solutions.services;
  const [openIndex, setOpenIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

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

        rowRefs.current.forEach((row) => {
          if (!row) return;
          gsap.fromTo(row, {
            opacity: 0,
            y: 60,
          }, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 92%' },
          });
        });

        return () => split.revert();
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  // No overflow-hidden on the section; it would clip the expanding rows' focus
  // rings and the glow wrapper handles its own clipping.
  return (
    <section ref={sectionRef} id="solutions" className="relative py-36 md:py-52 bg-night bg-noise">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 -left-40 w-[30rem] h-[30rem] bg-accent/10 rounded-full blur-[160px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section heading */}
        <div className="max-w-4xl mb-24 md:mb-32">
          <p ref={eyebrowRef} className="font-mono text-accent text-sm tracking-[0.3em] uppercase mb-6">
            {'//'} 01 / {t.solutions.eyebrow}
          </p>
          <h2 ref={titleRef} className="text-6xl md:text-8xl font-display font-bold text-light leading-[0.95] overflow-hidden">
            {t.solutions.title}
          </h2>
          <p ref={subtitleRef} className="text-lg md:text-xl text-muted max-w-2xl mt-6 leading-relaxed">
            {t.solutions.subtitle}
          </p>
        </div>

        {/* Service index: typographic rows, not cards */}
        <div>
          {services.map((service, index) => {
            const IconComponent = serviceIcons[index];
            const isOpen = openIndex === index;

            return (
              <div
                key={service.title}
                ref={(el) => { rowRefs.current[index] = el; }}
                className="border-t border-line last:border-b"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${index}`}
                  className="group w-full grid grid-cols-12 items-center gap-4 py-10 md:py-16 text-left cursor-pointer"
                >
                  <span className="col-span-2 md:col-span-1 font-mono text-sm text-muted/60 group-hover:text-accent transition-colors duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3
                    className={`col-span-8 md:col-span-7 font-display font-bold leading-[1.05] text-[clamp(1.9rem,5.5vw,4.5rem)] transition-transform duration-500 ${
                      isOpen ? 'title-hollow is-open translate-x-2 md:translate-x-4' : 'title-hollow'
                    }`}
                  >
                    {service.title}
                  </h3>

                  <span className="hidden md:block md:col-span-3 font-mono text-xs uppercase tracking-[0.25em] text-muted group-hover:text-accent transition-colors duration-300">
                    {service.tagline}
                  </span>

                  <span className="col-span-2 md:col-span-1 justify-self-end">
                    <Plus
                      className={`w-7 h-7 md:w-9 md:h-9 transition-transform duration-500 ${
                        isOpen ? 'rotate-45 text-accent' : 'text-muted group-hover:text-accent group-hover:rotate-90'
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                </button>

                {/* Expanding detail panel */}
                <div
                  id={`service-panel-${index}`}
                  className="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="grid md:grid-cols-12 gap-8 pb-12 md:pb-16">
                      <div className="md:col-start-2 md:col-span-6">
                        <IconComponent className="w-10 h-10 text-accent mb-6" aria-hidden="true" />
                        <p className="text-lg md:text-xl text-muted leading-relaxed max-w-xl">
                          {service.description}
                        </p>
                        <a
                          href="#contact"
                          className="group/link inline-flex items-center gap-2 mt-8 font-mono text-sm uppercase tracking-[0.2em] text-accent"
                        >
                          <span className="border-b border-accent/40 group-hover/link:border-accent transition-colors duration-300 pb-1">
                            {t.solutions.startThis}
                          </span>
                          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" aria-hidden="true" />
                        </a>
                      </div>

                      <ul className="md:col-span-4 self-end">
                        {service.features.map((feature, i) => (
                          <li
                            key={feature}
                            className="flex items-baseline justify-between gap-4 border-t border-line py-3 font-mono text-sm text-light/70"
                          >
                            <span>{feature}</span>
                            <span className="text-muted/50 text-xs">{String(i + 1).padStart(2, '0')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
