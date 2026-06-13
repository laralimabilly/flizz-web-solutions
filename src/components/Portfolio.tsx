import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ArrowUpRight, MapPin, Bell, Play, FileSearch } from 'lucide-react';
import type { Project } from '../types';

gsap.registerPlugin(ScrollTrigger, SplitText);

const projects: (Project & { year: string; visual: 'dayone' | 'bugo' | 'gustavo' | 'rumors' })[] = [
  {
    id: '1',
    title: 'DayOne Talent Advisory',
    description: 'A modern, high-performance web solution built with Astro and React. Features real-time Storyblok integration for blogging, a lightweight proprietary i18n system and advanced analytics tools.',
    industry: 'Human Resources',
    services: ['Web Development', 'UI/UX Design', 'Storyblok CMS'],
    image: '/api/placeholder/600/400',
    link: 'https://www.dayonetalent.com/',
    year: '2024',
    visual: 'dayone',
  },
  {
    id: '2',
    title: 'Bugo Mobile App',
    description: 'Bugo (Before U Go) uses intelligent geolocation — no bluetooth tags, no complex setup — to remind you of your belongings before leaving a place. Built with React Native and Expo.',
    industry: 'Utility Tools',
    services: ['Mobile App Development', 'Brand Design', 'Web Development'],
    image: '/api/placeholder/600/400',
    link: 'https://bugoapp.com/',
    year: '2024',
    visual: 'bugo',
  },
  {
    id: '3',
    title: "Gustavo Carmo's Website",
    description: 'A modern stage for the guitarist known for his work with Rudy Sarzo, Tye Trujillo and Dirk Verbeuren. Discography, tour dates and social integrations in one place.',
    industry: 'Music',
    services: ['Web Development', 'Social Media', 'Platform Integration'],
    image: '/api/placeholder/600/400',
    link: 'https://gustavocarmoguitar.com/',
    year: '2023',
    visual: 'gustavo',
  },
  {
    id: '4',
    title: 'Ridiculous Rumors',
    description: 'A humorous conspiracy-theory generator with a 60s spy-era vibe, powered by Gemini AI with seamless database integration. Built with Next.js, the Gemini API and Supabase.',
    industry: 'Entertainment',
    services: ['Web Development', 'Supabase', 'Gemini AI'],
    image: '/api/placeholder/600/400',
    link: 'https://ridiculousrumors.com/',
    year: '2025',
    visual: 'rumors',
  },
];

/* Hand-built art directions per project — keeps the page light (no heavy images)
   while every showcase still looks bespoke. */
