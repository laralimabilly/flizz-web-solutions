import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import '../utils/scrollTriggerSetup';
import type { Technology } from '../types';
import type { Lang } from '../i18n/ui';
import { useTranslations } from '../i18n/utils';

gsap.registerPlugin(ScrollTrigger, SplitText);

const technologies: Technology[] = [
  // Frontend
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'frontend' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg', category: 'frontend' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg', category: 'frontend' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-plain.svg', category: 'frontend' },
  { name: 'Astro', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/astro/astro-plain.svg', category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', category: 'frontend' },
  { name: 'HTML 5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-plain.svg', category: 'frontend' },
  { name: 'CSS 3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-plain.svg', category: 'frontend' },
  { name: 'jQuery', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-plain.svg', category: 'frontend' },
  { name: 'MaterializeCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materializecss/materializecss-plain.svg', category: 'frontend' },
  { name: 'Material UI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-plain.svg', category: 'frontend' },
  { name: 'GSAP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gsap/gsap-original.svg', category: 'frontend' },

  // Backend
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg', category: 'backend' },
  { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg', category: 'backend' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-plain.svg', category: 'backend' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg', category: 'backend' },
  { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-plain.svg', category: 'backend' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-plain.svg', category: 'backend' },
  { name: 'GraphQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg', category: 'backend' },

  // Mobile
  { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/reactnative/reactnative-original.svg', category: 'mobile' },
  { name: 'Expo', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/expo/expo-original.svg', category: 'mobile' },
  { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-plain.svg', category: 'mobile' },

  // Tools & Cloud
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg', category: 'tools' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', category: 'tools' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-plain.svg', category: 'tools' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', category: 'tools' },
  { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-plain.svg', category: 'tools' },

  // Design
  { name: 'Illustrator', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg', category: 'design' },
  { name: 'Photoshop', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-plain.svg', category: 'design' },
  { name: 'Premiere Pro', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-plain.svg', category: 'design' },
  { name: 'Adobe XD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xd/xd-plain.svg', category: 'design' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-plain.svg', category: 'design' },
];

const rowA = technologies.filter((_, i) => i % 2 === 0);
const rowB = technologies.filter((_, i) => i % 2 === 1);

const TechChip: React.FC<{ tech: Technology }> = ({ tech }) => (
  <div className="flex-shrink-0 group flex items-center gap-3 bg-surface/80 backdrop-blur-lg rounded-full pl-3 pr-6 py-3 border border-line hover:border-accent/50 hover:bg-surface transition-all duration-300 mx-3">
    <div className="w-9 h-9 rounded-full bg-night flex items-center justify-center">
      <img
        src={tech.icon}
        alt=""
        loading="lazy"
        width={20}
        height={20}
        className="w-5 h-5 object-contain"
        style={{ filter: 'brightness(0) invert(1)' }}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
    </div>
    <span className="text-light/80 font-medium text-sm whitespace-nowrap group-hover:text-accent transition-colors duration-300">
      {tech.name}
    </span>
  </div>
);

const Technologies: React.FC<{ lang?: Lang }> = ({ lang = 'en' }) => {
  const t = useTranslations(lang);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);

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

        gsap.fromTo(philosophyRef.current, {
          opacity: 0,
          y: 80,
        }, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: philosophyRef.current, start: 'top 88%' },
        });

        return () => split.revert();
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-label="Technologies" className="relative py-36 md:py-52 bg-night bg-noise overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 mb-16">
        <div className="max-w-4xl">
          <p ref={eyebrowRef} className="font-mono text-accent text-sm tracking-[0.3em] uppercase mb-6">
            {'//'} 03 / {t.technologies.eyebrow}
          </p>
          <h2 ref={titleRef} className="text-6xl md:text-8xl font-display font-bold text-light leading-[0.95] overflow-hidden">
            {t.technologies.title}
          </h2>
          <p ref={subtitleRef} className="text-lg md:text-xl text-muted max-w-2xl mt-6 leading-relaxed">
            {t.technologies.subtitle}
          </p>
        </div>
      </div>

      {/* Dual-direction marquees */}
      <div className="relative space-y-5 marquee-paused mb-24">
        <div className="absolute left-0 top-0 w-24 md:w-48 h-full bg-gradient-to-r from-night to-transparent z-10 pointer-events-none" aria-hidden="true" />
        <div className="absolute right-0 top-0 w-24 md:w-48 h-full bg-gradient-to-l from-night to-transparent z-10 pointer-events-none" aria-hidden="true" />

        <div className="overflow-hidden">
          <div className="marquee-track">
            {[...rowA, ...rowA].map((tech, i) => <TechChip key={`a-${i}`} tech={tech} />)}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track-reverse">
            {[...rowB, ...rowB].map((tech, i) => <TechChip key={`b-${i}`} tech={tech} />)}
          </div>
        </div>
      </div>

      {/* Tech Philosophy: editorial statement, no box */}
      <div className="container mx-auto px-6 relative z-10">
        <div ref={philosophyRef} className="border-t border-line pt-14 md:pt-20">
          <p className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-8">
            {'//'} {t.technologies.philosophyEyebrow}
          </p>
          <p className="font-display font-medium text-3xl md:text-5xl text-light leading-tight max-w-5xl">
            {t.technologies.philosophy.p1}<span className="text-accent">{t.technologies.philosophy.accent1}</span>{t.technologies.philosophy.p2}<span className="text-accent">{t.technologies.philosophy.accent2}</span>{t.technologies.philosophy.p3}
          </p>
          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 font-mono text-sm text-muted">
            {t.technologies.pills.map((pill) => (
              <span key={pill} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" aria-hidden="true" />
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
