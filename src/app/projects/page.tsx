import { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectsClient } from "@/components/sections/ProjectsClient";

export const metadata: Metadata = {
  title: "Projects | Rakib Hussain",
  description: "A selection of my recent full-stack projects.",
};

export default function ProjectsPage() {
  return <ProjectsClient projects={projects} />;
}
