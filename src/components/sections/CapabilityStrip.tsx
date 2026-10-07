"use client";

import React, { useRef, useState } from "react";
import { Bot, Layers, ShieldCheck, Code2, Database, Workflow, Terminal, Server } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";
import { cn } from "@/lib/utils";

const marqueeItems = [
  { name: "TypeScript", icon: Code2, color: "#3178C6" },
  { name: "JavaScript", icon: Code2, color: "#bda700" },
  { name: "React", icon: Layers, color: "#00b2e3" },
  { name: "Next.js", icon: Layers, color: "#000000" },
  { name: "Node.js", icon: Server, color: "#339933" },
  { name: "Express.js", icon: Server, color: "#000000" },
  { name: "PostgreSQL", icon: Database, color: "#336791" },
  { name: "MongoDB", icon: Database, color: "#47A248" },
  { name: "Prisma", icon: Database, color: "#0C344B" },
  { name: "Tailwind CSS", icon: Layers, color: "#06B6D4" },
  { name: "REST APIs", icon: Workflow, color: "#ff5722" },
  { name: "CI/CD", icon: Terminal, color: "#d9230f" },
];

// Interactive 3D Tilt & Spotlight Card
function BentoCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    
    // Spotlight position
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    
    // Tilt calculation
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const multiplier = 10; // Max tilt in degrees (kept subtle for professionalism)
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;
    
    setTilt({
      x: -yPct * multiplier,
      y: xPct * multiplier,
    });
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
        "relative h-full overflow-hidden rounded-3xl border border-white/60 bg-white/40 shadow-2xl backdrop-blur-2xl transition-colors",
        className
      )}
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-0"
        style={{
          opacity: isFocused ? 1 : 0,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.6), transparent 40%)`,
        }}
      />
      
      {/* Inner highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none z-0"></div>

      {/* Content Container */}
      <div className="relative z-10 h-full p-8 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
}

export function CapabilityStrip() {
  return (
    <section className="w-full overflow-hidden flex flex-col relative z-10">
      {/* Infinite Marquee Section */}
      <div className="w-full overflow-hidden border-y border-white/60 bg-white/30 backdrop-blur-md py-5 flex marquee-container cursor-default">
        <div className="flex w-max animate-marquee">
          <div className="flex">
            {marqueeItems.map((item, idx) => (
              <div key={`m1-${idx}`} className="flex items-center space-x-2 mx-8 group cursor-default">
                <item.icon className="h-6 w-6 transition-transform group-hover:scale-110" style={{ color: item.color }} />
                <span className="text-base md:text-lg font-bold tracking-wider uppercase text-black/80 group-hover:text-black transition-colors">{item.name}</span>
                <span className="mx-8 text-black/20">•</span>
              </div>
            ))}
          </div>
          <div className="flex">
            {marqueeItems.map((item, idx) => (
              <div key={`m2-${idx}`} className="flex items-center space-x-2 mx-8 group cursor-default">
                <item.icon className="h-6 w-6 transition-transform group-hover:scale-110" style={{ color: item.color }} />
                <span className="text-base md:text-lg font-bold tracking-wider uppercase text-black/80 group-hover:text-black transition-colors">{item.name}</span>
                <span className="mx-8 text-black/20">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expertise Bento Cards */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-black drop-shadow-sm mb-4">Core Capabilities</h2>
            <p className="text-black/70 max-w-2xl mx-auto text-lg font-bold">
              Building production-ready software with a focus on reliability, maintainability, and modern engineering practices.
            </p>
          </div>
        </FadeIn>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 lg:gap-8">
          
          {/* Card 1: Full-Stack (Wide) */}
          <FadeIn delay={0.1} className="md:col-span-2">
            <BentoCard>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 h-full">
                <div className="bg-white w-16 h-16 rounded-2xl flex shrink-0 items-center justify-center border border-white/50 shadow-sm">
                  <Layers className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-black mb-2">Full-Stack Architecture</h3>
                  <p className="text-black/80 font-bold leading-relaxed text-lg">
                    Scalable and production-ready web applications using the <strong className="text-black">React, Next.js, and Node.js</strong> ecosystem. Over 2+ years of hands-on experience building seamless user interfaces and robust APIs.
                  </p>
                </div>
              </div>
            </BentoCard>
          </FadeIn>

          {/* Card 2: Security & DB (Tall) */}
          <FadeIn delay={0.2} className="md:col-span-1 md:row-span-2">
            <BentoCard>
              <div className="flex flex-col h-full">
                <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-white/50 shadow-sm">
                  <ShieldCheck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-black text-black mb-4">Secure Backend & Data</h3>
                <p className="text-black/80 font-bold leading-relaxed mb-8 text-lg flex-grow">
                  Optimized database design and highly secure REST APIs ensuring data integrity and system reliability.
                </p>
                
                {/* Tech Badges for the tall card */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {["PostgreSQL", "Prisma", "JWT Auth", "RBAC", "MongoDB"].map(tech => (
                    <span key={tech} className="bg-black/10 text-black px-3 py-1.5 rounded-lg text-sm font-bold border border-black/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </BentoCard>
          </FadeIn>

          {/* Card 3: AI Workflow (Wide) */}
          <FadeIn delay={0.3} className="md:col-span-2">
            <BentoCard>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 h-full">
                <div className="bg-white w-16 h-16 rounded-2xl flex shrink-0 items-center justify-center border border-white/50 shadow-sm">
                  <Bot className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-black mb-2">AI-Powered Workflow</h3>
                  <p className="text-black/80 font-bold leading-relaxed text-lg">
                    Super-fast development, complex debugging, and clean code architecture leveraging modern AI agents like <strong className="text-black">Gemini Pro</strong> and <strong className="text-black">Antigravity</strong>.
                  </p>
                </div>
              </div>
            </BentoCard>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
