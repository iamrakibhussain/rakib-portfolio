import { Metadata } from "next";
import { FadeIn } from "@/components/shared/FadeIn";

export const metadata: Metadata = {
  title: "About | Rakib Hussain",
  description: "Learn more about me, my engineering philosophy, and my technical skills.",
};
import { skills } from "@/data/skills";

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-24 px-4 md:px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
      <div className="md:col-span-2 space-y-8">
        <FadeIn>
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">About Me</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              I&apos;m a Full-Stack Developer who builds premium, high-performance web applications.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              I specialize in the modern JavaScript and TypeScript ecosystem.
              My work focuses on bridging the gap between exceptional user interfaces and robust, scalable backend architectures. I have a strong emphasis on writing clean, maintainable code that can scale with a business.
            </p>
            <p>
              I believe in the principle of <em>&quot;Minimum unnecessary complexity + maximum professional quality.&quot;</em> 
              Whether designing a REST API, configuring a database schema, or building an accessible React component, 
              I prioritize maintainability and performance above all else.
            </p>
            <h2>Engineering Philosophy</h2>
            <ul>
              <li><strong>User-Centric:</strong> Every line of code should ultimately serve the user&apos;s experience.</li>
              <li><strong>Pragmatic:</strong> Choose the right tool for the job. Avoid hype-driven development.</li>
              <li><strong>Accessible:</strong> The web is for everyone. Accessibility is a requirement, not an afterthought.</li>
              <li><strong>Secure:</strong> Security must be architected from day one.</li>
            </ul>
            <h2>AI-Assisted Workflow</h2>
            <p>
              I actively integrate AI coding agents into my development process to accelerate scaffolding, automated refactoring, and intelligent code review. This approach allows me to focus on high-level architectural decisions, robust security, and delivering features faster without sacrificing quality. Human-in-the-loop oversight ensures every technical decision remains strictly intentional.
            </p>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.2}>
        <div className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tight">Technical Skills</h2>
        <div className="space-y-6">
            {skills.map((skillGroup, index) => (
              <FadeIn key={skillGroup.category} delay={0.3 + (index * 0.1)}>
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span key={skill} className="inline-flex items-center rounded-md bg-muted border px-2.5 py-0.5 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-muted/50 cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
