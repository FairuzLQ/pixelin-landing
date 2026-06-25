"use client";

import { motion } from "framer-motion";
import { MessageSquare, FileText, Landmark, Code2, ScanEye, Banknote, PenLine, PackageCheck, ShieldCheck } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Meeting Requirement",
    desc: "Kami pahami bisnis, target audiens, dan fitur yang dibutuhkan. Tidak ada pertanyaan yang terlalu basic di sini.",
    icon: MessageSquare,
    accent: "#818cf8",
  },
  {
    n: "02",
    title: "Dokumen Penawaran",
    desc: "Scope pekerjaan, timeline, dan harga dikirim dalam dokumen yang jelas dan fix. Tidak ada angka yang berubah tanpa persetujuan Anda.",
    icon: FileText,
    accent: "#22d3ee",
  },
  {
    n: "03",
    title: "Down Payment",
    desc: "Kesepakatan ditandai dengan DP. Project resmi dimulai, jadwal dikunci, komunikasi dibuka penuh.",
    icon: Landmark,
    accent: "#34d399",
  },
  {
    n: "04",
    title: "Eksekusi Project",
    desc: "Desain, development, dan konten dikerjakan paralel sesuai brief. Anda bisa pantau progress kapanpun.",
    icon: Code2,
    accent: "#f59e0b",
  },
  {
    n: "05",
    title: "Review Pertengahan",
    desc: "Meeting kedua — Anda lihat progress nyata, beri masukan, dan kami sinkronkan ulang arah jika diperlukan.",
    icon: ScanEye,
    accent: "#a78bfa",
  },
  {
    n: "06",
    title: "Pembayaran Tengah",
    desc: "Milestone kedua tercapai, pembayaran kedua diproses. Tanda bahwa project berjalan tepat rencana.",
    icon: Banknote,
    accent: "#34d399",
  },
  {
    n: "07",
    title: "Revisi & Finalisasi",
    desc: "Sesi penyempurnaan detail sampai hasilnya benar-benar sesuai ekspektasi. Kami tidak buru-buru di tahap ini.",
    icon: PenLine,
    accent: "#f472b6",
  },
  {
    n: "08",
    title: "Pelunasan & Serah Terima",
    desc: "Pembayaran lunas, semua akses diserahkan — domain, hosting, source code. Project resmi milik Anda.",
    icon: PackageCheck,
    accent: "#22d3ee",
  },
  {
    n: "09",
    title: "Maintenance 1 Minggu",
    desc: "Satu minggu penuh kami standby pasca-launch. Bug, perubahan minor, pertanyaan teknis — ditangani tanpa biaya tambahan.",
    icon: ShieldCheck,
    accent: "#818cf8",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute right-0 top-1/4 w-80 h-80 bg-indigo-600/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
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
            How We Work
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Proses yang kami jaga
            <br />
            <span className="gradient-text">setiap langkahnya</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            Dari obrolan pertama sampai website live — transparan, terstruktur, tanpa kejutan.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="group relative p-5 rounded-2xl bg-[#0d0d14] border border-[#1e1e30] hover:border-slate-700 transition-all duration-300 overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 0% 0%, ${step.accent}08 0%, transparent 70%)` }}
              />

              <div className="relative z-10">
                {/* Number + icon row */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-3xl font-black leading-none tabular-nums"
                    style={{ color: `${step.accent}50` }}
                  >
                    {step.n}
                  </span>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${step.accent}15`, border: `1px solid ${step.accent}25` }}
                  >
                    <step.icon size={15} style={{ color: step.accent }} />
                  </div>
                </div>

                <h3 className="font-bold text-white text-sm mb-2">{step.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
              </div>

              {/* Bottom accent on hover */}
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                style={{ background: `linear-gradient(90deg, ${step.accent}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-slate-500 text-sm mt-10"
        >
          Rata-rata proyek selesai dalam{" "}
          <span className="text-slate-300 font-semibold">1–2 minggu</span>
          {" "}dari brief pertama hingga website live.
        </motion.p>
      </div>
    </section>
  );
}
