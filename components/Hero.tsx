"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12">
        <div className="w-full md:w-[60%]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex items-center gap-3"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="font-mono text-[10px] tracking-widest text-emerald-400 uppercase font-bold">
              Available For Internships
            </span>
          </div>
          <span className="font-mono text-sm tracking-[0.2em] text-[#06B6D4] uppercase hidden sm:inline-block">
            / System V2.0
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-[12vw] leading-[0.85] font-bold tracking-tighter text-white sm:text-[10vw]"
        >
          RONIT
          <br />
          <span className="bg-gradient-to-r from-[#8B5CF6] via-[#4338CA] to-[#06B6D4] bg-clip-text text-transparent">
            MADAGE
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl text-lg font-light leading-relaxed text-white/60 sm:text-xl"
        >
          Building intelligent products, futuristic web experiences, and seamless AI ecosystems. Engineering the future, today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <a
            href="#projects"
            className="interactive group relative overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
          >
            <span className="relative z-10">Explore Ecosystem</span>
            <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
          </a>
          <a
            href="#contact"
            className="interactive flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            <span className="h-2 w-2 rounded-full bg-[#06B6D4] shadow-[0_0_10px_#06B6D4]" />
            Establish Connection
          </a>
        </motion.div>

        {/* Quick Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex items-center gap-8 border-t border-white/10 pt-8"
        >
          <div className="flex flex-col">
            <span className="font-heading text-2xl font-bold text-white">15+</span>
            <span className="font-mono text-[10px] tracking-wider text-white/40 uppercase">Technologies</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-2xl font-bold text-white">8+</span>
            <span className="font-mono text-[10px] tracking-wider text-white/40 uppercase">Projects Built</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-2xl font-bold text-white">500+</span>
            <span className="font-mono text-[10px] tracking-wider text-white/40 uppercase">Eng. Hours</span>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
