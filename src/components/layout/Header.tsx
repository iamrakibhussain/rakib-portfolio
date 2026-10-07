"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/60 bg-white/30 backdrop-blur-xl shadow-sm">
      <div className="w-full max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-black text-xl tracking-tight text-black drop-shadow-sm">
            Rakib Hussain
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-base font-bold">
          <Link
            href="/about"
            className="transition-all duration-300 text-black/70 hover:text-black hover:scale-105"
          >
            About
          </Link>
          <Link
            href="/projects"
            className="transition-all duration-300 text-black/70 hover:text-black hover:scale-105"
          >
            Projects
          </Link>
          <Link
            href="/experience"
            className="transition-all duration-300 text-black/70 hover:text-black hover:scale-105"
          >
            Experience
          </Link>
        </nav>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <Link href="/contact">
              <Button
                variant="default"
                size="sm"
                className="cursor-pointer font-bold hover:scale-105 transition-transform duration-300 bg-black text-white hover:bg-black/90 shadow-lg"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
          
          <button 
            className="md:hidden flex items-center justify-center p-2 rounded-lg bg-white/40 border border-white/60 text-black hover:bg-white/60 transition-colors shadow-sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={cn(
          "absolute inset-x-0 top-16 z-40 bg-white/95 backdrop-blur-3xl border-b border-black/10 shadow-2xl transition-all duration-300 ease-in-out md:hidden overflow-hidden origin-top",
          isMobileMenuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col w-full">
          <Link
            href="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full px-6 py-4 border-b border-black/5 text-base font-bold text-black/80 hover:text-black hover:bg-black/5 transition-colors"
          >
            About
          </Link>
          <Link
            href="/projects"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full px-6 py-4 border-b border-black/5 text-base font-bold text-black/80 hover:text-black hover:bg-black/5 transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/experience"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full px-6 py-4 border-b border-black/5 text-base font-bold text-black/80 hover:text-black hover:bg-black/5 transition-colors"
          >
            Experience
          </Link>
          
          <div className="p-6 bg-black/5">
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="w-full block">
              <Button
                size="lg"
                className="w-full font-bold text-base bg-black text-white hover:bg-black/90 shadow-lg h-12"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
