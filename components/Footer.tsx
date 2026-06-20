"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
];

import { Code, Briefcase, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden border-t border-white/5 bg-[#03050C] pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8 lg:gap-16">
          
          {/* Left: Branding */}
          <div className="md:col-span-5 lg:col-span-4">
            <a href="#home" className="inline-block font-heading text-3xl font-bold text-white mb-4 transition-colors hover:text-cyan-400">
              R.M.
            </a>
            <h3 className="font-heading text-lg text-white/90 mb-2">{profile.name}</h3>
            <p className="text-sm text-white/50 mb-6">{profile.title}</p>
            <p className="text-xs text-white/40 leading-relaxed max-w-xs">
              Engineering high-impact digital experiences, intelligent AI platforms, and robust software solutions for the modern web.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div className="md:col-span-3 lg:col-span-4">
            <h4 className="font-mono text-xs font-bold tracking-widest text-white/80 uppercase mb-6">Directory</h4>
            <ul className="grid grid-cols-2 gap-y-4 gap-x-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-cyan-400"
                  >
                    <span className="h-px w-2 bg-white/20 transition-all group-hover:w-4 group-hover:bg-cyan-400" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Connect */}
          <div className="md:col-span-4 lg:col-span-4">
            <h4 className="font-mono text-xs font-bold tracking-widest text-white/80 uppercase mb-6">Connect</h4>
            <div className="space-y-4">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.04] hover:border-white/10">
                <Code strokeWidth={1.5} className="h-6 w-6 text-white/50 group-hover:text-white transition-colors" />
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-white/40">GitHub</p>
                  <p className="text-sm font-bold text-white/80 group-hover:text-cyan-400 transition-colors">@ronitmadage25-boop</p>
                </div>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.04] hover:border-white/10">
                <Briefcase strokeWidth={1.5} className="h-6 w-6 text-white/50 group-hover:text-white transition-colors" />
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-white/40">LinkedIn</p>
                  <p className="text-sm font-bold text-white/80 group-hover:text-cyan-400 transition-colors">Ronit Madage</p>
                </div>
              </a>
              <a href={`mailto:${profile.email}`} className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.04] hover:border-white/10">
                <Mail strokeWidth={1.5} className="h-6 w-6 text-white/50 group-hover:text-white transition-colors" />
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-white/40">Email</p>
                  <p className="text-sm font-bold text-white/80 group-hover:text-cyan-400 transition-colors">ronitmadage@gmail.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; {currentYear} {profile.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">Systems Online</span>
          </div>
        </div>
      </div>
      
      {/* Background abstract element */}
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[800px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />
    </footer>
  );
}
