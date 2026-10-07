"use client";

import { experiences } from "@/data/experience";
import { FadeIn } from "@/components/shared/FadeIn";
import { Briefcase } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ExperiencePreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="w-full py-24 md:py-32 relative z-10 overflow-hidden">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Column: Sticky Header */}
          <div className="lg:col-span-4 relative">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="sticky top-32 space-y-6"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black drop-shadow-sm leading-tight">
                Experience <br /> & Journey
              </h2>
              <p className="text-lg font-bold text-black/70 drop-shadow-sm max-w-md">
                A timeline of my professional roles, highlighting key responsibilities and impact across different organizations.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Timeline */}
          <div className="lg:col-span-8 relative pt-4" ref={containerRef}>
            {/* Background Line */}
            <div className="absolute left-[19px] md:left-[39px] top-4 bottom-4 w-1 bg-black/5 rounded-full" />
            
            {/* Animated Active Line */}
            <motion.div 
              className="absolute left-[19px] md:left-[39px] top-4 w-1 bg-black rounded-full origin-top"
              style={{ height: lineHeight }}
            />
            
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <FadeIn key={exp.id} delay={index * 0.1}>
                  <div className="relative pl-12 sm:pl-20 md:pl-28 group">
                    {/* Glowing Dot */}
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="absolute left-[6px] md:left-[26px] top-6 w-8 h-8 bg-white border-[3px] border-black rounded-full flex items-center justify-center shadow-lg z-10 group-hover:scale-125 group-hover:bg-black group-hover:text-white transition-all duration-300"
                    >
                      <Briefcase className="w-4 h-4 text-inherit transition-colors" />
                    </motion.div>

                    {/* Content Card */}
                    <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-5 md:p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300 group-hover:-translate-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 md:mb-6">
                        <div>
                          <h3 className="text-xl md:text-3xl font-black text-black drop-shadow-sm">{exp.role}</h3>
                          <p className="text-base md:text-xl font-bold text-black/80">{exp.company}</p>
                        </div>
                        <span className="inline-flex px-4 py-1.5 bg-black text-white text-xs md:text-sm font-bold rounded-full shadow-md whitespace-nowrap self-start sm:self-auto group-hover:scale-105 transition-transform duration-300">
                          {exp.startDate} — {exp.endDate || "Present"}
                        </span>
                      </div>
                      
                      <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                        {exp.description.map((desc, i) => (
                          <li key={i} className="text-black/80 text-sm md:text-base font-medium flex items-start leading-relaxed">
                            <span className="text-black mr-2 md:mr-3 mt-0.5 md:mt-1 text-lg md:text-xl leading-none">•</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 pt-4 md:pt-6 border-t border-black/10">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-white/50 border border-white/60 rounded-full text-xs font-bold text-black shadow-sm group-hover:bg-white/70 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
