// Single source of truth for the dedicated service pages, shared across the app
// (home Solutions index, footer links + dynamic /services/[slug] detail pages).
//
// Follows the same localization pattern as projects.ts: translatable prose is
// stored per-locale, language-neutral values stay flat. Use
// `localizeService(service, lang)` to get a resolved object.
//
// Order matters: it mirrors ui.solutions.services (01 to 04 on the home page).

import type { Lang } from '../i18n/ui';

export type ServiceVisualKey = 'web' | 'mobile' | 'deploy' | 'design';

/** A value available in both supported locales. */
type Localized<T> = Record<Lang, T>;

export interface ServicePage {
  id: string;
  /** URL slug, identical in both locales: /services/[slug] and /pt/services/[slug]. */
  slug: string;
  /** Which hand-built art direction to render (see ServiceVisual). */
  visual: ServiceVisualKey;
  metaTitle: Localized<string>;
  metaDescription: Localized<string>;
  /** Short positioning line, shown in the hero eyebrow. */
  tagline: Localized<string>;
  /** Display title, three stacked lines: light / accent / stroke. */
  titleLines: Localized<[string, string, string]>;
  intro: Localized<string>;
  stats: { value: string; label: Localized<string> }[];
  pillars: Localized<{ title: string; description: string }[]>;
  process: Localized<{ title: string; description: string }[]>;
  deliverables: Localized<string[]>;
  faq: Localized<{ q: string; a: string }[]>;
}

/** A service with its translatable fields resolved to a single locale. */
export interface LocalizedService {
  id: string;
  slug: string;
  visual: ServiceVisualKey;
  title: string;
  metaTitle: string;
  metaDescription: string;
  tagline: string;
  titleLines: [string, string, string];
  intro: string;
  stats: { value: string; label: string }[];
  pillars: { title: string; description: string }[];
  process: { title: string; description: string }[];
  deliverables: string[];
  faq: { q: string; a: string }[];
}

/** Canonical service names per locale (mirrors ui.solutions.services order). */
export const serviceTitles: Localized<string>[] = [
  { en: 'Web Development', pt: 'Desenvolvimento Web' },
  { en: 'Mobile Apps', pt: 'Apps Mobile' },
  { en: 'Deploy & Maintain', pt: 'Deploy & Manutenção' },
  { en: 'Brand & Web Design', pt: 'Marca & Web Design' },
];

