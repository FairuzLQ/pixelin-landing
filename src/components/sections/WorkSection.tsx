"use client";

import { motion } from "framer-motion";
import { ExternalLink, Car, Building2, Globe } from "lucide-react";

const projects = [
  {
    name: "Pixelin Space",
    url: "https://pixelin.space/",
    displayUrl: "pixelin.space",
    desc: "Website chatting anonymous yang elegan dan to the point.",
    icon: Globe,
    category: "Web Design",
    accentColor: "#22d3ee",
    tags: ["Web Design", "Social Media", "Web Chatting"],
    mockupBg: "from-cyan-900/20 to-teal-900/10",
    mockupAccent: "#22d3ee",
  },
  {
    name: "Jasa Pasang Dashcam Mobil",
    url: "https://jasapasangdashcammobil.com/",
    displayUrl: "jasapasangdashcammobil.com",
    desc: "Landing page untuk jasa pemasangan dashcam profesional. Fokus pada konversi — pengunjung langsung tahu harus ngapain.",
    icon: Car,
    category: "Landing Page",
    accentColor: "#f59e0b",
    tags: ["Landing Page", "Local SEO", "WhatsApp CTA"],
    mockupBg: "from-amber-900/20 to-orange-900/10",
    mockupAccent: "#f59e0b",
  },
  {
    name: "Bara Putra",
    url: "https://baraputra.co.id/",
    displayUrl: "baraputra.co.id",
    desc: "Company profile untuk perusahaan dengan tampilan profesional dan terpercaya untuk segmen B2B.",
    icon: Building2,
    category: "Company Profile",
    accentColor: "#6366f1",
    tags: ["Company Profile", "B2B", "Professional"],
    mockupBg: "from-indigo-900/20 to-purple-900/10",
    mockupAccent: "#6366f1",
  },
];

export default function WorkSection() {
  return (
    <section id="work" className="py-28 px-6 relative">
      {/* BG accent */}
      <div className="absolute inset-0 pixel-grid-bg opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/25 bg-indigo-500/8 text-indigo-300 text-xs font-semibold mb-4 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Our Work
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Hasil kerja yang bisa
            <br />
            <span className="gradient-text">langsung Anda cek</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-base">
            Bukan mockup. Bukan template demo. Ini website nyata yang kami bangun dan sudah live.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.15 }}
              className="group relative rounded-2xl bg-[#0d0d14] border border-[#1e1e30] overflow-hidden hover:border-opacity-60 transition-all duration-300"
            >
              {/* Mockup area */}
              <div className={`relative h-52 bg-gradient-to-br ${project.mockupBg} overflow-hidden`}>
                {/* Browser chrome mockup */}
                <div className="absolute inset-x-4 top-4 bottom-0 bg-[#0a0a0f] rounded-t-xl border border-[#1e1e30] overflow-hidden shadow-2xl transform perspective-1000 group-hover:scale-[1.02] transition-transform duration-500">
                  {/* Browser bar */}
                  <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#1e1e30] bg-[#11111c]">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    <div className="ml-3 flex-1 bg-[#0d0d14] rounded px-2 py-0.5 text-xs text-slate-600 font-mono truncate">
                      {project.displayUrl}
                    </div>
                  </div>
                  {/* Page content lines */}
                  <div className="p-3 space-y-2">
                    <div className="h-3 rounded" style={{ background: `${project.mockupAccent}40`, width: "60%" }} />
                    <div className="h-2 bg-slate-800 rounded w-full" />
                    <div className="h-2 bg-slate-800 rounded w-4/5" />
                    <div className="h-2 bg-slate-800 rounded w-3/5" />
                    <div className="mt-4 h-8 rounded-lg w-28" style={{ background: `${project.mockupAccent}30`, border: `1px solid ${project.mockupAccent}40` }} />
                  </div>
                </div>

                {/* Category badge */}
                <div
                  className="absolute top-4 right-8 px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ background: `${project.accentColor}20`, color: project.accentColor, border: `1px solid ${project.accentColor}30` }}
                >
                  {project.category}
                </div>
              </div>

              {/* Card content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: `${project.accentColor}18`, border: `1px solid ${project.accentColor}30` }}
                    >
                      <project.icon size={17} style={{ color: project.accentColor }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">{project.name}</h3>
                      <p className="text-xs text-slate-500 font-mono">{project.displayUrl}</p>
                    </div>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-slate-500 hover:text-white border border-[#1e1e30] hover:border-slate-600 transition-all duration-200"
                    aria-label={`Visit ${project.name}`}
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded bg-[#1a1a2e] text-slate-400 border border-[#1e1e30]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-slate-500 text-sm mt-10"
        >
          Proyek Anda bisa jadi yang berikutnya di sini.{" "}
          <a href="#contact" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4">
            Hubungi kami
          </a>
        </motion.p>
      </div>
    </section>
  );
}
