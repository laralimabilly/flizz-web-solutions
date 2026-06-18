import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import type { Lang } from '../i18n/ui';
import { useTranslations } from '../i18n/utils';

gsap.registerPlugin(ScrollTrigger, SplitText);

const codeLines = [
  { indent: 0, tokens: [{ t: 'const', c: 'text-accent' }, { t: ' site', c: 'text-light' }, { t: ' = ', c: 'text-muted' }, { t: 'await', c: 'text-accent' }, { t: ' flizz', c: 'text-light' }, { t: '.build({', c: 'text-muted' }] },
  { indent: 1, tokens: [{ t: 'performance', c: 'text-light/80' }, { t: ': ', c: 'text-muted' }, { t: "'lightning'", c: 'text-accent' }, { t: ',', c: 'text-muted' }] },
  { indent: 1, tokens: [{ t: 'design', c: 'text-light/80' }, { t: ': ', c: 'text-muted' }, { t: "'pixel-perfect'", c: 'text-accent' }, { t: ',', c: 'text-muted' }] },
  { indent: 1, tokens: [{ t: 'seo', c: 'text-light/80' }, { t: ': ', c: 'text-muted' }, { t: "'rank #1'", c: 'text-accent' }, { t: ',', c: 'text-muted' }] },
  { indent: 1, tokens: [{ t: 'markets', c: 'text-light/80' }, { t: ': [', c: 'text-muted' }, { t: "'🇧🇷'", c: 'text-light' }, { t: ', ', c: 'text-muted' }, { t: "'🇺🇸'", c: 'text-light' }, { t: '],', c: 'text-muted' }] },
  { indent: 0, tokens: [{ t: '});', c: 'text-muted' }] },
  { indent: 0, tokens: [{ t: '// deployed in record time ⚡', c: 'text-muted/60' }] },
];

const stats = [
  { value: 50, suffix: '+' },
  { value: 99, suffix: '%' },
  { value: 100, suffix: '/100' },
];

