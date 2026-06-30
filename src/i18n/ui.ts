// Single source of truth for all UI copy, in both supported locales.
// Imported by Astro components *and* React islands so there is one dictionary
// for the whole app. Islands receive only a `lang` prop and resolve here.

export type Lang = 'en' | 'pt';

export const defaultLang: Lang = 'en';

/** Short codes shown in the navbar language selector. */
export const languages: Record<Lang, string> = {
  en: 'EN',
  pt: 'PT',
};

const en = {
  nav: {
    home: 'Home',
    solutions: 'Solutions',
    portfolio: 'Portfolio',
    contact: 'Contact',
    startProject: 'Start a Project',
  },
  hero: {
    eyebrow: 'Web Solutions · Brazil ⇄ USA',
    titleLines: ['FAST.', 'PRECISE.', 'ELEGANT.'],
    subtitle:
      'We craft lightning-fast, pixel-perfect websites and apps that soar above the competition. Engineered for performance, built to rank.',
    ctaPrimary: 'Start a Project',
    ctaSecondary: 'View Portfolio',
    statLabels: ['Projects Delivered', 'Client Satisfaction', 'Performance Scores'],
    marquee: ['PERFORMANCE', 'WEB DESIGN', 'SEO', 'WEB APPS', 'MOBILE APPS', 'E-COMMERCE', 'BRANDING'],
    worldwide: 'Worldwide delivery',
    scroll: 'Scroll',
  },
  solutions: {
    eyebrow: 'What we do',
    title: 'SOLUTIONS',
    subtitle: 'From concept to deployment, end-to-end services that transform your digital presence.',
    startThis: 'Start this project',
    services: [
      {
        title: 'Web Development',
        tagline: 'Built for speed',
        description:
          'High-performance websites built with modern technologies, engineered to load instantly and rank on top.',
        features: ['React & TypeScript', 'Next.js & Astro', 'Performance Optimization', 'SEO Ready'],
      },
      {
        title: 'Mobile Apps',
        tagline: 'Native experiences',
        description:
          'Native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android.',
        features: ['React Native', 'iOS & Android', 'App Store Optimization', 'Push Notifications'],
      },
      {
        title: 'Deploy & Maintain',
        tagline: 'Always online',
        description:
          'Reliable hosting, continuous deployment, and ongoing support keeping your digital assets fast and secure.',
        features: ['Cloud Hosting', 'CI/CD Pipeline', '24/7 Monitoring', 'Regular Updates'],
      },
      {
        title: 'Brand & Web Design',
        tagline: 'Design that converts',
        description:
          'Stunning visual identities and user experiences that captivate your audience and turn visitors into customers.',
        features: ['Brand Identity', 'UI/UX Design', 'Responsive Design', 'Prototyping'],
      },
    ],
  },
  portfolio: {
    eyebrow: 'Selected work',
    title: 'PORTFOLIO',
    subtitle: 'Real products shipped for real clients. Drag through the gallery.',
    viewProject: 'View Project',
    caseStudy: 'Case Study',
    scroll: 'Scroll',
  },
  cta: {
    eyebrow: 'Your project could be next',
    titleLines: ['START YOUR', 'PROJECT'],
  },
  technologies: {
    eyebrow: 'Our toolbox',
    title: 'TECH STACK',
    subtitle: 'Cutting-edge technologies and tools we use to build exceptional digital experiences.',
    philosophyEyebrow: 'Philosophy',
    philosophy: {
      p1: "We don't chase trends. We pick ",
      accent1: 'the right tool',
      p2: ' for the right job, driven by performance, scalability and ',
      accent2: 'developer experience',
      p3: '.',
    },
    pills: ['Performance First', 'Scalable Architecture', 'Developer Experience', 'Future-Proof Solutions'],
  },
  contact: {
    eyebrow: 'Get in touch',
    title: "LET'S TALK",
    subtitle:
      "Ready to transform your digital presence? Let's discuss your project and bring your vision to life.",
    intro:
      "Whether you need a complete digital transformation or want to enhance your existing platform, we're ready to make it happen, in English or Portuguese.",
    emailLabel: 'Email',
    phoneLabel: 'Phone / WhatsApp',
    locationLabel: 'Location',
    locationValue: 'Brazil & US, Remote Worldwide',
    responseTimeLabel: 'Response Time',
    responseTimeValue: 'Within 24 hours',
    freeConsultLabel: 'Free Consultation',
    freeConsultValue: '30-min strategy session',
    nameLabel: 'Name *',
    namePlaceholder: 'Your full name',
    emailFieldLabel: 'Email *',
    emailPlaceholder: 'your@email.com',
    companyLabel: 'Company',
    companyPlaceholder: 'Your company name',
    messageLabel: 'Message *',
    messagePlaceholder: 'Tell us about your project...',
    submit: 'SEND MESSAGE',
    mailSubject: 'Project inquiry from',
  },
  footer: {
    tagline: 'Lightning-fast, pixel-perfect websites and apps for clients in Brazil and the US.',
    navigateHeading: 'Navigate',
    servicesHeading: 'Services',
    rights: 'All rights reserved.',
    madeWith: 'Made with',
    madeWithSuffix: 'in Brazil',
  },
  projectDetail: {
    back: 'Back to work',
    visitLive: 'Visit Live Site',
    overview: 'Overview',
    services: 'Services',
    techStack: 'Tech Stack',
    industry: 'Industry',
    year: 'Year',
    gallery: 'Gallery',
    imagePlaceholder: 'Image placeholder',
    galleryAlt: 'Screenshot of',
    caseStudyPrefix: 'Case Study',
  },
  meta: {
    homeTitle: 'Flizz Web Solutions | Fast, Precise, Elegant Websites & Apps',
    description:
      'Flizz Web Solutions builds lightning-fast, pixel-perfect websites, web apps and mobile apps for clients in Brazil and the US. Performance-first development with React, Astro and React Native.',
    projectTitleSuffix: ' | Flizz Web Solutions',
  },
};

