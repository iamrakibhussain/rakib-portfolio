import { Metadata } from "next";
import { ExperienceClient } from "@/components/sections/ExperienceClient";
import { experiences } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience | Rakib Hussain",
  description: "My professional journey and software development experience.",
};

export default function ExperiencePage() {
  return <ExperienceClient experiences={experiences} />;
}
