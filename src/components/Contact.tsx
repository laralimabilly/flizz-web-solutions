import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Clock, Users } from 'lucide-react';
import type { ContactForm } from '../types';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactDetailsRef = useRef<(HTMLDivElement | null)[]>([]);
  const infoCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const formFieldsRef = useRef<(HTMLDivElement | null)[]>([]);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 50
      });

      gsap.set(leftContentRef.current, {
        opacity: 0,
        x: -50
      });

      gsap.set(formRef.current, {
        opacity: 0,
        x: 50,
        scale: 0.95
      });

      gsap.set(contactDetailsRef.current, {
        opacity: 0,
        x: -30,
        scale: 0.9
      });

      gsap.set(infoCardsRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.9
      });

      gsap.set(formFieldsRef.current, {
        opacity: 0,
        y: 20
      });

      gsap.set(submitButtonRef.current, {
        opacity: 0,
        scale: 0.8
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

      // Left content animation
      gsap.to(leftContentRef.current, {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: leftContentRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Form animation
      gsap.to(formRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Contact details animation
      gsap.to(contactDetailsRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: contactDetailsRef.current[0],
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Info cards animation
      gsap.to(infoCardsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: infoCardsRef.current[0],
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Form fields animation
      gsap.to(formFieldsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formFieldsRef.current[0],
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Submit button animation
      gsap.to(submitButtonRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: submitButtonRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Hover animations for contact details
      contactDetailsRef.current.forEach((detail) => {
        if (detail) {
          const icon = detail.querySelector('.contact-icon');
          
          detail.addEventListener('mouseenter', () => {
            gsap.to(detail, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out"
            });

            gsap.to(icon, {
              rotation: 360,
              scale: 1.1,
              duration: 0.5,
              ease: "back.out(1.7)"
            });
          });

          detail.addEventListener('mouseleave', () => {
            gsap.to(detail, {
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
          });
        }
      });

      // Info cards hover animations
      infoCardsRef.current.forEach((card) => {
        if (card) {
          const icon = card.querySelector('.info-icon');
          
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -5,
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out"
            });

            gsap.to(icon, {
              y: -3,
              scale: 1.1,
              duration: 0.3,
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
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setContactDetailRef = (el: HTMLDivElement | null, index: number) => {
    contactDetailsRef.current[index] = el;
  };

  const setInfoCardRef = (el: HTMLDivElement | null, index: number) => {
    infoCardsRef.current[index] = el;
  };

  const setFormFieldRef = (el: HTMLDivElement | null, index: number) => {
    formFieldsRef.current[index] = el;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add submit animation
    gsap.to(submitButtonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });

    // Success animation
    gsap.to(formRef.current, {
      scale: 1.02,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });

    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.target, {
      scale: 1.02,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.target, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  return (
    <section ref={sectionRef} id="contact" className="py-40 bg-light">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-6xl md:text-8xl font-brutalist text-dark mb-6">
            LET'S TALK
          </h2>
          <p ref={subtitleRef} className="text-xl text-dark/70 max-w-3xl mx-auto">
            Ready to transform your digital presence? Let's discuss your project and bring your vision to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div ref={leftContentRef} className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-dark">Get in Touch</h3>
              <p className="text-dark/70 text-lg leading-relaxed">
                We're here to help you create something extraordinary. Whether you need a complete 
                digital transformation or want to enhance your existing platform, our team is ready 
                to make it happen.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div 
                ref={(el) => setContactDetailRef(el, 0)}
                className="flex items-center gap-4 cursor-pointer"
              >
                <div className="contact-icon w-12 h-12 bg-accent/20 backdrop-blur-lg rounded-xl flex items-center justify-center border border-accent/30">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="font-medium text-dark">Email</div>
                  <div className="text-dark/70">felipe@flizz.com.br</div>
                </div>
              </div>

              <div 
                ref={(el) => setContactDetailRef(el, 1)}
                className="flex items-center gap-4 cursor-pointer"
              >
                <div className="contact-icon w-12 h-12 bg-accent/20 backdrop-blur-lg rounded-xl flex items-center justify-center border border-accent/30">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="font-medium text-dark">Phone</div>
                  <div className="text-dark/70">+55 (17) 98144-9654</div>
                </div>
              </div>

              <div 
                ref={(el) => setContactDetailRef(el, 2)}
                className="flex items-center gap-4 cursor-pointer"
              >
                <div className="contact-icon w-12 h-12 bg-accent/20 backdrop-blur-lg rounded-xl flex items-center justify-center border border-accent/30">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="font-medium text-dark">Location</div>
                  <div className="text-dark/70">Remote & On-site Worldwide</div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid sm:grid-cols-2 gap-6 pt-8">
              <div 
                ref={(el) => setInfoCardRef(el, 0)}
                className="bg-dark/5 backdrop-blur-lg rounded-2xl p-6 border border-dark/10 cursor-pointer"
              >
                <Clock className="info-icon w-8 h-8 text-accent mb-3" />
                <h4 className="font-bold text-dark mb-2">Response Time</h4>
                <p className="text-dark/70 text-sm">We typically respond within 24 hours</p>
              </div>

              <div 
                ref={(el) => setInfoCardRef(el, 1)}
                className="bg-dark/5 backdrop-blur-lg rounded-2xl p-6 border border-dark/10 cursor-pointer"
              >
                <Users className="info-icon w-8 h-8 text-accent mb-3" />
                <h4 className="font-bold text-dark mb-2">Free Consultation</h4>
                <p className="text-dark/70 text-sm">30-minute strategy session included</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-dark/5 backdrop-blur-lg rounded-3xl p-8 border border-dark/10">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div ref={(el) => setFormFieldRef(el, 0)}>
                  <label htmlFor="name" className="block text-dark font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    required
                    className="w-full px-4 py-3 bg-light/50 backdrop-blur-lg border border-dark/20 rounded-xl focus:border-accent focus:outline-none transition-colors duration-300"
                    placeholder="Your full name"
                  />
                </div>

                <div ref={(el) => setFormFieldRef(el, 1)}>
                  <label htmlFor="email" className="block text-dark font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    required
                    className="w-full px-4 py-3 bg-light/50 backdrop-blur-lg border border-dark/20 rounded-xl focus:border-accent focus:outline-none transition-colors duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div ref={(el) => setFormFieldRef(el, 2)}>
                <label htmlFor="company" className="block text-dark font-medium mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  className="w-full px-4 py-3 bg-light/50 backdrop-blur-lg border border-dark/20 rounded-xl focus:border-accent focus:outline-none transition-colors duration-300"
                  placeholder="Your company name"
                />
              </div>

              <div ref={(el) => setFormFieldRef(el, 3)}>
                <label htmlFor="message" className="block text-dark font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-light/50 backdrop-blur-lg border border-dark/20 rounded-xl focus:border-accent focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                ref={submitButtonRef}
                type="submit"
                className="group w-full bg-accent text-dark px-8 py-4 rounded-2xl font-bold text-lg hover:bg-accent/90 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Send Message
                  <Send className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;