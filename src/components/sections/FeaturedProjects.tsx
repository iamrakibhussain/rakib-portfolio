"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/shared/icons";
import { projects } from "@/data/projects";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

// Interactive 3D Card for Projects
function ProjectCard({ project, isHero = false }: { project: typeof projects[0]; isHero?: boolean }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const [isTouch, setIsTouch] = useState(true);
  useEffect(() => {
    const check = () => setIsTouch(window.matchMedia("(hover: none)").matches || window.innerWidth < 768);
    check(); window.addEventListener('resize', check); return () => window.removeEventListener('resize', check);
  }, []);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    
    // Tilt calculation
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const multiplier = isHero ? 2 : 4; // Subtler tilt for full-width card
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;
    setTilt({ x: -yPct * multiplier, y: xPct * multiplier });
  };

  const handleMouseLeave = () => {
    setIsFocused(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isFocused ? 'none' : 'transform 0.5s ease',
      }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300",
        isHero ? "md:col-span-2 md:flex-row" : "col-span-1"
      )}
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-10 rounded-3xl"
        style={{
          opacity: isFocused ? 1 : 0,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.4), transparent 40%)`,
        }}
      />

      {/* Project Image */}
      <div className={cn(
        "relative overflow-hidden bg-black/5",
        isHero ? "w-full md:w-1/2 aspect-[16/9] md:aspect-auto min-h-[280px] md:min-h-[420px]" : "w-full aspect-[16/9]"
      )}>
        <Image 
          src={project.coverImage || "/images/projects/placeholder.svg"} 
          alt={project.title}
          fill
          sizes={isHero ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Metric Badge */}
        {project.results && (
          <div className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/60 shadow-lg flex items-center">
            <span className="text-xs font-bold text-black drop-shadow-sm">{project.results}</span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className={cn(
        "flex flex-col flex-grow p-6 relative z-20",
        isHero ? "md:w-1/2 md:p-8 md:justify-center" : "w-full"
      )}>
        <div className="mb-4">
          <span className="text-xs font-black tracking-wider text-black/50 uppercase mb-2 block">{project.role}</span>
          <h3 className={cn(
            "font-black text-black leading-tight drop-shadow-sm",
            isHero ? "text-2xl sm:text-3xl md:text-3xl" : "text-2xl"
          )}>
            {project.title}
          </h3>
        </div>
        
        <p className="text-black/80 font-medium leading-relaxed mb-6 flex-grow">
          {project.summary}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.technologies.slice(0, isHero ? 8 : 6).map((tag, idx) => (
            <span key={idx} className="px-3 py-1 bg-white/50 border border-white/60 rounded-full text-xs font-bold text-black shadow-sm">
              {tag}
            </span>
          ))}
          {project.technologies.length > (isHero ? 8 : 6) && (
            <span className="px-2.5 py-1 text-xs font-bold bg-white/30 border border-white/60 rounded-full text-black/60 shadow-sm">
              +{project.technologies.length - (isHero ? 8 : 6)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-black/10">
          {project.liveUrl && project.liveUrl !== "#" ? (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center flex-1 h-12 rounded-xl bg-black text-white font-bold text-sm shadow-xl hover:scale-105 hover:bg-black/90 transition-all duration-300 group/btn"
            >
              <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
              Live Demo
            </a>
          ) : (
            <Link 
              href={`/projects/${project.slug}`} 
              className="flex items-center justify-center flex-1 h-12 rounded-xl bg-black text-white font-bold text-sm shadow-xl hover:scale-105 hover:bg-black/90 transition-all duration-300 group/btn"
            >
              <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
              Case Study
            </Link>
          )}

          {project.repoUrl && project.repoUrl !== "#" ? (
            <a 
              href={project.repoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label={`View ${project.title} on GitHub`}
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/50 border border-white/60 text-black shadow-lg hover:scale-105 hover:bg-white/70 transition-all duration-300"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
          ) : (
            <Link 
              href={`/projects/${project.slug}`}
              aria-label={`View ${project.title} case study`}
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/50 border border-white/60 text-black shadow-lg hover:scale-105 hover:bg-white/70 transition-all duration-300"
            >
              <GithubIcon className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export function FeaturedProjects() {
  const featuredOnly = projects.filter(p => p.featured).slice(0, 3);

  return (
    <section className="w-full py-24 md:py-32 relative z-10 overflow-hidden">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black drop-shadow-sm mb-4">
            Featured Work
          </h2>
          <p className="text-lg md:text-xl font-bold text-black/70 drop-shadow-sm">
            Real-world solutions built with modern web architectures. A selection of projects focused on scalable systems and user-centric design.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {featuredOnly.map((project, index) => (
            <ProjectCard key={project.slug} project={project} isHero={index === 0} />
          ))}
        </div>

        {/* Bottom CTA to View All Projects */}
        <div className="mt-14 md:mt-16 flex flex-col items-center justify-center text-center">
          <Link
            href="/projects"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-black text-white font-bold text-base shadow-2xl hover:scale-105 hover:bg-black/90 transition-all duration-300"
          >
            <span>Explore All Projects ({projects.length})</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <p className="mt-3 text-sm font-semibold text-black/60">
            Browse full archive, case studies, and specialized systems
          </p>
        </div>

      </div>
    </section>
  );
}
