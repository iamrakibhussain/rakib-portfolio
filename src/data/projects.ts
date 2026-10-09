import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "focusly",
    title: "Focusly — Student Productivity Platform",
    role: "Full-Stack Web Application",
    summary:
      "A modern productivity platform that helps students manage tasks, organize study plans, track goals, analyze progress, and maintain focused Pomodoro study sessions in one unified dashboard.",
    content:
      "Focusly is a full-stack student productivity web application designed to make academic planning simple, structured, and engaging. Users can securely create an account, manage assignments with priorities and deadlines, organize their daily study schedule, set measurable goals, track focus sessions, and review their productivity through analytics and activity insights. The application combines a polished dark glassmorphism interface with a scalable backend architecture, protected routes, task management APIs, goal tracking, Pomodoro preferences, user settings, and PostgreSQL data persistence.",
    coverImage: "/images/projects/focusly study productivity dashboard.png",
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "Prisma ORM",
      "PostgreSQL",
      "JWT Authentication",
      "Recharts",
      "Framer Motion",
    ],
    liveUrl: "https://focusly-client.vercel.app/",
    repoUrl: "https://github.com/iamrakibhussain/Focusly-Client",
    results: "Smarter Study Management",
    publishedAt: "2023-10-01",
    featured: true,
  },
  {
    slug: "project-2",
    title: "E-Commerce Platform",
    role: "E-Commerce",
    summary:
      "A complete modern e-commerce solution with seamless payment gateway integration and optimized cart experience.",
    content: "Detailed description of the E-Commerce Platform goes here...",
    coverImage: "/images/projects/placeholder.svg",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "#",
    repoUrl: "#",
    results: "1000+ Active Users",
    publishedAt: "2023-11-15",
    featured: true,
  },
  {
    slug: "project-3",
    title: "AI Content Generator",
    role: "AI Integration",
    summary:
      "An innovative web application that leverages OpenAI API to generate high-quality marketing copy instantly.",
    content: "Detailed description of the AI Content Generator goes here...",
    coverImage: "/images/projects/placeholder.svg",
    technologies: ["Next.js", "OpenAI", "Supabase", "Tailwind"],
    liveUrl: "#",
    repoUrl: "#",
    publishedAt: "2024-01-20",
    featured: true,
  },
  {
    slug: "project-4",
    title: "Real-Time Collaboration Tool",
    role: "Web Socket App",
    summary:
      "A collaborative workspace tool featuring live cursor tracking and instant updates using WebSockets.",
    content:
      "Detailed description of the Real-Time Collaboration Tool goes here...",
    coverImage: "/images/projects/placeholder.svg",
    technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
    liveUrl: "#",
    repoUrl: "#",
    results: "0ms Latency",
    publishedAt: "2024-03-05",
    featured: true,
  },
];
