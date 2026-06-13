import React from 'react';
import { MapPin, Bell, Play, FileSearch, Car, Mic } from 'lucide-react';

/* Hand-built art directions per project; keeps pages light (no heavy images)
   while every showcase still looks bespoke. Shared by the home gallery and the
   /portfolio/[slug] detail hero. Purely presentational, so it renders to static
   HTML on the Astro detail page with no client JS. */
const ProjectVisual: React.FC<{ visual: string }> = ({ visual }) => {
  if (visual === 'bugo') {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-dark via-surface to-night">
        <div className="absolute inset-0 bg-grid opacity-60" />
        {/* Phone frame */}
        <div className="relative w-40 md:w-48 aspect-[9/19] bg-night rounded-[2rem] border-2 border-line shadow-card overflow-hidden">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-surface rounded-full" />
          <div className="absolute inset-3 top-8 rounded-2xl bg-surface/60 overflow-hidden">
            <div className="absolute inset-0 opacity-40">
              <div className="absolute top-1/4 -left-4 right-0 h-[2px] bg-line rotate-12" />
              <div className="absolute top-1/2 -left-4 right-0 h-[2px] bg-line -rotate-6" />
              <div className="absolute top-3/4 -left-4 right-0 h-[2px] bg-line rotate-3" />
              <div className="absolute left-1/3 top-0 bottom-0 w-[2px] bg-line rotate-12" />
            </div>
            <MapPin className="absolute top-1/3 left-1/2 -translate-x-1/2 w-8 h-8 text-accent drop-shadow-[0_0_12px_rgba(104,247,11,0.8)]" />
            <span className="absolute top-1/3 left-1/2 -translate-x-1/2 mt-10 w-12 h-12 rounded-full border border-accent/40 animate-ping" />
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
      <div className="absolute inset-0 bg-gradient-to-br from-night via-dark to-surface flex items-center justify-center">
        <div className="absolute inset-0 bg-noise" />
        <div className="absolute inset-x-10 bottom-10 flex items-end justify-between gap-1 h-24" aria-hidden="true">
          {[38, 70, 52, 90, 64, 100, 46, 82, 58, 94, 40, 72, 88, 54, 66, 96, 44, 76, 60, 84, 50, 92, 36, 68].map((h, i) => (
            <span
              key={i}
              className={`flex-1 rounded-t ${i % 4 === 0 ? 'bg-accent/80' : 'bg-light/20'}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="relative flex flex-col items-center gap-4">
          <div className="w-18 h-18 md:w-20 md:h-20 rounded-full bg-accent flex items-center justify-center shadow-glow">
            <Play className="w-8 h-8 text-night ml-1" fill="currentColor" />
          </div>
          <span className="font-mono text-xs text-muted tracking-[0.3em] uppercase">Now playing · live</span>
        </div>
      </div>
    );
  }

  if (visual === 'rumors') {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-night to-surface p-8 md:p-12">
        <div className="absolute inset-0 bg-noise" />
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
          </div>
          <div className="mt-6 inline-flex items-center gap-2 bg-accent/15 border border-accent/40 rounded-lg px-3 py-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest">AI generating rumor…</span>
          </div>
        </div>
      </div>
    );
  }

  if (visual === 'nsa') {
    // Luxury limo booking card, rendered in NSA's real brand gold
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#15110b] to-[#050505] p-6 md:p-10">
        <div className="absolute inset-0 bg-noise" />
        <div className="absolute -top-12 right-0 w-64 h-64 bg-[#b37a13]/20 rounded-full blur-[110px]" aria-hidden="true" />

        <div className="relative w-full max-w-sm bg-[#0c0a07]/90 border border-[#b37a13]/30 rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <span className="font-display font-bold text-lg tracking-wide text-light">
              NSA <span className="text-[#c8902a]">Limousine</span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c8902a] border border-[#b37a13]/40 px-2 py-1 rounded">
              Reserved
            </span>
          </div>

          {/* Route */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center pt-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c8902a]" />
              <span className="w-px flex-1 min-h-[2.5rem] my-1 bg-gradient-to-b from-[#b37a13]/70 to-[#b37a13]/15" />
              <MapPin className="w-4 h-4 text-[#c8902a]" />
            </div>
            <div className="flex-1 space-y-5">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-light/40">Pickup</div>
                <div className="text-light text-sm">Stamford, CT</div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-light/40">Dropoff</div>
                <div className="text-light text-sm">JFK International</div>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#b37a13]/20 my-5" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Car className="w-6 h-6 text-[#c8902a]" />
              <span className="text-light text-sm">Luxury Sedan</span>
            </div>
            <span className="font-display font-bold text-[#c8902a]">$240</span>
          </div>
        </div>
      </div>
    );
  }

  if (visual === 'line') {
    // Voice-AI agent interface, rendered in Line's real brand teal
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#04140f] via-[#071f1a] to-[#020a08]">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute w-72 h-72 bg-[#14b8a6]/15 rounded-full blur-[100px]" aria-hidden="true" />

        <div className="relative flex flex-col items-center gap-8">
          {/* Voice orb */}
          <div className="relative flex items-center justify-center">
            <span className="absolute w-40 h-40 rounded-full border border-[#14b8a6]/20 animate-ping" />
            <span className="absolute w-28 h-28 rounded-full border border-[#14b8a6]/30" />
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2dd4bf] to-[#0d9488] flex items-center justify-center shadow-[0_0_44px_rgba(20,184,166,0.6)]">
              <Mic className="w-8 h-8 text-[#04140f]" />
            </div>
          </div>

          {/* Waveform */}
          <div className="flex items-end gap-1.5 h-10" aria-hidden="true">
            {[40, 75, 55, 95, 60, 100, 48, 80, 62, 90, 44, 70].map((h, i) => (
              <span
                key={i}
                className="w-1.5 rounded-full bg-[#2dd4bf]"
                style={{ height: `${h}%`, opacity: 0.4 + (h / 200) }}
              />
            ))}
          </div>

          <span className="font-mono text-xs text-[#5eead4] tracking-[0.3em] uppercase">Talking to Line…</span>
        </div>
      </div>
    );
  }

  // Default: dayone, clean corporate site skeleton
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-surface via-dark to-night p-6 md:p-10">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="relative h-full bg-night/70 border border-line rounded-xl overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line">
          <span className="w-2.5 h-2.5 rounded-full bg-light/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-light/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-accent/60" />
          <div className="ml-3 h-4 bg-surface rounded-full flex-1 max-w-[55%]" />
        </div>
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-7">
            <div className="h-3 w-16 bg-accent/70 rounded" />
            <div className="flex gap-3">
              <div className="h-2 w-10 bg-light/20 rounded" />
              <div className="h-2 w-10 bg-light/20 rounded" />
              <div className="h-2 w-10 bg-light/20 rounded" />
            </div>
          </div>
          <div className="space-y-3 mb-7 max-w-[70%]">
            <div className="h-5 bg-light/30 rounded w-full" />
            <div className="h-5 bg-light/30 rounded w-4/5" />
            <div className="h-2.5 bg-light/15 rounded w-3/5 mt-4" />
          </div>
          <div className="h-8 w-32 bg-accent rounded-full mb-8 shadow-glow" />
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-18 bg-surface/80 border border-line rounded-lg p-3 space-y-2">
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

export default ProjectVisual;
