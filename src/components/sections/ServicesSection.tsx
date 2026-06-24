"use client";

import { motion } from "framer-motion";
import { Layout, Globe, ShoppingBag, Code2 } from "lucide-react";
import type { ServicesContent } from "@/types/content";

const DESIGN = [
  { icon: Layout, accent: "#6366f1", from: "#6366f1", to: "#818cf8" },
  { icon: Globe,  accent: "#22d3ee", from: "#22d3ee", to: "#0ea5e9" },
  { icon: ShoppingBag, accent: "#a78bfa", from: "#a78bfa", to: "#6366f1" },
  { icon: Code2,  accent: "#34d399", from: "#34d399", to: "#22d3ee" },
];

const DEFAULT_ITEMS = [
  { title: "Landing Page", desc: "Satu halaman, satu tujuan. Kami bikin halaman yang fokus konversi — cocok buat campaign, produk launch, atau jasa spesifik.", tag: "Paling populer" },
  { title: "Company Profile", desc: "Website yang merepresentasikan bisnis Anda secara profesional. Lengkap, informatif, dan bikin kesan pertama yang kuat.", tag: null },
  { title: "E-Commerce", desc: "Toko online siap jualan. Manajemen produk, checkout, dan payment gateway — semuanya kami setup dan konfigurasi.", tag: null },
  { title: "Custom Web App", desc: "Butuh sesuatu yang lebih spesifik? Sistem dashboard, booking, direktori — kami bangun sesuai kebutuhan bisnis Anda.", tag: null },
];

export default function ServicesSection({ content }: { content?: ServicesContent }) {
  const badge = content?.badge ?? "What We Do";
  const headline = content?.headline ?? "Semua yang bisnis Anda butuhkan";
  const headline2 = content?.headline2 ?? "dari satu tempat";
  const subheadline = content?.subheadline ?? "Kami tidak menawarkan semua hal. Kami fokus pada apa yang benar-benar menggerakkan bisnis digital Anda.";
  const items = content?.items ?? DEFAULT_ITEMS;

  return (
    <section id="services" className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/25 bg-cyan-500/8 text-cyan-400 text-xs font-semibold mb-4 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            {headline}<br />
            <span className="gradient-text">{headline2}</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base">{subheadline}</p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((item, i) => {
            const s = { ...DESIGN[i % DESIGN.length], ...item };
            return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-6 rounded-2xl bg-[#0d0d14] border border-[#1e1e30] hover:border-opacity-60 transition-all duration-300 overflow-hidden cursor-default"
              style={{ "--accent": s.accent } as React.CSSProperties}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 0% 0%, ${s.accent}10 0%, transparent 60%)`,
                }}
              />

              <div className="relative z-10">
                {/* Icon + tag row */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${s.accent}18`, border: `1px solid ${s.accent}30` }}
                  >
                    <s.icon size={20} style={{ color: s.accent }} />
                  </div>
                  {s.tag && (
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: `${s.accent}20`, color: s.accent }}
                    >
                      {s.tag}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>

                {/* Bottom accent line */}
                <div
                  className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${s.from}, ${s.to})` }}
                />
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
