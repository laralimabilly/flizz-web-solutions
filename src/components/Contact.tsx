import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Users } from 'lucide-react';
import type { ContactForm } from '../types';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-light">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-8xl font-brutalist text-dark mb-6">
            LET'S TALK
          </h2>
          <p className="text-xl text-dark/70 max-w-3xl mx-auto">
            Ready to transform your digital presence? Let's discuss your project and bring your vision to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
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
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 backdrop-blur-lg rounded-xl flex items-center justify-center border border-accent/30">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="font-medium text-dark">Email</div>
                  <div className="text-dark/70">hello@flizzweb.com</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 backdrop-blur-lg rounded-xl flex items-center justify-center border border-accent/30">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="font-medium text-dark">Phone</div>
                  <div className="text-dark/70">+1 (555) 123-4567</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 backdrop-blur-lg rounded-xl flex items-center justify-center border border-accent/30">
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
              <div className="bg-dark/5 backdrop-blur-lg rounded-2xl p-6 border border-dark/10">
                <Clock className="w-8 h-8 text-accent mb-3" />
                <h4 className="font-bold text-dark mb-2">Response Time</h4>
                <p className="text-dark/70 text-sm">We typically respond within 24 hours</p>
              </div>

              <div className="bg-dark/5 backdrop-blur-lg rounded-2xl p-6 border border-dark/10">
                <Users className="w-8 h-8 text-accent mb-3" />
                <h4 className="font-bold text-dark mb-2">Free Consultation</h4>
                <p className="text-dark/70 text-sm">30-minute strategy session included</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-dark/5 backdrop-blur-lg rounded-3xl p-8 border border-dark/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-dark font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-light/50 backdrop-blur-lg border border-dark/20 rounded-xl focus:border-accent focus:outline-none transition-colors duration-300"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-dark font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-light/50 backdrop-blur-lg border border-dark/20 rounded-xl focus:border-accent focus:outline-none transition-colors duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-dark font-medium mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-light/50 backdrop-blur-lg border border-dark/20 rounded-xl focus:border-accent focus:outline-none transition-colors duration-300"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-dark font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-light/50 backdrop-blur-lg border border-dark/20 rounded-xl focus:border-accent focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-accent text-dark px-8 py-4 rounded-2xl font-bold text-lg hover:bg-accent/90 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Send Message
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;