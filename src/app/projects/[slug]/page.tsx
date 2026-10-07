import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/shared/icons";
import { FadeIn } from "@/components/shared/FadeIn";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Rakib Hussain`,
    description: project.summary,
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectCaseStudy({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container py-12 md:py-24 px-4 md:px-6 max-w-4xl mx-auto">
      <Link href="/projects" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Projects
      </Link>
      
      <FadeIn>
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">{project.title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">{project.summary}</p>
          
          <div className="flex flex-wrap gap-4 pt-4 pb-8 border-b">
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noreferrer">
                <Button variant="outline" className="gap-2 transition-transform hover:-translate-y-0.5">
                  <GithubIcon className="h-4 w-4" />
                  View Source
                </Button>
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                <Button className="gap-2 transition-transform hover:-translate-y-0.5">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Button>
              </a>
            )}
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
        <FadeIn delay={0.1} className="md:col-span-1">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-2">Role</h3>
              <p className="text-muted-foreground">{project.role || "Full-Stack Developer"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-2">Tech Stack</h3>
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li key={tech} className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-semibold">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.2} className="md:col-span-3">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mt-0 mb-4">Overview</h2>
            <p>{project.content || project.summary}</p>
            
            {project.architecture && (
              <>
                <h2 className="text-2xl font-bold mt-8 mb-4">Architecture</h2>
                <p>{project.architecture}</p>
              </>
            )}

            {project.challenges && (
              <>
                <h2 className="text-2xl font-bold mt-8 mb-4">Challenges</h2>
                <p>{project.challenges}</p>
              </>
            )}

            {project.results && (
              <>
                <h2 className="text-2xl font-bold mt-8 mb-4">Results & Impact</h2>
                <p>{project.results}</p>
              </>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
