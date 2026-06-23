"use client";

import { useState } from "react";
import Loader from "@/components/Loader";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Impact from "@/components/Impact";
import Contact from "@/components/Contact";
import RonitAI from "@/components/RonitAI";
import AIInterview from "@/components/AIInterview";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [isInterviewOpen, setIsInterviewOpen] = useState(false);

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />
      <SmoothScroll>
        <div style={{ visibility: loaded ? "visible" : "hidden" }}>
          <Navbar onOpenInterview={() => setIsInterviewOpen(true)} />
          <main id="smooth-content" className="relative z-10">
            <Hero onOpenInterview={() => setIsInterviewOpen(true)} />
            <About />
            <Experience />
            <Skills />
            <Impact />
            <Contact />
          </main>
          <RonitAI />
          <AIInterview isOpen={isInterviewOpen} onClose={() => setIsInterviewOpen(false)} />
        </div>
      </SmoothScroll>
    </>
  );
}