export type UI = typeof en;

const pt: UI = {
  nav: {
    home: 'Início',
    solutions: 'Soluções',
    portfolio: 'Portfólio',
    contact: 'Contato',
    startProject: 'Iniciar Projeto',
  },
  hero: {
    eyebrow: 'Soluções Web · Brasil ⇄ EUA',
    titleLines: ['RÁPIDO.', 'PRECISO.', 'ELEGANTE.'],
    subtitle:
      'Criamos sites e apps ultrarrápidos e pixel-perfect que voam acima da concorrência. Projetados para performance, feitos para rankear.',
    ctaPrimary: 'Iniciar Projeto',
    ctaSecondary: 'Ver Portfólio',
    statLabels: ['Projetos Entregues', 'Satisfação dos Clientes', 'Notas de Performance'],
    marquee: ['PERFORMANCE', 'WEB DESIGN', 'SEO', 'WEB APPS', 'APPS MOBILE', 'E-COMMERCE', 'BRANDING'],
    worldwide: 'Entrega no mundo todo',
    scroll: 'Rolar',
  },
  solutions: {
    eyebrow: 'O que fazemos',
    title: 'SOLUÇÕES',
    subtitle: 'Do conceito ao deploy, serviços de ponta a ponta que transformam sua presença digital.',
    startThis: 'Iniciar este projeto',
    services: [
      {
        title: 'Desenvolvimento Web',
        tagline: 'Feito para velocidade',
        description:
          'Sites de alta performance construídos com tecnologias modernas, projetados para carregar instantaneamente e liderar os rankings.',
        features: ['React & TypeScript', 'Next.js & Astro', 'Otimização de Performance', 'Pronto para SEO'],
      },
      {
        title: 'Apps Mobile',
        tagline: 'Experiências nativas',
        description:
          'Aplicativos mobile nativos e multiplataforma que entregam experiências excepcionais no iOS e Android.',
        features: ['React Native', 'iOS & Android', 'Otimização para App Stores', 'Notificações Push'],
      },
      {
        title: 'Deploy & Manutenção',
        tagline: 'Sempre no ar',
        description:
          'Hospedagem confiável, deploy contínuo e suporte constante para manter seus ativos digitais rápidos e seguros.',
        features: ['Hospedagem em Nuvem', 'Pipeline CI/CD', 'Monitoramento 24/7', 'Atualizações Regulares'],
      },
      {
        title: 'Marca & Web Design',
        tagline: 'Design que converte',
        description:
          'Identidades visuais e experiências impactantes que cativam seu público e transformam visitantes em clientes.',
        features: ['Identidade de Marca', 'UI/UX Design', 'Design Responsivo', 'Prototipação'],
      },
    ],
  },
  portfolio: {
    eyebrow: 'Trabalhos selecionados',
    title: 'PORTFÓLIO',
    subtitle: 'Produtos reais entregues para clientes reais. Arraste pela galeria.',
    viewProject: 'Ver Projeto',
    caseStudy: 'Estudo de Caso',
    scroll: 'Rolar',
  },
  cta: {
    eyebrow: 'Seu projeto pode ser o próximo',
    titleLines: ['COMECE SEU', 'PROJETO'],
  },
  technologies: {
    eyebrow: 'Nossas ferramentas',
    title: 'TECH STACK',
    subtitle: 'Tecnologias e ferramentas de ponta que usamos para construir experiências digitais excepcionais.',
    philosophyEyebrow: 'Filosofia',
    philosophy: {
      p1: 'Não seguimos modismos. Escolhemos ',
      accent1: 'a ferramenta certa',
      p2: ' para cada trabalho, guiados por performance, escalabilidade e ',
      accent2: 'experiência de desenvolvimento',
      p3: '.',
    },
    pills: ['Performance em Primeiro', 'Arquitetura Escalável', 'Experiência de Desenvolvimento', 'Soluções à Prova de Futuro'],
  },
  contact: {
    eyebrow: 'Fale conosco',
    title: 'VAMOS CONVERSAR',
    subtitle:
      'Pronto para transformar sua presença digital? Vamos conversar sobre o seu projeto e dar vida à sua visão.',
    intro:
      'Seja uma transformação digital completa ou a evolução da sua plataforma atual, estamos prontos para realizar, em português ou inglês.',
    emailLabel: 'E-mail',
    phoneLabel: 'Telefone / WhatsApp',
    locationLabel: 'Localização',
    locationValue: 'Brasil e EUA, Remoto no mundo todo',
    responseTimeLabel: 'Tempo de Resposta',
    responseTimeValue: 'Em até 24 horas',
    freeConsultLabel: 'Consultoria Gratuita',
    freeConsultValue: 'Sessão de estratégia de 30 min',
    nameLabel: 'Nome *',
    namePlaceholder: 'Seu nome completo',
    emailFieldLabel: 'E-mail *',
    emailPlaceholder: 'seu@email.com',
    companyLabel: 'Empresa',
    companyPlaceholder: 'Nome da sua empresa',
    messageLabel: 'Mensagem *',
    messagePlaceholder: 'Conte sobre o seu projeto...',
    submit: 'ENVIAR MENSAGEM',
    mailSubject: 'Contato de projeto de',
  },
  footer: {
    tagline: 'Sites e apps ultrarrápidos e pixel-perfect para clientes no Brasil e nos EUA.',
    navigateHeading: 'Navegar',
    servicesHeading: 'Serviços',
    rights: 'Todos os direitos reservados.',
    madeWith: 'Feito com',
    madeWithSuffix: 'no Brasil',
  },
  projectDetail: {
    back: 'Voltar aos trabalhos',
    visitLive: 'Visitar site',
    overview: 'Visão geral',
    services: 'Serviços',
    techStack: 'Tech Stack',
    industry: 'Setor',
    year: 'Ano',
    gallery: 'Galeria',
    imagePlaceholder: 'Imagem em breve',
    galleryAlt: 'Captura de tela de',
    caseStudyPrefix: 'Estudo de caso',
  },
  meta: {
    homeTitle: 'Flizz Web Solutions | Sites e Apps Rápidos, Precisos e Elegantes',
    description:
      'A Flizz Web Solutions cria sites, web apps e apps mobile ultrarrápidos e pixel-perfect para clientes no Brasil e nos EUA. Desenvolvimento focado em performance com React, Astro e React Native.',
    projectTitleSuffix: ' | Flizz Web Solutions',
  },
};

export const ui: Record<Lang, UI> = { en, pt };
