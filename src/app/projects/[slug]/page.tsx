import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Metadata } from "next";
import { ProjectDetailsClient } from "@/components/sections/ProjectDetailsClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
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

export default async function ProjectCaseStudy({ params }: Props) {
  const { slug } = await params;
  const currentIndex = projects.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = projects[currentIndex];
  // Determine the next project for the footer (loop back to first if it's the last one)
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return <ProjectDetailsClient project={project} nextProject={nextProject} />;
}
