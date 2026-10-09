"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FadeIn } from "@/components/shared/FadeIn";
import { skills } from "@/data/skills";
import { 
  Cpu, Code2, ShieldCheck, Zap, MapPin, Bot, Server, Globe, Sparkles
} from "lucide-react";

const DotPattern = () => (
  <div className="absolute inset-0 pointer-events-none z-0" 
       style={{
         backgroundImage: 'radial-gradient(circle at center, rgba(0,0,0,0.1) 1px, transparent 1px)',
         backgroundSize: '24px 24px'
       }} 
  />
);

const MagneticPill = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

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



export function AboutClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const yParallaxDesktop = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yParallaxFastDesktop = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  const yParallax = isMobile ? 0 : yParallaxDesktop;
  const yParallaxFast = isMobile ? 0 : yParallaxFastDesktop;

  return (
    <div ref={containerRef} className="min-h-screen py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
      <DotPattern />

      {/* 1. HERO SECTION */}
      <div className="max-w-7xl mx-auto mb-16 md:mb-24 relative z-10 text-center flex flex-col items-center">
        
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8 p-4 bg-white/30 backdrop-blur-md rounded-3xl border border-white/50 shadow-xl"
        >
          <Code2 className="w-12 h-12 text-black/80" />
        </motion.div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-black tracking-tight leading-none mb-6">
          <RevealText text="THE ENGINEER" />
          <br className="hidden md:block"/>
          <motion.span 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-black inline-block mt-2"
          >
            BEHIND THE CODE
          </motion.span>
        </h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-lg md:text-2xl font-bold text-black/60 max-w-3xl mx-auto"
        >
          Bridging the gap between exceptional user interfaces and scalable, robust backend architectures.
        </motion.p>
      </div>

      {/* 2. BENTO GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        
        <motion.div style={{ y: yParallax }} className="md:col-span-2">
          <div className="h-full bg-white/30 backdrop-blur-xl border border-white/60 shadow-lg rounded-3xl p-8 hover:bg-white/40 transition-colors group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
            
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Code2 className="w-6 h-6 text-black" />
              </div>
              <h2 className="text-2xl font-black text-black">Who I Am</h2>
            </div>
            <p className="text-lg md:text-xl font-medium text-black/80 leading-relaxed mb-6 relative z-10">
              I&apos;m a Full-Stack Developer with 2+ years of hands-on experience building modern web applications and working across the JavaScript/TypeScript ecosystem. I work across the complete development lifecycle â€” from responsive user interfaces to database design, authentication, security, and ongoing maintenance.
            </p>
            <p className="text-lg font-medium text-black/70 leading-relaxed relative z-10">
              I believe that writing code machines can understand is easy; writing code humans can understand is professional.
            </p>
          </div>
        </motion.div>

        <motion.div style={{ y: yParallaxFast }}>
          <div className="h-full bg-black text-white rounded-3xl p-8 overflow-hidden relative group shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <MapPin className="w-8 h-8 text-white mb-4 group-hover:-translate-y-1 transition-transform" />
                <h2 className="text-2xl font-black mb-2">Location</h2>
                <p className="text-white/70 font-medium">Remote / Global</p>
              </div>
              <div className="mt-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                  <span className="text-sm font-bold tracking-wide">Available for Work</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div style={{ y: yParallaxFast }} className="md:col-span-1">
          <div className="h-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg rounded-3xl p-8 relative overflow-hidden group hover:shadow-xl transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="absolute inset-0 ring-1 ring-inset ring-white/50 rounded-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-black rounded-2xl group-hover:rotate-12 transition-transform duration-300">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-black text-black">AI-Assisted</h2>
              </div>
              <p className="text-black/70 font-medium mb-6">
                I leverage engineering assistants for architecture planning, refactoring, and code generation.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Gemini Pro Agent", "Antigravity", "Cursor AI", "Copilot"].map((tool) => (
                  <span key={tool} className="px-3 py-1 rounded-lg bg-black/5 border border-black/5 text-black font-bold text-sm shadow-sm backdrop-blur-md">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div style={{ y: yParallax }} className="md:col-span-2">
          <div className="h-full bg-white/30 backdrop-blur-xl border border-white/60 shadow-lg rounded-3xl p-8 group relative overflow-hidden hover:bg-white/40 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:-translate-y-1 transition-transform duration-300">
                <Cpu className="w-6 h-6 text-black" />
              </div>
              <h2 className="text-2xl font-black text-black">Engineering Approach</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
              <div className="space-y-2 group/item hover:bg-white/50 p-3 rounded-xl transition-colors">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-black group-hover/item:text-purple-600 transition-colors" />
                  <h3 className="font-bold text-black">Security & Reliability</h3>
                </div>
                <p className="text-sm font-medium text-black/70">Built-in protection for data & auth flows. Robust error handling.</p>
              </div>
              
              <div className="space-y-2 group/item hover:bg-white/50 p-3 rounded-xl transition-colors">
                <div className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-black group-hover/item:text-blue-600 transition-colors" />
                  <h3 className="font-bold text-black">Clean Architecture</h3>
                </div>
                <p className="text-sm font-medium text-black/70">Separating responsibilities and keeping systems maintainable.</p>
              </div>
              
              <div className="space-y-2 group/item hover:bg-white/50 p-3 rounded-xl transition-colors">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-black group-hover/item:text-amber-500 transition-colors" />
                  <h3 className="font-bold text-black">Performance First</h3>
                </div>
                <p className="text-sm font-medium text-black/70">Optimized critical paths and modern rendering strategies.</p>
              </div>

              <div className="space-y-2 group/item hover:bg-white/50 p-3 rounded-xl transition-colors">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-black group-hover/item:text-green-600 transition-colors" />
                  <h3 className="font-bold text-black">Production Focus</h3>
                </div>
                <p className="text-sm font-medium text-black/70">CI/CD, environment config, and real-world maintainability.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. TECHNICAL SKILLS SHOWCASE */}
      <div className="max-w-7xl mx-auto mt-24 relative z-10">
        <FadeIn>
          <div className="text-center mb-12 flex flex-col items-center">
            <Sparkles className="w-8 h-8 text-black/40 mb-4" />
            <h2 className="text-3xl md:text-5xl font-black text-black tracking-tight">Technical Arsenal</h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skillGroup, index) => (
            <FadeIn key={skillGroup.category} delay={0.2 + (index * 0.1)}>
              <div className="bg-white/40 backdrop-blur-xl border border-white/60 shadow-sm hover:shadow-xl transition-all duration-500 rounded-3xl p-6 h-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <h3 className="font-black text-lg text-black mb-6 uppercase tracking-wider relative z-10">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {skillGroup.items.map((skill) => (
                    <MagneticPill key={skill}>
                      <span className="block px-3 py-1.5 bg-black/5 border border-black/10 hover:bg-black hover:text-white hover:border-black transition-colors duration-300 rounded-xl text-sm font-bold text-black/80">
                        {skill}
                      </span>
                    </MagneticPill>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
