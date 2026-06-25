"use client";

import { motion } from "framer-motion";
import { MessageSquare, FileText, Code2, ScanEye, PenLine, ShieldCheck } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Discovery",
    desc: "Brief, target audiens, dan fitur yang dibutuhkan dipahami tuntas dalam satu sesi terstruktur.",
    icon: MessageSquare,
    accent: "#818cf8",
  },
  {
    n: "02",
    title: "Perencanaan",
    desc: "Scope, sitemap, dan alur ditentukan bersama. Semua pihak sepakat sebelum eksekusi dimulai.",
    icon: FileText,
    accent: "#22d3ee",
  },
  {
    n: "03",
    title: "Development",
    desc: "Desain dan coding berjalan paralel. Progress bisa dipantau, bukan blackbox.",
    icon: Code2,
    accent: "#f59e0b",
  },
  {
    n: "04",
    title: "Client Review",
    desc: "Anda cek langsung di browser. Feedback dikumpulkan dan diprioritaskan secara transparan.",
    icon: ScanEye,
    accent: "#a78bfa",
  },
  {
    n: "05",
    title: "Revisi & Polish",
    desc: "Detail disempurnakan sampai hasilnya persis sesuai ekspektasi. Tidak ada yang buru-buru di sini.",
    icon: PenLine,
    accent: "#f472b6",
  },
  {
    n: "06",
    title: "Launch & Maintenance",
    desc: "Website live. Satu minggu penuh standby — bug, pertanyaan teknis, atau perubahan minor kami tangani.",
    icon: ShieldCheck,
    accent: "#34d399",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute right-0 top-1/3 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/25 bg-cyan-500/8 text-cyan-400 text-xs font-semibold mb-4 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            How We Work
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Proses yang kami jaga
            <br />
            <span className="gradient-text">setiap langkahnya</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            Dari brief pertama sampai website live — terstruktur, transparan, tanpa kejutan.
          </p>
        </motion.div>

        {/* ── Desktop: zigzag timeline ─────────────────────────────────────── */}
        <div className="hidden lg:block relative" style={{ height: 380 }}>

          {/* Horizontal connecting line */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "50%",
              left: "calc(100% / 12)",
              right: "calc(100% / 12)",
              height: 1,
              background:
                "linear-gradient(90deg, transparent, #818cf860 10%, #22d3ee50 40%, #f59e0b50 60%, #34d39960 90%, transparent)",
            }}
          />

          {/* Steps */}
          <div
            className="absolute inset-0 grid"
            style={{ gridTemplateColumns: "repeat(6, 1fr)" }}
          >
            {steps.map((step, i) => {
              const above = i % 2 === 1;
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: above ? 24 : -24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative"
                >
                  {/* Content above */}
                  {above && (
                    <div
                      className="absolute text-center px-3"
                      style={{ bottom: "calc(50% + 36px)", left: 0, right: 0 }}
                    >
                      <p
                        className="text-xs font-black mb-1.5 tabular-nums"
                        style={{ color: step.accent }}
                      >
                        {step.n}
                      </p>
                      <h3 className="text-white text-[11px] font-bold leading-snug mb-1.5">
                        {step.title}
                      </h3>
                      <p className="text-slate-500 text-[10px] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  )}

                  {/* Connector line above → circle */}
                  {above && (
                    <div
                      className="absolute w-px"
                      style={{
                        bottom: "50%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        height: 28,
                        background: `linear-gradient(to bottom, transparent, ${step.accent}60)`,
                      }}
                    />
                  )}

                  {/* Circle — always at 50% */}
                  <div
                    className="absolute z-10 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      background: `${step.accent}18`,
                      border: `1.5px solid ${step.accent}55`,
                      boxShadow: `0 0 24px ${step.accent}30, 0 0 48px ${step.accent}10`,
                    }}
                  >
                    <Icon size={15} style={{ color: step.accent }} />
                  </div>

                  {/* Connector line circle → below */}
                  {!above && (
                    <div
                      className="absolute w-px"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        height: 28,
                        background: `linear-gradient(to bottom, ${step.accent}60, transparent)`,
                      }}
                    />
                  )}

                  {/* Content below */}
                  {!above && (
                    <div
                      className="absolute text-center px-3"
                      style={{ top: "calc(50% + 36px)", left: 0, right: 0 }}
                    >
                      <p
                        className="text-xs font-black mb-1.5 tabular-nums"
                        style={{ color: step.accent }}
                      >
                        {step.n}
                      </p>
                      <h3 className="text-white text-[11px] font-bold leading-snug mb-1.5">
                        {step.title}
                      </h3>
                      <p className="text-slate-500 text-[10px] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile: vertical timeline ────────────────────────────────────── */}
        <div className="lg:hidden relative">
          {/* Vertical line */}
          <div
            className="absolute left-5 top-1 bottom-1 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, #818cf860 10%, #22d3ee50 50%, #34d39960 90%, transparent)",
            }}
          />

          <div className="space-y-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="relative flex gap-5 items-start"
                >
                  {/* Circle */}
                  <div
                    className="relative z-10 w-10 h-10 shrink-0 rounded-full flex items-center justify-center"
                    style={{
                      background: `${step.accent}18`,
                      border: `1.5px solid ${step.accent}55`,
                      boxShadow: `0 0 20px ${step.accent}25`,
                    }}
                  >
                    <Icon size={15} style={{ color: step.accent }} />
                  </div>

                  {/* Content */}
                  <div className="pt-1.5 pb-2">
                    <p
                      className="text-xs font-black mb-1 tabular-nums"
                      style={{ color: step.accent }}
                    >
                      {step.n}
                    </p>
                    <h3 className="text-white text-sm font-bold mb-1">{step.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-slate-500 text-sm mt-16"
        >
          Rata-rata selesai dalam{" "}
          <span className="text-slate-300 font-semibold">1–2 minggu</span>{" "}
          dari brief pertama hingga website live.
        </motion.p>
      </div>
    </section>
  );
}
