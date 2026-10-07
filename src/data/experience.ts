import { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "Tech Innovations Inc.",
    role: "Full-Stack Developer",
    startDate: "2022-01",
    description: [
      "Architected and developed a modern SaaS platform using Next.js, resulting in a 40% performance increase.",
      "Mentored junior developers and instituted comprehensive code review guidelines.",
      "Integrated secure authentication and role-based access control (RBAC)."
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"]
  },
  {
    id: "exp-2",
    company: "Creative Digital Agency",
    role: "Full-Stack Developer",
    startDate: "2019-06",
    endDate: "2021-12",
    description: [
      "Built performant e-commerce websites and bespoke web applications for diverse clients.",
      "Optimized database queries and implemented Redis caching, reducing load times by 50%."
    ],
    technologies: ["React", "Express.js", "MongoDB", "Redux"]
  }
];
