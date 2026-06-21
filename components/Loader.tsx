"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const DURATION = 2000; // 2 seconds

    const tick = (t: number) => {
      if (start === null) start = t;
      const elapsed = t - start;
      const pct = Math.min(100, Math.round((elapsed / DURATION) * 100));
      setProgress(pct);
      
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 300);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
          exit={{ 
            opacity: 0,
            transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] } 
          }}
        >
          {/* Elegant gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />

          {/* Ambient light effect */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Main content container */}
          <div className="relative z-10 flex flex-col items-center">
            
            {/* Logo monogram with elegant reveal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <motion.div
                className="relative"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Outer elegant frame */}
                <div className="absolute -inset-8 border border-white/5 rounded-lg" />
                <div className="absolute -inset-6 border border-white/10 rounded-lg" />
                
                {/* Logo */}
                <div className="relative px-8 py-6">
                  <h1 className="font-heading text-8xl font-black tracking-tight">
                    <motion.span 
                      className="text-white"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      R
                    </motion.span>
                    <motion.span 
                      className="text-white/30 mx-1"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      .
                    </motion.span>
                    <motion.span 
                      className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      M
                    </motion.span>
                  </h1>
                  
                  {/* Underline accent */}
                  <motion.div
                    className="h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-4"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Name with elegant typography */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mb-16"
            >
              <p className="font-heading text-2xl font-light tracking-[0.3em] text-white/90">
                RONIT <span className="text-cyan-400">MADAGE</span>
              </p>
            </motion.div>

            {/* Minimalist progress bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-80"
            >
              {/* Progress container */}
              <div className="relative h-[1px] bg-white/10 overflow-hidden">
                {/* Progress fill with glow */}
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
                  style={{
                    width: `${progress}%`,
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.6)',
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Progress percentage and label */}
              <div className="flex items-center justify-between mt-6">
                <motion.span 
                  className="font-mono text-xs text-white/40 tracking-[0.3em] uppercase"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Loading Experience
                </motion.span>
                <motion.span 
                  className="font-mono text-sm text-white/80 tabular-nums"
                  key={progress}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {progress}%
                </motion.span>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="absolute bottom-16 font-mono text-[10px] text-white/30 tracking-[0.4em] uppercase"
            >
              Engineering The Future
            </motion.p>

          </div>

          {/* Elegant corner accents */}
          {[
            { position: 'top-8 left-8', rotation: '0deg' },
            { position: 'top-8 right-8', rotation: '90deg' },
            { position: 'bottom-8 left-8', rotation: '-90deg' },
            { position: 'bottom-8 right-8', rotation: '180deg' },
          ].map((corner, i) => (
            <motion.div
              key={i}
              className={`absolute ${corner.position}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
              style={{ rotate: corner.rotation }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M0 0 L20 0 M0 0 L0 20" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />
              </svg>
            </motion.div>
          ))}

        </motion.div>
      )}
    </AnimatePresence>
  );
}
