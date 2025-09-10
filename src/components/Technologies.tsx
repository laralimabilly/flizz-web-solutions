import React from 'react';
import type { Technology } from '../types';

const technologies: Technology[] = [
  // Frontend
  { name: 'React', icon: '⚛️', category: 'frontend' },
  { name: 'TypeScript', icon: '🔷', category: 'frontend' },
  { name: 'Next.js', icon: '▲', category: 'frontend' },
  { name: 'Astro', icon: '🚀', category: 'frontend' },
  { name: 'Vue.js', icon: '💚', category: 'frontend' },
  { name: 'Tailwind CSS', icon: '🎨', category: 'frontend' },

  // Backend
  { name: 'Node.js', icon: '🟢', category: 'backend' },
  { name: 'PHP', icon: '🐘', category: 'backend' },
  { name: 'Python', icon: '🐍', category: 'backend' },
  { name: 'PostgreSQL', icon: '🐘', category: 'backend' },
  { name: 'MongoDB', icon: '🍃', category: 'backend' },
  { name: 'GraphQL', icon: '◓', category: 'backend' },

  // Mobile
  { name: 'React Native', icon: '📱', category: 'mobile' },
  { name: 'Flutter', icon: '🦋', category: 'mobile' },
  { name: 'iOS', icon: '🍎', category: 'mobile' },
  { name: 'Android', icon: '🤖', category: 'mobile' },

  // Tools
  { name: 'Docker', icon: '🐳', category: 'tools' },
  { name: 'AWS', icon: '☁️', category: 'tools' },
  { name: 'Vercel', icon: '▲', category: 'tools' },
  { name: 'GitHub', icon: '🐙', category: 'tools' },
  { name: 'Figma', icon: '🎨', category: 'tools' },
  { name: 'Webflow', icon: '🌊', category: 'tools' }
];

const categoryTitles = {
  frontend: 'Frontend',
  backend: 'Backend',
  mobile: 'Mobile',
  tools: 'Tools & Cloud'
};

const Technologies: React.FC = () => {
  const categories = Object.keys(categoryTitles) as Array<keyof typeof categoryTitles>;

  return (
    <section className="py-20 bg-dark relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-8xl font-brutalist text-light mb-6">
            TECH STACK
          </h2>
          <p className="text-xl text-light/70 max-w-3xl mx-auto">
            Cutting-edge technologies and tools we use to build exceptional digital experiences
          </p>
        </div>

        {/* Technologies by Category */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => {
            const categoryTechs = technologies.filter(tech => tech.category === category);
            
            return (
              <div key={category} className="space-y-6">
                {/* Category Title */}
                <h3 className="text-2xl font-bold text-accent text-center">
                  {categoryTitles[category]}
                </h3>

                {/* Technology Cards */}
                <div className="space-y-4">
                  {categoryTechs.map((tech, index) => (
                    <div 
                      key={index}
                      className="group bg-light/10 backdrop-blur-lg rounded-2xl p-4 border border-light/20 hover:border-accent/50 hover:bg-light/20 transition-all duration-300 hover:transform hover:scale-105"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{tech.icon}</div>
                        <span className="text-light group-hover:text-accent transition-colors duration-300 font-medium">
                          {tech.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech Philosophy */}
        <div className="mt-20 text-center">
          <div className="bg-light/5 backdrop-blur-lg rounded-3xl p-12 border border-light/10 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-light mb-6">
              Our Technology Philosophy
            </h3>
            <p className="text-light/70 text-lg leading-relaxed">
              We believe in using the right tool for the right job. Our technology choices are driven by 
              performance, scalability, and developer experience. We stay current with industry trends 
              while maintaining stability and reliability in our solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;