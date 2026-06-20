"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const clusters = [
  { id: "ai", label: "AI / ML", skills: ["Python", "TensorFlow", "Scikit-Learn", "Prompt Engineering"], color: "from-purple-500 to-indigo-500", glow: "shadow-purple-500/50" },
  { id: "frontend", label: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"], color: "from-cyan-400 to-blue-500", glow: "shadow-cyan-400/50" },
  { id: "backend", label: "Backend", skills: ["Node.js", "Express", "PHP", "Java"], color: "from-emerald-400 to-teal-500", glow: "shadow-emerald-400/50" },
  { id: "database", label: "Database", skills: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"], color: "from-amber-400 to-orange-500", glow: "shadow-amber-400/50" },
  { id: "mobile", label: "Mobile", skills: ["React Native", "Android Studio", "Kotlin"], color: "from-pink-400 to-rose-500", glow: "shadow-pink-400/50" },
  { id: "tools", label: "Dev Tools", skills: ["Git", "GitHub", "Docker", "VS Code"], color: "from-gray-400 to-slate-500", glow: "shadow-gray-400/50" }
];

export default function Skills() {
  const [activeCluster, setActiveCluster] = useState<string | null>(null);

  // Radius for the orbital circle
  const radius = 220; 

  return (
    <section id="skills" className="relative flex min-h-[900px] w-full flex-col items-center justify-center overflow-hidden py-24 bg-[#03050C]">
      {/* Header */}
      <div className="relative z-20 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
          <span className="font-mono text-xs tracking-widest text-cyan-400 uppercase">Interactive Technology Ecosystem</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight"
        >
          Neural Architecture
        </motion.h2>
      </div>

      {/* Ecosystem Canvas */}
      <div className="relative z-10 w-full max-w-5xl h-[600px] flex items-center justify-center">
        
        {/* Animated Background Grid / Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="w-full h-full">
            <pattern id="circuit-board" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 30 60 M 0 30 L 60 30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-500/30" />
              <circle cx="30" cy="30" r="1.5" className="fill-cyan-500/50" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#circuit-board)" />
          </svg>
        </div>

        {/* Central Core */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute z-30 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 p-1 shadow-[0_0_80px_rgba(6,182,212,0.5)]"
          onMouseEnter={() => setActiveCluster(null)}
        >
          <div className="flex h-full w-full items-center justify-center rounded-full bg-[#03050C]">
            <span className="font-heading text-xl font-bold text-white">CORE</span>
          </div>
          {/* Pulse Rings */}
          <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-cyan-400/30 duration-1000" />
          <div className="absolute -inset-6 -z-20 rounded-full border border-purple-500/30" />
          <div className="absolute -inset-12 -z-30 rounded-full border border-cyan-500/10" />
        </motion.div>

        {/* Orbital Rings */}
        <div className="absolute w-[440px] h-[440px] rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute w-[600px] h-[600px] rounded-full border border-white/[0.02] pointer-events-none" />

        {/* Clusters (Calculated in a circle) */}
        {clusters.map((cluster, i) => {
          const angle = (i / clusters.length) * (2 * Math.PI) - Math.PI / 2; // Start from top
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          const isActive = activeCluster === cluster.id;
          const isFaded = activeCluster !== null && !isActive;

          return (
            <motion.div
              key={cluster.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onMouseEnter={() => setActiveCluster(cluster.id)}
              onMouseLeave={() => setActiveCluster(null)}
              className={`absolute z-20 transition-all duration-500 ${isFaded ? "opacity-30 scale-90" : "opacity-100 scale-100"}`}
              style={{ x, y }}
            >
              <div className="relative flex flex-col items-center">
                
                {/* Connection Line to Core (Visible when hovered) */}
                <div 
                  className={`absolute top-1/2 left-1/2 h-px bg-gradient-to-r ${cluster.color} origin-left transition-all duration-500 pointer-events-none -z-10`}
                  style={{ 
                    width: isActive ? `${radius - 70}px` : "0px",
                    transform: `rotate(${Math.atan2(-y, -x)}rad)`,
                    opacity: isActive ? 1 : 0
                  }}
                />

                {/* Cluster Node */}
                <div className={`peer relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br ${cluster.color} p-[2px] transition-transform hover:scale-110 ${isActive ? cluster.glow : ""}`}>
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#03050C]/90 backdrop-blur-md">
                    <span className="text-[11px] font-bold text-white text-center leading-tight px-1 uppercase tracking-wider">{cluster.label}</span>
                  </div>
                </div>
                
                {/* Floating Skills List */}
                <div className={`absolute w-64 transition-all duration-300 pointer-events-none ${isActive ? "opacity-100 z-50" : "opacity-0 -z-10"}`}
                     style={{
                       // Position the text box radially outward from the node
                       top: y > 0 ? "100%" : "auto",
                       bottom: y < 0 ? "100%" : "auto",
                       marginTop: y > 0 ? "16px" : "0",
                       marginBottom: y < 0 ? "16px" : "0"
                     }}
                >
                  <div className="flex flex-wrap justify-center gap-2">
                    {cluster.skills.map((skill) => (
                      <span key={skill} className={`rounded-full border px-3 py-1.5 text-xs font-mono backdrop-blur-md shadow-lg ${isActive ? 'border-white/20 bg-[#03050C]/80 text-white shadow-[0_0_20px_rgba(0,0,0,0.5)]' : 'border-white/10 bg-white/5 text-white/80'}`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
