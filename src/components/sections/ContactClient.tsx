"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Clock,
  Copy,
  Check,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Zap,
  Calendar,
  ChevronDown,
  HelpCircle,
  Video,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "@/components/shared/icons";
import { ContactForm } from "@/components/sections/ContactForm";

// Background Dot Pattern matching Projects & Experience pages
const DotPattern = () => (
  <div
    className="absolute inset-0 pointer-events-none z-0"
    style={{
      backgroundImage:
        "radial-gradient(circle at center, rgba(0,0,0,0.07) 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    }}
  />
);

// 3D Tilt & Mouse Spotlight Card
function TiltSpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spotlight coordinates
    cardRef.current.style.setProperty("--x", `${x}px`);
    cardRef.current.style.setProperty("--y", `${y}px`);

    // Subtle 3D Tilt calculation (-3.5 to +3.5 deg)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
      className={`group relative rounded-3xl bg-white/50 backdrop-blur-xl border border-white/70 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Mouse Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(450px circle at var(--x, 0px) var(--y, 0px), rgba(255,255,255,0.7), transparent 40%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function ContactClient() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isWorkingHours, setIsWorkingHours] = useState<boolean>(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Real-time live clock & status radar for Dhaka (UTC+6)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentTime(timeStr);

      // Dhaka local hour (0 - 23)
      const dhakaHour = parseInt(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Dhaka",
          hour: "numeric",
          hour12: false,
        }),
        10
      );
      // Online between 9:00 AM and 11:00 PM
      setIsWorkingHours(dhakaHour >= 9 && dhakaHour < 23);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("alrokib44@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback
    }
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      handle: "rakibhussain313",
      href: "https://www.linkedin.com/in/rakibhussain313",
      icon: LinkedinIcon,
      hoverBorder: "hover:border-blue-600/40",
      accent: "text-blue-600",
    },
    {
      name: "GitHub",
      handle: "iamrakibhussain",
      href: "https://github.com/iamrakibhussain",
      icon: GithubIcon,
      hoverBorder: "hover:border-purple-600/40",
      accent: "text-purple-600",
    },
    {
      name: "Facebook",
      handle: "imhussainrakib",
      href: "https://www.facebook.com/imhussainrakib",
      icon: FacebookIcon,
      hoverBorder: "hover:border-sky-600/40",
      accent: "text-sky-600",
    },
  ];

  const focusAreas = [
    "Next.js & React 19 Ecosystem",
    "Scalable Node.js & REST APIs",
    "SaaS Architecture & MVPs",
    "Full-Stack Web Applications",
    "Database Modeling & Security",
    "Performance & Speed Audits",
  ];

  const faqs = [
    {
      q: "What is your typical turnaround time?",
      a: "For complete MVPs and scalable web applications, projects typically take between 2 to 4 weeks from architecture design to production deployment.",
    },
    {
      q: "How do you handle remote & global collaborations?",
      a: "Async-first communication, regular progress updates via Slack or Discord, and transparent sprint task management via GitHub Projects or Linear.",
    },
    {
      q: "What is your core engineering stack?",
      a: "Modern TypeScript across the entire lifecycle: Next.js (App Router, Server Actions, React 19), Node.js, PostgreSQL, Tailwind CSS, and cloud deployments.",
    },
    {
      q: "Are you open to full-time engineering roles?",
      a: "Yes! I am actively evaluating impactful full-time software engineering roles as well as long-term contract-to-hire opportunities worldwide.",
    },
  ];

  return (
    <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
      <DotPattern />

      {/* 1. HERO HEADER */}
      <div className="max-w-4xl mx-auto mb-16 relative z-10 text-center flex flex-col items-center">
        {/* Availability Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full border border-white/60 bg-white/40 backdrop-blur-xl px-5 py-2 text-sm font-bold text-black mb-4 shadow-xl hover:bg-white/50 transition-colors"
        >
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 mr-2.5 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          Available for new opportunities &amp; full-time roles
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-black mb-4"
        >
          LET&apos;S BUILD SOMETHING{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-black via-zinc-800 to-zinc-600">
            AMAZING
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl font-medium text-black/70 max-w-2xl mx-auto leading-relaxed"
        >
          Have a SaaS MVP to launch, an engineering challenge, or a full-time role? 
          Drop a message and let&apos;s turn your vision into reliable, production-ready software.
        </motion.p>
      </div>

      {/* 2. TWO-COLUMN BENTO GRID */}
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* LEFT COLUMN: INTERACTIVE CONNECT HUB (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-5 space-y-6"
        >
          {/* Bento Card 1: Direct Email & One-Click Copy */}
          <TiltSpotlightCard className="p-6 sm:p-7">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="h-11 w-11 rounded-2xl bg-black text-white flex items-center justify-center shadow-md">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-black/50">
                  Direct Inbox
                </span>
                <h3 className="font-bold text-black text-lg">Fast Communication</h3>
              </div>
            </div>

            <p className="text-sm font-medium text-black/70 mb-5 leading-relaxed">
              Prefer direct email? Copy my address with one click or open in your default email client.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="flex-1 px-4 py-3 rounded-2xl bg-white/80 border border-black/10 text-sm font-mono text-black font-semibold flex items-center justify-between truncate select-all shadow-sm">
                <span className="truncate">alrokib44@gmail.com</span>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-5 py-3 rounded-2xl bg-black text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer shadow-lg shadow-black/10 shrink-0"
              >
                {copiedEmail ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-black/10 flex items-center gap-2 text-xs font-semibold text-black/60">
              <Zap className="h-4 w-4 text-amber-600" />
              <span>Response Window: Typically within 2–4 hours</span>
            </div>
          </TiltSpotlightCard>

          {/* Bento Card 2: Live Local Time & Smart Working Radar */}
          <TiltSpotlightCard className="p-6 sm:p-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
              {/* Location */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-black/50 text-xs font-bold uppercase tracking-wider">
                  <MapPin className="h-4 w-4 text-black" />
                  <span>Base Location</span>
                </div>
                <p className="font-black text-black text-lg">Dhaka, Bangladesh</p>
                <p className="text-xs font-medium text-black/60">Remote &amp; Global Availability</p>
              </div>

              {/* Live Time */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-black/50 text-xs font-bold uppercase tracking-wider">
                  <Clock className="h-4 w-4 text-emerald-600" />
                  <span>Local Clock (UTC+6)</span>
                </div>
                <p className="font-mono font-black text-emerald-600 text-lg">
                  {currentTime || "10:30:00 PM"}
                </p>
                <p className="text-xs font-medium text-black/60">Asia/Dhaka Standard Time</p>
              </div>
            </div>

            {/* Smart Working Hours Radar Indicator */}
            <div className="pt-3 border-t border-black/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isWorkingHours
                      ? "bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]"
                      : "bg-purple-500"
                  }`}
                />
                <span className="font-bold text-black/80">
                  {isWorkingHours ? "Status: Online & Responding" : "Status: Offline / Recharging"}
                </span>
              </div>
              <span className="text-black/50 font-medium">
                {isWorkingHours ? "Active sprint hours" : "Replies start at 9:00 AM"}
              </span>
            </div>
          </TiltSpotlightCard>

          {/* Bento Card 3: 15-Minute Discovery Call Booking */}
          <TiltSpotlightCard className="p-6 sm:p-7">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="h-10 w-10 rounded-2xl bg-black text-white flex items-center justify-center shadow-md">
                <Video className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-black/50">
                  Quick Intro Call
                </span>
                <h4 className="font-bold text-black text-base">15-Min Discovery Session</h4>
              </div>
            </div>

            <p className="text-sm font-medium text-black/70 mb-4 leading-relaxed">
              Prefer a face-to-face chat? Let&apos;s schedule a short meeting via Google Meet to discuss your roadmap, timeline, and goals.
            </p>

            <a
              href="mailto:alrokib44@gmail.com?subject=15-Min%20Discovery%20Call%20Request%20-%20Portfolio"
              className="w-full px-4 py-3 rounded-2xl bg-white hover:bg-black hover:text-white border border-black/15 text-black font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
            >
              <Calendar className="h-4 w-4" />
              <span>Request a 15-Min Call</span>
            </a>
          </TiltSpotlightCard>

          {/* Bento Card 4: Social & Professional Channels */}
          <TiltSpotlightCard className="p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black/50">
              <Sparkles className="h-4 w-4 text-black" />
              <span>Professional &amp; Social Channels</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/link p-4 rounded-2xl bg-white/60 border border-black/10 ${social.hoverBorder} hover:bg-white/90 shadow-sm transition-all duration-200 flex flex-col justify-between hover:scale-[1.02]`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <IconComponent className={`h-5 w-5 ${social.accent}`} />
                      <ArrowUpRight className="h-4 w-4 text-black/30 group-hover/link:text-black group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-black">{social.name}</h4>
                      <p className="text-[11px] font-mono text-black/50 truncate">
                        @{social.handle}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </TiltSpotlightCard>

          {/* Bento Card 5: Interactive Client FAQ Accordion */}
          <TiltSpotlightCard className="p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black/50">
              <HelpCircle className="h-4 w-4 text-black" />
              <span>Frequently Asked Questions</span>
            </div>

            <div className="space-y-2">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-black/10 bg-white/60 overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full px-4 py-3 text-left font-bold text-xs text-black flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-black/50 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-4 pb-3.5 pt-1 text-xs font-medium text-black/70 border-t border-black/5 leading-relaxed">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </TiltSpotlightCard>

          {/* Bento Card 6: Technical Scope & Focus */}
          <TiltSpotlightCard className="p-6 sm:p-7 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-black/50">
              Technical Scope &amp; Focus
            </h4>
            <div className="flex flex-wrap gap-2">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="px-3.5 py-1.5 rounded-xl bg-white/70 border border-black/10 text-xs font-bold text-black/80 shadow-xs"
                >
                  {area}
                </span>
              ))}
            </div>
          </TiltSpotlightCard>
        </motion.div>

        {/* RIGHT COLUMN: FROSTED GLASS FORTIFIED FORM (7 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-7"
        >
          <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white/60 backdrop-blur-2xl border border-white/80 shadow-2xl relative overflow-hidden">
            <div className="mb-6 space-y-1.5 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black text-white text-xs font-bold tracking-wide uppercase mb-2 shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>HMAC Encrypted Ingestion Stream</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-black">
                Send an Inquiry
              </h2>
              <p className="text-sm font-medium text-black/70">
                All submissions are cryptographically signed, sanitized against injection, and dispatched directly to my inbox.
              </p>
            </div>

            <div className="relative z-10">
              <ContactForm />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
