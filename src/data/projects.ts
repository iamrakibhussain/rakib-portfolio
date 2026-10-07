import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "project-1",
    title: "Enterprise SaaS Dashboard",
    role: "Full-Stack Web App",
    summary: "A highly scalable analytics dashboard processing over 10k+ daily transactions with real-time data visualization.",
    content: "Detailed description of the Enterprise SaaS Dashboard goes here...",
    coverImage: "/images/projects/placeholder.svg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    liveUrl: "#",
    repoUrl: "#",
    results: "40% Faster Load Time",
    publishedAt: "2023-10-01",
    featured: true
  },
  {
    slug: "project-2",
    title: "E-Commerce Platform",
    role: "E-Commerce",
    summary: "A complete modern e-commerce solution with seamless payment gateway integration and optimized cart experience.",
    content: "Detailed description of the E-Commerce Platform goes here...",
    coverImage: "/images/projects/placeholder.svg",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "#",
    repoUrl: "#",
    results: "1000+ Active Users",
    publishedAt: "2023-11-15",
    featured: true
  },
  {
    slug: "project-3",
    title: "AI Content Generator",
    role: "AI Integration",
    summary: "An innovative web application that leverages OpenAI API to generate high-quality marketing copy instantly.",
    content: "Detailed description of the AI Content Generator goes here...",
    coverImage: "/images/projects/placeholder.svg",
    technologies: ["Next.js", "OpenAI", "Supabase", "Tailwind"],
    liveUrl: "#",
    repoUrl: "#",
    publishedAt: "2024-01-20",
    featured: true
  },
  {
    slug: "project-4",
    title: "Real-Time Collaboration Tool",
    role: "Web Socket App",
    summary: "A collaborative workspace tool featuring live cursor tracking and instant updates using WebSockets.",
    content: "Detailed description of the Real-Time Collaboration Tool goes here...",
    coverImage: "/images/projects/placeholder.svg",
    technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
    liveUrl: "#",
    repoUrl: "#",
    results: "0ms Latency",
    publishedAt: "2024-03-05",
    featured: true
  }
];
