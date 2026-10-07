import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/shared/icons";
import { FadeIn } from "@/components/shared/FadeIn";

export function ProjectCard({ project, index = 0 }: { project: Project, index?: number }) {
  return (
    <FadeIn delay={index * 0.1} className="h-full">
      <Card className="flex flex-col overflow-hidden h-full group hover:border-primary/30 hover:shadow-md transition-all duration-300">
      {project.coverImage && (
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image src={project.coverImage} alt={project.title} fill className="object-cover w-full h-full transition-transform hover:scale-105" />
        </div>
      )}
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.summary}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-4">
        <Link href={`/projects/${project.slug}`} className="text-sm font-medium hover:underline flex-1">
          View Case Study
        </Link>
        <div className="flex gap-2">
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
              <GithubIcon className="h-4 w-4" />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
    </FadeIn>
  );
}
