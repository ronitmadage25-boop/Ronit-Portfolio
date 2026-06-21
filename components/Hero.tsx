"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

export default function Hero() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles only on client side
    const newParticles = [...Array(20)].map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden"
    >
      {/* Video Background with scale animation */}
      <motion.video
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 h-full w-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/models/5539-184226951.mp4" type="video/mp4" />
      </motion.video>

      {/* Animated Dark Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-black/60 z-[1]" 
      />

      {/* Animated gradient overlay for more depth */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 z-[2]"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12">
        <div className="w-full">
          
        {/* Badge with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex items-center gap-4"
        >
          <motion.div 
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(16, 185, 129, 0.3)",
                "0 0 40px rgba(16, 185, 129, 0.5)",
                "0 0 20px rgba(16, 185, 129, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-500/40 bg-emerald-500/20 backdrop-blur-md px-5 py-2.5"
          >
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-3 w-3 rounded-full bg-emerald-400" 
            />
            <span className="font-mono text-xs tracking-[0.25em] text-emerald-300 uppercase font-bold">
              Available For Internships
            </span>
          </motion.div>
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="font-mono text-base tracking-[0.3em] text-cyan-400 uppercase hidden sm:inline-block"
          >
            / System V2.0
          </motion.span>
        </motion.div>

        {/* Massive Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-[18vw] sm:text-[15vw] md:text-[12vw] lg:text-[10vw] leading-[0.8] font-black tracking-tighter text-white mb-8"
        >
          <motion.span
            animate={{ 
              textShadow: [
                "0 0 20px rgba(255, 255, 255, 0.1)",
                "0 0 40px rgba(255, 255, 255, 0.2)",
                "0 0 20px rgba(255, 255, 255, 0.1)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            RONIT
          </motion.span>
          <br />
          <motion.span 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1.2 }}
            className="bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#10B981] bg-clip-text text-transparent inline-block"
            style={{
              backgroundSize: "200% 100%",
            }}
          >
            <motion.span
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundImage: "linear-gradient(90deg, #8B5CF6, #06B6D4, #10B981, #8B5CF6)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              MADAGE
            </motion.span>
          </motion.span>
        </motion.h1>

        {/* Enhanced Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl text-xl sm:text-2xl md:text-3xl font-light leading-relaxed text-white/80 mb-12"
        >
          Building{" "}
          <motion.span 
            animate={{ color: ["#8B5CF6", "#06B6D4", "#10B981", "#8B5CF6"] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="font-semibold"
          >
            intelligent products
          </motion.span>
          , futuristic web experiences, and seamless AI ecosystems. 
          <br />
          <span className="text-cyan-400 font-medium">Engineering the future, today.</span>
        </motion.p>

        {/* Animated Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-6 mb-16"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-10 py-5 text-base font-bold text-white transition-all shadow-2xl"
          >
            <motion.span 
              className="relative z-10 flex items-center gap-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Explore Ecosystem
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.a>
          
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, x: 10 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 text-base font-semibold text-white/80 transition-colors hover:text-white group"
          >
            <motion.span 
              animate={{ 
                scale: [1, 1.3, 1],
                boxShadow: [
                  "0 0 0 0 rgba(6, 182, 212, 0.7)",
                  "0 0 0 10px rgba(6, 182, 212, 0)",
                  "0 0 0 0 rgba(6, 182, 212, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-3 w-3 rounded-full bg-cyan-400" 
            />
            Establish Connection
            <motion.span
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Enhanced Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-12 border-t-2 border-white/20 pt-10"
        >
          {[
            { value: "15+", label: "Technologies", color: "from-purple-500 to-pink-500" },
            { value: "8+", label: "Projects Built", color: "from-cyan-500 to-blue-500" },
            { value: "500+", label: "Eng. Hours", color: "from-emerald-500 to-teal-500" }
          ].map((stat, index) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2 + index * 0.2, duration: 0.8 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex flex-col group cursor-pointer"
            >
              <motion.span 
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                className={`font-heading text-5xl md:text-6xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
              >
                {stat.value}
              </motion.span>
              <span className="font-mono text-xs tracking-[0.2em] text-white/60 uppercase mt-2 group-hover:text-white/80 transition-colors">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
        </div>
      </div>

      {/* Floating Particles Effect - Only render on client */}
      {particles.length > 0 && (
        <div className="absolute inset-0 z-[3] pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              initial={{ 
                x: particle.x,
                y: particle.y,
                opacity: 0
              }}
              animate={{
                y: [null, particle.y - 500],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}