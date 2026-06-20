"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Simple active state observer based on scroll position
      const sections = links.map(link => document.querySelector(link.href) as HTMLElement).filter(Boolean);
      
      let currentActive = "Home";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
          const matchingLink = links.find(l => l.href === `#${section.id}`);
          if (matchingLink) {
            currentActive = matchingLink.label;
          }
        }
      });
      setActive(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      className={`fixed top-0 z-50 flex w-full flex-col items-center justify-between transition-colors duration-500 ${
        scrolled ? "bg-[#03050C]/80 backdrop-blur-2xl border-b border-white/5" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="flex w-full items-center justify-between px-6 py-4 md:px-12">
        <a href="#home" className="font-heading text-2xl font-bold text-white transition-colors hover:text-cyan-400">
          R.M.
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`group relative font-mono text-xs uppercase tracking-widest transition-colors ${
                  active === l.label ? "text-cyan-400" : "text-white/50 hover:text-white"
                }`}
              >
                {l.label}
                {/* Active underline animation */}
                {active === l.label && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-2 left-0 h-[2px] w-full bg-cyan-400"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {/* Hover underline */}
                <span className={`absolute -bottom-2 left-0 h-[2px] w-full bg-white/20 transition-transform origin-left scale-x-0 ${active !== l.label && "group-hover:scale-x-100"}`} />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="group relative overflow-hidden rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase transition-all hover:bg-cyan-500/20"
        >
          <span className="relative z-10">Initiate</span>
        </a>
      </div>

      {/* Global Scroll Progress Bar */}
      <motion.div
        className="h-[2px] w-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 origin-left"
        style={{ scaleX }}
      />
    </motion.nav>
  );
}
