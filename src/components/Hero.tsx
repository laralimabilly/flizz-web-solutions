import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Zap, Sparkles } from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup - hide elements
      gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current, statsRef.current], {
        opacity: 0,
        y: 50
      });

      gsap.set(circleRef.current, {
        scale: 0,
        rotation: -180,
        opacity: 0
      });

      gsap.set(iconRefs.current, {
        scale: 0,
        rotation: 360,
        opacity: 0
      });

      // Create main timeline
      const tl = gsap.timeline({ delay: 0.5 });

      // Animate title with split text effect
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      })
      // Animate subtitle
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.6")
      // Animate buttons
      .to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.4")
      // Animate circle
      .to(circleRef.current, {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 1.5,
        ease: "back.out(1.7)"
      }, "-=0.8")
      // Animate floating icons
      .to(iconRefs.current, {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(2)"
      }, "-=1")
      // Animate stats
      .to(statsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4");

      // Continuous floating animation for circle
      gsap.to(circleRef.current, {
        y: -15,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Continuous floating animation for icons with different delays
      iconRefs.current.forEach((icon, index) => {
        if (icon) {
          gsap.to(icon, {
            y: -10,
            duration: 2.5 + index * 0.3,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.5
          });
        }
      });

      // Parallax effect on scroll
      gsap.to(circleRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      // Scale and fade on scroll
      gsap.to(heroRef.current, {
        scale: 0.95,
        opacity: 0.8,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

    }, heroRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  const setIconRef = (el: HTMLDivElement | null, index: number) => {
    iconRefs.current[index] = el;
  };

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-light via-light to-light/90 pt-20 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-accent rounded-full blur-lg animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 
                ref={titleRef}
                className="text-6xl md:text-8xl font-brutalist text-dark leading-tight"
              >
                FAST.
                <br />
                <span className="text-accent">PRECISE.</span>
                <br />
                ELEGANT.
              </h1>
              <p 
                ref={subtitleRef}
                className="text-xl md:text-2xl text-dark/70 max-w-2xl"
              >
                We create lightning-fast, pixel-perfect websites that soar above the competition. 
                Just like our hummingbird mascot.
              </p>
            </div>

            <div ref={buttonsRef} className="flex flex-wrap gap-4">
              <button className="group bg-accent text-dark px-8 py-4 rounded-2xl font-bold text-lg hover:bg-accent/90 transform hover:scale-105 transition-all duration-300 animate-glow relative overflow-hidden">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
              <button className="group bg-dark/10 backdrop-blur-lg text-dark px-8 py-4 rounded-2xl font-medium text-lg hover:bg-dark/20 transition-all duration-300 border border-dark/20 relative overflow-hidden">
                <span className="relative z-10">View Portfolio</span>
                <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="flex flex-wrap gap-8 pt-8">
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-bold text-dark">50+</div>
                <div className="text-dark/60">Projects Delivered</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-bold text-dark">99%</div>
                <div className="text-dark/60">Client Satisfaction</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-bold text-dark">24/7</div>
                <div className="text-dark/60">Support</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative flex items-center justify-center">
            <div className="relative">
              {/* Main circle with glassmorphism */}
              <div 
                ref={circleRef}
                className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-light/30 backdrop-blur-xl border border-dark/20 flex items-center justify-center cursor-pointer group"
                onMouseEnter={() => {
                  gsap.to(circleRef.current, {
                    scale: 1.05,
                    rotation: 5,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }}
                onMouseLeave={() => {
                  gsap.to(circleRef.current, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }}
              >
                {/* Inner elements */}
                <div className="w-64 h-64 rounded-full bg-accent/20 backdrop-blur-lg border border-accent/30 flex items-center justify-center group-hover:bg-accent/30 transition-colors duration-500">
                  <div className="w-32 h-32 bg-accent rounded-full flex items-center justify-center group-hover:shadow-2xl transition-shadow duration-500">
                    {/* Hummingbird placeholder */}
                    <div className="w-16 h-16 bg-dark rounded-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-light/20 to-transparent rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating icons */}
              <div 
                ref={(el) => setIconRef(el, 0)}
                className="absolute -top-8 -right-8 w-16 h-16 bg-light/80 backdrop-blur-lg rounded-2xl border border-dark/20 flex items-center justify-center cursor-pointer group"
                onMouseEnter={() => {
                  gsap.to(iconRefs.current[0], {
                    scale: 1.2,
                    rotation: 10,
                    duration: 0.2
                  });
                }}
                onMouseLeave={() => {
                  gsap.to(iconRefs.current[0], {
                    scale: 1,
                    rotation: 0,
                    duration: 0.2
                  });
                }}
              >
                <Code className="w-8 h-8 text-accent group-hover:text-dark transition-colors duration-300" />
              </div>
              
              <div 
                ref={(el) => setIconRef(el, 1)}
                className="absolute -bottom-8 -left-8 w-16 h-16 bg-light/80 backdrop-blur-lg rounded-2xl border border-dark/20 flex items-center justify-center cursor-pointer group"
                onMouseEnter={() => {
                  gsap.to(iconRefs.current[1], {
                    scale: 1.2,
                    rotation: -10,
                    duration: 0.2
                  });
                }}
                onMouseLeave={() => {
                  gsap.to(iconRefs.current[1], {
                    scale: 1,
                    rotation: 0,
                    duration: 0.2
                  });
                }}
              >
                <Zap className="w-8 h-8 text-accent group-hover:text-dark transition-colors duration-300" />
              </div>
              
              <div 
                ref={(el) => setIconRef(el, 2)}
                className="absolute top-1/2 -right-16 w-16 h-16 bg-light/80 backdrop-blur-lg rounded-2xl border border-dark/20 flex items-center justify-center cursor-pointer group"
                onMouseEnter={() => {
                  gsap.to(iconRefs.current[2], {
                    scale: 1.2,
                    rotation: 15,
                    duration: 0.2
                  });
                }}
                onMouseLeave={() => {
                  gsap.to(iconRefs.current[2], {
                    scale: 1,
                    rotation: 0,
                    duration: 0.2
                  });
                }}
              >
                <Sparkles className="w-8 h-8 text-accent group-hover:text-dark transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;