"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Experience } from "@/types";
import { Briefcase, CheckCircle2, FileText, Send, Sparkles } from "lucide-react";
import Link from "next/link";
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
            transition={{ type: "spring", damping: 12, stiffness: 100, delay: i * 0.1 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export function ExperienceClient({ experiences }: { experiences: Experience[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Track overall scroll progress for the timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 relative overflow-hidden" ref={containerRef}>
      <DotPattern />

      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-24 relative z-10 text-center flex flex-col items-center">
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8 p-4 bg-black/5 rounded-2xl border border-black/10 backdrop-blur-md relative"
        >
          {/* Floating tech nodes around the icon */}
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 -m-4 border border-black/5 rounded-full border-dashed pointer-events-none" 
          />
          <Briefcase className="w-10 h-10 text-black/80" />
        </motion.div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-black tracking-tight leading-none mb-6 uppercase">
          <RevealText text="Professional" />
          <br className="hidden md:block"/>
          <motion.span 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-black inline-block mt-2"
          >
            Journey
          </motion.span>
        </h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-lg md:text-2xl font-bold text-black/60 max-w-2xl mx-auto"
        >
          Building reliable, secure, and scalable production systems.
        </motion.p>
      </div>

      {/* TIMELINE SECTION */}
      <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row gap-8">
        
        {/* Timeline Indicator (Desktop) */}
        <div className="hidden md:flex flex-col items-center ml-4 mr-8 relative w-4">
          <div className="absolute top-0 bottom-0 w-1 bg-black/10 rounded-full" />
          <motion.div 
            className="absolute top-0 bottom-0 w-1 bg-black rounded-full origin-top"
            style={{ scaleY }}
          />
        </div>

        {/* Experience Cards */}
        <div className="flex-1 flex flex-col gap-12 md:gap-24 pb-24 relative">
          {experiences.map((exp, index) => {
            // Check if this card should be dimmed (another card is hovered)
            const isDimmed = hoveredIndex !== null && hoveredIndex !== index;
            const isHovered = hoveredIndex === index;

            return (
              <div key={exp.id} className="relative flex items-center group/timeline">
                {/* Glowing Node on Timeline */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={cn(
                    "hidden md:flex absolute -left-[54px] w-6 h-6 rounded-full border-4 border-white bg-black items-center justify-center transition-all duration-300 z-20",
                    isHovered ? "shadow-[0_0_15px_rgba(0,0,0,0.5)] scale-125" : "shadow-md"
                  )}
                >
                  <div className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    isHovered ? "bg-white animate-pulse" : "bg-black"
                  )} />
                </motion.div>

                {/* Card Container */}
                <div className="flex-1 w-full relative">
                  <ExperienceCard 
                    experience={exp} 
                    index={index} 
                    isDimmed={isDimmed}
                    onHover={() => setHoveredIndex(index)}
                    onLeave={() => setHoveredIndex(null)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto relative z-10 mt-12 bg-black/5 border border-black/10 rounded-3xl p-8 md:p-12 text-center flex flex-col items-center backdrop-blur-xl"
      >
        <h2 className="text-3xl md:text-4xl font-black mb-4">Let's build something amazing together.</h2>
        <p className="text-black/60 font-medium mb-8 max-w-xl">
          I'm currently open to new opportunities and exciting projects. Let's talk about how I can bring value to your team.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/contact" className="group px-8 py-4 bg-black text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
            Get In Touch
            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
          <a href="/resume.pdf" target="_blank" className="group px-8 py-4 bg-white text-black border border-black/10 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-black/5 transition-colors">
            Download Resume
            <FileText className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

function ExperienceCard({ 
  experience, 
  index,
  isDimmed,
  onHover,
  onLeave
}: { 
  experience: Experience; 
  index: number;
  isDimmed: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse position for Spotlight
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Spotlight variables
    cardRef.current.style.setProperty("--x", `${x}px`);
    cardRef.current.style.setProperty("--y", `${y}px`);

    // 3D Tilt calculations
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (-5 to 5 degrees)
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    onLeave();
    if (!cardRef.current) return;
    // Reset transform on leave
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", bounce: 0.3 }}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ transformStyle: "preserve-3d" }}
      className={cn(
        "group relative bg-white/60 backdrop-blur-xl border border-black/10 rounded-3xl p-6 md:p-10 transition-all duration-500 overflow-hidden",
        isDimmed ? "opacity-40 blur-[2px] scale-[0.98]" : "opacity-100",
        // Soft shadow is default, intense shadow added via hover in the JS transform
        "shadow-lg"
      )}
    >
      {/* Glare Effect on Hover */}
      <div 
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-overlay"
        style={{
          background: "radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.8) 0%, transparent 50%)",
        }}
      />

      {/* Spotlight Background */}
      <div 
        className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(800px circle at var(--x, 0px) var(--y, 0px), rgba(0,0,0,0.03), transparent 40%)",
        }}
      />

      {/* Content slightly raised in 3D */}
      <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/5 rounded-full text-sm font-bold text-black/60 mb-4">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {experience.startDate} — {experience.endDate || "Present"}
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-black mb-1 flex items-center gap-2">
              {experience.role}
              {/* Optional tiny sparkle that only shows on hover */}
              <Sparkles className="w-5 h-5 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <h4 className="text-lg font-bold text-black/50">
              {experience.company}
            </h4>
          </div>
        </div>

        <ul className="space-y-4 mb-8">
          {experience.description.map((desc, i) => (
            <motion.li 
              key={i} 
              className="flex items-start gap-3 text-black/70 font-medium leading-relaxed"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
              viewport={{ once: true }}
            >
              <CheckCircle2 className="w-5 h-5 text-black/40 shrink-0 mt-0.5 group-hover:text-black/70 transition-colors" />
              <span>{desc}</span>
            </motion.li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {experience.technologies.map(tech => (
            <span 
              key={tech} 
              className="px-3 py-1.5 text-xs font-bold bg-white border border-black/10 rounded-lg text-black/80 shadow-sm transition-colors group-hover:border-black/30 group-hover:bg-black/5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