export const services: ServicePage[] = [
  {
    id: '1',
    slug: 'web-development',
    visual: 'web',
    metaTitle: {
      en: 'Web Development with React, Next.js & Astro | Flizz Web Solutions',
      pt: 'Desenvolvimento Web com React, Next.js & Astro | Flizz Web Solutions',
    },
    metaDescription: {
      en: 'High-performance web development with React, Next.js and Astro. SEO-ready, pixel-perfect websites that load in under a second and rank on top. Serving Brazil and the US.',
      pt: 'Desenvolvimento web de alta performance com React, Next.js e Astro. Sites pixel-perfect, prontos para SEO, que carregam em menos de um segundo e lideram os rankings. Brasil e EUA.',
    },
    tagline: { en: 'Built for speed', pt: 'Feito para velocidade' },
    titleLines: {
      en: ['PIXEL-PERFECT.', 'BLAZING FAST.', 'BUILT TO RANK.'],
      pt: ['PIXEL-PERFECT.', 'ULTRARRÁPIDO.', 'FEITO PARA RANKEAR.'],
    },
    intro: {
      en: 'We engineer websites and web apps that load in the blink of an eye, score 100 on Lighthouse and climb search rankings from day one. Modern stack, clean code, zero bloat.',
      pt: 'Projetamos sites e web apps que carregam num piscar de olhos, pontuam 100 no Lighthouse e sobem nos rankings de busca desde o primeiro dia. Stack moderna, código limpo, zero excesso.',
    },
    stats: [
      { value: '100', label: { en: 'Lighthouse score we build for', pt: 'Nota Lighthouse que buscamos' } },
      { value: '<1s', label: { en: 'First paint, even on 4G', pt: 'Primeira renderização, mesmo em 4G' } },
      { value: '50+', label: { en: 'Projects delivered', pt: 'Projetos entregues' } },
    ],
    pillars: {
      en: [
        {
          title: 'Performance engineering',
          description:
            'Static-first builds, edge caching, image optimization and code-splitting. Speed is designed in from the first commit, never patched on at the end.',
        },
        {
          title: 'SEO architecture',
          description:
            'Semantic HTML, structured data, hreflang and a meta strategy on every page, so search engines understand your site and reward it with visibility.',
        },
        {
          title: 'Scalable code',
          description:
            'TypeScript, component-driven architecture and clean APIs that welcome the next feature instead of fighting it. Your codebase stays a pleasure to grow.',
        },
      ],
      pt: [
        {
          title: 'Engenharia de performance',
          description:
            'Builds static-first, cache na borda, otimização de imagens e code-splitting. A velocidade nasce no primeiro commit, nunca é remendada no final.',
        },
        {
          title: 'Arquitetura de SEO',
          description:
            'HTML semântico, dados estruturados, hreflang e estratégia de meta em cada página, para que os buscadores entendam seu site e o recompensem com visibilidade.',
        },
        {
          title: 'Código escalável',
          description:
            'TypeScript, arquitetura orientada a componentes e APIs limpas que recebem bem a próxima funcionalidade em vez de lutar contra ela. Seu código continua um prazer de evoluir.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Discovery',
          description: 'We map your goals, audience and content to define the pages, features and keywords that actually matter for your business.',
        },
        {
          title: 'Architecture',
          description: 'Stack selection, sitemap and data modeling. We choose the lightest tool that does the job: Astro, Next.js or plain React.',
        },
        {
          title: 'Build',
          description: 'Component-driven development with clickable previews every week. You see progress, comment and steer. No black box.',
        },
        {
          title: 'Launch & grow',
          description: 'Zero-downtime deploy, analytics wiring and a performance report. Then we iterate on real user data.',
        },
      ],
      pt: [
        {
          title: 'Descoberta',
          description: 'Mapeamos seus objetivos, público e conteúdo para definir as páginas, funcionalidades e palavras-chave que realmente importam para o seu negócio.',
        },
        {
          title: 'Arquitetura',
          description: 'Escolha da stack, sitemap e modelagem de dados. Escolhemos a ferramenta mais leve que resolve: Astro, Next.js ou React puro.',
        },
        {
          title: 'Construção',
          description: 'Desenvolvimento orientado a componentes com previews clicáveis toda semana. Você acompanha, comenta e direciona. Nada de caixa-preta.',
        },
        {
          title: 'Lançamento & evolução',
          description: 'Deploy sem downtime, analytics configurado e relatório de performance. Depois, iteramos com dados reais de usuários.',
        },
      ],
    },
    deliverables: {
      en: ['Responsive website', 'CMS integration', 'Technical SEO', 'Structured data', 'Analytics setup', 'Performance report', 'Multilingual i18n'],
      pt: ['Site responsivo', 'Integração com CMS', 'SEO técnico', 'Dados estruturados', 'Analytics configurado', 'Relatório de performance', 'i18n multilíngue'],
    },
    faq: {
      en: [
        {
          q: 'How long does a website take to build?',
          a: 'A focused marketing site ships in 2 to 4 weeks; larger web apps typically run 6 to 12 weeks. You get clickable previews every week, so there are no surprises at the end.',
        },
        {
          q: 'Which technologies do you use?',
          a: 'React, TypeScript, Next.js and Astro, styled with Tailwind CSS. We pick the lightest stack that serves the project: static-first whenever possible, for speed and SEO.',
        },
        {
          q: 'Will my website rank on Google?',
          a: 'Every build ships with technical SEO baked in: semantic markup, structured data, sitemaps, hreflang and sub-second load times. Rankings also depend on content and competition, but your technical foundation will be flawless.',
        },
        {
          q: 'Can you redesign my existing site?',
          a: 'Yes. We audit what you have, keep what works and rebuild what holds you back, often reusing your content while multiplying its speed and search visibility.',
        },
      ],
      pt: [
        {
          q: 'Quanto tempo leva para construir um site?',
          a: 'Um site institucional focado sai em 2 a 4 semanas; web apps maiores costumam levar de 6 a 12 semanas. Você recebe previews clicáveis toda semana, sem surpresas no final.',
        },
        {
          q: 'Quais tecnologias vocês usam?',
          a: 'React, TypeScript, Next.js e Astro, com Tailwind CSS. Escolhemos a stack mais leve que atende o projeto: static-first sempre que possível, por velocidade e SEO.',
        },
        {
          q: 'Meu site vai rankear no Google?',
          a: 'Todo projeto sai com SEO técnico embutido: marcação semântica, dados estruturados, sitemaps, hreflang e carregamento em menos de um segundo. Rankings também dependem de conteúdo e concorrência, mas sua base técnica será impecável.',
        },
        {
          q: 'Vocês redesenham um site existente?',
          a: 'Sim. Auditamos o que você tem, mantemos o que funciona e reconstruímos o que te segura, muitas vezes reaproveitando seu conteúdo enquanto multiplicamos velocidade e visibilidade nas buscas.',
        },
      ],
    },
  },
  {
    id: '2',
    slug: 'mobile-apps',
    visual: 'mobile',
    metaTitle: {
      en: 'Mobile App Development with React Native & Expo | Flizz Web Solutions',
      pt: 'Desenvolvimento de Apps Mobile com React Native & Expo | Flizz Web Solutions',
    },
    metaDescription: {
      en: 'Native-feel iOS and Android apps from one React Native codebase. Design, development, App Store launch and over-the-air updates, end to end. Brazil and the US.',
      pt: 'Apps iOS e Android com sensação nativa a partir de um único código React Native. Design, desenvolvimento, lançamento nas lojas e atualizações OTA, de ponta a ponta.',
    },
    tagline: { en: 'Native experiences', pt: 'Experiências nativas' },
    titleLines: {
      en: ['ONE CODEBASE.', 'TWO PLATFORMS.', 'NATIVE FEEL.'],
      pt: ['UM SÓ CÓDIGO.', 'DUAS PLATAFORMAS.', 'SENSAÇÃO NATIVA.'],
    },
    intro: {
      en: 'From idea to the App Store: we design and build iOS and Android apps with React Native and Expo: one codebase, native performance, and updates that ship over the air.',
      pt: 'Da ideia à App Store: projetamos e construímos apps iOS e Android com React Native e Expo: um único código, performance nativa e atualizações que chegam pelo ar.',
    },
    stats: [
      { value: '2', label: { en: 'Platforms from one codebase', pt: 'Plataformas com um só código' } },
      { value: 'OTA', label: { en: 'Updates without store waits', pt: 'Atualizações sem fila de loja' } },
      { value: '60fps', label: { en: 'Native-feel interactions', pt: 'Interações com fluidez nativa' } },
    ],
    pillars: {
      en: [
        {
          title: 'Cross-platform engineering',
          description:
            'React Native and Expo deliver iOS and Android from a single codebase, with half the maintenance cost and all the native feel your users expect.',
        },
        {
          title: 'Product-grade UX',
          description:
            'Gesture-driven interfaces, offline states, push notifications and deep links, designed around how people actually hold and use a phone.',
        },
        {
          title: 'Launch & lifecycle',
          description:
            'Store listings, review compliance, analytics and over-the-air updates. Shipping to the stores is the start of the journey, not the finish line.',
        },
      ],
      pt: [
        {
          title: 'Engenharia multiplataforma',
          description:
            'React Native e Expo entregam iOS e Android a partir de um único código, com metade do custo de manutenção e toda a fluidez nativa que seus usuários esperam.',
        },
        {
          title: 'UX de produto',
          description:
            'Interfaces guiadas por gestos, estados offline, notificações push e deep links, desenhados em torno de como as pessoas realmente seguram e usam o celular.',
        },
        {
          title: 'Lançamento & ciclo de vida',
          description:
            'Fichas nas lojas, conformidade com as reviews, analytics e atualizações OTA. Publicar nas lojas é o começo da jornada, não a linha de chegada.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Discovery',
          description: 'We define the core loop of your app: the one job it must do brilliantly, the audience, and the platforms and integrations it needs.',
        },
        {
          title: 'Product design',
          description: 'Flows, wireframes and a clickable prototype you can hold in your hand, validated before a single line of production code.',
        },
        {
          title: 'Build',
          description: 'Weekly builds on your own device via TestFlight and internal tracks. Real screens, real data, real feedback loops.',
        },
        {
          title: 'Launch & iterate',
          description: 'Store submission, ASO, crash monitoring and over-the-air updates that fix and improve without waiting for review.',
        },
      ],
      pt: [
        {
          title: 'Descoberta',
          description: 'Definimos o núcleo do seu app: o trabalho que ele precisa fazer brilhantemente, o público e as plataformas e integrações necessárias.',
        },
        {
          title: 'Design de produto',
          description: 'Fluxos, wireframes e um protótipo clicável que você segura na mão, validado antes de qualquer linha de código de produção.',
        },
        {
          title: 'Construção',
          description: 'Builds semanais no seu próprio aparelho via TestFlight e trilhas internas. Telas reais, dados reais, feedback real.',
        },
        {
          title: 'Lançamento & iteração',
          description: 'Publicação nas lojas, ASO, monitoramento de crashes e atualizações OTA que corrigem e melhoram sem esperar review.',
        },
      ],
    },
    deliverables: {
      en: ['iOS & Android app', 'Clickable prototype', 'Push notifications', 'App Store listing', 'Analytics events', 'OTA update pipeline', 'Crash monitoring'],
      pt: ['App iOS & Android', 'Protótipo clicável', 'Notificações push', 'Ficha nas app stores', 'Eventos de analytics', 'Pipeline de OTA', 'Monitoramento de crashes'],
    },
    faq: {
      en: [
        {
          q: 'Do I need separate apps for iOS and Android?',
          a: 'No. React Native produces both from one codebase with native rendering. You get two apps, one team, one timeline, and features land on both platforms simultaneously.',
        },
        {
          q: 'How do app updates work?',
          a: 'UI and logic changes ship instantly over the air with Expo Updates, no store review needed. Native-level changes go through the stores. We handle both pipelines for you.',
        },
        {
          q: 'Can my app work offline?',
          a: 'Yes. We design offline-first where it matters: local storage, queued actions and graceful sync when the connection returns.',
        },
        {
          q: 'Do you handle App Store submission?',
          a: 'End to end: developer accounts, certificates, store listings, screenshots, review compliance and the follow-ups until both stores approve.',
        },
      ],
      pt: [
        {
          q: 'Preciso de apps separados para iOS e Android?',
          a: 'Não. O React Native gera os dois a partir de um único código com renderização nativa. Você ganha dois apps, um time, um cronograma, e as funcionalidades chegam nas duas plataformas ao mesmo tempo.',
        },
        {
          q: 'Como funcionam as atualizações do app?',
          a: 'Mudanças de interface e lógica chegam instantaneamente pelo ar com Expo Updates, sem review de loja. Mudanças nativas passam pelas lojas. Cuidamos dos dois fluxos para você.',
        },
        {
          q: 'Meu app pode funcionar offline?',
          a: 'Sim. Projetamos offline-first onde importa: armazenamento local, ações em fila e sincronização suave quando a conexão volta.',
        },
        {
          q: 'Vocês cuidam da publicação nas lojas?',
          a: 'De ponta a ponta: contas de desenvolvedor, certificados, fichas nas lojas, screenshots, conformidade com as reviews e os ajustes até as duas lojas aprovarem.',
        },
      ],
    },
  },
  {
    id: '3',
    slug: 'deploy-maintain',
    visual: 'deploy',
    metaTitle: {
      en: 'Deployment, Hosting & Website Maintenance | Flizz Web Solutions',
      pt: 'Deploy, Hospedagem & Manutenção de Sites | Flizz Web Solutions',
    },
    metaDescription: {
      en: 'Cloud hosting, CI/CD pipelines, 24/7 monitoring and ongoing maintenance. We keep your site fast, secure and always online, so you can focus on the business.',
      pt: 'Hospedagem em nuvem, pipelines CI/CD, monitoramento 24/7 e manutenção contínua. Mantemos seu site rápido, seguro e sempre no ar, para você focar no negócio.',
    },
    tagline: { en: 'Always online', pt: 'Sempre no ar' },
    titleLines: {
      en: ['ALWAYS ON.', 'ALWAYS FAST.', 'ALWAYS SAFE.'],
      pt: ['SEMPRE NO AR.', 'SEMPRE RÁPIDO.', 'SEMPRE SEGURO.'],
    },
    intro: {
      en: 'Launch is day one. We run the pipelines, monitoring and updates that keep your product fast, secure and online, every hour of every day.',
      pt: 'O lançamento é o primeiro dia. Nós operamos os pipelines, o monitoramento e as atualizações que mantêm seu produto rápido, seguro e no ar, a cada hora, todos os dias.',
    },
    stats: [
      { value: '99.9%', label: { en: 'Uptime we architect for', pt: 'Uptime para o qual projetamos' } },
      { value: '24/7', label: { en: 'Automated monitoring', pt: 'Monitoramento automatizado' } },
      { value: '0', label: { en: 'Downtime on deploys', pt: 'Downtime nos deploys' } },
    ],
    pillars: {
      en: [
        {
          title: 'Continuous deployment',
          description:
            'CI/CD pipelines with preview environments, automated tests and one-click rollbacks. Every change is verified before it reaches your users.',
        },
        {
          title: 'Monitoring & security',
          description:
            'Uptime checks, error tracking, SSL, security headers and automated backups. Problems are caught by robots at 3 a.m., not by customers at 9.',
        },
        {
          title: 'Care & evolution',
          description:
            'Dependency updates, performance tuning and monthly reports in plain language. Your platform gets faster and safer with age, not slower.',
        },
      ],
      pt: [
        {
          title: 'Deploy contínuo',
          description:
            'Pipelines CI/CD com ambientes de preview, testes automatizados e rollback em um clique. Cada mudança é verificada antes de chegar aos seus usuários.',
        },
        {
          title: 'Monitoramento & segurança',
          description:
            'Checagens de uptime, rastreio de erros, SSL, headers de segurança e backups automáticos. Problemas são pegos por robôs às 3h da manhã, não por clientes às 9h.',
        },
        {
          title: 'Cuidado & evolução',
          description:
            'Atualizações de dependências, ajustes de performance e relatórios mensais em linguagem simples. Sua plataforma fica mais rápida e segura com o tempo, não mais lenta.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Audit',
          description: 'We map your current infrastructure, dependencies, risks and costs, then show you exactly where you stand.',
        },
        {
          title: 'Pipeline',
          description: 'CI/CD with preview environments, automated tests and one-click rollbacks, tailored to your stack and team.',
        },
        {
          title: 'Hardening',
          description: 'SSL, security headers, automated backups, dependency updates and access control. The boring work that prevents disasters.',
        },
        {
          title: 'Watch & improve',
          description: 'Dashboards, alerts and monthly reports. We watch the graphs so you can watch the business.',
        },
      ],
      pt: [
        {
          title: 'Auditoria',
          description: 'Mapeamos sua infraestrutura atual, dependências, riscos e custos, e mostramos exatamente onde você está.',
        },
        {
          title: 'Pipeline',
          description: 'CI/CD com ambientes de preview, testes automatizados e rollback em um clique, sob medida para sua stack e seu time.',
        },
        {
          title: 'Blindagem',
          description: 'SSL, headers de segurança, backups automáticos, atualização de dependências e controle de acesso. O trabalho invisível que evita desastres.',
        },
        {
          title: 'Vigiar & melhorar',
          description: 'Dashboards, alertas e relatórios mensais. Nós olhamos os gráficos para você olhar o negócio.',
        },
      ],
    },
    deliverables: {
      en: ['CI/CD pipeline', 'Cloud hosting', 'Uptime monitoring', 'Security hardening', 'Automated backups', 'Monthly reports', 'One-click rollbacks'],
      pt: ['Pipeline CI/CD', 'Hospedagem em nuvem', 'Monitoramento de uptime', 'Blindagem de segurança', 'Backups automáticos', 'Relatórios mensais', 'Rollback em um clique'],
    },
    faq: {
      en: [
        {
          q: 'What happens if my site goes down?',
          a: 'Automated monitors detect the outage within a minute and alert us immediately. Most incidents are resolved by automatic rollback or failover before anyone notices.',
        },
        {
          q: 'Do you work with my existing hosting?',
          a: 'Usually, yes. We work with Vercel, Netlify, AWS, Cloudflare and traditional VPS providers. If your current setup is the bottleneck, we will recommend a migration path with costs upfront.',
        },
        {
          q: 'What does maintenance include?',
          a: 'Dependency and security updates, backups, uptime and error monitoring, performance tuning and a monthly report. Content updates and small improvements can be included in your plan.',
        },
        {
          q: 'How are deploys kept safe?',
          a: 'Every change passes automated checks in a preview environment before production. Deploys are atomic with instant rollbacks, so your users never see a half-updated site.',
        },
      ],
      pt: [
        {
          q: 'O que acontece se meu site cair?',
          a: 'Monitores automáticos detectam a queda em menos de um minuto e nos alertam imediatamente. A maioria dos incidentes se resolve com rollback automático ou failover antes que alguém perceba.',
        },
        {
          q: 'Vocês trabalham com minha hospedagem atual?',
          a: 'Geralmente sim. Trabalhamos com Vercel, Netlify, AWS, Cloudflare e VPS tradicionais. Se a sua configuração atual for o gargalo, recomendamos um caminho de migração com custos transparentes.',
        },
        {
          q: 'O que a manutenção inclui?',
          a: 'Atualizações de dependências e segurança, backups, monitoramento de uptime e erros, ajustes de performance e um relatório mensal. Atualizações de conteúdo e pequenas melhorias podem entrar no seu plano.',
        },
        {
          q: 'Como os deploys são mantidos seguros?',
          a: 'Cada mudança passa por checagens automatizadas em um ambiente de preview antes da produção. Deploys são atômicos, com rollback instantâneo, então seus usuários nunca veem um site pela metade.',
        },
      ],
    },
  },
  {
    id: '4',
    slug: 'brand-web-design',
    visual: 'design',
    metaTitle: {
      en: 'Brand Identity & Web Design Services | Flizz Web Solutions',
      pt: 'Identidade de Marca & Web Design | Flizz Web Solutions',
    },
    metaDescription: {
      en: 'Brand identities and UI/UX design that convert. Logos, design systems, prototypes and interfaces crafted to captivate your audience and turn visitors into customers.',
      pt: 'Identidades de marca e UI/UX design que convertem. Logos, design systems, protótipos e interfaces criados para cativar seu público e transformar visitantes em clientes.',
    },
    tagline: { en: 'Design that converts', pt: 'Design que converte' },
    titleLines: {
      en: ['DESIGN THAT', 'CAPTIVATES.', 'AND CONVERTS.'],
      pt: ['DESIGN QUE', 'CATIVA.', 'E CONVERTE.'],
    },
    intro: {
      en: 'Strategy-led brand identities and interfaces. We design the visual language, the system behind it and the screens your customers fall in love with.',
      pt: 'Identidades de marca e interfaces guiadas por estratégia. Desenhamos a linguagem visual, o sistema por trás dela e as telas pelas quais seus clientes se apaixonam.',
    },
    stats: [
      { value: '1', label: { en: 'System, from logo to UI', pt: 'Sistema, do logo à interface' } },
      { value: '100%', label: { en: 'Yours: files, fonts and rights', pt: 'Seu: arquivos, fontes e direitos' } },
      { value: '0', label: { en: 'Template shortcuts taken', pt: 'Atalhos de template usados' } },
    ],
    pillars: {
      en: [
        {
          title: 'Brand identity',
          description:
            'Logo, color, typography and voice built from strategy, not trends. A distinctive identity your audience recognizes at a glance.',
        },
        {
          title: 'UI & UX design',
          description:
            'Research-backed interfaces designed around user goals and business metrics. Beautiful, yes, but every screen has a job and does it.',
        },
        {
          title: 'Design systems',
          description:
            'Reusable components, tokens and guidelines in Figma that keep every future page, post and product on-brand, with a dev handoff that just works.',
        },
      ],
      pt: [
        {
          title: 'Identidade de marca',
          description:
            'Logo, cor, tipografia e tom de voz nascidos de estratégia, não de modismos. Uma identidade marcante que seu público reconhece de relance.',
        },
        {
          title: 'UI & UX design',
          description:
            'Interfaces embasadas em pesquisa, desenhadas em torno de objetivos do usuário e métricas de negócio. Bonitas, sim, mas cada tela tem um trabalho e o cumpre.',
        },
        {
          title: 'Design systems',
          description:
            'Componentes reutilizáveis, tokens e diretrizes no Figma que mantêm cada página, post e produto futuro dentro da marca, com um handoff para devs que simplesmente funciona.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Immersion',
          description: 'We study your market, competitors and audience until we can articulate what makes you different in one sentence.',
        },
        {
          title: 'Concept',
          description: 'Creative directions with moodboards and early explorations. We converge on one strong idea together, with rationale rather than vibes.',
        },
        {
          title: 'Design',
          description: 'The full identity and interface, applied to real screens and real content. Reviewed in the open, refined in rounds.',
        },
        {
          title: 'Handoff',
          description: 'Organized Figma files, brand guidelines, exports and tokens. Everything a developer or printer needs, without a single follow-up email.',
        },
      ],
      pt: [
        {
          title: 'Imersão',
          description: 'Estudamos seu mercado, concorrentes e público até conseguir articular em uma frase o que torna você diferente.',
        },
        {
          title: 'Conceito',
          description: 'Direções criativas com moodboards e primeiras explorações. Convergimos juntos para uma ideia forte, com argumento e não achismo.',
        },
        {
          title: 'Design',
          description: 'A identidade e a interface completas, aplicadas a telas e conteúdo reais. Revisadas às claras, refinadas em rodadas.',
        },
        {
          title: 'Handoff',
          description: 'Arquivos Figma organizados, manual da marca, exports e tokens. Tudo que um dev ou uma gráfica precisa, sem um único e-mail de dúvida.',
        },
      ],
    },
    deliverables: {
      en: ['Logo & identity', 'Brand guidelines', 'UI kit / design system', 'Interactive prototype', 'Social media kit', 'Dev-ready handoff', 'Icon set'],
      pt: ['Logo & identidade', 'Manual da marca', 'UI kit / design system', 'Protótipo interativo', 'Kit para redes sociais', 'Handoff pronto para devs', 'Conjunto de ícones'],
    },
    faq: {
      en: [
        {
          q: 'What is included in a brand identity?',
          a: 'Logo suite, color palette, typography, usage guidelines and applications (social, print, web). Larger packages add tone of voice, iconography and a full design system.',
        },
        {
          q: 'Do you design and also build?',
          a: 'Yes, and that is our biggest advantage. The same team designs and develops, so nothing gets lost in translation between the Figma file and the live product.',
        },
        {
          q: 'How many concepts and revisions do we get?',
          a: 'We present focused creative directions and converge on one, then refine it in structured revision rounds. Fewer, stronger options beat a buffet of half-ideas.',
        },
        {
          q: 'What tools do you use?',
          a: 'Figma for UI, prototypes and design systems; the Adobe suite (Illustrator, Photoshop) for identity and production assets. You receive organized source files for all of it.',
        },
      ],
      pt: [
        {
          q: 'O que está incluído em uma identidade de marca?',
          a: 'Conjunto de logos, paleta de cores, tipografia, diretrizes de uso e aplicações (social, impresso, web). Pacotes maiores incluem tom de voz, iconografia e um design system completo.',
        },
        {
          q: 'Vocês desenham e também desenvolvem?',
          a: 'Sim, e essa é a nossa maior vantagem. O mesmo time desenha e desenvolve, então nada se perde na tradução entre o arquivo Figma e o produto no ar.',
        },
        {
          q: 'Quantos conceitos e revisões recebemos?',
          a: 'Apresentamos direções criativas focadas e convergimos para uma, refinada em rodadas estruturadas de revisão. Poucas opções fortes valem mais que um buffet de meias-ideias.',
        },
        {
          q: 'Quais ferramentas vocês usam?',
          a: 'Figma para UI, protótipos e design systems; suíte Adobe (Illustrator, Photoshop) para identidade e materiais de produção. Você recebe os arquivos-fonte organizados de tudo.',
        },
      ],
    },
  },
];

export const getServiceBySlug = (slug: string): ServicePage | undefined =>
  services.find((service) => service.slug === slug);

/** Resolve a service's translatable fields to a single locale. */
export function localizeService(service: ServicePage, lang: Lang): LocalizedService {
  const index = services.indexOf(service);
  return {
    id: service.id,
    slug: service.slug,
    visual: service.visual,
    title: serviceTitles[index][lang],
    metaTitle: service.metaTitle[lang],
    metaDescription: service.metaDescription[lang],
    tagline: service.tagline[lang],
    titleLines: service.titleLines[lang],
    intro: service.intro[lang],
    stats: service.stats.map((s) => ({ value: s.value, label: s.label[lang] })),
    pillars: service.pillars[lang],
    process: service.process[lang],
    deliverables: service.deliverables[lang],
    faq: service.faq[lang],
  };
}

/** All services resolved to a single locale, preserving home-page order. */
export const getLocalizedServices = (lang: Lang): LocalizedService[] =>
  services.map((service) => localizeService(service, lang));

/** Slugs in home-page order, used to link Solutions rows and footer items. */
export const serviceSlugs = services.map((s) => s.slug);
