import { experiences } from "@/data/experience";
import { FadeIn } from "@/components/shared/FadeIn";

export const metadata = {
  title: "Experience | Rakib Hussain",
  description: "My professional journey and work experience.",
};

export default function ExperiencePage() {
  return (
    <div className="container py-12 md:py-24 px-4 md:px-6 max-w-4xl mx-auto">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">Experience</h1>
        <p className="text-muted-foreground text-lg max-w-[700px]">
          My professional journey as a Full-Stack Developer, detailing my roles, responsibilities, and practical development experience.
        </p>
      </div>

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <FadeIn key={exp.id} delay={index * 0.1}>
            <div className="relative border-l pl-6 pb-2 last:pb-0 border-muted">
              <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-2" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
              <h2 className="text-2xl font-bold">{exp.role}</h2>
              <span className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full w-fit">
                {exp.startDate} — {exp.endDate || "Present"}
              </span>
            </div>
            <h3 className="text-xl font-medium text-foreground/80 mb-6">{exp.company}</h3>
            <ul className="space-y-3 text-muted-foreground list-disc pl-4 mb-6">
              {exp.description.map((desc, i) => (
                <li key={i} className="leading-relaxed">{desc}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech) => (
                <span key={tech} className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
