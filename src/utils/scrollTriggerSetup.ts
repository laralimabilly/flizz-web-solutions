// Shared ScrollTrigger setup, imported for its side effects by every component
// that uses scroll-driven animations. Keeps trigger positions stable on mobile.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

if (typeof window !== 'undefined') {
  // On mobile the address bar shows/hides while scrolling, changing the viewport
  // height. By default that fires ScrollTrigger.refresh() mid-scroll, which
  // recomputes every trigger's start/end and makes reveals fire at the wrong
  // moment (content stuck hidden, footer showing through). Ignoring these small
  // vertical resizes keeps the thresholds fixed to the initial layout.
  ScrollTrigger.config({ ignoreMobileResize: true });

  // Fonts and above-the-fold images change element heights after first paint,
  // shifting every trigger's start position. Recompute once they've settled.
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh, { once: true });
  if (document.fonts?.ready) {
    document.fonts.ready.then(refresh).catch(() => {});
  }
}
