import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { FadeIn } from "@/components/shared/FadeIn";

export const metadata = {
  title: "Projects | Rakib Hussain",
  description: "A selection of my recent full-stack projects.",
};

export default function ProjectsPage() {
  return (
    <div className="container py-12 md:py-24 px-4 md:px-6">
      <FadeIn>
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">Projects</h1>
          <p className="text-muted-foreground text-lg max-w-[700px]">
            Here are some of the key projects I&apos;ve worked on, showcasing my expertise in building scalable, production-ready applications.
          </p>
        </div>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
