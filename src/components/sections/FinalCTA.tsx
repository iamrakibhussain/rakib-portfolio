"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Magnetic Button Wrapper
const MagneticWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Magnetic pull limits
    x.set((clientX - centerX) * 0.2);
    y.set((clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: mouseX, y: mouseY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("w-fit z-50", className)}
    >
      {children}
    </motion.div>
  );
};

export function FinalCTA() {
  const [copied, setCopied] = useState(false);
  
  // Interactive background spotlight state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const spotlightY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    // Center the spotlight exactly on the cursor relative to the section
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("alrokib44@gmail.com"); 
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // WhatsApp connection link
  const whatsappNumber = "8801615992906"; 
  const whatsappMessage = encodeURIComponent("Hi Rakib! Let's build something extraordinary together.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] flex flex-col items-center justify-between pt-24 pb-12 overflow-hidden selection:bg-black selection:text-white"
    >
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-50 -z-30" />
      
      {/* Interactive Spotlight */}
      <motion.div 
        style={{ left: spotlightX, top: spotlightY }}
        className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-gray-200 via-gray-100 to-white rounded-full blur-[100px] opacity-70 -z-20 pointer-events-none"
      />
      
      {/* Default pulse in center (fallback/layered) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-white rounded-full blur-[120px] opacity-40 -z-20 animate-pulse" 
        style={{ animationDuration: '4s' }}
      />
      
      {/* Top spacing & Content */}
      <div className="flex-1 w-full flex items-center justify-center relative">
        
        {/* Floating Orbs (Socials) */}
        <div className="absolute w-full max-w-5xl h-full inset-0 mx-auto pointer-events-none hidden md:block z-20">
           <motion.a
             href="https://github.com/iamrakibhussain"
             target="_blank"
             rel="noreferrer"
             animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 5, 0] }}
             transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
             className="absolute top-[15%] left-[5%] pointer-events-auto p-5 bg-white/60 backdrop-blur-2xl border border-white/80 rounded-full shadow-xl hover:shadow-2xl hover:bg-white/90 hover:scale-110 transition-all group"
           >
             <GithubIcon className="w-8 h-8 text-black" />
           </motion.a>

           <motion.a
             href="https://www.linkedin.com/in/rakibhussain313/"
             target="_blank"
             rel="noreferrer"
             animate={{ y: [0, 20, 0], x: [0, -10, 0], rotate: [0, -5, 0] }}
             transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
             className="absolute bottom-[25%] right-[5%] pointer-events-auto p-5 bg-white/60 backdrop-blur-2xl border border-white/80 rounded-full shadow-xl hover:shadow-2xl hover:bg-white/90 hover:scale-110 transition-all group"
           >
             <LinkedinIcon className="w-8 h-8 text-black" />
           </motion.a>
        </div>

        {/* Main Glass Card */}
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full max-w-4xl mx-auto px-6"
        >
          <div className="relative bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[3rem] p-12 md:p-20 shadow-2xl overflow-hidden flex flex-col items-center text-center">
            
            {/* Inner Glow to make it pop */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-white/80 blur-[80px] rounded-full pointer-events-none" />

            {/* Availability Pulse */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/60 backdrop-blur-md rounded-full border border-white/80 shadow-sm mb-10">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500"></span>
              </span>
              <span className="text-sm font-semibold text-black">Available for instant chat</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-black tracking-tight leading-[1.05] mb-8">
              Let&apos;s Craft Your <br className="hidden md:block" /> Next Big Thing.
            </h2>
            
            <p className="text-lg md:text-2xl text-black/70 max-w-2xl mx-auto mb-12 font-medium">
              Ready to start? Drop me a message on WhatsApp for the fastest response, or copy my email if you prefer.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full sm:w-auto gap-4 sm:gap-6 z-50">
              <MagneticWrapper className="w-full sm:w-fit">
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex justify-center items-center gap-3 w-full px-8 py-5 bg-black text-white rounded-full font-bold text-lg md:text-xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.2)] hover:shadow-[0_0_60px_rgba(0,0,0,0.4)] transition-all active:scale-95"
                >
                  <span className="relative z-10">Chat on WhatsApp</span>
                  <WhatsAppIcon className="relative z-10 w-6 h-6 group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-[#25D366] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
                </a>
              </MagneticWrapper>

              <MagneticWrapper className="w-full sm:w-fit">
                <button 
                  onClick={handleCopyEmail}
                  className="group relative flex items-center justify-center min-w-[200px] w-full px-8 py-5 bg-white/70 hover:bg-white text-black border-2 border-white/80 hover:border-white rounded-full font-bold text-lg md:text-xl shadow-lg transition-all active:scale-95"
                >
                  {copied ? (
                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-2 text-green-600">
                      <Check className="w-6 h-6" />
                      <span>Copied!</span>
                    </motion.div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Copy className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      <span>Copy Email</span>
                    </div>
                  )}
                </button>
              </MagneticWrapper>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
