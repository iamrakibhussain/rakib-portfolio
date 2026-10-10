"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { ArrowUpRight, ExternalLink, Sparkles, FolderGit2 } from "lucide-react";
import { GithubIcon } from "@/components/shared/icons";
import { cn } from "@/lib/utils";

const DotPattern = () => (
  <div className="absolute inset-0 pointer-events-none z-0" 
       style={{
         backgroundImage: 'radial-gradient(circle at center, rgba(0,0,0,0.1) 1px, transparent 1px)',
         backgroundSize: '24px 24px'
       }} 
  />
);

const RevealText = ({ text }: { text: string }) => {
  const words = text.split(" ");
  return (
    <span className="inline-block">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-3 pb-2">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              damping: 12,
              stiffness: 100,
              delay: i * 0.1,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export function ProjectsClient({ projects }: { projects: Project[] }) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--x", `${x}px`);
    e.currentTarget.style.setProperty("--y", `${y}px`);
  };

  return (
    <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
      <DotPattern />

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-16 md:mb-24 relative z-10 text-center flex flex-col items-center">
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8 p-4 bg-white/30 backdrop-blur-md rounded-3xl border border-white/50 shadow-xl"
        >
          <FolderGit2 className="w-12 h-12 text-black/80" />
        </motion.div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-black tracking-tight leading-none mb-6">
          <RevealText text="CRAFTED" />
          <br className="hidden md:block"/>
          <motion.span 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-black inline-block mt-2"
          >
            EXPERIENCES
          </motion.span>
        </h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-lg md:text-2xl font-bold text-black/60 max-w-3xl mx-auto"
        >
          A selection of robust, scalable applications that solve real-world problems.
        </motion.p>
      </div>

      {/* PROJECTS GRID */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => {
            const isHovered = hoveredProject === project.slug;
            // Make the first project take full width for an asymmetrical look
            const isFeatured = index === 0;

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1, type: "spring", bounce: 0.4 }}
                onMouseEnter={() => setHoveredProject(project.slug)}
                onMouseLeave={() => setHoveredProject(null)}
                onMouseMove={handleMouseMove}
                className={cn(
                  "group relative rounded-3xl overflow-hidden bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl transition-all duration-500 hover:shadow-2xl flex flex-col",
                  isFeatured ? "md:col-span-2 md:flex-row" : "col-span-1"
                )}
              >
                {/* Spotlight Background */}
                <div 
                  className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: "radial-gradient(600px circle at var(--x, 0px) var(--y, 0px), rgba(255,255,255,0.8), transparent 40%)",
                  }}
                />

                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

                {/* Project Image Box */}
                <div className={cn(
                  "relative overflow-hidden bg-black/5 p-4 md:p-6 z-10",
                  isFeatured ? "md:w-1/2 min-h-[300px] md:min-h-[400px]" : "w-full aspect-[16/9]"
                )}>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <Sparkles className="w-12 h-12 text-black/10" />
                  </div>
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg border border-white/20">
                    {project.coverImage ? (
                      <Image 
                        src={project.coverImage} 
                        alt={project.title} 
                        fill 
                        className={cn(
                          "object-cover transition-transform duration-700 ease-out",
                          isHovered ? "scale-105" : "scale-100"
                        )}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                    )}
                    
                    {/* View Project Overlay */}
                    <div className={cn(
                      "absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-all duration-500 z-10",
                      isHovered ? "opacity-100" : "opacity-0"
                    )}>
                      <Link href={`/projects/${project.slug}`}>
                        <div className="bg-white text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          View Project <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className={cn(
                  "flex flex-col p-6 md:p-10",
                  isFeatured ? "md:w-1/2 justify-center" : "w-full"
                )}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-black/5 rounded-full text-xs font-bold tracking-widest uppercase text-black/60">
                      {project.role}
                    </span>
                    {project.featured && (
                      <span className="px-3 py-1 bg-green-500/10 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-black text-black mb-3">
                    <Link href={`/projects/${project.slug}`} className="hover:underline decoration-2 underline-offset-4">
                      {project.title}
                    </Link>
                  </h3>
                  
                  <p className="text-black/70 font-medium mb-6 line-clamp-3">
                    {project.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    {project.technologies.slice(0, 5).map(tech => (
                      <span key={tech} className="px-2.5 py-1 text-xs font-bold bg-white/50 border border-white/60 rounded-md text-black/80 shadow-sm">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="px-2.5 py-1 text-xs font-bold bg-white/30 border border-white/60 rounded-md text-black/60 shadow-sm">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mt-auto">
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold text-black hover:text-blue-600 transition-colors z-20 relative">
                        <ExternalLink className="w-4 h-4" /> Live Site
                      </a>
                    )}
                    {project.repoUrl && project.repoUrl !== "#" && (
                      <a href={project.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold text-black hover:text-purple-600 transition-colors z-20 relative">
                        <GithubIcon className="w-4 h-4" /> Source Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
