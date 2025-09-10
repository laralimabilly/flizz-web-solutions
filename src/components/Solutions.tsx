import React from 'react';
import { Palette, Code2, Smartphone, Cloud } from 'lucide-react';
import type { Service } from '../types';

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
  return (
    <section id="solutions" className="py-20 bg-dark relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-8xl font-brutalist text-light mb-6">
            SOLUTIONS
          </h2>
          <p className="text-xl text-light/70 max-w-3xl mx-auto">
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
                className="group relative bg-light/10 backdrop-blur-lg rounded-3xl p-8 border border-light/20 hover:border-accent/50 transition-all duration-500 hover:transform hover:scale-105"
              >
                {/* Glassmorphism overlay on hover */}
                <div className="absolute inset-0 bg-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-accent/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-accent" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-light mb-4 group-hover:text-accent transition-colors duration-300">
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
                        className="flex items-center text-light/60 text-sm"
                      >
                        <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-accent text-dark px-8 py-4 rounded-2xl font-bold text-lg hover:bg-accent/90 transform hover:scale-105 transition-all duration-300">
            Discuss Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default Solutions;