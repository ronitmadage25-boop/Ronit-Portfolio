"use client";

import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Animated Counter component
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 16);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / 16));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

function CaseStudyCard({ study }: { study: any }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const theme = { border: "hover:border-cyan-500/40", glow: "rgba(6, 182, 212, 0.15)", badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#03050C]/60 p-8 md:p-12 backdrop-blur-xl transition-all duration-300 ${theme.border} hover:shadow-[0_0_40px_${theme.glow}]`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            () =>
              `radial-gradient(600px circle at ${
                (x.get() + 0.5) * 100
              }% ${(y.get() + 0.5) * 100}%, ${theme.glow}, transparent 50%)`
          ),
        }}
      />

      <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12" style={{ transform: "translateZ(15px)" }}>
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className={`rounded-full border px-4 py-1.5 text-xs font-mono uppercase tracking-widest ${theme.badge}`}>
                {study.status || "Completed"}
              </span>
              <span className="text-white/40 text-xs font-mono">Featured Case Study</span>
            </div>

            <h3 className="font-heading text-4xl font-bold text-white md:text-5xl">{study.title}</h3>
            
            <div className="mt-8 space-y-6">
              <div>
                <h4 className="text-xs font-mono tracking-wider uppercase text-white/40 mb-2">Problem Statement</h4>
                <p className="text-base text-white/80 leading-relaxed font-light">{study.problem}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono tracking-wider uppercase text-white/40 mb-2">Solution Architecture</h4>
                <p className="text-base text-[#06B6D4] leading-relaxed font-light">{study.solution}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono tracking-wider uppercase text-white/40 mb-2">Technical Challenges</h4>
                <p className="text-sm text-white/60 leading-relaxed font-light">{study.challenge}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between border-t border-white/5 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-mono tracking-wider uppercase text-white/40 mb-3">Technology Stack</h4>
              <div className="flex flex-wrap gap-2">
                {study.technology.map((tech: string) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono tracking-wider uppercase text-white/40 mb-3">Impact & Outcome</h4>
              <ul className="space-y-2 bg-white/5 border border-white/5 rounded-2xl p-4">
                {study.outcome.map((out: string) => (
                  <li key={out} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="mt-1.5 h-1 w-1.5 rounded-full bg-emerald-400" />
                    {out}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-4">
            <a
              href={study.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex-1 flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-xs font-bold text-black transition-all hover:scale-[1.02]"
            >
              <span>Launch Demo</span>
              <span className="transition-transform group-hover/link:translate-x-1 ml-2">→</span>
            </a>
            {study.github && (
              <a href={study.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-xs font-bold text-white transition-all hover:bg-white/10">
                GitHub Repo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import { Rocket, Zap, Code, Clock } from "lucide-react";

export default function Impact() {
  const featuredStudy = {
    title: "CompressX",
    problem: "Large image files increase storage requirements, reduce website performance, and slow down content sharing.",
    solution: "Built an AI-powered image compression platform that intelligently reduces image size while maintaining visual quality.",
    technology: ["Next.js", "TypeScript", "AI Processing", "Modern UI", "Vercel"],
    challenge: "Optimizing memory allocation in serverless environments during heavy image format conversions.",
    outcome: ["Improved storage efficiency", "Faster image sharing", "Better web performance"],
    link: "https://compressx-phi.vercel.app/",
    github: "https://github.com/ronitmadage25-boop",
    status: "Live Case Study"
  };

  const algoryxStudy = {
    title: "Algoryx Mail AI Detector",
    problem: "Increasing sophistication of AI-generated phishing emails makes it difficult for users to identify malicious intent, leading to security breaches.",
    solution: "Developed an advanced AI-driven detection engine that analyzes email patterns, semantics, and metadata to flag AI-generated and malicious content with high accuracy.",
    technology: ["React", "Python", "Machine Learning", "FastAPI", "NLP"],
    challenge: "Training the model to distinguish between legitimate automated emails (like newsletters) and malicious AI-generated phishing attempts with low false positives.",
    outcome: ["Enhanced email security", "Reduced phishing success rates", "Real-time threat analysis"],
    link: "#",
    github: "#",
    status: "Live Case Study"
  };

  const metrics = [
    { label: "Projects Built", value: 8, suffix: "+", icon: <Rocket strokeWidth={1.5} className="w-full h-full text-white/80" />, desc: "Production ready apps" },
    { label: "Technologies Used", value: 15, suffix: "+", icon: <Zap strokeWidth={1.5} className="w-full h-full text-white/80" />, desc: "Frameworks & tools" },
    { label: "GitHub Repositories", value: 20, suffix: "", icon: <Code strokeWidth={1.5} className="w-full h-full text-white/80" />, desc: "Open source contributions" },
    { label: "Engineering Hours", value: 500, suffix: "+", icon: <Clock strokeWidth={1.5} className="w-full h-full text-white/80" />, desc: "Dedicated coding" }
  ];

  return (
    <section id="impact" className="relative w-full py-24 bg-[#03050C]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-20 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            className="mb-4 inline-flex items-center gap-3 rounded-full border border-[#06B6D4]/30 bg-[#06B6D4]/10 px-4 py-2"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#06B6D4]" />
            <span className="font-mono text-xs tracking-widest text-[#06B6D4] uppercase">
              Engineering Excellence
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-4xl font-bold leading-tight text-white sm:text-6xl"
          >
            Impact & Outcomes
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-lg text-white/60 font-light leading-relaxed"
          >
            Building technology that solves real problems through software, artificial intelligence, and modern engineering practices.
          </motion.p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 relative z-20">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group border border-white/5 bg-white/[0.02] p-6 rounded-2xl backdrop-blur-md hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 text-6xl opacity-10 group-hover:scale-110 transition-transform">{m.icon}</div>
              <div className="relative z-10">
                <div className="mb-2 text-2xl">{m.icon}</div>
                <h3 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-1">
                  <AnimatedCounter value={m.value} />
                  <span className="text-[#06B6D4]">{m.suffix}</span>
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-white/80 mb-1">{m.label}</p>
                <p className="text-xs text-white/40">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Case Studies */}
        <div className="space-y-12">
          <CaseStudyCard study={featuredStudy} />
          <CaseStudyCard study={algoryxStudy} />
        </div>

      </div>
    </section>
  );
}
