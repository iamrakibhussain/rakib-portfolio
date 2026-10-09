import { Metadata } from "next";
import { AboutClient } from "@/components/sections/AboutClient";

export const metadata: Metadata = {
  title: "About | Rakib Hussain",
  description: "Full-Stack Developer specializing in JavaScript, TypeScript, and AI-powered workflows.",
};

export default function AboutPage() {
  return <AboutClient />;
}