const ProjectVisual: React.FC<{ visual: string; title: string }> = ({ visual, title }) => {
  if (visual === 'bugo') {
    return (
      <div className="parallax-inner absolute inset-0 flex items-center justify-center bg-gradient-to-br from-dark via-surface to-night">
        <div className="absolute inset-0 bg-grid opacity-60" />
        {/* Phone frame */}
        <div className="relative w-44 md:w-52 aspect-[9/19] bg-night rounded-[2rem] border-2 border-line shadow-card overflow-hidden">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-surface rounded-full" />
          <div className="absolute inset-3 top-8 rounded-2xl bg-surface/60 overflow-hidden">
            {/* Map-ish lines */}
            <div className="absolute inset-0 opacity-40">
              <div className="absolute top-1/4 -left-4 right-0 h-[2px] bg-line rotate-12" />
              <div className="absolute top-1/2 -left-4 right-0 h-[2px] bg-line -rotate-6" />
              <div className="absolute top-3/4 -left-4 right-0 h-[2px] bg-line rotate-3" />
              <div className="absolute left-1/3 top-0 bottom-0 w-[2px] bg-line rotate-12" />
            </div>
            <MapPin className="absolute top-1/3 left-1/2 -translate-x-1/2 w-8 h-8 text-accent drop-shadow-[0_0_12px_rgba(104,247,11,0.8)]" />
            <span className="absolute top-1/3 left-1/2 -translate-x-1/2 mt-10 w-12 h-12 rounded-full border border-accent/40 animate-ping" />
            {/* Notification */}
            <div className="absolute bottom-4 inset-x-3 bg-night/90 border border-line rounded-xl p-2.5 flex items-center gap-2">
              <Bell className="w-4 h-4 text-accent shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="h-1.5 bg-light/30 rounded w-3/4" />
                <div className="h-1.5 bg-light/15 rounded w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (visual === 'gustavo') {
    return (
      <div className="parallax-inner absolute inset-0 bg-gradient-to-br from-night via-dark to-surface flex items-center justify-center">
        <div className="absolute inset-0 bg-noise" />
        {/* Waveform */}
        <div className="absolute inset-x-10 bottom-12 flex items-end justify-between gap-1 h-28" aria-hidden="true">
          {[38, 70, 52, 90, 64, 100, 46, 82, 58, 94, 40, 72, 88, 54, 66, 96, 44, 76, 60, 84, 50, 92, 36, 68].map((h, i) => (
            <span
              key={i}
              className={`flex-1 rounded-t ${i % 4 === 0 ? 'bg-accent/80' : 'bg-light/20'}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="relative flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center shadow-glow">
            <Play className="w-8 h-8 text-night ml-1" fill="currentColor" />
          </div>
          <span className="font-mono text-xs text-muted tracking-[0.3em] uppercase">Now playing — live</span>
        </div>
      </div>
    );
  }

  if (visual === 'rumors') {
    return (
      <div className="parallax-inner absolute inset-0 bg-gradient-to-br from-dark via-night to-surface p-10 md:p-14">
        <div className="absolute inset-0 bg-noise" />
        {/* Classified dossier */}
        <div className="relative h-full bg-surface/70 border border-line rounded-xl p-6 overflow-hidden rotate-[-1.5deg]">
          <div className="flex items-center justify-between mb-5">
            <span className="font-mono text-[10px] tracking-[0.3em] text-muted uppercase flex items-center gap-2">
              <FileSearch className="w-3.5 h-3.5 text-accent" /> Dossier #042
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-accent border-2 border-accent px-2 py-1 rotate-6 uppercase">
              Top Secret
            </span>
          </div>
          <div className="space-y-3">
            <div className="h-2 bg-light/25 rounded w-5/6" />
            <div className="h-2 bg-night rounded w-2/3" />
            <div className="h-2 bg-light/15 rounded w-full" />
            <div className="h-2 bg-night rounded w-1/2" />
            <div className="h-2 bg-light/15 rounded w-4/5" />
            <div className="h-2 bg-light/25 rounded w-3/5" />
            <div className="h-2 bg-night rounded w-3/4" />
          </div>
          <div className="mt-6 inline-flex items-center gap-2 bg-accent/15 border border-accent/40 rounded-lg px-3 py-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest">AI generating rumor…</span>
          </div>
        </div>
      </div>
    );
  }

  // Default: dayone — clean corporate site skeleton
  return (
    <div className="parallax-inner absolute inset-0 bg-gradient-to-br from-surface via-dark to-night p-8 md:p-12">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="relative h-full bg-night/70 border border-line rounded-xl overflow-hidden">
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line">
          <span className="w-2.5 h-2.5 rounded-full bg-light/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-light/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-accent/60" />
          <div className="ml-3 h-4 bg-surface rounded-full flex-1 max-w-[55%]" />
        </div>
        {/* Page skeleton */}
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="h-3 w-16 bg-accent/70 rounded" />
            <div className="flex gap-3">
              <div className="h-2 w-10 bg-light/20 rounded" />
              <div className="h-2 w-10 bg-light/20 rounded" />
              <div className="h-2 w-10 bg-light/20 rounded" />
            </div>
          </div>
          <div className="space-y-3 mb-8 max-w-[70%]">
            <div className="h-5 bg-light/30 rounded w-full" />
            <div className="h-5 bg-light/30 rounded w-4/5" />
            <div className="h-2.5 bg-light/15 rounded w-3/5 mt-4" />
          </div>
          <div className="h-8 w-32 bg-accent rounded-full mb-10 shadow-glow" />
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-20 bg-surface/80 border border-line rounded-lg p-3 space-y-2">
                <div className="w-6 h-6 rounded bg-accent/30" />
                <div className="h-1.5 bg-light/20 rounded w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const projectRefs = useRef<(HTMLElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

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

        projectRefs.current.forEach((project) => {
          if (!project) return;

          const frame = project.querySelector('.project-frame');
          const inner = project.querySelector('.parallax-inner');
          const content = project.querySelectorAll('.project-stagger');

          // Cinematic clip reveal of the visual
          gsap.fromTo(frame,
            { clipPath: 'inset(12% 8% 12% 8% round 24px)', scale: 1.06 },
            {
              clipPath: 'inset(0% 0% 0% 0% round 24px)',
              scale: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: { trigger: project, start: 'top 75%' },
            }
          );

          // Content cascades in
          gsap.from(content, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: project, start: 'top 70%' },
          });

          // Visual drifts inside its frame while scrolling
          if (inner) {
            gsap.fromTo(inner, { yPercent: -6 }, {
              yPercent: 6,
              ease: 'none',
              scrollTrigger: { trigger: project, start: 'top bottom', end: 'bottom top', scrub: 1 },
            });
          }
        });

        gsap.from(ctaRef.current, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 88%' },
        });

        return () => split.revert();
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="relative py-32 md:py-40 bg-night bg-noise overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[32rem] h-[32rem] bg-accent/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 -left-40 w-[28rem] h-[28rem] bg-accent/5 rounded-full blur-[160px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section heading */}
        <div className="max-w-4xl mb-24 md:mb-32">
          <p ref={eyebrowRef} className="font-mono text-accent text-sm tracking-[0.3em] uppercase mb-6">
            {'//'} 02 — Selected work
          </p>
          <h2 ref={titleRef} className="text-6xl md:text-8xl font-display font-bold text-light leading-[0.95] overflow-hidden">
            PORTFOLIO
          </h2>
          <p ref={subtitleRef} className="text-lg md:text-xl text-muted max-w-2xl mt-6 leading-relaxed">
            Real products shipped for real clients — where innovation meets craft.
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-32 md:space-y-44">
          {projects.map((project, index) => (
            <article
              key={project.id}
              ref={(el) => { projectRefs.current[index] = el; }}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}
            >
              {/* Visual */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block [direction:ltr]"
                aria-label={`Visit ${project.title} live site`}
              >
                <div className="project-frame relative aspect-[4/3] rounded-3xl overflow-hidden border border-line shadow-card transition-transform duration-700 group-hover:scale-[1.015]">
                  <ProjectVisual visual={project.visual} title={project.title} />

                  {/* Hover veil */}
                  <div className="absolute inset-0 bg-night/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 bg-accent text-night px-6 py-3 rounded-full font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      Visit Live Site <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Corner index */}
                  <span className="absolute top-5 left-5 font-mono text-xs text-light/60 bg-night/60 backdrop-blur-md border border-line rounded-full px-3 py-1.5 tracking-widest">
                    {String(index + 1).padStart(2, '0')} — {project.year}
                  </span>
                </div>
              </a>

              {/* Content */}
              <div className="[direction:ltr] space-y-6">
                <div className="project-stagger flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent border border-accent/30 bg-accent/10 px-4 py-2 rounded-full">
                    {project.industry}
                  </span>
                </div>

                <h3 className="project-stagger text-4xl md:text-6xl font-display font-bold text-light leading-tight">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors duration-300"
                  >
                    {project.title}
                  </a>
                </h3>

                <p className="project-stagger text-muted text-lg leading-relaxed">{project.description}</p>

                <div className="project-stagger flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="font-mono text-xs text-light/70 bg-surface border border-line px-3 py-1.5 rounded-full hover:border-accent/50 hover:text-accent transition-colors duration-300"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-stagger group inline-flex items-center gap-3 text-light font-semibold text-lg hover:text-accent transition-colors duration-300 pt-2"
                >
                  <span className="border-b-2 border-accent/40 group-hover:border-accent transition-colors duration-300 pb-0.5">
                    View Case Study
                  </span>
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* CTA — full-bleed giant link with a green sweep on hover */}
      <div ref={ctaRef} className="relative z-10 mt-32 md:mt-44">
        <a href="#contact" className="group relative block border-y border-line overflow-hidden">
          <span
            className="absolute inset-0 bg-accent translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
            aria-hidden="true"
          />
          <div className="container mx-auto px-6 relative z-10 py-16 md:py-24 flex items-center justify-between gap-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent group-hover:text-night/70 transition-colors duration-300 mb-5">
                {'//'} Your project could be next
              </p>
              <span className="block font-display font-bold leading-[0.95] text-[clamp(2.6rem,7.5vw,7rem)] text-light group-hover:text-night transition-colors duration-300">
                START YOUR
                <br />
                PROJECT
              </span>
            </div>
            <ArrowUpRight
              className="w-16 h-16 md:w-28 md:h-28 text-accent group-hover:text-night group-hover:rotate-45 transition-all duration-500 shrink-0"
              aria-hidden="true"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Portfolio;
