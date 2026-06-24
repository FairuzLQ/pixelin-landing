"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail } from "lucide-react";
import ContactModal from "./ContactModal";

export default function ContactSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="contact" className="py-28 px-6 relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-600/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-[#0d0d14] border border-[#1e1e30] p-10 md:p-14 text-center relative overflow-hidden"
        >
          {/* Corner pixels */}
          {[
            "top-4 left-4", "top-4 right-4",
            "bottom-4 left-4", "bottom-4 right-4",
          ].map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} w-2 h-2 rounded-sm`}
              style={{ background: i % 2 === 0 ? "#6366f1" : "#22d3ee", opacity: 0.6 }}
            />
          ))}

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/25 bg-indigo-500/8 text-indigo-300 text-xs font-semibold mb-6 uppercase tracking-wider">
            Mulai Sekarang
          </div>

          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Ada proyek?
            <br />
            <span className="gradient-text">Cerita ke kami.</span>
          </h2>

          <p className="text-slate-400 text-base max-w-lg mx-auto mb-10 leading-relaxed">
            Tidak perlu proposal panjang. Ceritakan singkat apa yang Anda butuhkan —
            kami balas dalam 24 jam dengan estimasi dan langkah selanjutnya.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="group w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/25 hover:-translate-y-0.5"
            >
              <Mail size={17} />
              Kirim Pesan
            </button>

            <a
              href="https://wa.me/6281290391717?text=Halo%20Pixelin%2C%20saya%20ingin%20konsultasi%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl border border-slate-700 hover:border-green-500/60 text-slate-300 hover:text-white font-semibold text-sm transition-all duration-200"
            >
              <MessageCircle size={17} />
              Chat via WhatsApp
            </a>
          </div>

          {/* Reassurance */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5 text-xs text-slate-600">
            {["Respon dalam 24 jam", "Konsultasi gratis", "Tidak ada pressure"].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-indigo-500" />
                {t}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
