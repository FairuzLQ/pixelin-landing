"use client";

export default function FooterSection() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#1e1e30] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="4" fill="#11111c" />
            {[
              [2,2],[3,2],[4,2],[2,3],[4,3],[2,4],[3,4],[4,4],[2,5],[2,6],
              [6,2],[6,6],
            ].map(([c, r], i) => (
              <rect key={i} x={c*4} y={r*4} width="3" height="3" fill={i >= 10 ? "#22d3ee" : "#818cf8"} rx="0.5" />
            ))}
          </svg>
          <span className="font-bold text-white text-sm">
            Pixelin<span className="text-indigo-400">.</span>
          </span>
        </a>

        {/* Nav */}
        <nav className="flex items-center gap-6 text-xs text-slate-500">
          {[
            ["Services", "#services"],
            ["Work", "#work"],
            ["Why Us", "#why"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a key={href} href={href} className="hover:text-slate-300 transition-colors">
              {label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-xs text-slate-600">
          © {year} Pixelin. Pixel by pixel.
        </p>
      </div>
    </footer>
  );
}
