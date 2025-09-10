import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import type { Project } from '../types';

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
  return (
    <section id="portfolio" className="py-20 bg-light">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-8xl font-brutalist text-dark mb-6">
            PORTFOLIO
          </h2>
          <p className="text-xl text-dark/70 max-w-3xl mx-auto">
            Showcasing our latest work - where innovation meets excellence
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-24">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative overflow-hidden rounded-3xl bg-dark/10 aspect-[4/3] border border-dark/10">
                  {/* Placeholder for project image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-dark/20 flex items-center justify-center">
                    <div className="text-dark/50 text-center">
                      <div className="text-4xl font-bold mb-2">{project.title}</div>
                      <div className="text-lg">Project Image Placeholder</div>
                    </div>
                  </div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-accent/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <button className="bg-dark text-light px-6 py-3 rounded-xl font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View Project <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
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
                        className="bg-dark/10 text-dark px-3 py-1 rounded-full text-sm font-medium border border-dark/20"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button className="group flex items-center gap-3 text-dark hover:text-accent transition-colors duration-300 font-medium">
                  View Case Study 
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio CTA */}
        <div className="text-center mt-20">
          <div className="bg-dark/5 backdrop-blur-lg rounded-3xl p-12 border border-dark/10">
            <h3 className="text-3xl font-bold text-dark mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-dark/70 mb-8 max-w-2xl mx-auto">
              Let's create something amazing together. From concept to launch, 
              we'll bring your vision to life with precision and elegance.
            </p>
            <button className="bg-accent text-dark px-8 py-4 rounded-2xl font-bold text-lg hover:bg-accent/90 transform hover:scale-105 transition-all duration-300">
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;