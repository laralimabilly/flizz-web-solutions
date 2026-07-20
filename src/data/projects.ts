// Single source of truth for portfolio projects, shared across the app
// (home portfolio gallery + dynamic /portfolio/[slug] detail pages).
//
// Translatable prose (description, summary, industry, services) is stored
// per-locale; proper nouns (title, techStack, year) stay language-neutral.
// Use `localizeProject(project, lang)` to get a flat, resolved object.

import type { Lang } from '../i18n/ui';

export type ProjectVisualKey = 'dayone' | 'bugo' | 'gustavo' | 'rumors' | 'nsa' | 'line' | 'idontneedthat';

/** A string available in both supported locales. */
type Localized<T> = Record<Lang, T>;

export interface PortfolioProject {
  id: string;
  /** URL slug for the detail page: /portfolio/[slug] */
  slug: string;
  title: string;
  /** Short blurb shown on the portfolio card. */
  description: Localized<string>;
  /** Longer, SEO-driven explanation shown on the detail page. */
  summary: Localized<string>;
  industry: Localized<string>;
  services: Localized<string[]>;
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

/** A project with its translatable fields resolved to a single locale. */
export interface LocalizedProject {
  id: string;
  slug: string;
  title: string;
  description: string;
  summary: string;
  industry: string;
  services: string[];
  techStack: string[];
  year: string;
  link?: string;
  visual: ProjectVisualKey;
  galleryCount: number;
}

export const projects: PortfolioProject[] = [
  {
    id: '1',
    slug: 'nsa-limousine',
    title: 'NSA Limousine',
    description: {
      en: 'A luxury transportation brand for Connecticut & New York, with a marketing site plus a custom admin dashboard for bookings, fleet and contacts. Built with Next.js, Supabase and Tailwind.',
      pt: 'Uma marca de transporte de luxo para Connecticut e Nova York, com site institucional e um painel administrativo sob medida para reservas, frota e contatos. Construído com Next.js, Supabase e Tailwind.',
    },
    summary: {
      en: 'NSA Limousine is a luxury transportation company serving Connecticut and New York. We delivered a fast, conversion-focused marketing site backed by a custom admin dashboard for managing bookings, fleet and customer messages. The build pairs a Next.js front end with a Supabase backend, with SEO and WhatsApp messaging automation baked in to turn visitors into reservations.',
      pt: 'A NSA Limousine é uma empresa de transporte de luxo que atende Connecticut e Nova York. Entregamos um site institucional rápido e focado em conversão, apoiado por um painel administrativo sob medida para gerenciar reservas, frota e mensagens de clientes. A solução combina um front-end em Next.js com backend Supabase, com SEO e automação de mensagens via WhatsApp integrados para transformar visitantes em reservas.',
    },
    industry: { en: 'Luxury Transport', pt: 'Transporte de Luxo' },
    services: {
      en: ['Improved SEO', 'WhatsApp Integration', 'Messaging Automation'],
      pt: ['SEO Aprimorado', 'Integração com WhatsApp', 'Automação de Mensagens'],
    },
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
    description: {
      en: 'AI tools for first-time startup founders: co-founder matching and investor evaluation powered by real-time ElevenLabs voice agents. Built with React, Supabase and the ElevenLabs API.',
      pt: 'Ferramentas de IA para fundadores de startups de primeira viagem: matching de cofundadores e avaliação de investidores com agentes de voz em tempo real da ElevenLabs. Construído com React, Supabase e a API da ElevenLabs.',
    },
    summary: {
      en: 'Line gives first-time startup founders a set of AI tools to find co-founders and evaluate investors. We built real-time voice agents on the ElevenLabs API, wired to Supabase and Twilio, so founders can hold natural spoken conversations with the product. The result is a fast, modern React application that makes early-stage guidance feel personal and instant.',
      pt: 'A Line oferece a fundadores de primeira viagem um conjunto de ferramentas de IA para encontrar cofundadores e avaliar investidores. Construímos agentes de voz em tempo real sobre a API da ElevenLabs, conectados ao Supabase e ao Twilio, para que fundadores tenham conversas naturais por voz com o produto. O resultado é uma aplicação React rápida e moderna que torna a orientação em estágio inicial pessoal e instantânea.',
    },
    industry: { en: 'AI / Startups', pt: 'IA / Startups' },
    services: {
      en: ['Twilio Integration', 'AI Voice Agents', 'Supabase'],
      pt: ['Integração com Twilio', 'Agentes de Voz com IA', 'Supabase'],
    },
    techStack: ['React', 'TypeScript', 'Vite', 'Supabase', 'ElevenLabs', 'Twilio', 'Tailwind CSS', 'shadcn/ui'],
    link: 'https://www.meetline.ai/',
    year: '2026',
    visual: 'line',
    galleryCount: 3,
  },
  {
    id: '3',
    slug: 'i-dont-need-that',
    title: "I Don't Need That",
    description: {
      en: 'An affiliate marketplace for gloriously useless novelty products, with a bold 90s-inspired storefront and a full admin dashboard for products, categories and click analytics. Built with Next.js and Supabase.',
      pt: 'Um marketplace de afiliados para produtos inúteis e maravilhosos, com uma loja de inspiração nos anos 90 e um painel administrativo completo para produtos, categorias e analytics de cliques. Construído com Next.js e Supabase.',
    },
    summary: {
      en: "I Don't Need That is an affiliate marketplace built around a simple joke: products you didn't know you needed, and definitely don't. We built a loud, 90s-inspired storefront on Next.js and Supabase, backed by a full admin panel for managing products, categories, tags and site settings. Every affiliate click is tracked, so the team can see what's working by day, device and country.",
      pt: 'I Don’t Need That é um marketplace de afiliados construído em torno de uma piada simples: produtos que você não sabia que precisava e definitivamente não precisa. Construímos uma loja vibrante com inspiração nos anos 90 sobre Next.js e Supabase, apoiada por um painel administrativo completo para gerenciar produtos, categorias, tags e configurações do site. Cada clique de afiliado é rastreado, para que a equipe veja o que está funcionando por dia, dispositivo e país.',
    },
    industry: { en: 'Affiliate / E-commerce', pt: 'Afiliados / E-commerce' },
    services: {
      en: ['Web Development', 'Admin Dashboard', 'Click Analytics'],
      pt: ['Desenvolvimento Web', 'Painel Administrativo', 'Analytics de Cliques'],
    },
    techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'Tailwind CSS', 'shadcn/ui'],
    link: 'https://www.idontneedthat.com/',
    year: '2026',
    visual: 'idontneedthat',
    galleryCount: 8,
  },
  {
    id: '4',
    slug: 'dayone-talent-advisory',
    title: 'DayOne Talent Advisory',
    description: {
      en: 'High-performance web platform built with Astro and React, featuring Storyblok-powered blogging, a lightweight proprietary i18n system and advanced analytics.',
      pt: 'Plataforma web de alta performance construída com Astro e React, com blog gerenciado pelo Storyblok, um sistema de i18n próprio e leve e analytics avançado.',
    },
    summary: {
      en: 'DayOne Talent Advisory needed a high-performance marketing platform their team could update without a developer. We built it on Astro and React with a Storyblok CMS for real-time blogging, a lightweight proprietary i18n system for multi-language content, and advanced analytics. The site loads near-instantly and ranks strongly for their target keywords.',
      pt: 'A DayOne Talent Advisory precisava de uma plataforma de marketing de alta performance que a equipe pudesse atualizar sem um desenvolvedor. Construímos sobre Astro e React, com o CMS Storyblok para blog em tempo real, um sistema de i18n próprio e leve para conteúdo multilíngue e analytics avançado. O site carrega quase instantaneamente e rankeia bem para as palavras-chave alvo.',
    },
    industry: { en: 'Human Resources', pt: 'Recursos Humanos' },
    services: {
      en: ['Web Development', 'UI/UX Design', 'Storyblok CMS'],
      pt: ['Desenvolvimento Web', 'UI/UX Design', 'Storyblok CMS'],
    },
    techStack: ['Astro', 'React', 'TypeScript', 'Storyblok', 'Tailwind CSS'],
    link: 'https://www.dayonetalent.com/',
    year: '2025',
    visual: 'dayone',
    galleryCount: 3,
  },
  {
    id: '5',
    slug: 'bugo-mobile-app',
    title: 'Bugo Mobile App',
    description: {
      en: 'Bugo (Before U Go) uses intelligent geolocation, with no bluetooth tags and no setup, to remind you of your belongings before leaving a place. React Native + Expo.',
      pt: 'O Bugo (Before U Go) usa geolocalização inteligente, sem tags bluetooth e sem configuração, para lembrar você dos seus pertences antes de sair de um lugar. React Native + Expo.',
    },
    summary: {
      en: 'Bugo (Before U Go) is a mobile app that reminds you of your belongings before you leave a place, using intelligent geolocation with no bluetooth tags or complex setup. We handled the brand, the React Native and Expo app, and the supporting marketing site. The experience is deliberately simple: open it, and it just works.',
      pt: 'O Bugo (Before U Go) é um app mobile que lembra você dos seus pertences antes de sair de um lugar, usando geolocalização inteligente, sem tags bluetooth ou configuração complexa. Cuidamos da marca, do app em React Native e Expo e do site de marketing de apoio. A experiência é deliberadamente simples: abra o app, e ele simplesmente funciona.',
    },
    industry: { en: 'Utility Tools', pt: 'Ferramentas Utilitárias' },
    services: {
      en: ['Mobile App Development', 'Brand Design', 'Web Development'],
      pt: ['Desenvolvimento de App Mobile', 'Design de Marca', 'Desenvolvimento Web'],
    },
    techStack: ['React Native', 'Expo', 'TypeScript'],
    link: 'https://bugoapp.com/',
    year: '2026',
    visual: 'bugo',
    galleryCount: 3,
  },
  {
    id: '6',
    slug: 'gustavo-carmo-website',
    title: "Gustavo Carmo's Website",
    description: {
      en: 'A modern stage for the guitarist known for his work with Rudy Sarzo, Tye Trujillo and Dirk Verbeuren, featuring discography, tour dates and social integrations.',
      pt: 'Um palco moderno para o guitarrista conhecido por seu trabalho com Rudy Sarzo, Tye Trujillo e Dirk Verbeuren, com discografia, datas de turnê e integrações sociais.',
    },
    summary: {
      en: 'Gustavo Carmo is a guitarist known for his work with Rudy Sarzo, Tye Trujillo and Dirk Verbeuren. We built him a modern stage on the web: discography, tour dates and social integrations in one fast, focused site that puts his music front and center.',
      pt: 'Gustavo Carmo é um guitarrista conhecido por seu trabalho com Rudy Sarzo, Tye Trujillo e Dirk Verbeuren. Construímos para ele um palco moderno na web: discografia, datas de turnê e integrações sociais em um site rápido e focado que coloca a música dele em primeiro plano.',
    },
    industry: { en: 'Music', pt: 'Música' },
    services: {
      en: ['Web Development', 'Social Media', 'Platform Integration'],
      pt: ['Desenvolvimento Web', 'Redes Sociais', 'Integração de Plataformas'],
    },
    techStack: ['jQuery', 'PHP', 'HTML5', 'CSS3'],
    link: 'https://gustavocarmoguitar.com/',
    year: '2023',
    visual: 'gustavo',
    galleryCount: 3,
  },
  {
    id: '7',
    slug: 'ridiculous-rumors',
    title: 'Ridiculous Rumors',
    description: {
      en: 'A conspiracy-theory generator with a 60s spy-era vibe, powered by Gemini AI. Built with Next.js, the Gemini API and Supabase.',
      pt: 'Um gerador de teorias da conspiração com clima de espionagem dos anos 60, movido pela IA do Gemini. Construído com Next.js, a API do Gemini e Supabase.',
    },
    summary: {
      en: 'Ridiculous Rumors is a playful conspiracy-theory generator with a 1960s spy-era vibe. We built it on Next.js with the Gemini API generating the content and Supabase storing it, wrapped in a distinctive retro interface. It is fast, funny and shareable by design.',
      pt: 'O Ridiculous Rumors é um gerador divertido de teorias da conspiração com clima de espionagem dos anos 1960. Construímos sobre Next.js, com a API do Gemini gerando o conteúdo e o Supabase armazenando, embrulhado em uma interface retrô marcante. É rápido, engraçado e feito para ser compartilhado.',
    },
    industry: { en: 'Entertainment', pt: 'Entretenimento' },
    services: {
      en: ['Web Development', 'Supabase', 'Gemini AI'],
      pt: ['Desenvolvimento Web', 'Supabase', 'Gemini AI'],
    },
    techStack: ['Next.js', 'TypeScript', 'Gemini API', 'Supabase', 'Tailwind CSS'],
    link: 'https://ridiculousrumors.com/',
    year: '2025',
    visual: 'rumors',
    galleryCount: 3,
  },
];

export const getProjectBySlug = (slug: string): PortfolioProject | undefined =>
  projects.find((project) => project.slug === slug);

/** Resolve a project's translatable fields to a single locale. */
export function localizeProject(project: PortfolioProject, lang: Lang): LocalizedProject {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    description: project.description[lang],
    summary: project.summary[lang],
    industry: project.industry[lang],
    services: project.services[lang],
    techStack: project.techStack,
    year: project.year,
    link: project.link,
    visual: project.visual,
    galleryCount: project.galleryCount,
  };
}

/** All projects resolved to a single locale, preserving order. */
export const getLocalizedProjects = (lang: Lang): LocalizedProject[] =>
  projects.map((project) => localizeProject(project, lang));
