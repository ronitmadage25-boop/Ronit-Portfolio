"use client";

import { motion } from "framer-motion";
import { profile, education } from "@/lib/data";

import { GraduationCap, Zap, Lightbulb, Rocket } from "lucide-react";

export default function About() {
  const quickFacts = [
    { label: "Based in", value: "Mumbai, India" },
    { label: "Focus", value: "AI & Full-Stack" },
    { label: "Education", value: "Computer Engineering" },
    { label: "Status", value: "Open to Internships" },
  ];

  const cards = [
    {
      title: "Education",
      desc: education.degree,
      sub: education.school,
      icon: <GraduationCap className="h-8 w-8 text-purple-400 opacity-80" strokeWidth={1.5} />
    },
    {
      title: "Development Focus",
      desc: "Full-Stack Web & AI Platforms",
      sub: "React, Next.js, Node, Python, ML",
      icon: <Zap className="h-8 w-8 text-cyan-400 opacity-80" strokeWidth={1.5} />
    },
    {
      title: "Core Interests",
      desc: "Product Engineering",
      sub: "Building scalable software solutions that solve real-world problems.",
      icon: <Lightbulb className="h-8 w-8 text-yellow-400 opacity-80" strokeWidth={1.5} />
    },
    {
      title: "Career Goal",
      desc: "Software Engineer",
      sub: "Creating high-impact digital experiences and contributing to innovative tech.",
      icon: <Rocket className="h-8 w-8 text-emerald-400 opacity-80" strokeWidth={1.5} />
    }
  ];

  return (
    <section id="about" className="relative w-full py-24 bg-[#03050C]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left Column: Intro */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-flex items-center gap-3 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2"
            >
              <span className="font-mono text-xs tracking-widest text-purple-400 uppercase">
                System Profile
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-4xl sm:text-5xl font-bold text-white mb-6"
            >
              Engineer. <br />
              Developer. <br />
              <span className="text-white/40">Creator.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/70 font-light leading-relaxed max-w-xl mb-8"
            >
              I am a Computer Engineering student passionate about engineering products from the ground up. I bridge the gap between design and robust backend architecture, focusing heavily on AI-driven applications and modern web technologies.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              {quickFacts.map((fact) => (
                <div key={fact.label} className="flex flex-col border-l-2 border-purple-500/50 pl-4 py-1">
                  <span className="text-[10px] font-mono uppercase text-white/40 tracking-wider mb-1">{fact.label}</span>
                  <span className="text-sm font-semibold text-white/90">{fact.value}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Premium Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-colors"
              >
                <div className="text-3xl mb-4 opacity-80">{card.icon}</div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-2">{card.title}</h3>
                <p className="text-base font-semibold text-white mb-1 leading-snug">{card.desc}</p>
                <p className="text-xs text-white/50 leading-relaxed">{card.sub}</p>
                
                {/* Subtle gradient glow on hover */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/5 group-hover:to-cyan-500/5 transition-colors duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
