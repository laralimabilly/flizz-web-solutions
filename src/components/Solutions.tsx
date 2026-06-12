import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Palette, Code2, Smartphone, Cloud, ArrowUpRight } from 'lucide-react';
import type { Service } from '../types';

gsap.registerPlugin(ScrollTrigger, SplitText);

const services: (Service & { tagline: string })[] = [
  {
    title: 'Brand & Web Design',
    tagline: 'Design that converts',
    description: 'Stunning visual identities and user experiences that captivate your audience and turn visitors into customers.',
    icon: 'Palette',
    features: ['Brand Identity', 'UI/UX Design', 'Responsive Design', 'Prototyping'],
  },
  {
    title: 'Web Development',
    tagline: 'Built for speed',
    description: 'High-performance websites built with modern technologies — engineered to load instantly and rank on top.',
    icon: 'Code2',
    features: ['React & TypeScript', 'Next.js & Astro', 'Performance Optimization', 'SEO Ready'],
  },
  {
    title: 'Mobile App Development',
    tagline: 'Native experiences',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android.',
    icon: 'Smartphone',
    features: ['React Native', 'iOS & Android', 'App Store Optimization', 'Push Notifications'],
  },
  {
    title: 'Deploy & Maintenance',
    tagline: 'Always online',
    description: 'Reliable hosting, continuous deployment, and ongoing support keeping your digital assets fast and secure.',
    icon: 'Cloud',
    features: ['Cloud Hosting', 'CI/CD Pipeline', '24/7 Monitoring', 'Regular Updates'],
  },
];

const iconComponents = { Palette, Code2, Smartphone, Cloud };

const Solutions: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        // Section heading reveal
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

        // Cards slide in, then scale away as the next one stacks on top.
        // The entrance targets the inner content while the scrub targets the
        // card shell — they must not share properties, or the scrub locks its
        // start values mid-entrance and leaves cards permanently faded.
        cardsRef.current.forEach((card, i) => {
          if (!card) return;

          gsap.from(card.querySelector('.card-inner'), {
            opacity: 0,
            y: 80,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%' },
          });

          const next = cardsRef.current[i + 1];
          if (next) {
            gsap.fromTo(card,
              { scale: 1, opacity: 1, filter: 'blur(0px)' },
              {
                scale: 0.94,
                opacity: 0.5,
                filter: 'blur(2px)',
                transformOrigin: 'center top',
                ease: 'none',
                immediateRender: false,
                scrollTrigger: {
                  trigger: next,
                  start: 'top bottom',
                  end: 'top top+=120',
                  scrub: true,
                },
              }
            );
          }
        });

        return () => split.revert();
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  // Cursor spotlight position for each card
  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  // No overflow-hidden on the section — it would turn it into a scroll container
  // and break the sticky card stacking. The glow wrapper clips instead.
  return (
    <section ref={sectionRef} id="solutions" className="relative py-32 md:py-40 bg-night bg-noise">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 -left-40 w-[30rem] h-[30rem] bg-accent/10 rounded-full blur-[160px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section heading */}
        <div className="max-w-4xl mb-20 md:mb-28">
          <p ref={eyebrowRef} className="font-mono text-accent text-sm tracking-[0.3em] uppercase mb-6">
            {'//'} 01 — What we do
          </p>
          <h2 ref={titleRef} className="text-6xl md:text-8xl font-display font-bold text-light leading-[0.95] overflow-hidden">
            SOLUTIONS
          </h2>
          <p ref={subtitleRef} className="text-lg md:text-xl text-muted max-w-2xl mt-6 leading-relaxed">
            From concept to deployment — end-to-end services that transform your digital presence.
          </p>
        </div>

        {/* Stacked cards */}
        <div className="relative space-y-8">
          {services.map((service, index) => {
            const IconComponent = iconComponents[service.icon as keyof typeof iconComponents];

            return (
              <div
                key={service.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                onMouseMove={handleCardMove}
                className="spotlight-card sticky group bg-surface/90 backdrop-blur-xl rounded-3xl border border-line hover:border-accent/40 transition-colors duration-500 overflow-hidden"
                style={{ top: `${96 + index * 24}px` }}
              >
                <div className="card-inner grid md:grid-cols-12 gap-8 p-8 md:p-12 items-center">
                  {/* Index + icon */}
                  <div className="md:col-span-3 flex md:flex-col items-center md:items-start gap-6">
                    <span className="font-mono text-muted/50 text-sm tracking-widest">
                      {String(index + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                    </span>
                    <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center border border-accent/20 group-hover:bg-accent/20 group-hover:shadow-glow transition-all duration-500">
                      <IconComponent className="w-9 h-9 text-accent" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-6 space-y-4">
                    <p className="font-mono text-accent/80 text-xs tracking-[0.25em] uppercase">{service.tagline}</p>
                    <h3 className="text-3xl md:text-5xl font-display font-bold text-light group-hover:text-accent transition-colors duration-500">
                      {service.title}
                    </h3>
                    <p className="text-muted text-lg leading-relaxed max-w-xl">{service.description}</p>
                  </div>

                  {/* Features */}
                  <div className="md:col-span-3">
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-light/70 text-sm font-mono">
                          <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0 group-hover:shadow-glow transition-shadow duration-500" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom accent line sweep */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent group-hover:w-full transition-all duration-700 ease-out" aria-hidden="true" />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-24">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 bg-accent text-night px-10 py-5 rounded-full font-bold text-lg hover:shadow-glow hover:scale-105 transition-all duration-300"
          >
            Discuss Your Project
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
