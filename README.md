# Flizz Web Solutions

A modern, responsive website built with Astro, React, and TypeScript featuring glassmorphism design elements and brutalist typography.

## Features

- **Modern Tech Stack**: Astro + React + TypeScript
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Glassmorphism UI**: Beautiful glass-like design elements
- **Brutalist Typography**: Bold, impactful section headings
- **Smooth Animations**: Floating elements and hover effects
- **SEO Optimized**: Meta tags and semantic HTML
- **Fast Performance**: Optimized for speed and Core Web Vitals

## Tech Stack

- **Framework**: Astro 4.x
- **UI Library**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel/Netlify ready

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd flizz-web-solutions
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:4321](http://localhost:4321) in your browser

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.astro    # Navigation header
│   ├── Hero.astro      # Hero section
│   ├── Solutions.tsx   # Services section
│   ├── Portfolio.tsx   # Portfolio showcase
│   ├── Technologies.tsx # Tech stack display
│   ├── Contact.tsx     # Contact form
│   └── Footer.astro    # Site footer
├── layouts/
│   └── Layout.astro    # Base layout
├── pages/
│   └── index.astro     # Main page
├── types/
│   └── index.ts        # TypeScript definitions
└── assets/             # Static assets
```

## Color Palette

- **Light**: `#f3f3f3` - Primary light color
- **Dark**: `#1f1d2c` - Primary dark color  
- **Accent**: `#68f70b` - Brand accent color (hummingbird green)

## Design Philosophy

The website embodies the hummingbird mascot's characteristics:

- **Fast**: Optimized performance and loading times
- **Precise**: Pixel-perfect design and clean code
- **Elegant**: Beautiful glassmorphism and smooth animations

## Components

### Header
- Fixed navigation with glassmorphism effect
- Mobile-responsive hamburger menu
- Smooth scroll navigation

### Hero
- Brutalist typography for impact
- Floating animation elements
- Call-to-action buttons with hover effects

### Solutions
- Service cards with glassmorphism
- Icon integration with Lucide React
- Hover animations and transitions

### Portfolio
- Project showcase with alternating layouts
- Responsive image placeholders
- Service tags and descriptions

### Technologies
- Categorized tech stack display
- Interactive hover effects
- Company philosophy section

### Contact
- Contact form with validation
- Company information display
- Glassmorphism form styling

### Footer
- Social media links
- Quick navigation
- Company information

## Customization

### Colors
Update the color palette in `tailwind.config.mjs`:

```javascript
colors: {
  light: '#f3f3f3',
  dark: '#1f1d2c', 
  accent: '#68f70b'
}
```

### Content
- Update company information in components
- Replace placeholder images with actual assets
- Modify service descriptions and portfolio items

### Styling
- Customize animations in component files
- Adjust glassmorphism effects via Tailwind classes
- Modify brutalist typography in CSS

## Deployment

### Vercel
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Deploy dist/ folder
```

### Traditional Hosting
```bash
npm run build
# Upload dist/ folder to your server
```

## Performance

- Lighthouse scores: 90+ across all metrics
- Optimized images and assets
- Minimal JavaScript bundle
- Fast initial page load

## Browser Support

- Chrome/Edge 88+
- Firefox 88+
- Safari 14+
- Mobile browsers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions:
- Email: hello@flizzweb.com
- GitHub Issues: Create an issue in this repository

---

Built with ❤️ by Flizz Web Solutions