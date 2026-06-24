"use client";

import { useState } from "react";
import { Save, LogOut, Eye, ChevronRight, CheckCircle, AlertCircle } from "lucide-react";
import type { SiteContent, ServiceItem, WhyItem, StatItem } from "@/types/content";

type Tab = "hero" | "services" | "why" | "contact";

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: "hero", label: "Hero", emoji: "🏠" },
  { id: "services", label: "Services", emoji: "⚡" },
  { id: "why", label: "Why Us", emoji: "✅" },
  { id: "contact", label: "Contact", emoji: "📧" },
];

// ─── Input components ────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2.5 rounded-xl bg-[#11111c] border border-[#1e1e30] text-white text-sm placeholder-slate-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
    />
  );
}

function Textarea({ value, onChange, rows = 3, placeholder }: { value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full px-3 py-2.5 rounded-xl bg-[#11111c] border border-[#1e1e30] text-white text-sm placeholder-slate-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none"
    />
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-base font-bold text-white mb-5 pb-3 border-b border-[#1e1e30]">{children}</h2>;
}

// ─── Section editors ─────────────────────────────────────────────────────────

function HeroEditor({ content, onChange }: { content: SiteContent["hero"]; onChange: (c: SiteContent["hero"]) => void }) {
  const set = (field: keyof SiteContent["hero"], val: unknown) => onChange({ ...content, [field]: val });
  const setStat = (i: number, field: keyof StatItem, val: string) => {
    const stats = content.stats.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
    set("stats", stats);
  };

  return (
    <div className="space-y-5">
      <SectionTitle>Hero Section</SectionTitle>
      <Field label="Badge text"><Input value={content.badge} onChange={(v) => set("badge", v)} /></Field>
      <Field label="Subheadline"><Textarea value={content.subheadline} onChange={(v) => set("subheadline", v)} rows={3} /></Field>
      <Field label="Tombol utama (CTA 1)"><Input value={content.cta1} onChange={(v) => set("cta1", v)} /></Field>
      <Field label="Tombol sekunder (CTA 2)"><Input value={content.cta2} onChange={(v) => set("cta2", v)} /></Field>
      <Field label="Stats">
        <div className="space-y-2">
          {content.stats.map((s, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={s.value}
                onChange={(e) => setStat(i, "value", e.target.value)}
                placeholder="Nilai"
                className="w-24 px-3 py-2 rounded-xl bg-[#11111c] border border-[#1e1e30] text-white text-sm focus:outline-none focus:border-indigo-500/60 transition-all"
              />
              <input
                value={s.label}
                onChange={(e) => setStat(i, "label", e.target.value)}
                placeholder="Label"
                className="flex-1 px-3 py-2 rounded-xl bg-[#11111c] border border-[#1e1e30] text-white text-sm focus:outline-none focus:border-indigo-500/60 transition-all"
              />
            </div>
          ))}
        </div>
      </Field>
    </div>
  );
}

function ServicesEditor({ content, onChange }: { content: SiteContent["services"]; onChange: (c: SiteContent["services"]) => void }) {
  const set = (field: keyof SiteContent["services"], val: unknown) => onChange({ ...content, [field]: val });
  const setItem = (i: number, field: keyof ServiceItem, val: string | null) => {
    const items = content.items.map((item, idx) => idx === i ? { ...item, [field]: val } : item);
    set("items", items);
  };

  return (
    <div className="space-y-5">
      <SectionTitle>Services Section</SectionTitle>
      <Field label="Headline"><Input value={content.headline} onChange={(v) => set("headline", v)} /></Field>
      <Field label="Headline 2"><Input value={content.headline2} onChange={(v) => set("headline2", v)} /></Field>
      <Field label="Subheadline"><Textarea value={content.subheadline} onChange={(v) => set("subheadline", v)} /></Field>
      <div className="space-y-4">
        {content.items.map((item, i) => (
          <div key={i} className="p-4 rounded-xl border border-[#1e1e30] bg-[#0a0a0f] space-y-3">
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Layanan {i + 1}</p>
            <Field label="Judul"><Input value={item.title} onChange={(v) => setItem(i, "title", v)} /></Field>
            <Field label="Deskripsi"><Textarea value={item.desc} onChange={(v) => setItem(i, "desc", v)} rows={2} /></Field>
            <Field label="Tag (kosongkan jika tidak ada)">
              <Input value={item.tag ?? ""} onChange={(v) => setItem(i, "tag", v || null)} placeholder="Paling populer" />
            </Field>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhyEditor({ content, onChange }: { content: SiteContent["why"]; onChange: (c: SiteContent["why"]) => void }) {
  const set = (field: keyof SiteContent["why"], val: unknown) => onChange({ ...content, [field]: val });
  const setItem = (i: number, field: keyof WhyItem, val: string) => {
    const items = content.items.map((item, idx) => idx === i ? { ...item, [field]: val } : item);
    set("items", items);
  };

  return (
    <div className="space-y-5">
      <SectionTitle>Why Pixelin Section</SectionTitle>
      <Field label="Headline"><Input value={content.headline} onChange={(v) => set("headline", v)} /></Field>
      <Field label="Headline 2"><Input value={content.headline2} onChange={(v) => set("headline2", v)} /></Field>
      <Field label="Subheadline"><Textarea value={content.subheadline} onChange={(v) => set("subheadline", v)} /></Field>
      <div className="space-y-3">
        {content.items.map((item, i) => (
          <div key={i} className="p-4 rounded-xl border border-[#1e1e30] bg-[#0a0a0f] space-y-3">
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Alasan {i + 1}</p>
            <Field label="Judul"><Input value={item.title} onChange={(v) => setItem(i, "title", v)} /></Field>
            <Field label="Deskripsi"><Textarea value={item.desc} onChange={(v) => setItem(i, "desc", v)} rows={2} /></Field>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactEditor({ content, onChange }: { content: SiteContent["contact"]; onChange: (c: SiteContent["contact"]) => void }) {
  const set = (field: keyof SiteContent["contact"], val: unknown) => onChange({ ...content, [field]: val });
  const setReassurance = (i: number, val: string) => {
    const r = content.reassurances.map((s, idx) => idx === i ? val : s);
    set("reassurances", r);
  };

  return (
    <div className="space-y-5">
      <SectionTitle>Contact Section</SectionTitle>
      <Field label="Headline"><Input value={content.headline} onChange={(v) => set("headline", v)} /></Field>
      <Field label="Subheadline (gradient)"><Input value={content.subheadline} onChange={(v) => set("subheadline", v)} /></Field>
      <Field label="Body text"><Textarea value={content.body} onChange={(v) => set("body", v)} rows={4} /></Field>
      <Field label="Nomor WhatsApp (tanpa +)">
        <Input value={content.whatsapp} onChange={(v) => set("whatsapp", v)} placeholder="6281234567890" />
      </Field>
      <Field label="Poin kepercayaan (3 baris)">
        <div className="space-y-2">
          {content.reassurances.map((r, i) => (
            <Input key={i} value={r} onChange={(v) => setReassurance(i, v)} />
          ))}
        </div>
      </Field>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function AdminDashboard({ initialContent }: { initialContent: SiteContent }) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [tab, setTab] = useState<Tab>("hero");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "ok" | "err">("idle");

  const update = <K extends keyof SiteContent>(section: K, val: SiteContent[K]) => {
    setContent((prev) => ({ ...prev, [section]: val }));
    if (saveState === "ok") setSaveState("idle");
  };

  const save = async () => {
    setSaveState("saving");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      setSaveState(res.ok ? "ok" : "err");
      if (res.ok) setTimeout(() => setSaveState("idle"), 3000);
    } catch {
      setSaveState("err");
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#050508] text-slate-200 flex flex-col">
      {/* Top bar */}
      <header className="h-14 border-b border-[#1e1e30] bg-[#0d0d14] flex items-center justify-between px-5 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-2.5">
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="4" fill="#11111c" />
            {[[2,2],[3,2],[4,2],[2,3],[4,3],[2,4],[3,4],[4,4],[2,5],[2,6],[6,2],[6,6]].map(([c,r],i)=>(
              <rect key={i} x={c*4} y={r*4} width="3" height="3" fill={i>=10?"#22d3ee":"#818cf8"} rx="0.5"/>
            ))}
          </svg>
          <span className="font-bold text-white text-sm">Pixelin</span>
          <span className="text-slate-600 text-xs">/ Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1e1e30] text-slate-400 hover:text-white hover:border-slate-600 text-xs font-medium transition-all">
            <Eye size={12} />Preview
          </a>
          <button
            onClick={save}
            disabled={saveState === "saving"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${saveState === "ok" ? "bg-emerald-600 text-white" : saveState === "err" ? "bg-rose-600 text-white" : "bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-60"}`}
          >
            {saveState === "saving" ? (
              <span className="animate-spin">⟳</span>
            ) : saveState === "ok" ? (
              <CheckCircle size={12} />
            ) : saveState === "err" ? (
              <AlertCircle size={12} />
            ) : (
              <Save size={12} />
            )}
            {saveState === "saving" ? "Menyimpan..." : saveState === "ok" ? "Tersimpan!" : saveState === "err" ? "Gagal!" : "Simpan"}
          </button>
          <button onClick={logout} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-500 hover:text-rose-400 text-xs font-medium transition-all">
            <LogOut size={12} />Keluar
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <nav className="w-44 border-r border-[#1e1e30] bg-[#0d0d14] shrink-0 pt-3">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-all ${tab === t.id ? "text-white bg-indigo-600/15 border-r-2 border-indigo-500" : "text-slate-400 hover:text-white"}`}
            >
              <span className="flex items-center gap-2"><span>{t.emoji}</span>{t.label}</span>
              {tab === t.id && <ChevronRight size={13} className="text-indigo-400" />}
            </button>
          ))}
          <div className="mt-4 mx-3 px-3 py-2.5 rounded-lg bg-indigo-600/8 border border-indigo-500/15">
            <p className="text-xs text-indigo-300 font-medium mb-1">Cara pakai</p>
            <p className="text-xs text-slate-500 leading-relaxed">Edit teks → klik Simpan → langsung live di website.</p>
          </div>
        </nav>

        {/* Editor area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-6 py-8">
            {tab === "hero" && <HeroEditor content={content.hero} onChange={(v) => update("hero", v)} />}
            {tab === "services" && <ServicesEditor content={content.services} onChange={(v) => update("services", v)} />}
            {tab === "why" && <WhyEditor content={content.why} onChange={(v) => update("why", v)} />}
            {tab === "contact" && <ContactEditor content={content.contact} onChange={(v) => update("contact", v)} />}
          </div>
        </main>
      </div>
    </div>
  );
}
