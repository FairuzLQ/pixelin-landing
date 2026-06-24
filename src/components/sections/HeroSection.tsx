"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

const phrases = ["Website.", "Landing Page.", "Company Profile.", "E-Commerce.", "Digital Presence."];

function TypewriterText() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = phrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, phraseIndex]);

  return (
    <span className="gradient-text">
      {displayed}
      <span className="cursor-blink text-indigo-400">_</span>
    </span>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pixel-grid-bg overflow-hidden">
      {/* Radial glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* Floating pixel elements */}
      <FloatingPixels />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-8 tracking-wider uppercase"
        >
          <Zap size={11} className="fill-current" />
          Web Agency — Indonesia
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6"
        >
          We build your
          <br />
          <TypewriterText />
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Pixelin mengubah ide bisnis jadi website yang bekerja — cepat, clean, dan tepat sasaran.
          Tanpa ribet, tanpa biaya tersembunyi.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5"
          >
            Mulai Proyek
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#work"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold text-sm transition-all duration-200"
          >
            Lihat Karya Kami
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "10+", label: "Proyek selesai" },
            { value: "< 2wk", label: "Rata-rata deliver" },
            { value: "100%", label: "Klien puas" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-black gradient-text">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none" />
    </section>
  );
}

function FloatingPixels() {
  const pixels = [
    { x: "8%", y: "20%", size: 6, delay: 0, color: "#6366f1" },
    { x: "92%", y: "30%", size: 4, delay: 1, color: "#22d3ee" },
    { x: "5%", y: "65%", size: 8, delay: 2, color: "#818cf8" },
    { x: "88%", y: "70%", size: 5, delay: 0.5, color: "#22d3ee" },
    { x: "15%", y: "45%", size: 3, delay: 1.5, color: "#6366f1" },
    { x: "80%", y: "50%", size: 7, delay: 3, color: "#818cf8" },
    { x: "50%", y: "12%", size: 4, delay: 2.5, color: "#6366f1" },
    { x: "60%", y: "85%", size: 5, delay: 0.8, color: "#22d3ee" },
  ];

  return (
    <>
      {pixels.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-sm pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: 0.4,
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + i * 0.3,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}
