import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Technology } from '../types';

gsap.registerPlugin(ScrollTrigger);

const technologies: Technology[] = [
  // Frontend
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'frontend' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg', category: 'frontend' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg', category: 'frontend' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-plain.svg', category: 'frontend' },
  { name: 'Astro', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/astro/astro-plain.svg', category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', category: 'frontend' },
  { name: 'HTML 5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-plain.svg', category: 'frontend' },
  { name: 'CSS 3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-plain.svg', category: 'frontend' },
  { name: 'jQuery', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-plain.svg', category: 'frontend' },
  { name: 'MaterializeCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materializecss/materializecss-plain.svg', category: 'frontend' },
  { name: 'Material UI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-plain.svg', category: 'frontend' },

  // Backend
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg', category: 'backend' },
  { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg', category: 'backend' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-plain.svg', category: 'backend' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg', category: 'backend' },
  { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-plain.svg', category: 'backend' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-plain.svg', category: 'backend' },
  { name: 'GraphQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg', category: 'backend' },

  // Mobile
  { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/reactnative/reactnative-original.svg', category: 'mobile' },
  { name: 'Expo', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/expo/expo-original.svg', category: 'mobile' },
  { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-plain.svg', category: 'mobile' },

  // Tools & Cloud
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg', category: 'tools' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', category: 'tools' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-plain.svg', category: 'tools' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', category: 'tools' },
  { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-plain.svg', category: 'tools' },

  //Design
  { name: 'Illustrator', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg', category: 'design' },
  { name: 'Photoshop', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-plain.svg', category: 'design' },
  { name: 'Premiere Pro', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-plain.svg', category: 'design' },
  { name: 'Adobe XD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xd/xd-plain.svg', category: 'design' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-plain.svg', category: 'design' },
];

// Double the array for infinite scroll effect
const infiniteTechnologies = [...technologies, ...technologies];

const Technologies: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple fade in animations
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%"
          }
        }
      );

      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%"
          }
        }
      );

      gsap.fromTo(philosophyRef.current,
        { opacity: 0, y: 100, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: "top 85%"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-40 bg-dark relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-6xl md:text-8xl font-brutalist text-light mb-6"
          >
            TECH STACK
          </h2>
          <p 
            ref={subtitleRef}
            className="text-xl text-light/70 max-w-3xl mx-auto"
          >
            Cutting-edge technologies and tools we use to build exceptional digital experiences
          </p>
        </div>

        {/* Technologies Carousel */}
        <div className="relative mb-20">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none"></div>
          
          {/* Pure CSS Carousel */}
          <div className="overflow-hidden py-8">
            <div className="flex gap-8 animate-scroll">
              {infiniteTechnologies.map((tech, index) => (
                <div 
                  key={`${tech.name}-${index}`}
                  className="flex-shrink-0 group bg-light/10 backdrop-blur-lg rounded-2xl p-6 border border-light/20 hover:border-accent/50 transition-all duration-300 cursor-pointer w-44 h-32 hover:scale-110 hover:bg-light/15"
                >
                  <div className="flex flex-col items-center gap-3 h-full justify-center">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <img 
                        src={tech.icon} 
                        alt={tech.name}
                        className="w-10 h-10 object-contain group-hover:text-accent transition-colors duration-300"
                        style={{ filter: 'brightness(0) invert(1)' }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<div class="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-dark font-bold text-xs">${tech.name.charAt(0)}</div>`;
                          }
                        }}
                      />
                    </div>
                    <span className="text-light font-medium text-center text-sm group-hover:text-accent transition-colors duration-300">
                      {tech.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Philosophy */}
        <div className="text-center">
          <div 
            ref={philosophyRef}
            className="bg-light/5 backdrop-blur-lg rounded-3xl p-12 border border-light/10 max-w-4xl mx-auto cursor-pointer hover:bg-light/10 hover:scale-102 transition-all duration-300"
          >
            <h3 className="text-3xl font-bold text-light mb-6">
              Our Technology Philosophy
            </h3>
            <p className="text-light/70 text-lg leading-relaxed">
              We believe in using the right tool for the right job. Our technology choices are driven by 
              performance, scalability, and developer experience. We stay current with industry trends 
              while maintaining stability and reliability in our solutions.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium border border-accent/30">
                Performance First
              </div>
              <div className="bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium border border-accent/30">
                Scalable Architecture
              </div>
              <div className="bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium border border-accent/30">
                Developer Experience
              </div>
              <div className="bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium border border-accent/30">
                Future-Proof Solutions
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-200px * ${technologies.length}));
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Technologies;