const Hero: React.FC<{ lang?: Lang }> = ({ lang = 'en' }) => {
  const t = useTranslations(lang);
  const marqueeItems = t.hero.marquee;
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalWrapRef = useRef<HTMLDivElement>(null);
  const codeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const split = new SplitText(titleRef.current, { type: 'chars,lines', linesClass: 'overflow-hidden' });

        gsap.set([eyebrowRef.current, subtitleRef.current, buttonsRef.current, statsRef.current, scrollHintRef.current], { opacity: 0, y: 40 });
        gsap.set(terminalRef.current, { opacity: 0, y: 60, rotateX: 18 });
        gsap.set(codeRefs.current, { opacity: 0, x: -12 });

        const tl = gsap.timeline({ delay: 0.2 });

        tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
          .from(split.chars, {
            yPercent: 110,
            opacity: 0,
            stagger: 0.02,
            duration: 0.9,
            ease: 'power4.out',
          }, '-=0.3')
          .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
          .to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
          .to(statsRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
          .to(terminalRef.current, { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: 'power3.out' }, '-=0.9')
          .to(codeRefs.current, { opacity: 1, x: 0, duration: 0.4, stagger: 0.12, ease: 'power2.out' }, '-=0.5')
          .to(scrollHintRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2');

        // Count-up stats
        statsRef.current?.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
          const target = Number(el.dataset.count);
          gsap.fromTo(el, { innerText: 0 }, {
            innerText: target,
            duration: 1.8,
            delay: 1.2,
            snap: { innerText: 1 },
            ease: 'power2.out',
          });
        });

        // Terminal floats gently, parallaxes away on scroll
        gsap.to(terminalRef.current, { y: -12, duration: 3.5, ease: 'power2.inOut', yoyo: true, repeat: -1, delay: 2.5 });
        gsap.to(terminalWrapRef.current, {
          y: -80,
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
        });
        gsap.to(heroRef.current, {
          opacity: 0.4,
          scrollTrigger: { trigger: heroRef.current, start: '40% top', end: 'bottom top', scrub: 1 },
        });

        // Subtle 3D tilt following the cursor
        const onMove = (e: MouseEvent) => {
          if (!terminalRef.current || window.innerWidth < 1024) return;
          const rect = terminalRef.current.getBoundingClientRect();
          const dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
          const dy = (e.clientY - rect.top - rect.height / 2) / rect.height;
          gsap.to(terminalRef.current, {
            rotateY: dx * 8,
            rotateX: -dy * 8,
            duration: 0.6,
            ease: 'power2.out',
          });
        };
        const onLeave = () => {
          gsap.to(terminalRef.current, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' });
        };

        heroRef.current?.addEventListener('mousemove', onMove);
        heroRef.current?.addEventListener('mouseleave', onLeave);

        return () => {
          split.revert();
          heroRef.current?.removeEventListener('mousemove', onMove);
          heroRef.current?.removeEventListener('mouseleave', onLeave);
        };
      }, heroRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center bg-night bg-grid bg-noise pt-28 overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 left-1/4 w-[36rem] h-[36rem] bg-accent/15 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-accent/10 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex-1 flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left content */}
          <div className="space-y-10">
            <p ref={eyebrowRef} className="font-mono text-accent text-sm tracking-[0.3em] uppercase">
              {'//'} {t.hero.eyebrow}
            </p>

            <h1 ref={titleRef} className="text-[clamp(3.5rem,11vw,6.5rem)] lg:text-[clamp(4rem,6.8vw,7.5rem)] font-display font-bold leading-[0.92] text-light">
              {t.hero.titleLines[0]}
              <br />
              <span className="text-accent drop-shadow-[0_0_30px_rgba(104,247,11,0.45)]">{t.hero.titleLines[1]}</span>
              <br />
              <span className="text-stroke">{t.hero.titleLines[2]}</span>
            </h1>

            <p ref={subtitleRef} className="text-lg md:text-xl text-muted max-w-xl leading-relaxed">
              {t.hero.subtitle}
            </p>

            <div ref={buttonsRef} className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="group bg-accent text-night px-8 py-4 rounded-full font-bold text-lg hover:shadow-glow hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
              >
                {t.hero.ctaPrimary}
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <a
                href="#portfolio"
                className="px-8 py-4 rounded-full font-medium text-lg text-light border border-line hover:border-accent/60 hover:text-accent transition-all duration-300 backdrop-blur-sm"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>

            <div ref={statsRef} className="flex flex-wrap gap-12 pt-8 border-t border-line">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-bold text-light font-display">
                    <span data-count={stat.value}>{stat.value}</span>
                    <span className="text-accent">{stat.suffix}</span>
                  </div>
                  <div className="text-muted text-sm font-mono mt-1">{t.hero.statLabels[i]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual: terminal card */}
          <div ref={terminalWrapRef} className="relative hidden lg:block" style={{ perspective: '1200px' }} aria-hidden="true">
            <div
              ref={terminalRef}
              className="relative bg-surface/80 backdrop-blur-xl rounded-2xl border border-line shadow-card overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Title bar */}
              <div className="flex items-center gap-2 px-5 py-4 border-b border-line bg-night/40">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-4 font-mono text-xs text-muted">flizz/deploy.ts</span>
              </div>

              {/* Code */}
              <div className="p-6 font-mono text-sm md:text-[15px] leading-7">
                {codeLines.map((line, i) => (
                  <div key={i} ref={(el) => { codeRefs.current[i] = el; }} className="flex">
                    <span className="text-muted/40 w-8 select-none">{i + 1}</span>
                    <span style={{ paddingLeft: `${line.indent * 1.25}rem` }}>
                      {line.tokens.map((token, j) => (
                        <span key={j} className={token.c}>{token.t}</span>
                      ))}
                    </span>
                  </div>
                ))}
                <div className="flex mt-1">
                  <span className="text-muted/40 w-8 select-none">{codeLines.length + 1}</span>
                  <span className="w-2.5 h-5 bg-accent animate-pulse" />
                </div>
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-line bg-night/40 font-mono text-xs">
                <span className="text-accent flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  build passing
                </span>
                <span className="text-muted">LCP 0.6s · CLS 0 · SEO 100</span>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-6 -right-4 bg-surface/90 backdrop-blur-lg border border-line rounded-xl px-4 py-2 font-mono text-xs text-accent shadow-card animate-float">
              ⚡ 100/100 Lighthouse
            </div>
            <div className="absolute -bottom-6 -left-4 bg-surface/90 backdrop-blur-lg border border-line rounded-xl px-4 py-2 font-mono text-xs text-light shadow-card animate-float" style={{ animationDelay: '1.2s' }}>
              🇧🇷 → 🇺🇸 {t.hero.worldwide}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div ref={scrollHintRef} className="relative z-10 flex justify-center pb-6">
        <a href="#solutions" className="flex flex-col items-center gap-2 text-muted hover:text-accent transition-colors duration-300" aria-label="Scroll to solutions">
          <span className="font-mono text-xs tracking-[0.25em] uppercase">{t.hero.scroll}</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>

      {/* Keyword marquee */}
      <div className="relative z-10 border-t border-line bg-night/60 backdrop-blur-sm overflow-hidden py-4" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center font-display font-semibold text-light/40 text-lg tracking-widest whitespace-nowrap">
              <span className="px-6">{item}</span>
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
