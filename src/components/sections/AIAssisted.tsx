"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, GitPullRequest, Sparkles, Code2, Terminal, MousePointer2 } from "lucide-react";

const aiTools = ["Gemini Pro Agent", "Antigravity", "Cursor AI", "GitHub Copilot", "ChatGPT-4", "Claude 3.5", "Gemini Pro Agent", "Antigravity", "Cursor AI", "GitHub Copilot", "ChatGPT-4", "Claude 3.5"];

const badCode = `// legacy_fetch.js
function getData(cb) {
  var data = null;
  var req = new XMLHttpRequest();
  req.open("GET", "/api/v1/users", true);
  req.onload = function() {
    if(req.status == 200) {
      data = JSON.parse(req.responseText);
      cb(null, data);
    } else {
      cb("Error!");
    }
  }
  req.send();
}`;

const goodCode = `// optimized_fetch.ts
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const res = await fetch("/api/v1/users", {
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error("Fetch failed");
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};`;

export function AIAssisted() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  // 3D Tilt for Terminal
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
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;
    setTilt({ x: -yPct * 4, y: xPct * 4 });
  };

  return (
    <section className="w-full py-24 md:py-32 relative z-10 overflow-hidden" ref={containerRef}>
      
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [-30, 30, -30], y: [-30, 30, -30] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/30 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ x: [30, -30, 30], y: [30, -30, 30] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/20 rounded-full blur-[100px]"
        />
      </div>

      <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center mb-16 space-y-4 relative"
        >
          {/* Fake AI Cursor roaming around */}
          {isInView && (
            <motion.div
              initial={{ x: 0, y: 100, opacity: 0 }}
              animate={{ 
                x: [0, 150, -100, 50, 0], 
                y: [100, -50, 20, 80, 100],
                opacity: [0, 1, 1, 1, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute z-50 pointer-events-none flex flex-col items-center"
            >
              <MousePointer2 className="w-6 h-6 text-black fill-black -rotate-12" />
              <div className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg mt-1 tracking-wider whitespace-nowrap">
                AI Agent
              </div>
            </motion.div>
          )}

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-white/60 shadow-sm backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-black" />
            <span className="text-sm font-black text-black uppercase tracking-wider">AI-Augmented Engineering</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black drop-shadow-sm">
            Code Morphing. <br className="hidden md:block" /> Perfect Execution.
          </h2>
          <p className="text-lg md:text-xl font-bold text-black/70 drop-shadow-sm max-w-3xl">
            Watch how legacy spaghetti code is instantly scanned, refactored, and optimized into production-ready architecture using Advanced AI integration.
          </p>
        </motion.div>

        {/* Marquee Infinite AI Tools */}
        <div className="w-full overflow-hidden mb-16 relative mask-image-fade">
          <motion.div
            animate={{ x: [0, -1035] }} // Adjust based on content width
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex gap-8 whitespace-nowrap"
          >
            {aiTools.map((tool, idx) => (
              <div key={idx} className="flex items-center gap-2 text-black/40 font-black text-2xl uppercase tracking-widest">
                <Sparkles className="w-6 h-6" />
                {tool}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Code Morphing Terminal */}
          <div className="lg:col-span-7 relative" style={{ perspective: 1000 }}>
            <div 
              ref={divRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: "preserve-3d",
                transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.5s ease-out' : 'none',
              }}
              className="bg-black/5 backdrop-blur-2xl border border-white/60 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] relative will-change-transform"
            >
              {/* Terminal Header */}
              <div className="bg-white/40 border-b border-white/40 p-4 flex items-center gap-2 relative z-20">
                <div className="w-3 h-3 rounded-full bg-black/20" />
                <div className="w-3 h-3 rounded-full bg-black/20" />
                <div className="w-3 h-3 rounded-full bg-black/20" />
                <div className="ml-4 flex items-center gap-2 text-black/60 text-xs font-bold font-mono tracking-wider">
                  <Terminal className="w-3 h-3" /> refactor_agent.ts
                </div>
              </div>

              {/* Terminal Body: Code Morphing */}
              <div className="relative h-[350px] p-6 text-sm font-mono leading-relaxed overflow-hidden">
                
                {/* Bad Code (Bottom Layer) */}
                <div className="absolute inset-0 p-6 text-black/40 whitespace-pre">
                  {badCode}
                </div>

                {/* Good Code (Top Layer, Clipped by Laser) */}
                {isInView && (
                  <motion.div 
                    initial={{ clipPath: "inset(0 0 100% 0)" }}
                    animate={{ clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)", "inset(0 0 0% 0)"] }}
                    transition={{ duration: 4, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
                    className="absolute inset-0 p-6 text-black font-bold whitespace-pre bg-white/20 backdrop-blur-sm"
                  >
                    {goodCode}
                  </motion.div>
                )}

                {/* Laser Scanner Line */}
                {isInView && (
                  <motion.div
                    initial={{ top: "0%" }}
                    animate={{ top: ["0%", "100%", "100%"] }}
                    transition={{ duration: 4, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
                    className="absolute left-0 right-0 h-1 bg-black shadow-[0_0_15px_rgba(0,0,0,0.5)] z-30"
                  >
                    {/* Glowing Scanner Box attached to laser */}
                    <div className="absolute -top-10 left-0 right-0 h-10 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Badges with Holographic Hover */}
          <div className="lg:col-span-5 grid gap-4">
            
            {[
              { icon: Zap, title: "10x Development Speed", desc: "Generating boilerplate, writing tests, and scaffolding architectures in seconds rather than hours." },
              { icon: GitPullRequest, title: "Automated Refactoring", desc: "Upgrading codebases, improving maintainability, and implementing multi-file features efficiently." },
              { icon: Code2, title: "Code Review & Debugging", desc: "Intelligent code reviews catch edge-cases, resolve complex bugs, and fix performance bottlenecks." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group relative bg-white/40 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-sm hover:shadow-lg transition-all overflow-hidden cursor-default"
              >
                {/* Holographic Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                
                <div className="relative z-10 flex items-start gap-4">
                  <div className="p-3 bg-white/60 rounded-xl text-black border border-white/80 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-black mb-1">{feature.title}</h3>
                    <p className="text-black/80 font-medium text-sm md:text-base leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}

          </div>

        </div>
      </div>

      <style jsx global>{`
        .mask-image-fade {
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </section>
  );
}

