// Generates public/og-image.jpg (1200x630 social share image).
// Deps are not in package.json; install them ad hoc before running:
//   npm install --no-save satori @resvg/resvg-js @fontsource/fredoka
//   node scripts/generate-og.mjs
import { readFile } from 'node:fs/promises';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

const NIGHT = '#0b0a11';
const GREEN = '#68f70b';

const logoPng = await sharp('public/images/Flizz_Logo_Light@300x.webp')
  .png()
  .toBuffer();
const logoSrc = `data:image/png;base64,${logoPng.toString('base64')}`;

const fredoka = (w) =>
  readFile(`node_modules/@fontsource/fredoka/files/fredoka-latin-${w}-normal.woff`);

// "Fast. Precise. Elegant.": white words, green periods.
const tagline = ['Fast', 'Precise', 'Elegant'].flatMap((word) => [
  { type: 'span', props: { children: word } },
  { type: 'span', props: { style: { color: GREEN, marginRight: 24 }, children: '.' } },
]);

const svg = await satori(
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
        {
          type: 'img',
          props: {
            src: logoSrc,
            width: 580,
            height: 238, // 1698x697 source aspect
            style: { marginBottom: 56 },
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              fontSize: 52,
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: 1,
            },
            children: tagline,
          },
        },
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: 1200,
              height: 8,
              backgroundColor: GREEN,
            },
          },
        },
      ],
    },
  },
  {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Fredoka', data: await fredoka(400), weight: 400, style: 'normal' },
      { name: 'Fredoka', data: await fredoka(600), weight: 600, style: 'normal' },
    ],
  },
);

const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
  .render()
  .asPng();

await sharp(png).jpeg({ quality: 90, mozjpeg: true }).toFile('public/og-image.jpg');
console.log('Wrote public/og-image.jpg');
