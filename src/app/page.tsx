import { Hero } from "@/components/sections/Hero";
import { CapabilityStrip } from "@/components/sections/CapabilityStrip";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Expertise } from "@/components/sections/Expertise";
import { ExperiencePreview } from "@/components/sections/ExperiencePreview";
import { EngineeringApproach } from "@/components/sections/EngineeringApproach";
import { AIAssisted } from "@/components/sections/AIAssisted";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <CapabilityStrip />
      <FeaturedProjects />
      <Expertise />
      <ExperiencePreview />
      <EngineeringApproach />
      <AIAssisted />
      <FinalCTA />
    </>
  );
}
