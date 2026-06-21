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

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />
      <SmoothScroll>
        <div style={{ visibility: loaded ? "visible" : "hidden" }}>
          <Navbar />
          <main id="smooth-content" className="relative z-10">
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Impact />
            <Contact />
          </main>
        </div>
      </SmoothScroll>
    </>
  );
}
