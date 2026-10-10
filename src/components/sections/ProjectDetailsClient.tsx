"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { ArrowLeft, ExternalLink, ArrowRight, LayoutTemplate, Zap, ShieldCheck } from "lucide-react";
import { GithubIcon } from "@/components/shared/icons";
import { FadeIn } from "@/components/shared/FadeIn";
import { cn } from "@/lib/utils";

const DotPattern = () => (
  <div className="absolute inset-0 pointer-events-none z-0" 
       style={{
         backgroundImage: 'radial-gradient(circle at center, rgba(0,0,0,0.1) 1px, transparent 1px)',
         backgroundSize: '24px 24px'
       }} 
  />
);

export function ProjectDetailsClient({ 
  project, 
  nextProject 
}: { 
  project: Project; 
  nextProject: Project | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-transparent">
      
      {/* 1. IMMERSIVE HERO PARALLAX */}
      <div ref={heroRef} className="relative h-[80vh] md:h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          style={{ y, opacity, scale }} 
          className="absolute inset-0 w-full h-full z-0"
        >
          {project.coverImage ? (
            <Image 
              src={project.coverImage} 
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400" />
          )}
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 container px-4 mx-auto flex flex-col items-center text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link href="/projects" className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-bold text-white border border-white/20 hover:bg-white/20 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
            </Link>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-6 max-w-5xl"
          >
            {project.title}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-10"
          >
            <span className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white font-bold tracking-widest uppercase text-sm">
              {project.role || "Full-Stack Developer"}
            </span>
            <span className="px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white font-medium text-sm">
              {project.publishedAt}
            </span>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70"
        >
          <span className="text-xs font-bold uppercase tracking-widest">Scroll to explore</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-white/70 to-transparent"
          />
        </motion.div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="relative z-20 bg-white dark:bg-black rounded-t-[3rem] -mt-12 overflow-hidden px-4 py-16 md:py-24">
        <DotPattern />
        
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Quick Stats & Tech Stack (Bento Grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
            {/* Overview Box */}
            <FadeIn className="lg:col-span-2">
              <div className="bg-white/40 backdrop-blur-xl border border-black/10 rounded-3xl p-8 h-full shadow-lg">
                <h2 className="text-2xl font-black mb-4">Project Overview</h2>
                <p className="text-lg text-black/70 leading-relaxed font-medium">
                  {project.content || project.summary}
                </p>
                <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-black/10">
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-black/80 transition-colors">
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                  {project.repoUrl && project.repoUrl !== "#" && (
                    <a href={project.repoUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-black/20 text-black rounded-full font-bold hover:bg-gray-50 transition-colors shadow-sm">
                      <GithubIcon className="w-4 h-4" /> Source Code
                    </a>
                  )}
                </div>
              </div>
            </FadeIn>

            {/* Tech Stack Box */}
            <FadeIn delay={0.2} className="lg:col-span-1">
              <div className="bg-black text-white rounded-3xl p-8 h-full shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-50"></div>
                <h2 className="text-2xl font-black mb-6 relative z-10">Tech Stack</h2>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {project.technologies.map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-sm font-bold backdrop-blur-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Device Mockup Section (if cover image exists) */}
          {project.coverImage && (
            <FadeIn delay={0.3} className="mb-20">
              <div className="relative w-full max-w-5xl mx-auto rounded-xl p-2 md:p-4 bg-gray-100 border border-gray-200 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-6 bg-gray-200 flex items-center px-4 gap-1.5 border-b border-gray-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
                <div className="mt-4 relative w-full aspect-video rounded-b-lg overflow-hidden border border-gray-200">
                  <Image src={project.coverImage} alt="App mockup" fill className="object-cover" />
                </div>
              </div>
            </FadeIn>
          )}

          {/* Deep Dive Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 max-w-5xl mx-auto">
            {project.challenges && (
              <FadeIn>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-black">Challenges</h3>
                  <p className="text-lg text-black/70 font-medium leading-relaxed">{project.challenges}</p>
                </div>
              </FadeIn>
            )}

            {project.results && (
              <FadeIn delay={0.2}>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-black">Results & Impact</h3>
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="p-6 bg-green-50 border border-green-200 rounded-2xl"
                  >
                    <p className="text-2xl font-black text-green-800">{project.results}</p>
                  </motion.div>
                </div>
              </FadeIn>
            )}
            
            {project.architecture && (
              <FadeIn delay={0.3} className="md:col-span-2 mt-8">
                <div className="space-y-4 bg-white/40 backdrop-blur-lg border border-black/10 p-8 rounded-3xl shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                      <LayoutTemplate className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-black">Architecture</h3>
                  </div>
                  <p className="text-lg text-black/70 font-medium leading-relaxed">{project.architecture}</p>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </div>

      {/* 3. NEXT PROJECT FOOTER */}
      {nextProject && (
        <Link href={`/projects/${nextProject.slug}`} className="block relative h-[50vh] w-full overflow-hidden group">
          <div className="absolute inset-0 z-0">
             {nextProject.coverImage ? (
                <Image 
                  src={nextProject.coverImage} 
                  alt={nextProject.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gray-900" />
              )}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500" />
          </div>
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">
            <span className="text-white/60 font-bold tracking-widest uppercase mb-4 text-sm">Next Project</span>
            <h2 className="text-4xl md:text-6xl font-black text-white flex items-center gap-4">
              {nextProject.title}
              <ArrowRight className="w-10 h-10 transform translate-x-0 group-hover:translate-x-4 transition-transform duration-500" />
            </h2>
          </div>
        </Link>
      )}
    </div>
  );
}
