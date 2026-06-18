import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ArrowUpRight } from 'lucide-react';
import { getLocalizedProjects } from '../data/projects';
import ProjectVisual from './ProjectVisual';
import type { Lang } from '../i18n/ui';
import { useTranslations } from '../i18n/utils';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Portfolio: React.FC<{ lang?: Lang }> = ({ lang = 'en' }) => {
  const t = useTranslations(lang);
  const projects = getLocalizedProjects(lang);
  const projectBase = lang === 'pt' ? '/pt/portfolio' : '/portfolio';
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        motionOK: '(prefers-reduced-motion: no-preference)',
        desktop: '(min-width: 1024px)',
      },
      (context) => {
        const { motionOK, desktop } = (context.conditions ?? {}) as { motionOK: boolean; desktop: boolean };
        if (!motionOK) return;

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

          if (desktop && trackRef.current && pinRef.current) {
            // Pinned horizontal gallery; the section locks and projects glide sideways.
            // Distance is derived from the last panel's offset (not scrollWidth, which
            // drops trailing gap/padding) so the last project ends with a margin on its
            // right instead of flush against the viewport edge.
            const getAmount = () => {
              const panels = trackRef.current!.querySelectorAll<HTMLElement>('article');
              const last = panels[panels.length - 1];
              if (!last) return 0;
              const rightMargin = window.innerWidth * 0.1; // mirrors the 10vw leading pad
              return Math.max(0, last.offsetLeft + last.offsetWidth - window.innerWidth + rightMargin);
            };

            gsap.to(trackRef.current, {
              x: () => -getAmount(),
              ease: 'none',
              scrollTrigger: {
                trigger: pinRef.current,
                start: 'top top',
                end: () => `+=${getAmount()}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
                  if (counterRef.current) {
                    const idx = Math.round(self.progress * (projects.length - 1)) + 1;
                    counterRef.current.textContent = String(idx).padStart(2, '0');
                  }
                },
              },
            });
          } else {
            // Mobile / reduced width: vertical stack with simple entrances
            panelRefs.current.forEach((panel) => {
              if (!panel) return;
              gsap.from(panel, {
                opacity: 0,
                y: 70,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: { trigger: panel, start: 'top 88%' },
              });
            });
          }

          gsap.from(ctaRef.current, {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 92%' },
          });

          return () => split.revert();
        }, sectionRef);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="relative bg-light text-night">
      {/* Pinned viewport: heading + horizontal track */}
      <div
        ref={pinRef}
        className="py-24 lg:motion-safe:py-0 lg:motion-safe:pt-24 lg:motion-safe:h-screen lg:motion-safe:flex lg:motion-safe:flex-col lg:motion-safe:justify-center lg:motion-safe:overflow-hidden"
      >
        {/* Section heading */}
        <div className="container mx-auto px-6 mb-14 lg:motion-safe:mb-10 lg:motion-safe:shrink-0">
          <p ref={eyebrowRef} className="font-mono text-accent-deep text-sm tracking-[0.3em] uppercase mb-5">
            {'//'} 02 / {t.portfolio.eyebrow}
          </p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 ref={titleRef} className="text-6xl md:text-7xl font-display font-bold leading-[0.95] overflow-hidden">
              {t.portfolio.title}
            </h2>
            <p ref={subtitleRef} className="text-base md:text-lg text-night/60 max-w-sm leading-relaxed">
              {t.portfolio.subtitle}
            </p>
          </div>
        </div>

        {/* Track: each project is a near-full-screen spread; the leading
            pad + trailing spacer keep the first and last panels off the edges. */}
        <div
          ref={trackRef}
          className="flex flex-col gap-28 px-6 lg:motion-safe:flex-row lg:motion-safe:items-center lg:motion-safe:gap-[10vw] lg:motion-safe:pl-[10vw] lg:motion-safe:pr-0 will-change-transform"
        >
          {projects.map((project, index) => (
            <article
              key={project.id}
              ref={(el) => { panelRefs.current[index] = el; }}
              className="w-full shrink-0 lg:motion-safe:w-[80vw] xl:motion-safe:w-[72vw] lg:motion-safe:grid lg:motion-safe:grid-cols-12 lg:motion-safe:gap-12 lg:motion-safe:items-center"
            >
              {/* Visual links to the project's detail page */}
              <a
                href={`${projectBase}/${project.slug}`}
                className="group block lg:motion-safe:col-span-7"
                aria-label={`${t.portfolio.caseStudy}: ${project.title}`}
              >
                <div className="relative aspect-[4/3] lg:motion-safe:aspect-auto lg:motion-safe:h-[58vh] rounded-3xl overflow-hidden border border-night/10 shadow-card transition-transform duration-700 group-hover:scale-[1.015]">
                  <ProjectVisual visual={project.visual} />

                  {/* Hover veil */}
                  <div className="absolute inset-0 bg-night/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 bg-accent text-night px-6 py-3 rounded-full font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {t.portfolio.viewProject} <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Corner index */}
                  <span className="absolute top-5 left-5 font-mono text-xs text-light/70 bg-night/60 backdrop-blur-md border border-line rounded-full px-3 py-1.5 tracking-widest">
                    {String(index + 1).padStart(2, '0')} / {project.year}
                  </span>
                </div>
              </a>

              {/* Meta: its own column on desktop, with room to breathe */}
              <div className="mt-8 lg:motion-safe:mt-0 lg:motion-safe:col-span-5 space-y-6">
                <span className="inline-block font-mono text-[11px] uppercase tracking-[0.25em] text-accent-deep border border-accent-deep/25 bg-accent/10 px-3 py-1.5 rounded-full">
                  {project.industry}
                </span>

                <h3 className="text-3xl md:text-4xl xl:text-5xl font-display font-bold leading-[1.05]">
                  <a
                    href={`${projectBase}/${project.slug}`}
                    className="hover:text-accent-deep transition-colors duration-300"
                  >
                    {project.title}
                  </a>
                </h3>

                <p className="text-night/60 text-lg leading-relaxed max-w-md">{project.description}</p>

                <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-night/50 pt-1">
                  {project.services.map((service) => (
                    <li key={service} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-accent-deep rounded-full" aria-hidden="true" />
                      {service}
                    </li>
                  ))}
                </ul>

                <a
                  href={`${projectBase}/${project.slug}`}
                  className="group/link inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-night hover:text-accent-deep transition-colors duration-300 pt-2"
                >
                  <span className="border-b border-night/30 group-hover/link:border-accent-deep transition-colors duration-300 pb-1">
                    {t.portfolio.caseStudy}
                  </span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Progress: desktop gallery only */}
        <div className="container mx-auto px-6 mt-12 hidden lg:motion-safe:flex items-center gap-6 shrink-0">
          <span className="font-mono text-sm text-night tabular-nums">
            <span ref={counterRef}>01</span>
            <span className="text-night/40"> / {String(projects.length).padStart(2, '0')}</span>
          </span>
          <span className="relative flex-1 h-[2px] bg-night/10 overflow-hidden">
            <span ref={barRef} className="absolute inset-0 bg-accent-deep origin-left scale-x-0" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-night/40">{t.portfolio.scroll}</span>
        </div>
      </div>

      {/* CTA: full-bleed giant link; green panel sweeps up, text inverts to dark */}
      <div ref={ctaRef} className="relative z-10 mt-12 lg:mt-8">
        <a href="#contact" className="group relative block border-y border-night/10 overflow-hidden">
          <span
            className="absolute inset-0 bg-accent translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
            aria-hidden="true"
          />
          <div className="container mx-auto px-6 relative z-10 py-20 md:py-28 flex items-center justify-between gap-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-deep group-hover:text-night/70 transition-colors duration-300 mb-6">
                {'//'} {t.cta.eyebrow}
              </p>
              <span className="block font-display font-bold leading-[0.95] text-[clamp(2.6rem,7.5vw,7rem)] text-night group-hover:text-night transition-colors duration-300">
                {t.cta.titleLines[0]}
                <br />
                {t.cta.titleLines[1]}
              </span>
            </div>
            <ArrowUpRight
              className="w-16 h-16 md:w-28 md:h-28 text-night group-hover:rotate-45 transition-transform duration-500 shrink-0"
              aria-hidden="true"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Portfolio;
