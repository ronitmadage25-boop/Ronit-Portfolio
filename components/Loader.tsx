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
    // Faster boot time: 1.5 seconds so they aren't stuck waiting for the 600MB model
    const DURATION = 1500;

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
          setTimeout(onComplete, 800);
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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#03050C]"
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 0.8, ease: "easeInOut" } }}
        >
          {/* animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-[#03050C] to-cyan-500/10 opacity-50" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex flex-col items-center gap-12"
          >
            {/* Hexagon Spinner */}
            <div className="relative h-32 w-32 flex items-center justify-center">
              {/* Outer Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-cyan-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              {/* Inner dashed ring */}
              <motion.div
                className="absolute inset-2 rounded-full border-t-2 border-r-2 border-indigo-400"
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-4 rounded-full border-b-2 border-l-2 border-cyan-400"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Center Logo */}
              <motion.div
                className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10"
                animate={{ boxShadow: ["0 0 20px rgba(6,182,212,0.2)", "0 0 40px rgba(99,102,241,0.4)", "0 0 20px rgba(6,182,212,0.2)"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="font-heading text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                  RM
                </span>
              </motion.div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">
                  Initializing Core
                </p>
              </div>
              
              {/* Progress Bar Container */}
              <div className="relative h-1 w-64 overflow-hidden rounded-full bg-white/5 border border-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-indigo-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>
              
              {/* Percentage Text */}
              <div className="flex w-64 justify-between items-center px-1">
                <span className="font-mono text-[10px] text-white/30">SYS.BOOT</span>
                <span className="font-mono text-[10px] text-cyan-400 font-bold">
                  {progress}%
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
