"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Interactive 3D Tilt & Spotlight Box for Hero Elements
function TiltBox({ children, className }: { children: React.ReactNode; className?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(hover: none)").matches || window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isMobile) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    
    // Spotlight position
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    
    // Tilt calculation
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const multiplier = 6; // Subtle tilt
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
        "relative overflow-hidden transition-colors",
        className
      )}
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-0"
        style={{
          opacity: isFocused ? 1 : 0,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.7), transparent 40%)`,
        }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}

// 3D Mouse Parallax for the Profile Image
function ParallaxImage({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Listen to window mouse move for a better global parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const xPct = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const yPct = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
      
      // Move slightly opposite to the mouse
      mouseX.set(xPct * -20);
      mouseY.set(yPct * -20);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative w-full h-full flex justify-center items-end">
      {/* Ambient Backlight for the Cutout to pop against the Aurora, with slow pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-white/40 rounded-full blur-[60px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '4s' }}></div>

      {/* The image container that shifts based on mouse position */}
      <motion.div 
        className="w-full h-full flex justify-center items-end z-10"
        style={{ x, y }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="w-full min-h-[calc(100vh-4rem)] relative flex items-center justify-center overflow-visible lg:overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        {/* Text Content */}
        <div className="flex flex-col justify-center space-y-8 text-left order-2 lg:order-1 pt-8 pb-16 lg:py-24">
          <div className="space-y-4">
            <FadeIn>
              <TiltBox className="inline-flex items-center rounded-full border border-white/60 bg-white/40 backdrop-blur-xl px-5 py-2 text-sm font-bold text-black mb-2 shadow-xl hover:bg-white/50">
                <span className="flex h-2 w-2 rounded-full bg-green-600 mr-2.5 animate-pulse shadow-[0_0_8px_rgba(22,163,74,0.8)]"></span>
                Available for new opportunities
              </TiltBox>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-black">
                <span className="block drop-shadow-sm">Hi, I&apos;m</span>
                <span className="block drop-shadow-sm">Rakib Hussain</span>
              </h1>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <TiltBox className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-2xl p-6 shadow-2xl hover:bg-white/50">
              <p className="text-black/90 md:text-lg lg:text-xl leading-relaxed relative z-10 font-bold drop-shadow-sm">
                Full-Stack Developer specializing in JavaScript, TypeScript, and
                modern web architectures. Building scalable, production-ready
                applications with a focus on performance and clean code.
              </p>
            </TiltBox>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/projects" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="group relative overflow-hidden w-full shadow-2xl h-12 px-8 text-base font-bold text-white border-0 transition-all duration-300 hover:scale-105 hover:shadow-primary/30 animate-shimmer bg-[linear-gradient(110deg,#000000,45%,#4a4a4a,55%,#000000)] bg-[length:200%_100%]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View My Work
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="group gap-2 w-full bg-white/40 text-black backdrop-blur-xl border-white/60 hover:bg-white/60 hover:text-black h-12 px-8 text-base font-bold shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Terminal className="h-4 w-4" />
                  Contact Me
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Image Content */}
        <div className="flex justify-center items-end order-1 lg:order-2 h-full pt-12 lg:pt-0">
          <FadeIn
            delay={0.4}
            className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[550px] flex justify-center items-end h-full"
          >
            <ParallaxImage>
              <Image
                src="/images/profile/Rakib Hussain Profile.png"
                alt="Rakib Hussain Profile"
                width={800}
                height={800}
                className="object-contain object-bottom w-full h-auto max-h-[85vh] drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative pointer-events-none"
                priority
              />
            </ParallaxImage>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
