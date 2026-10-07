export interface Project {
  slug: string;
  title: string;
  summary: string;
  content?: string; // Rich text or markdown content for the case study
  coverImage?: string;
  repoUrl?: string;
  liveUrl?: string;
  technologies: string[];
  featured: boolean;
  publishedAt: string;
  architecture?: string;
  role?: string;
  challenges?: string;
  results?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string; // If undefined, considered 'Present'
  description: string[];
  technologies: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  avatarUrl?: string;
}
