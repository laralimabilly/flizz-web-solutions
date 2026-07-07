import React from 'react';
import {
  Bell,
  GitBranch,
  Globe,
  Hammer,
  Home,
  Heart,
  PenTool,
  Rocket,
  Search,
  ShieldCheck,
  User,
} from 'lucide-react';
import type { ServiceVisualKey } from '../data/services';

/* Hand-built art directions per service, following the ProjectVisual pattern:
   no heavy images, pure markup + CSS animation (keyframes live in global.css),
   so each scene renders to static HTML with zero client JS and still moves.
   Used as the big call-to-action visual on /services/[slug]. */

const codeTokens = [
  [{ t: 'export', c: 'text-accent' }, { t: ' const ', c: 'text-accent' }, { t: 'site', c: 'text-light' }, { t: ' = {', c: 'text-muted' }],
  [{ t: '  lcp', c: 'text-light/80' }, { t: ": '0.6s',", c: 'text-muted' }],
  [{ t: '  cls', c: 'text-light/80' }, { t: ': 0,', c: 'text-muted' }],
  [{ t: '  seo', c: 'text-light/80' }, { t: ': 100,', c: 'text-muted' }],
  [{ t: '};', c: 'text-muted' }],
];

const ServiceVisual: React.FC<{ visual: ServiceVisualKey }> = ({ visual }) => {
  if (visual === 'web') {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-night via-dark to-surface overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" />
        {/* Speed streaks flying past */}
        <div aria-hidden="true">
          <span className="svc-streak top-[18%] w-40" style={{ animationDelay: '0s' }} />
          <span className="svc-streak top-[42%] w-64" style={{ animationDelay: '1.1s' }} />
          <span className="svc-streak top-[71%] w-48" style={{ animationDelay: '2.3s' }} />
        </div>

        {/* Browser window */}
        <div className="relative w-[88%] max-w-xl bg-surface/85 backdrop-blur-md rounded-2xl border border-line shadow-card overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-night/40">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 flex-1 max-w-[60%] bg-night/70 border border-line rounded-full px-3 py-1 font-mono text-[10px] text-muted truncate">
              flizz.com.br
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 p-5 md:p-6 items-center">
            {/* Code column */}
            <div className="font-mono text-[10px] md:text-xs leading-5 md:leading-6">
              {codeTokens.map((line, i) => (
                <div key={i} className="flex">
                  <span className="text-muted/40 w-5 select-none">{i + 1}</span>
                  <span className="whitespace-pre">
                    {line.map((token, j) => (
                      <span key={j} className={token.c}>{token.t}</span>
                    ))}
                  </span>
                </div>
              ))}
              <div className="flex">
                <span className="text-muted/40 w-5 select-none">6</span>
                <span className="w-2 h-4 bg-accent animate-pulse" />
              </div>
            </div>

            {/* Lighthouse-style gauge */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-24 h-24 md:w-28 md:h-28">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(243,243,243,0.08)" strokeWidth="7" />
                  <circle
                    cx="50" cy="50" r="45" fill="none"
                    stroke="var(--color-accent)" strokeWidth="7" strokeLinecap="round"
                    className="svc-gauge"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-2xl md:text-3xl text-light">
                  100
                </span>
              </div>
              <div className="flex gap-2 font-mono text-[9px] text-muted uppercase tracking-widest">
                <span className="text-accent">Perf</span>·<span>A11y</span>·<span>SEO</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-4 py-2.5 border-t border-line bg-night/40 font-mono text-[10px]">
            <span className="text-accent flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              deploy: production
            </span>
            <span className="text-muted">LCP 0.6s · CLS 0</span>
          </div>
        </div>

        {/* Floating badges */}
        <div className="hidden sm:block absolute top-6 right-6 md:top-10 md:right-12 bg-surface/90 backdrop-blur-lg border border-line rounded-xl px-3.5 py-2 font-mono text-[10px] md:text-xs text-accent shadow-card animate-float">
          ⚡ 100/100 Lighthouse
        </div>
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-12 bg-surface/90 backdrop-blur-lg border border-line rounded-xl px-3.5 py-2 font-mono text-[10px] md:text-xs text-light shadow-card animate-float hidden sm:flex items-center gap-2" style={{ animationDelay: '1.4s' }}>
          <Search className="w-3.5 h-3.5 text-accent" /> page 1 rankings
        </div>
      </div>
    );
  }

  if (visual === 'mobile') {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-dark via-night to-surface overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute w-80 h-80 bg-accent/10 rounded-full blur-[120px]" aria-hidden="true" />

        {/* Back phone (silhouette) */}
        <div className="absolute w-36 md:w-44 aspect-[9/19] bg-surface/50 rounded-[2rem] border border-line rotate-[8deg] translate-x-16 md:translate-x-24 translate-y-4" aria-hidden="true" />

        {/* Front phone */}
        <div className="relative w-40 md:w-48 aspect-[9/19] bg-night rounded-[2rem] border-2 border-line shadow-card overflow-hidden rotate-[-4deg] -translate-x-6 md:-translate-x-10 animate-float" style={{ animationDuration: '5s' }}>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-surface rounded-full" />
          <div className="absolute inset-2.5 top-8 rounded-2xl bg-surface/60 overflow-hidden flex flex-col">
            {/* App header */}
            <div className="flex items-center justify-between px-3 py-2.5">
              <div className="h-2 w-14 bg-light/30 rounded" />
              <div className="w-6 h-6 rounded-full bg-accent/25 border border-accent/40" />
            </div>
            {/* Cards */}
            <div className="px-3 space-y-2">
              <div className="bg-night/80 border border-line rounded-lg p-2.5 space-y-1.5">
                <div className="h-1.5 bg-accent/70 rounded w-1/2" />
                <div className="h-1.5 bg-light/20 rounded w-5/6" />
              </div>
              <div className="bg-night/80 border border-line rounded-lg p-2.5 space-y-1.5">
                <div className="h-1.5 bg-light/30 rounded w-2/3" />
                <div className="h-1.5 bg-light/15 rounded w-1/2" />
              </div>
              <div className="bg-night/80 border border-line rounded-lg p-2.5 space-y-1.5">
                <div className="h-1.5 bg-light/30 rounded w-3/4" />
                <div className="h-1.5 bg-light/15 rounded w-2/5" />
              </div>
            </div>
            {/* Tab bar */}
            <div className="mt-auto flex items-center justify-around px-4 py-2.5 border-t border-line bg-night/70">
              <Home className="w-4 h-4 text-muted" />
              <span className="w-9 h-9 -mt-5 rounded-full bg-accent shadow-glow flex items-center justify-center">
                <Heart className="w-4 h-4 text-night" fill="currentColor" />
              </span>
              <User className="w-4 h-4 text-muted" />
            </div>
          </div>
        </div>

        {/* Push notification card */}
        <div className="absolute top-8 right-6 md:top-12 md:right-14 w-48 md:w-56 bg-surface/95 backdrop-blur-lg border border-line rounded-xl p-3 shadow-card animate-float" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-start gap-2.5">
            <span className="relative flex w-7 h-7 shrink-0 items-center justify-center rounded-lg bg-accent/20 border border-accent/40">
              <Bell className="w-3.5 h-3.5 text-accent" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
            </span>
            <div className="flex-1 space-y-1.5 pt-0.5">
              <div className="h-1.5 bg-light/35 rounded w-3/4" />
              <div className="h-1.5 bg-light/15 rounded w-full" />
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="hidden sm:block absolute top-[46%] right-6 md:right-14 bg-surface/90 backdrop-blur-lg border border-line rounded-xl px-3.5 py-2 font-mono text-[10px] md:text-xs text-light shadow-card animate-float" style={{ animationDelay: '1.6s' }}>
           iOS · 🤖 Android
        </div>
        <div className="hidden sm:block absolute bottom-6 right-6 md:bottom-10 md:right-12 bg-surface/90 backdrop-blur-lg border border-line rounded-xl px-3.5 py-2 font-mono text-[10px] md:text-xs text-accent shadow-card animate-float" style={{ animationDelay: '2.2s' }}>
          ⚡ OTA update shipped
        </div>
      </div>
    );
  }

  if (visual === 'deploy') {
    const nodes = [
      { icon: GitBranch, label: 'commit' },
      { icon: Hammer, label: 'build' },
      { icon: Rocket, label: 'deploy' },
      { icon: Globe, label: 'live' },
    ];
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 md:gap-10 bg-gradient-to-br from-night via-surface to-dark overflow-hidden p-6">
        <div className="absolute inset-0 bg-grid opacity-50" />

        {/* Pipeline */}
        <div className="relative w-[88%] max-w-lg" aria-hidden="true">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-line via-accent/40 to-line -translate-y-8 md:-translate-y-9" />
          {/* Travelling pulse dot */}
          <div className="absolute left-0 right-0 -translate-y-8 md:-translate-y-9 top-1/2 h-0">
            <span className="svc-pipeline-dot" />
          </div>
          <div className="relative flex justify-between">
            {nodes.map(({ icon: Icon, label }, i) => (
              <div key={label} className="flex flex-col items-center gap-2.5">
                <span
                  className={`relative flex w-11 h-11 md:w-14 md:h-14 items-center justify-center rounded-full border bg-night/90 shadow-card ${
                    i === nodes.length - 1 ? 'border-accent/70 shadow-glow' : 'border-line'
                  }`}
                >
                  <Icon className={`w-4.5 h-4.5 md:w-6 md:h-6 ${i === nodes.length - 1 ? 'text-accent' : 'text-light/70'}`} />
                  {i === nodes.length - 1 && (
                    <span className="absolute inset-0 rounded-full border border-accent/40 animate-ping" />
                  )}
                </span>
                <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-muted">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal + uptime row */}
        <div className="relative flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-[88%] max-w-lg">
          <div className="flex-1 w-full bg-night/90 border border-line rounded-xl p-3.5 font-mono text-[10px] md:text-[11px] leading-5 shadow-card">
            <div className="text-muted">$ git push origin main</div>
            <div className="text-light/70">✓ checks passed <span className="text-muted/60">(42s)</span></div>
            <div className="text-light/70">✓ preview approved</div>
            <div className="text-accent flex items-center gap-1.5">
              ▲ production is live
              <span className="w-1.5 h-3 bg-accent animate-pulse" />
            </div>
          </div>

          <div className="shrink-0 bg-surface/90 backdrop-blur-lg border border-line rounded-xl px-4 py-3 shadow-card flex items-center gap-3">
            <span className="relative flex w-2.5 h-2.5">
              <span className="absolute inline-flex w-full h-full rounded-full bg-accent animate-ping opacity-70" />
              <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-accent" />
            </span>
            <div>
              <div className="font-display font-bold text-light text-lg leading-none">99.9%</div>
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted mt-1">uptime</div>
            </div>
            <ShieldCheck className="w-5 h-5 text-accent ml-1" />
          </div>
        </div>
      </div>
    );
  }

  // 'design': artboard with type specimen, swatches and a live bezier path
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface via-night to-dark overflow-hidden">
      <div className="absolute inset-0 bg-noise" />
      {/* Artboard guides */}
      <div className="absolute inset-x-[12%] top-[14%] bottom-[14%] border border-dashed border-line rounded-lg" aria-hidden="true" />

      {/* Type specimen */}
      <div className="relative flex items-end gap-1 select-none" aria-hidden="true">
        <span className="font-display font-bold leading-none text-[7rem] md:text-[10rem] text-light">A</span>
        <span className="font-display font-bold leading-none text-[7rem] md:text-[10rem] text-stroke-accent">a</span>
        {/* Baseline */}
        <span className="absolute -bottom-2 -left-6 -right-10 h-px bg-accent/50" />
        <span className="absolute -bottom-2 -left-6 w-1.5 h-1.5 rounded-full bg-accent -translate-y-[3px]" />
        <span className="absolute -bottom-2 -right-10 w-1.5 h-1.5 rounded-full bg-accent -translate-y-[3px]" />
      </div>

      {/* Bezier pen path */}
      <svg
        viewBox="0 0 220 120"
        className="absolute left-[7%] bottom-[26%] w-40 md:w-56 opacity-90"
        fill="none"
        aria-hidden="true"
      >
        <path d="M10 100 C 60 10, 150 10, 210 90" stroke="var(--color-accent)" strokeWidth="2" className="svc-bezier" />
        <line x1="10" y1="100" x2="60" y2="10" stroke="rgba(243,243,243,0.25)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="210" y1="90" x2="150" y2="10" stroke="rgba(243,243,243,0.25)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="60" cy="10" r="4" fill="var(--color-night)" stroke="var(--color-accent)" strokeWidth="1.5" />
        <circle cx="150" cy="10" r="4" fill="var(--color-night)" stroke="var(--color-accent)" strokeWidth="1.5" />
        <rect x="6" y="96" width="8" height="8" fill="var(--color-accent)" />
        <rect x="206" y="86" width="8" height="8" fill="var(--color-accent)" />
      </svg>

      {/* Color swatches, fanned leftward from the top-right corner */}
      <div className="absolute top-[12%] right-[6%] md:right-[9%]" aria-hidden="true">
        {[
          { bg: '#0b0a11', label: '#0B0A11', rot: '-8deg', x: '-9.6rem' },
          { bg: '#14121d', label: '#14121D', rot: '-2deg', x: '-6.4rem' },
          { bg: '#68f70b', label: '#68F70B', rot: '4deg', x: '-3.2rem', glow: true },
          { bg: '#f3f3f3', label: '#F3F3F3', rot: '10deg', x: '0rem', dark: true },
        ].map((s) => (
          <div
            key={s.label}
            className={`absolute top-0 right-0 w-16 h-20 md:w-20 md:h-24 rounded-xl border border-line shadow-card p-1.5 flex flex-col justify-end ${s.glow ? 'shadow-glow' : ''}`}
            style={{ backgroundColor: s.bg, transform: `translateX(${s.x}) rotate(${s.rot})` }}
          >
            <span className={`font-mono text-[8px] md:text-[9px] ${s.dark ? 'text-night/70' : 'text-light/70'}`}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Badge */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-12 bg-surface/90 backdrop-blur-lg border border-line rounded-xl px-3.5 py-2 font-mono text-[10px] md:text-xs text-accent shadow-card animate-float hidden sm:flex items-center gap-2">
        <PenTool className="w-3.5 h-3.5" /> brand kit ready
      </div>
    </div>
  );
};

export default ServiceVisual;
