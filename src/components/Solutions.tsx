import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Code2, Smartphone, Cloud } from 'lucide-react';
import type { Service } from '../types';

gsap.registerPlugin(ScrollTrigger);

const services: Service[] = [
  {
    title: 'Brand & Web Design',
    description: 'Stunning visual identities and user experiences that captivate your audience',
    icon: 'Palette',
    features: ['Brand Identity', 'UI/UX Design', 'Responsive Design', 'Prototyping']
  },
  {
    title: 'Web Development',
    description: 'High-performance websites built with modern technologies and best practices',
    icon: 'Code2',
    features: ['React & TypeScript', 'Next.js & Astro', 'Performance Optimization', 'SEO Ready']
  },
  {
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences',
    icon: 'Smartphone',
    features: ['React Native', 'iOS & Android', 'App Store Optimization', 'Push Notifications']
  },
  {
    title: 'Deploy & Maintenance',
    description: 'Reliable hosting, continuous deployment, and ongoing support for your digital assets',
    icon: 'Cloud',
    features: ['Cloud Hosting', 'CI/CD Pipeline', '24/7 Monitoring', 'Regular Updates']
  }
];

const iconComponents = {
  Palette,
  Code2,
  Smartphone,
  Cloud
};

const Solutions: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const bgElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 50
      });

      gsap.set(cardsRef.current, {
        opacity: 0,
        y: 100,
        scale: 0.8
      });

      gsap.set(ctaRef.current, {
        opacity: 0,
        scale: 0.8
      });

      // Background elements animation
      if (bgElementsRef.current) {
        const bgElements = bgElementsRef.current.children;
        gsap.set(bgElements, {
          scale: 0,
          opacity: 0
        });

        gsap.to(bgElements, {
          scale: 1,
          opacity: 0.1,
          duration: 2,
          stagger: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });

        // Continuous floating animation for background elements
        Array.from(bgElements).forEach((element, index) => {
          gsap.to(element, {
            y: -20,
            duration: 4 + index,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
          });
        });
      }

      // Title animation
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
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
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Cards animation
      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // CTA animation
      gsap.to(ctaRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Individual card hover animations
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const icon = card.querySelector('.service-icon');
          const title = card.querySelector('.service-title');
          const features = card.querySelectorAll('.service-feature');

          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              scale: 1.03,
              duration: 0.3,
              ease: "power2.out"
            });

            gsap.to(icon, {
              rotation: 360,
              scale: 1.1,
              duration: 0.5,
              ease: "back.out(1.7)"
            });

            gsap.to(title, {
              color: "#68f70b",
              duration: 0.3
            });

            gsap.to(features, {
              x: 5,
              duration: 0.2,
              stagger: 0.05,
              ease: "power2.out"
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });

            gsap.to(icon, {
              rotation: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });

            gsap.to(title, {
              color: "#f3f3f3",
              duration: 0.3
            });

            gsap.to(features, {
              x: 0,
              duration: 0.2,
              stagger: 0.05,
              ease: "power2.out"
            });
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardsRef.current[index] = el;
  };

  return (
    <section ref={sectionRef} id="solutions" className="py-40 bg-dark relative overflow-hidden">
      {/* Background decorative elements */}
      <div ref={bgElementsRef} className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-accent rounded-full blur-lg"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-6xl md:text-8xl font-brutalist text-light mb-6"
          >
            SOLUTIONS
          </h2>
          <p 
            ref={subtitleRef}
            className="text-xl text-light/70 max-w-3xl mx-auto"
          >
            From concept to deployment, we provide end-to-end solutions 
            that transform your digital presence
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconComponents[service.icon as keyof typeof iconComponents];
            
            return (
              <div 
                key={index}
                ref={(el) => setCardRef(el, index)}
                className="group relative bg-light/10 backdrop-blur-lg rounded-3xl p-8 border border-light/20 hover:border-accent/50 transition-all duration-500 cursor-pointer"
              >
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="service-icon w-16 h-16 bg-accent/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-accent" />
                  </div>

                  {/* Content */}
                  <h3 className="service-title text-2xl font-bold text-light mb-4 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-light/70 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex}
                        className="service-feature flex items-center text-light/60 text-sm"
                      >
                        <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br from-accent/20 to-transparent pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button 
            ref={ctaRef}
            className="group bg-accent text-dark px-8 py-4 rounded-2xl font-bold text-lg hover:bg-accent/90 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
            onMouseEnter={() => {
              gsap.to(ctaRef.current, {
                scale: 1.05,
                duration: 0.2
              });
            }}
            onMouseLeave={() => {
              gsap.to(ctaRef.current, {
                scale: 1,
                duration: 0.2
              });
            }}
          >
            <span className="relative z-10">Discuss Your Project</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Solutions;