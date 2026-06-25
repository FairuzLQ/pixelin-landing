"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

type Status = "idle" | "loading" | "success" | "error";

export default function ContactModal({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const reset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setStatus("idle");
    setErrorMsg("");
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (honeypotRef.current?.value) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "YOUR_ACCESS_KEY",
          name,
          email,
          message,
          subject: `[Pixelin] Pesan baru dari ${name}`,
          from_name: "Pixelin Contact Form",
          botcheck: "",
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
      } else {
        throw new Error(data.message ?? "Terjadi kesalahan");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Gagal mengirim pesan. Coba lagi.");
    }
  };

  return (
    <AnimatePresence>
      {open && <ModalInner
        name={name} setName={setName}
        email={email} setEmail={setEmail}
        message={message} setMessage={setMessage}
        status={status} errorMsg={errorMsg}
        honeypotRef={honeypotRef}
        onClose={handleClose} onSubmit={handleSubmit}
      />}
    </AnimatePresence>
  );
}

// Separate component so it fully unmounts/remounts on each open —
// this resets backdropEnabled to false on every open, preventing ghost taps.
function ModalInner({
  name, setName, email, setEmail, message, setMessage,
  status, errorMsg, honeypotRef, onClose, onSubmit,
}: {
  name: string; setName: (v: string) => void;
  email: string; setEmail: (v: string) => void;
  message: string; setMessage: (v: string) => void;
  status: string; errorMsg: string;
  honeypotRef: React.RefObject<HTMLInputElement | null>;
  onClose: () => void;
  onSubmit: (e: { preventDefault(): void }) => void;
}) {
  // Starts false on every mount — backdrop is inert for 450ms to block iOS ghost taps.
  const [backdropEnabled, setBackdropEnabled] = useState(false);

  useEffect(() => {
    // No auto-focus — on iOS Safari, focus() triggers keyboard which shrinks the
    // viewport and shifts position:fixed elements, making the modal appear to vanish.
    const t = setTimeout(() => setBackdropEnabled(true), 450);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    // Single element = backdrop + centering container.
    // onClick only fires when backdropEnabled — safe against ghost taps.
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4"
      onClick={backdropEnabled ? onClose : undefined}
      aria-hidden="true"
    >
      {/* Modal panel — child of the wrapper, so stopPropagation actually works */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="w-full max-w-lg bg-[#0d0d14] border border-[#1e1e30] rounded-2xl shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Form Kontak Pixelin"
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />

        {/* Corner pixels */}
        {["top-3 left-3", "top-3 right-12", "bottom-3 left-3", "bottom-3 right-3"].map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos} w-1.5 h-1.5 rounded-sm pointer-events-none`}
            style={{ background: i % 2 === 0 ? "#6366f1" : "#22d3ee", opacity: 0.5 }}
          />
        ))}

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#1e1e30]">
          <div>
            <h2 className="text-lg font-bold text-white">Kirim Pesan</h2>
            <p className="text-xs text-slate-500 mt-0.5">Kami balas dalam 24 jam</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-[#1e1e30] transition-all"
            aria-label="Tutup modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {status === "success" ? (
            <SuccessState onClose={onClose} />
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-4">
              <input
                ref={honeypotRef}
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="absolute opacity-0 pointer-events-none -z-10 w-0 h-0"
                aria-hidden="true"
              />

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Nama <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama kamu"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#11111c] border border-[#1e1e30] text-white text-sm placeholder-slate-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Email <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@kamu.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#11111c] border border-[#1e1e30] text-white text-sm placeholder-slate-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Ceritakan kebutuhanmu <span className="text-rose-400">*</span>
                </label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Saya butuh landing page untuk bisnis X, target launch bulan ini..."
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#11111c] border border-[#1e1e30] text-white text-sm placeholder-slate-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all resize-none"
                />
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs">
                  <AlertCircle size={14} className="shrink-0" />
                  {errorMsg || "Gagal mengirim. Coba lagi."}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Kirim Pesan
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-600">
                Atau langsung WhatsApp{" "}
                <a
                  href="https://wa.me/6281290391717"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
                >
                  di sini
                </a>
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-8 text-center"
    >
      <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mx-auto mb-4">
        <CheckCircle size={28} className="text-emerald-400" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">Pesan terkirim!</h3>
      <p className="text-sm text-slate-400 max-w-xs mx-auto mb-6">
        Terima kasih sudah menghubungi kami. Kami akan balas dalam 24 jam.
      </p>
      <button
        onClick={onClose}
        className="px-6 py-2.5 rounded-xl bg-[#1e1e30] hover:bg-[#252538] text-slate-300 hover:text-white text-sm font-semibold transition-all"
      >
        Tutup
      </button>
    </motion.div>
  );
}
