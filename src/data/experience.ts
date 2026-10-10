import { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "Production Systems",
    role: "Full-Stack Web Developer",
    startDate: "2022",
    description: [
      "Built scalable, production-ready web applications with a focus on reliability, maintainability, security, and clean architecture.",
      "Developed SaaS applications, e-commerce platforms, and data-driven admin dashboards handling real-world production environments.",
      "Implemented secure authentication flows including JWT, RBAC, session-management, and OTP-based password verification.",
      "Designed robust database schemas using PostgreSQL and MongoDB with modern ORMs like Prisma and Mongoose.",
      "Ensured high performance through server-side rendering (SSR), API integration, and modern component-based architecture."
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Prisma"]
  },
  {
    id: "exp-2",
    company: "Backend & Infrastructure",
    role: "Backend & Systems Engineer",
    startDate: "2022",
    description: [
      "Architected modular backend systems with robust middleware, centralized error handling, and strict input validation using Zod.",
      "Secured REST APIs with rate limiting, CORS configuration, Helmet, and bcrypt password hashing to protect against common vulnerabilities.",
      "Managed Git-based team workflows, CI/CD pipelines, and domain/DNS configurations across Vercel, Render, and Cloudflare.",
      "Prioritized separation of concerns, reusable components, and production-level debugging to maintain highly reliable systems."
    ],
    technologies: ["Express.js", "REST APIs", "Git & GitHub", "Security", "DevOps", "Database Design", "Zod"]
  },
  {
    id: "exp-3",
    company: "Modern Workflows",
    role: "AI-Assisted Software Engineer",
    startDate: "2023",
    description: [
      "Integrated AI coding agents (Gemini Pro, Antigravity) into the software development lifecycle for rapid iteration and architecture planning.",
      "Accelerated repetitive development tasks while maintaining strict code quality, security, and long-term maintainability.",
      "Leveraged AI for rapid codebase analysis, multi-file feature implementation, debugging, and understanding unfamiliar architectures.",
      "Utilized AI tools to explore and evaluate complex implementation approaches before writing production code."
    ],
    technologies: ["Gemini Pro", "Antigravity", "AI Agents", "Architecture Planning", "Refactoring", "Debugging"]
  }
];
