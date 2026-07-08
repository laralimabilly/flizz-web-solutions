// Generates the social share images (1200x630):
//   public/og-image.jpg              site-wide default
//   public/og/service-<slug>-<lang>.jpg   one per service page, per locale
//   public/og/project-<slug>-<lang>.jpg   one per portfolio case study, per locale
//
// Deps are not in package.json; install them ad hoc before running:
//   npm install --no-save satori @resvg/resvg-js @fontsource/fredoka @fontsource/jetbrains-mono
//   node scripts/generate-og.mjs
//
// The page manifest below mirrors src/data/services.ts and src/data/projects.ts
// (a .mjs script cannot import TypeScript). If titles or slugs change there,
// update here and re-run.
import { mkdir, readFile } from 'node:fs/promises';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

const NIGHT = '#0b0a11';
const GREEN = '#68f70b';
const MUTED = '#9b98ab';

const services = [
  { slug: 'web-development', num: '01', title: { en: 'Web Development', pt: 'Desenvolvimento Web' }, tagline: { en: 'Built for speed', pt: 'Feito para velocidade' } },
  { slug: 'mobile-apps', num: '02', title: { en: 'Mobile Apps', pt: 'Apps Mobile' }, tagline: { en: 'Native experiences', pt: 'Experiências nativas' } },
  { slug: 'deploy-maintain', num: '03', title: { en: 'Deploy & Maintain', pt: 'Deploy & Manutenção' }, tagline: { en: 'Always online', pt: 'Sempre no ar' } },
  { slug: 'brand-web-design', num: '04', title: { en: 'Brand & Web Design', pt: 'Marca & Web Design' }, tagline: { en: 'Design that converts', pt: 'Design que converte' } },
];

const projects = [
  { slug: 'nsa-limousine', title: 'NSA Limousine', meta: { en: 'Luxury Transport · 2026', pt: 'Transporte de Luxo · 2026' } },
  { slug: 'line-ai', title: 'Line AI', meta: { en: 'AI / Startups · 2026', pt: 'IA / Startups · 2026' } },
  { slug: 'dayone-talent-advisory', title: 'DayOne Talent Advisory', meta: { en: 'Human Resources · 2025', pt: 'Recursos Humanos · 2025' } },
  { slug: 'bugo-mobile-app', title: 'Bugo Mobile App', meta: { en: 'Utility Tools · 2026', pt: 'Ferramentas Utilitárias · 2026' } },
  { slug: 'gustavo-carmo-website', title: "Gustavo Carmo's Website", meta: { en: 'Music · 2023', pt: 'Música · 2023' } },
  { slug: 'ridiculous-rumors', title: 'Ridiculous Rumors', meta: { en: 'Entertainment · 2025', pt: 'Entretenimento · 2025' } },
];

const eyebrowWords = {
  service: { en: 'SERVICE', pt: 'SERVIÇO' },
  caseStudy: { en: 'CASE STUDY', pt: 'ESTUDO DE CASO' },
};

const logoPng = await sharp('public/images/Flizz_Logo_Light@300x.webp')
  .png()
  .toBuffer();
const logoSrc = `data:image/png;base64,${logoPng.toString('base64')}`;

const fredoka = (w) =>
  readFile(`node_modules/@fontsource/fredoka/files/fredoka-latin-${w}-normal.woff`);
const jetbrains = () =>
  readFile('node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff');

const fonts = [
  { name: 'Fredoka', data: await fredoka(400), weight: 400, style: 'normal' },
  { name: 'Fredoka', data: await fredoka(600), weight: 600, style: 'normal' },
  { name: 'JetBrains Mono', data: await jetbrains(), weight: 500, style: 'normal' },
];

const render = async (tree, outPath) => {
  const svg = await satori(tree, { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  await sharp(png).jpeg({ quality: 90, mozjpeg: true }).toFile(outPath);
  console.log(`Wrote ${outPath}`);
};

const glow = `radial-gradient(circle at 24% 30%, rgba(104, 247, 11, 0.16) 0%, rgba(104, 247, 11, 0.04) 45%, rgba(11, 10, 17, 0) 70%)`;

/* Shared card scaffold: logo top-left, green mono eyebrow, giant title,
   muted subline, green bottom bar and the domain bottom-right. */
const card = ({ eyebrow, title, subline }) => ({
  type: 'div',
  props: {
    style: {
      width: 1200,
      height: 630,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      backgroundColor: NIGHT,
      backgroundImage: glow,
      fontFamily: 'Fredoka',
      padding: 72,
    },
    children: [
      {
        type: 'img',
        props: {
          src: logoSrc,
          width: 232,
          height: 95,
          style: { position: 'absolute', top: 64, left: 72 },
        },
      },
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            fontFamily: 'JetBrains Mono',
            fontSize: 26,
            letterSpacing: 8,
            color: GREEN,
            marginBottom: 28,
          },
          children: `// ${eyebrow}`,
        },
      },
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            fontSize: title.length > 20 ? 76 : 92,
            fontWeight: 600,
            color: '#ffffff',
            lineHeight: 1.02,
            marginBottom: 24,
          },
          children: title,
        },
      },
      {
        type: 'div',
        props: {
          style: { display: 'flex', fontSize: 34, color: MUTED, marginBottom: 20 },
          children: subline,
        },
      },
      {
        type: 'div',
        props: {
          style: {
            position: 'absolute',
            bottom: 34,
            right: 72,
            display: 'flex',
            fontFamily: 'JetBrains Mono',
            fontSize: 22,
            letterSpacing: 4,
            color: MUTED,
          },
          children: 'flizz.com.br',
        },
      },
      {
        type: 'div',
        props: {
          style: { position: 'absolute', bottom: 0, left: 0, width: 1200, height: 8, backgroundColor: GREEN },
        },
      },
    ],
  },
});

await mkdir('public/og', { recursive: true });

// Site-wide default: keep the original centered-logo design.
const tagline = ['Fast', 'Precise', 'Elegant'].flatMap((word) => [
  { type: 'span', props: { children: word } },
  { type: 'span', props: { style: { color: GREEN, marginRight: 24 }, children: '.' } },
]);

await render(
  {
    type: 'div',
    props: {
      style: {
        width: 1200,
        height: 630,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: NIGHT,
        backgroundImage: `radial-gradient(circle at 50% 38%, rgba(104, 247, 11, 0.14) 0%, rgba(104, 247, 11, 0.04) 45%, rgba(11, 10, 17, 0) 70%)`,
        fontFamily: 'Fredoka',
      },
      children: [
        { type: 'img', props: { src: logoSrc, width: 580, height: 238, style: { marginBottom: 56 } } },
        { type: 'div', props: { style: { display: 'flex', fontSize: 52, fontWeight: 600, color: '#ffffff', letterSpacing: 1 }, children: tagline } },
        { type: 'div', props: { style: { position: 'absolute', bottom: 0, left: 0, width: 1200, height: 8, backgroundColor: GREEN } } },
      ],
    },
  },
  'public/og-image.jpg',
);

for (const lang of ['en', 'pt']) {
  for (const s of services) {
    await render(
      card({
        eyebrow: `${eyebrowWords.service[lang]} ${s.num}`,
        title: s.title[lang],
        subline: s.tagline[lang],
      }),
      `public/og/service-${s.slug}-${lang}.jpg`,
    );
  }
  for (const p of projects) {
    await render(
      card({
        eyebrow: eyebrowWords.caseStudy[lang],
        title: p.title,
        subline: p.meta[lang],
      }),
      `public/og/project-${p.slug}-${lang}.jpg`,
    );
  }
}
