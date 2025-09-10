import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ArrowRight } from 'lucide-react';
import type { Project } from '../types';

gsap.registerPlugin(ScrollTrigger);

const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A modern, high-performance e-commerce solution built with React and Node.js. Features include real-time inventory management, seamless payment integration, and advanced analytics dashboard.',
    industry: 'Retail & E-Commerce',
    services: ['Web Development', 'UI/UX Design', 'Mobile Optimization'],
    image: '/api/placeholder/600/400',
    link: '#'
  },
  {
    id: '2',
    title: 'FinTech Mobile App',
    description: 'Revolutionary mobile banking application with biometric authentication, AI-powered insights, and seamless transaction management. Built with React Native and advanced security protocols.',
    industry: 'Financial Technology',
    services: ['Mobile App Development', 'Brand Design', 'Security Implementation'],
    image: '/api/placeholder/600/400',
    link: '#'
  },
  {
    id: '3',
    title: 'Healthcare Dashboard',
    description: 'Comprehensive patient management system with real-time monitoring, telemedicine capabilities, and HIPAA-compliant data handling. Streamlines healthcare operations for better patient outcomes.',
    industry: 'Healthcare & Medical',
    services: ['Web Development', 'Data Visualization', 'System Integration'],
    image: '/api/placeholder/600/400',
    link: '#'
  }
];

const Portfolio: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 50
      });

      gsap.set(projectRefs.current, {
        opacity: 0,
        y: 100
      });

      gsap.set(ctaRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.9
      });

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

      // Project animations
      projectRefs.current.forEach((project, index) => {
        if (project) {
          gsap.to(project, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: project,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          });

          // Set up project hover animations
          const image = project.querySelector('.project-image');
          const content = project.querySelector('.project-content');
          const overlay = project.querySelector('.project-overlay');
          const services = project.querySelectorAll('.service-tag');
          const arrow = project.querySelector('.arrow-icon');

          project.addEventListener('mouseenter', () => {
            gsap.to(image, {
              scale: 1.05,
              duration: 0.5,
              ease: "power2.out"
            });

            gsap.to(overlay, {
              opacity: 1,
              duration: 0.3,
              ease: "power2.out"
            });

            gsap.to(content, {
              y: -5,
              duration: 0.3,
              ease: "power2.out"
            });

            gsap.to(services, {
              y: -3,
              duration: 0.2,
              stagger: 0.05,
              ease: "power2.out"
            });

            gsap.to(arrow, {
              x: 5,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          project.addEventListener('mouseleave', () => {
            gsap.to(image, {
              scale: 1,
              duration: 0.5,
              ease: "power2.out"
            });

            gsap.to(overlay, {
              opacity: 0,
              duration: 0.3,
              ease: "power2.out"
            });

            gsap.to(content, {
              y: 0,
              duration: 0.3,
              ease: "power2.out"
            });

            gsap.to(services, {
              y: 0,
              duration: 0.2,
              stagger: 0.05,
              ease: "power2.out"
            });

            gsap.to(arrow, {
              x: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          // Parallax effect for images
          gsap.to(image, {
            y: -50,
            scrollTrigger: {
              trigger: project,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          });
        }
      });

      // CTA animation
      gsap.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setProjectRef = (el: HTMLDivElement | null, index: number) => {
    projectRefs.current[index] = el;
  };

  return (
    <section ref={sectionRef} id="portfolio" className="py-20 bg-light">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-6xl md:text-8xl font-brutalist text-dark mb-6"
          >
            PORTFOLIO
          </h2>
          <p 
            ref={subtitleRef}
            className="text-xl text-dark/70 max-w-3xl mx-auto"
          >
            Showcasing our latest work - where innovation meets excellence
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-24">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              ref={(el) => setProjectRef(el, index)}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="project-image relative overflow-hidden rounded-3xl bg-dark/10 aspect-[4/3] border border-dark/10">
                  {/* Placeholder for project image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-dark/20 flex items-center justify-center">
                    <div className="text-dark/50 text-center">
                      <div className="text-4xl font-bold mb-2">{project.title}</div>
                      <div className="text-lg">Project Image Placeholder</div>
                    </div>
                  </div>
                  
                  {/* Overlay on hover */}
                  <div className="project-overlay absolute inset-0 bg-accent/90 backdrop-blur-sm opacity-0 transition-all duration-500 flex items-center justify-center">
                    <button className="bg-dark text-light px-6 py-3 rounded-xl font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View Project <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`project-content space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="space-y-4">
                  <div className="inline-block bg-accent/20 backdrop-blur-lg text-dark px-4 py-2 rounded-full text-sm font-medium border border-accent/30">
                    {project.industry}
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-brutalist text-dark">
                    {project.title}
                  </h3>
                  
                  <p className="text-lg text-dark/70 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Services */}
                <div className="space-y-3">
                  <h4 className="font-bold text-dark text-lg">Services Provided:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service, serviceIndex) => (
                      <span 
                        key={serviceIndex}
                        className="service-tag bg-dark/10 text-dark px-3 py-1 rounded-full text-sm font-medium border border-dark/20 hover:bg-accent/20 hover:border-accent/40 transition-all duration-300"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button className="group flex items-center gap-3 text-dark hover:text-accent transition-colors duration-300 font-medium">
                  View Case Study 
                  <ArrowRight className="arrow-icon w-4 h-4 transform transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio CTA */}
        <div ref={ctaRef} className="text-center mt-20">
          <div className="bg-dark/5 backdrop-blur-lg rounded-3xl p-12 border border-dark/10 hover:border-accent/30 transition-all duration-500 group">
            <h3 className="text-3xl font-bold text-dark mb-4 group-hover:text-accent transition-colors duration-300">
              Ready to Start Your Project?
            </h3>
            <p className="text-dark/70 mb-8 max-w-2xl mx-auto">
              Let's create something amazing together. From concept to launch, 
              we'll bring your vision to life with precision and elegance.
            </p>
            <button 
              className="group bg-accent text-dark px-8 py-4 rounded-2xl font-bold text-lg hover:bg-accent/90 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.05,
                  duration: 0.2
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  duration: 0.2
                });
              }}
            >
              <span className="relative z-10">Start Your Project</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;