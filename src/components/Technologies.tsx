import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Technology } from '../types';

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const categoriesRef = useRef<(HTMLDivElement | null)[]>([]);
  const categoryTitleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const techCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const bgElementsRef = useRef<HTMLDivElement>(null);

  const categories = Object.keys(categoryTitles) as Array<keyof typeof categoryTitles>;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 50
      });

      gsap.set(categoryTitleRefs.current, {
        opacity: 0,
        y: 30,
        scale: 0.9
      });

      gsap.set(techCardRefs.current, {
        opacity: 0,
        y: 50,
        scale: 0.8,
        rotation: -10
      });

      gsap.set(philosophyRef.current, {
        opacity: 0,
        y: 100,
        scale: 0.95
      });

      // Background elements animation
      if (bgElementsRef.current) {
        const bgElements = bgElementsRef.current.children;
        gsap.set(bgElements, {
          scale: 0,
          opacity: 0,
          rotation: 180
        });

        gsap.to(bgElements, {
          scale: 1,
          opacity: 0.05,
          rotation: 0,
          duration: 3,
          stagger: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });

        // Continuous floating and rotating animation for background elements
        Array.from(bgElements).forEach((element, index) => {
          gsap.to(element, {
            y: -30,
            duration: 6 + index * 2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
          });

          gsap.to(element, {
            rotation: 360,
            duration: 20 + index * 5,
            ease: "none",
            repeat: -1
          });
        });
      }

      // Title animation with split effect
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Subtitle animation
      gsap.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Category titles animation
      gsap.to(categoryTitleRefs.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: categoryTitleRefs.current[0],
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Technology cards animation with stagger
      gsap.to(techCardRefs.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: techCardRefs.current[0],
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Philosophy section animation
      gsap.to(philosophyRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: philosophyRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Individual tech card hover animations
      techCardRefs.current.forEach((card, index) => {
        if (card) {
          const icon = card.querySelector('.tech-icon');
          const name = card.querySelector('.tech-name');

          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.08,
              y: -8,
              rotation: 2,
              duration: 0.3,
              ease: "power2.out"
            });

            gsap.to(icon, {
              scale: 1.3,
              rotation: 360,
              duration: 0.5,
              ease: "back.out(1.7)"
            });

            gsap.to(name, {
              color: "#68f70b",
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out"
            });

            // Add glow effect
            gsap.to(card, {
              boxShadow: "0 10px 30px rgba(104, 247, 11, 0.3)",
              duration: 0.3
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              rotation: 0,
              duration: 0.3,
              ease: "power2.out"
            });

            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: "power2.out"
            });

            gsap.to(name, {
              color: "#f3f3f3",
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });

            gsap.to(card, {
              boxShadow: "0 0 0 rgba(104, 247, 11, 0)",
              duration: 0.3
            });
          });

          // Continuous subtle animation for each card
          gsap.to(card, {
            y: -3,
            duration: 2 + index * 0.1,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.1
          });
        }
      });

      // Category hover animations
      categoryTitleRefs.current.forEach((title, index) => {
        if (title) {
          title.addEventListener('mouseenter', () => {
            gsap.to(title, {
              scale: 1.1,
              color: "#68f70b",
              duration: 0.3,
              ease: "power2.out"
            });

            // Animate all tech cards in this category
            const categoryCards = techCardRefs.current.filter((_, cardIndex) => {
              const techIndex = cardIndex;
              const techsInCategory = technologies.filter(tech => tech.category === categories[index]);
              const startIndex = technologies.findIndex(tech => tech.category === categories[index]);
              return techIndex >= startIndex && techIndex < startIndex + techsInCategory.length;
            });

            gsap.to(categoryCards, {
              scale: 1.02,
              duration: 0.2,
              ease: "power2.out"
            });
          });

          title.addEventListener('mouseleave', () => {
            gsap.to(title, {
              scale: 1,
              color: "#68f70b",
              duration: 0.3,
              ease: "power2.out"
            });

            const categoryCards = techCardRefs.current.filter((_, cardIndex) => {
              const techIndex = cardIndex;
              const techsInCategory = technologies.filter(tech => tech.category === categories[index]);
              const startIndex = technologies.findIndex(tech => tech.category === categories[index]);
              return techIndex >= startIndex && techIndex < startIndex + techsInCategory.length;
            });

            gsap.to(categoryCards, {
              scale: 1,
              duration: 0.2,
              ease: "power2.out"
            });
          });
        }
      });

      // Philosophy card hover
      if (philosophyRef.current) {
        philosophyRef.current.addEventListener('mouseenter', () => {
          gsap.to(philosophyRef.current, {
            scale: 1.02,
            y: -5,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        philosophyRef.current.addEventListener('mouseleave', () => {
          gsap.to(philosophyRef.current, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setCategoryTitleRef = (el: HTMLHeadingElement | null, index: number) => {
    categoryTitleRefs.current[index] = el;
  };

  const setTechCardRef = (el: HTMLDivElement | null, index: number) => {
    techCardRefs.current[index] = el;
  };

  let cardIndex = 0;

  return (
    <section ref={sectionRef} className="py-20 bg-dark relative overflow-hidden">
      {/* Background decorative elements */}
      <div ref={bgElementsRef} className="absolute inset-0 opacity-5 pointer-events-none">
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

        {/* Technologies by Category */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, categoryIndex) => {
            const categoryTechs = technologies.filter(tech => tech.category === category);
            
            return (
              <div key={category} className="space-y-6">
                {/* Category Title */}
                <h3 
                  ref={(el) => setCategoryTitleRef(el, categoryIndex)}
                  className="text-2xl font-bold text-accent text-center cursor-pointer"
                >
                  {categoryTitles[category]}
                </h3>

                {/* Technology Cards */}
                <div className="space-y-4">
                  {categoryTechs.map((tech, techIndex) => {
                    const currentCardIndex = cardIndex++;
                    return (
                      <div 
                        key={techIndex}
                        ref={(el) => setTechCardRef(el, currentCardIndex)}
                        className="group bg-light/10 backdrop-blur-lg rounded-2xl p-4 border border-light/20 hover:border-accent/50 transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="tech-icon text-2xl">{tech.icon}</div>
                          <span className="tech-name text-light font-medium transition-colors duration-300">
                            {tech.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech Philosophy */}
        <div className="mt-20 text-center">
          <div 
            ref={philosophyRef}
            className="bg-light/5 backdrop-blur-lg rounded-3xl p-12 border border-light/10 max-w-4xl mx-auto cursor-pointer"
          >
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