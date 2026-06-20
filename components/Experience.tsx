"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";

export default function Experience() {
  // Since we have a single experience object, we map it into a timeline format
  // If more experiences are added to data.ts as an array, this structure natively supports it.
  const timelineData = [
    {
      id: 1,
      role: experience.role,
      company: experience.company,
      duration: "Recent Internship", // Hardcoded fallback for timeline flow
      responsibilities: experience.responsibilities
    }
  ];

  return (
    <section id="experience" className="relative w-full py-24 bg-[#03050C]">
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="font-mono text-xs tracking-widest text-emerald-400 uppercase">
              Career Trajectory
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl sm:text-5xl font-bold text-white"
          >
            Experience
          </motion.h2>
        </div>

        <div className="relative border-l border-white/10 ml-4 md:ml-8">
          {timelineData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-12 ml-8 relative group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[2.35rem] top-1 h-4 w-4 rounded-full border-2 border-[#03050C] bg-emerald-400 transition-transform group-hover:scale-125" />
              
              {/* Timeline content */}
              <div className="relative flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white">{item.role}</h3>
                  <p className="text-emerald-400 font-medium text-lg">{item.company}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-white/50">
                    {item.duration}
                  </span>
                </div>
              </div>

              {/* Glassmorphic card for responsibilities */}
              <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md transition-colors hover:bg-white/[0.04]">
                <ul className="space-y-3">
                  {item.responsibilities.map((res: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/70 leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                      {res}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
