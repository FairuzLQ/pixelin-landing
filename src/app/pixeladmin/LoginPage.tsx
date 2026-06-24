"use client";

import { useState } from "react";
import { Loader2, LogIn } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (res.ok) {
      window.location.reload();
    } else {
      const data = await res.json();
      setError(data.error ?? "Login gagal");
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center px-4 pixel-grid-bg">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="4" fill="#11111c" />
            {[[2,2],[3,2],[4,2],[2,3],[4,3],[2,4],[3,4],[4,4],[2,5],[2,6],[6,2],[6,6]].map(([c,r],i)=>(
              <rect key={i} x={c*4} y={r*4} width="3" height="3" fill={i>=10?"#22d3ee":"#818cf8"} rx="0.5"/>
            ))}
          </svg>
          <span className="font-bold text-xl text-white tracking-tight">Pixelin<span className="text-indigo-400">.</span></span>
        </div>

        <div className="bg-[#0d0d14] border border-[#1e1e30] rounded-2xl p-7 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

          <h1 className="text-lg font-bold text-white mb-1">Admin Panel</h1>
          <p className="text-sm text-slate-500 mb-6">Login untuk mengelola konten website.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pixelin.id"
                className="w-full px-4 py-2.5 rounded-xl bg-[#11111c] border border-[#1e1e30] text-white text-sm placeholder-slate-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-[#11111c] border border-[#1e1e30] text-white text-sm placeholder-slate-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            {error && (
              <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold text-sm transition-all"
            >
              {loading ? <Loader2 size={15} className="animate-spin" /> : <LogIn size={15} />}
              {loading ? "Memverifikasi..." : "Masuk"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-700 mt-4">
          Halaman ini tidak diindeks oleh mesin pencari.
        </p>
      </div>
    </div>
  );
}
