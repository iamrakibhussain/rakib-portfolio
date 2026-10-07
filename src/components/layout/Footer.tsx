"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/icons";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.031 0C5.385 0 0 5.386 0 12.034c0 2.122.553 4.195 1.603 6.015L.17 23.275l5.37-1.408c1.761.947 3.743 1.446 5.8 1.446h.005c6.645 0 12.031-5.387 12.031-12.035 0-3.218-1.253-6.244-3.53-8.52A11.966 11.966 0 0012.031 0zm0 21.312h-.005c-1.792 0-3.55-.48-5.09-1.39l-.365-.217-3.784.992.993-3.69-.238-.378a9.988 9.988 0 01-1.533-5.38C1.986 6.516 6.49 2.012 12.031 2.012c2.668 0 5.174 1.04 7.058 2.924 1.885 1.884 2.924 4.39 2.924 7.057 0 5.541-4.505 10.046-10.047 10.046h.001a10.01 10.01 0 010-.001zm5.503-7.53c-.302-.15-1.785-.88-2.062-.98-.277-.1-.479-.15-.68.15-.202.3-.778.98-.954 1.18-.176.201-.353.226-.655.076-1.343-.67-2.39-1.35-3.323-2.618-.239-.327.237-.308.825-1.488.075-.15.037-.276-.038-.426-.075-.15-.68-1.642-.931-2.25-.245-.59-.494-.51-.68-.52-.176-.01-.378-.01-.58-.01-.202 0-.53.076-.807.377-.277.301-1.058 1.03-1.058 2.511 0 1.48 1.083 2.91 1.234 3.111.15.201 2.124 3.242 5.143 4.544 1.77.765 2.5.88 3.425.742 1.05-.157 1.785-.729 2.037-1.432.252-.703.252-1.306.176-1.432-.075-.126-.277-.202-.579-.353z" />
  </svg>
);

export function Footer() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Dhaka",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 w-full bg-white/20 backdrop-blur-2xl border-t border-white/40 pt-20 pb-8 mt-20 overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Main Brand Section */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-[1.1]">
              LET&apos;S BUILD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-purple-600">SOMETHING</span> <br />
              EXTRAORDINARY.
            </h2>
            <div className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-4 py-2 text-sm font-bold text-black/80">
              <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
              Available for new opportunities
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-black tracking-tight">Navigation</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-black/70 hover:text-black font-semibold transition-colors flex items-center gap-1 group">
                  About <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-black/70 hover:text-black font-semibold transition-colors flex items-center gap-1 group">
                  Projects <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="/experience" className="text-black/70 hover:text-black font-semibold transition-colors flex items-center gap-1 group">
                  Experience <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-black/70 hover:text-black font-semibold transition-colors flex items-center gap-1 group">
                  Contact <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-black tracking-tight">Connect</h3>
            <ul className="space-y-4">
              <li>
                <a href="https://github.com/iamrakibhussain" target="_blank" rel="noreferrer" className="text-black/70 hover:text-black font-semibold transition-colors flex items-center gap-3 group">
                  <span className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                    <GithubIcon className="w-4 h-4" />
                  </span>
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/rakibhussain313/" target="_blank" rel="noreferrer" className="text-black/70 hover:text-black font-semibold transition-colors flex items-center gap-3 group">
                  <span className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-[#0A66C2] group-hover:text-white transition-colors">
                    <LinkedinIcon className="w-4 h-4" />
                  </span>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://wa.me/8801615992906" target="_blank" rel="noreferrer" className="text-black/70 hover:text-black font-semibold transition-colors flex items-center gap-3 group">
                  <span className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                    <WhatsAppIcon className="w-4 h-4" />
                  </span>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between py-6 border-t-2 border-black/5 gap-6">
          <div className="flex items-center gap-2 text-black/60 text-sm md:text-base font-bold">
            <span>© {new Date().getFullYear()} Rakib. All rights reserved.</span>
          </div>

          {/* Local Time Widget */}
          <div className="flex items-center gap-3 px-5 py-2.5 bg-white/50 backdrop-blur-xl rounded-2xl border border-white/60 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-2.5 h-2.5 rounded-full bg-black/60 animate-pulse" />
            <span className="text-sm md:text-base font-bold text-black tracking-wide">
              DHAKA, BD <span className="mx-3 text-black/20">|</span> {time || "Loading..."}
            </span>
          </div>

          <button 
            onClick={scrollToTop}
            className="group flex items-center justify-center w-12 h-12 rounded-full bg-black text-white hover:bg-black/80 hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,0,0,0.2)]"
            aria-label="Scroll to top"
          >
            <ArrowUpRight className="w-5 h-5 -rotate-45 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
