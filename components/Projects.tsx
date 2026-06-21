"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { projects } from "@/lib/data";
import { useRef } from "react";

function ProjectCard({ p, index }: { p: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Define unique neon gradient presets for each card to make it extremely colorful
  const colorSchemes = [
    { border: "hover:border-purple-500/50", glow: "rgba(168, 85, 247, 0.2)", accent: "text-purple-400" },
    { border: "hover:border-cyan-500/50", glow: "rgba(6, 182, 212, 0.2)", accent: "text-cyan-400" },
    { border: "hover:border-rose-500/50", glow: "rgba(244, 63, 94, 0.2)", accent: "text-rose-400" }
  ];
  
  const scheme = colorSchemes[index % colorSchemes.length];

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`interactive group relative flex w-full flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#03050C]/60 p-6 backdrop-blur-xl min-h-[400px] transition-all duration-300 ${scheme.border} hover:shadow-[0_0_30px_${scheme.glow}]`}
    >
      {/* Dynamic Radial Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            () =>
              `radial-gradient(400px circle at ${
                (x.get() + 0.5) * 100
              }% ${(y.get() + 0.5) * 100}%, ${scheme.glow}, transparent 50%)`
          ),
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between" style={{ transform: "translateZ(20px)" }}>
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span
              className={`rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase border ${
                p.status === "Live"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-400 border-amber-500/20"
              }`}
            >
              {p.status}
            </span>
          </div>

          <h3 className="font-heading text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-colors duration-300">
            {p.title}
          </h3>
          <p className={`mt-1.5 text-sm font-medium ${scheme.accent}`}>{p.subtitle}</p>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            {p.description}
          </p>
        </div>

        <div className="mt-6">
          {p.features.length > 0 && (
            <ul className="mb-6 flex flex-wrap gap-2">
              {p.features.slice(0, 3).map((f: string) => (
                <li
                  key={f}
                  className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[10px] text-white/50 backdrop-blur-md"
                >
                  {f}
                </li>
              ))}
            </ul>
          )}

          {p.link ? (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-5 py-3 text-xs font-bold text-black transition-transform hover:scale-[1.02]"
            >
              <span className="relative z-10">Launch Application</span>
              <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover/link:opacity-10" />
            </a>
          ) : (
            <div className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-bold text-white/40 cursor-default">
              Under Active Development
            </div>
          )}
        </div>
      </div>

      {/* Abstract Glowing Accent */}
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 h-36 w-36 rounded-full bg-gradient-to-br from-purple-500/10 to-cyan-500/10 blur-[40px]"
        style={{ transform: "translateZ(5px)" }}
      />
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative w-full py-24" style={{ perspective: "2000px" }}>
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
