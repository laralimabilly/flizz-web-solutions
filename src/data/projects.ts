// Single source of truth for portfolio projects, shared across the app
// (home portfolio gallery + dynamic /portfolio/[slug] detail pages).

export type ProjectVisualKey = 'dayone' | 'bugo' | 'gustavo' | 'rumors' | 'nsa' | 'line';

export interface PortfolioProject {
  id: string;
  /** URL slug for the detail page: /portfolio/[slug] */
  slug: string;
  title: string;
  /** Short blurb shown on the portfolio card. */
  description: string;
  /** Longer, SEO-driven explanation shown on the detail page. */
  summary: string;
  industry: string;
  services: string[];
  /** Technologies used, listed on the detail page. */
  techStack: string[];
  year: string;
  /** Live site URL. */
  link?: string;
  /** Which hand-built art direction to render (see ProjectVisual). */
  visual: ProjectVisualKey;
  /** How many image placeholders the detail gallery should show. */
  galleryCount: number;
}

export const projects: PortfolioProject[] = [
  {
    id: '1',
    slug: 'nsa-limousine',
    title: 'NSA Limousine',
    description: 'A luxury transportation brand for Connecticut & New York, with a marketing site plus a custom admin dashboard for bookings, fleet and contacts. Built with Next.js, Supabase and Tailwind.',
    summary: 'NSA Limousine is a luxury transportation company serving Connecticut and New York. We delivered a fast, conversion-focused marketing site backed by a custom admin dashboard for managing bookings, fleet and customer messages. The build pairs a Next.js front end with a Supabase backend, with SEO and WhatsApp messaging automation baked in to turn visitors into reservations.',
    industry: 'Luxury Transport',
    services: ['Improved SEO', 'WhatsApp Integration', 'Messaging Automation'],
    techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'Tailwind CSS', 'shadcn/ui', 'GSAP', 'Resend'],
    link: 'https://www.nsalimousine.com/',
    year: '2026',
    visual: 'nsa',
    galleryCount: 3,
  },
  {
    id: '2',
    slug: 'line-ai',
    title: 'Line AI',
    description: 'AI tools for first-time startup founders: co-founder matching and investor evaluation powered by real-time ElevenLabs voice agents. Built with React, Supabase and the ElevenLabs API.',
    summary: 'Line gives first-time startup founders a set of AI tools to find co-founders and evaluate investors. We built real-time voice agents on the ElevenLabs API, wired to Supabase and Twilio, so founders can hold natural spoken conversations with the product. The result is a fast, modern React application that makes early-stage guidance feel personal and instant.',
    industry: 'AI / Startups',
    services: ['Twilio Integration', 'AI Voice Agents', 'Supabase'],
    techStack: ['React', 'TypeScript', 'Vite', 'Supabase', 'ElevenLabs', 'Twilio', 'Tailwind CSS', 'shadcn/ui'],
    link: 'https://www.meetline.ai/',
    year: '2026',
    visual: 'line',
    galleryCount: 3,
  },
  {
    id: '3',
    slug: 'dayone-talent-advisory',
    title: 'DayOne Talent Advisory',
    description: 'High-performance web platform built with Astro and React, featuring Storyblok-powered blogging, a lightweight proprietary i18n system and advanced analytics.',
    summary: 'DayOne Talent Advisory needed a high-performance marketing platform their team could update without a developer. We built it on Astro and React with a Storyblok CMS for real-time blogging, a lightweight proprietary i18n system for multi-language content, and advanced analytics. The site loads near-instantly and ranks strongly for their target keywords.',
    industry: 'Human Resources',
    services: ['Web Development', 'UI/UX Design', 'Storyblok CMS'],
    techStack: ['Astro', 'React', 'TypeScript', 'Storyblok', 'Tailwind CSS'],
    link: 'https://www.dayonetalent.com/',
    year: '2025',
    visual: 'dayone',
    galleryCount: 3,
  },
  {
    id: '4',
    slug: 'bugo-mobile-app',
    title: 'Bugo Mobile App',
    description: 'Bugo (Before U Go) uses intelligent geolocation, with no bluetooth tags and no setup, to remind you of your belongings before leaving a place. React Native + Expo.',
    summary: 'Bugo (Before U Go) is a mobile app that reminds you of your belongings before you leave a place, using intelligent geolocation with no bluetooth tags or complex setup. We handled the brand, the React Native and Expo app, and the supporting marketing site. The experience is deliberately simple: open it, and it just works.',
    industry: 'Utility Tools',
    services: ['Mobile App Development', 'Brand Design', 'Web Development'],
    techStack: ['React Native', 'Expo', 'TypeScript'],
    link: 'https://bugoapp.com/',
    year: '2026',
    visual: 'bugo',
    galleryCount: 3,
  },
  {
    id: '5',
    slug: 'gustavo-carmo-website',
    title: "Gustavo Carmo's Website",
    description: 'A modern stage for the guitarist known for his work with Rudy Sarzo, Tye Trujillo and Dirk Verbeuren, featuring discography, tour dates and social integrations.',
    summary: 'Gustavo Carmo is a guitarist known for his work with Rudy Sarzo, Tye Trujillo and Dirk Verbeuren. We built him a modern stage on the web: discography, tour dates and social integrations in one fast, focused site that puts his music front and center.',
    industry: 'Music',
    services: ['Web Development', 'Social Media', 'Platform Integration'],
    techStack: ['jQuery', 'PHP', 'HTML5', 'CSS3'],
    link: 'https://gustavocarmoguitar.com/',
    year: '2023',
    visual: 'gustavo',
    galleryCount: 3,
  },
  {
    id: '6',
    slug: 'ridiculous-rumors',
    title: 'Ridiculous Rumors',
    description: 'A conspiracy-theory generator with a 60s spy-era vibe, powered by Gemini AI. Built with Next.js, the Gemini API and Supabase.',
    summary: 'Ridiculous Rumors is a playful conspiracy-theory generator with a 1960s spy-era vibe. We built it on Next.js with the Gemini API generating the content and Supabase storing it, wrapped in a distinctive retro interface. It is fast, funny and shareable by design.',
    industry: 'Entertainment',
    services: ['Web Development', 'Supabase', 'Gemini AI'],
    techStack: ['Next.js', 'TypeScript', 'Gemini API', 'Supabase', 'Tailwind CSS'],
    link: 'https://ridiculousrumors.com/',
    year: '2025',
    visual: 'rumors',
    galleryCount: 3,
  },
];

export const getProjectBySlug = (slug: string): PortfolioProject | undefined =>
  projects.find((project) => project.slug === slug);
