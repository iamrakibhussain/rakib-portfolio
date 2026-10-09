"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, ShieldCheck, Zap, GitMerge, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const approaches = [
  {
    id: "01",
    title: "Clean Architecture",
    icon: Network,
    description: "I design systems that can evolve as requirements grow, separating responsibilities and keeping implementations maintainable.",
    checklist: [
      "Modular Architecture",
      "Scalable Database Design",
      "REST API Development"
    ]
  },
  {
    id: "02",
    title: "Security & Reliability",
    icon: ShieldCheck,
    description: "Security is built-in, not bolted on. I protect application data, authentication flows, and user access while handling edge cases.",
    checklist: [
      "Authentication & RBAC",
      "Input Validation",
      "Robust Error Handling"
    ]
  },
  {
    id: "03",
    title: "Performance First",
    icon: Zap,
    description: "I build lightning-fast web applications by avoiding unnecessary complexity, optimizing critical paths, and utilizing modern rendering strategies.",
    checklist: [
      "SSR / SSG / ISR",
      "Next.js App Router",
      "Optimized Data Fetching"
    ]
  },
  {
    id: "04",
    title: "Production & Maintenance",
    icon: GitMerge,
    description: "I focus on real-world maintainability, setting up workflows that test, build, and deploy code securely with seamless collaboration.",
    checklist: [
      "Git & PR Workflows",
      "CI/CD Pipelines",
      "Production Debugging"
    ]
  }
];

export function EngineeringApproach() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 3D Tilt State
  const divRef = useRef<HTMLDivElement>(null);
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
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const multiplier = 6; // Intensity of the tilt
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;
    setTilt({ x: -yPct * multiplier, y: xPct * multiplier });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Auto-Play Logic
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % approaches.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="w-full py-24 md:py-32 relative z-10 overflow-hidden" id="engineering-approach">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black drop-shadow-sm mb-4">
            Engineering Approach
          </h2>
          <p className="text-lg md:text-xl font-bold text-black/70 drop-shadow-sm max-w-2xl">
            Building reliable software is more than just writing code. It requires a disciplined methodology focused on scalability, performance, and security.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
             onMouseEnter={() => setIsPaused(true)}
             onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Left Side: Tabs */}
          <div className="lg:col-span-5 space-y-3 md:space-y-4">
            {approaches.map((item, index) => {
              const isActive = activeTab === index;
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    "w-full text-left p-4 md:p-6 rounded-2xl md:rounded-3xl transition-all duration-300 flex items-center gap-4 md:gap-6 group relative overflow-hidden",
                    isActive 
                      ? "bg-black text-white shadow-xl scale-100 lg:scale-[1.02]" 
                      : "bg-white/40 backdrop-blur-md border border-white/60 text-black hover:bg-white/60 hover:shadow-lg"
                  )}
                >
                  {/* Progress Bar Background */}
                  {isActive && !isPaused && (
                    <motion.div 
                      layoutId="activeTabProgress"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                      className="absolute inset-0 bg-white/10 z-0"
                    />
                  )}
                  {isActive && isPaused && (
                    <div className="absolute inset-0 bg-white/10 z-0 w-full" />
                  )}

                  <div className={cn(
                    "relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300",
                    isActive ? "bg-white/20 text-white" : "bg-white/60 text-black border border-white/80 group-hover:bg-white/80"
                  )}>
                    <Icon className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  
                  <div className="relative z-10">
                    <span className={cn(
                      "text-xs md:text-sm font-black tracking-wider uppercase block mb-1 opacity-60",
                      isActive ? "text-white" : "text-black"
                    )}>
                      Phase {item.id}
                    </span>
                    <h3 className={cn(
                      "text-lg md:text-xl lg:text-2xl font-black drop-shadow-sm",
                      isActive ? "text-white" : "text-black"
                    )}>
                      {item.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Side: Display Box (3D Tilt) */}
          <div className="lg:col-span-7 relative" style={{ perspective: 1000 }}>
            <div 
              ref={divRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: "preserve-3d",
                transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.5s ease-out' : 'none',
              }}
              className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-6 md:p-10 lg:p-12 min-h-[400px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative flex flex-col justify-center will-change-transform"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 w-full h-full flex flex-col justify-center"
                >
                  {/* Huge Background Number */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.04, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute -top-10 -right-4 text-[120px] md:text-[180px] font-black text-black leading-none select-none pointer-events-none"
                  >
                    {approaches[activeTab].id}
                  </motion.div>

                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-6 drop-shadow-sm"
                  >
                    {approaches[activeTab].title}
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="text-lg md:text-xl text-black/80 font-medium leading-relaxed mb-10"
                  >
                    {approaches[activeTab].description}
                  </motion.p>

                  <div className="space-y-4">
                    <motion.h4 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="text-sm font-black uppercase tracking-wider text-black/50 mb-4"
                    >
                      Core Practices
                    </motion.h4>
                    {approaches[activeTab].checklist.map((check, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + (idx * 0.1) }}
                        key={idx} 
                        className="flex items-center gap-3 md:gap-4 bg-white/50 border border-white/60 p-3 md:p-4 rounded-xl shadow-sm hover:scale-[1.02] transition-transform cursor-default"
                      >
                        <CheckCircle2 className="w-5 h-5 text-black shrink-0" />
                        <span className="font-bold text-black text-sm md:text-base">{check}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

