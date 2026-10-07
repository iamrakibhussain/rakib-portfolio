"use client";

import { Code2, Database, Server, Blocks } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useRef, ReactNode } from "react";

interface Skill {
  title: string;
  description: string;
  icon: ReactNode;
  tags: string[];
  className?: string;
}

// Individual Bento Card with Spotlight Effect
function BentoCard({ skill, index }: { skill: Skill; index: number }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    
    // Spotlight position
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });

    // Tilt calculation
    const multiplier = 4;
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;
    setTilt({ x: -yPct * multiplier, y: xPct * multiplier });
  };

  const handleMouseLeave = () => {
    setIsFocused(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      style={{ perspective: 1000 }}
      className={cn("group h-full", skill.className)}
    >
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
          transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.5s ease-out' : 'none',
        }}
        className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] will-change-transform"
      >
        {/* Spotlight Effect */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-10 rounded-3xl"
          style={{
            opacity: isFocused ? 1 : 0,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.4), transparent 40%)`,
          }}
        />
      
      <div className="relative z-20">
        <div className="w-14 h-14 rounded-2xl bg-white/60 flex items-center justify-center text-black border border-white/80 shadow-sm mb-6 group-hover:scale-110 group-hover:bg-white/80 transition-all duration-500">
          {skill.icon}
        </div>
        <h3 className="text-2xl font-black text-black leading-tight drop-shadow-sm mb-3">
          {skill.title}
        </h3>
        <p className="text-black/80 font-medium leading-relaxed">
          {skill.description}
        </p>
      </div>

      <div className="relative z-20 flex flex-wrap gap-2 mt-8">
        {skill.tags.map((tag: string) => (
          <span
            key={tag}
            className="px-3 py-1 bg-white/50 border border-white/60 rounded-full text-xs font-bold text-black shadow-sm group-hover:bg-white/70 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
      </div>
    </motion.div>
  );
}

export function Expertise() {
  const skills = [
    {
      title: "Frontend Engineering",
      description: "Building responsive, accessible, and performant user interfaces with modern React ecosystems.",
      icon: <Code2 className="w-6 h-6" />,
      tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
      className: "md:col-span-2 md:row-span-1",
    },
    {
      title: "Backend & Systems",
      description: "Designing scalable APIs and microservices with secure data flows.",
      icon: <Server className="w-6 h-6" />,
      tags: ["Node.js", "Express", "REST", "GraphQL"],
      className: "md:col-span-1 md:row-span-2",
    },
    {
      title: "Database Architecture",
      description: "Modeling complex data structures and optimizing queries for high-volume reads and writes.",
      icon: <Database className="w-6 h-6" />,
      tags: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
      className: "md:col-span-1 md:row-span-1",
    },
    {
      title: "Modern Architecture",
      description: "Leveraging the latest architectural patterns for fast global delivery.",
      icon: <Blocks className="w-6 h-6" />,
      tags: ["Serverless", "Edge Computing", "Micro-frontends"],
      className: "md:col-span-1 md:row-span-1",
    }
  ];

  return (
    <section className="w-full py-24 md:py-32 relative z-10 overflow-hidden">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black drop-shadow-sm">
            Technical Arsenal
          </h2>
          <p className="text-lg md:text-xl font-bold text-black/70 drop-shadow-sm max-w-2xl">
            A comprehensive toolkit designed for building scalable, high-performance web applications from the ground up.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[300px]">
          {skills.map((skill, i) => (
            <BentoCard key={i} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
