"use client";

import { motion } from "framer-motion";
import { Rocket, MessageSquare, Smartphone, Lock, Clock, TrendingUp } from "lucide-react";
import type { WhyContent } from "@/types/content";

const ICONS = [
  { icon: Clock,         accent: "#22d3ee" },
  { icon: MessageSquare, accent: "#a78bfa" },
  { icon: Smartphone,    accent: "#34d399" },
  { icon: Rocket,        accent: "#f59e0b" },
  { icon: Lock,          accent: "#6366f1" },
  { icon: TrendingUp,    accent: "#f472b6" },
];

const DEFAULT_ITEMS = [
  { title: "Cepat tanpa drama", desc: "Estimasi waktu yang realistis dan kami pegang. Rata-rata 1–2 minggu dari brief ke live." },
  { title: "Komunikasi yang jelas", desc: "Tidak perlu pusing dengan jargon teknis. Update progress selalu transparan dan mudah dipahami." },
  { title: "Mobile-first by default", desc: "Lebih dari 70% traffic datang dari HP. Semua yang kami buat terlihat bagus di layar apapun." },
  { title: "Performance dari awal", desc: "Bukan sekadar cantik — website kami dirancang untuk cepat load dan ramah Google Search." },
  { title: "Harga fix, tidak ada kejutan", desc: "Scope yang disepakati di awal adalah yang dikerjakan. Tidak ada biaya tambahan yang tidak dibahas." },
  { title: "Orientasi hasil", desc: "Kami lihat website bukan sebagai proyek desain, tapi sebagai alat bisnis yang harus performan." },
];

export default function WhySection({ content }: { content?: WhyContent }) {
  const badge = content?.badge ?? "Why Pixelin";
  const headline = content?.headline ?? "Kenapa pilih kami";
  const headline2 = content?.headline2 ?? "bukan yang lain?";
  const subheadline = content?.subheadline ?? "Bukan karena kami yang terbaik di dunia. Tapi karena kami yang paling masuk akal untuk kebutuhan Anda.";
  const items = content?.items ?? DEFAULT_ITEMS;

  return (
    <section id="why" className="py-28 px-6 relative overflow-hidden">
      {/* Side glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-0 top-1/3 w-64 h-64 bg-cyan-500/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/25 bg-purple-500/8 text-purple-300 text-xs font-semibold mb-4 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            {badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            {headline}
            <br />
            <span className="gradient-text">{headline2}</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base">{subheadline}</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => {
            const { icon: Icon, accent } = ICONS[i % ICONS.length];
            const r = { ...item, icon: Icon, accent };
            return (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group p-5 rounded-2xl bg-[#0d0d14] border border-[#1e1e30] hover:border-slate-700 transition-all duration-300 relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 20% 50%, ${r.accent}08 0%, transparent 70%)` }}
              />
              <div className="relative z-10">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${r.accent}15`, border: `1px solid ${r.accent}25` }}
                >
                  <r.icon size={18} style={{ color: r.accent }} />
                </div>
                <h3 className="font-bold text-white mb-2 text-sm">{r.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{r.desc}</p>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
