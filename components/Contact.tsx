"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { useState } from "react";
import { Code, Briefcase, FileText, Mail, Loader2, CheckCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const socials = [
    { name: "GitHub", link: profile.github, icon: <Code className="h-8 w-8 text-white/80" strokeWidth={1.5} />, desc: "View my open-source code" },
    { name: "LinkedIn", link: profile.linkedin, icon: <Briefcase className="h-8 w-8 text-white/80" strokeWidth={1.5} />, desc: "Connect professionally" },
    { name: "Resume", link: "/Ronit_Madage_Resume.pdf", icon: <FileText className="h-8 w-8 text-white/80" strokeWidth={1.5} />, desc: "Download my CV" },
    { name: "Email", link: `mailto:${profile.email}`, icon: <Mail className="h-8 w-8 text-white/80" strokeWidth={1.5} />, desc: "Send me a direct email" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="relative w-full py-24 bg-[#03050C]">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-3 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-400" />
            <span className="font-mono text-xs tracking-widest text-indigo-400 uppercase">
              Secure Transmission
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl sm:text-5xl font-bold text-white"
          >
            Initiate Connection
          </motion.h2>
        </div>

        {/* Top Section: AI Panel & Social Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Left: AI Communication Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#03050C]/60 p-8 backdrop-blur-xl transition-all hover:border-indigo-500/40"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            
            <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-xs text-white/40 uppercase tracking-widest ml-2">comms_terminal.exe</span>
            </div>

            <div className="font-mono text-sm leading-relaxed text-white/70 space-y-4">
              <p className="text-indigo-400">&gt; Initializing secure handshake...</p>
              <p>&gt; Connection established securely.</p>
              <p className="mt-4 text-white/90">
                I am currently open to new opportunities, collaborations, and discussions regarding engineering roles.
              </p>
              <p>
                Whether you have a question about my work, want to discuss a potential project, or simply wish to say hello, my inbox is always open. I will execute a response as soon as possible.
              </p>
              <p className="text-emerald-400 mt-4 animate-pulse">&gt; Awaiting your input...</p>
            </div>
          </motion.div>

          {/* Right: Premium Social Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socials.map((social, i) => (
              <motion.a
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                key={social.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.04] hover:border-white/20"
              >
                <div className="mb-4 text-3xl">{social.icon}</div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">{social.name}</h3>
                  <p className="text-xs text-white/50">{social.desc}</p>
                </div>
                {/* Glow effect */}
                <div className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-indigo-500/20 blur-[30px] transition-all group-hover:bg-indigo-500/40" />
              </motion.a>
            ))}
          </div>

        </div>

        {/* Bottom Section: Professional Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#03050C]/60 p-8 backdrop-blur-xl md:p-12"
        >
          {success ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <CheckCircle className="h-16 w-16 text-emerald-400 mb-6" />
              <h3 className="font-heading text-3xl font-bold text-white mb-4">Transmission Sent</h3>
              <p className="text-white/60">Message transmitted successfully. I will execute a response shortly.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="mt-8 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <>
              <div className="mb-8 text-center">
                <h3 className="font-heading text-2xl font-bold text-white mb-2">Direct Message</h3>
                <p className="text-sm text-white/50">Fill out the form below to send a secure transmission directly to my inbox.</p>
              </div>

              {error && (
                <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400 text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-mono tracking-wider text-white/60 uppercase">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name" 
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-indigo-500/50 focus:bg-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono tracking-wider text-white/60 uppercase">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com" 
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-indigo-500/50 focus:bg-white/10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-mono tracking-wider text-white/60 uppercase">Subject</label>
                  <input 
                    type="text" 
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Subject" 
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-indigo-500/50 focus:bg-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono tracking-wider text-white/60 uppercase">Message</label>
                  <textarea 
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message..." 
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-indigo-500/50 focus:bg-white/10"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-white px-8 py-4 font-sans text-sm font-bold text-black transition-transform hover:scale-[1.01] disabled:opacity-70 disabled:hover:scale-100"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        Transmit Message <span className="transition-transform group-hover:translate-x-1">→</span>
                      </>
                    )}
                  </span>
                  {!isLoading && (
                    <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-r from-indigo-500 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                  )}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
