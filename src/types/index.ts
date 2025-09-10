export interface Service {
    title: string;
    description: string;
    icon: string;
    features: string[];
  }
  
  export interface Project {
    id: string;
    title: string;
    description: string;
    industry: string;
    services: string[];
    image: string;
    link?: string;
  }
  
  export interface Technology {
    name: string;
    icon: string;
    category: 'frontend' | 'backend' | 'mobile' | 'tools' | 'design';
  }
  
  export interface ContactForm {
    name: string;
    email: string;
    company?: string;
    message: string;
  }