"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Eraser, Trash2, Download, Shuffle } from "lucide-react";

const GRID = 20;
const CELL = 22;

const PALETTE = [
  "#818cf8", // indigo
  "#22d3ee", // cyan
  "#f472b6", // pink
  "#34d399", // green
  "#f59e0b", // amber
  "#fb7185", // rose
  "#a78bfa", // violet
  "#60a5fa", // blue
  "#ffffff", // white
  "#94a3b8", // slate
  "#1e1e30", // dark
  "#050508", // black
];

const TEMPLATES = [
  // House
  [
    "....................",
    ".........RR.........",
    "........RRRR........",
    ".......RRRRRR.......",
    "......RRRRRRRR......",
    ".....RRRRRRRRRR.....",
    "....RRRRRRRRRRRR....",
    "...WWWWWWWWWWWWWW...",
    "...WWWWWWWWWWWWWW...",
    "...WWWBBBBWWWWWWW...",
    "...WWWBBBBWWWWWWW...",
    "...WWWBBBBWWWWWWW...",
    "...WWWWWWWWDDDDWW...",
    "...WWWWWWWWDDDDWW...",
    "...WWWWWWWWDDDDWW...",
    ".....................",
    ".....................",
    ".....................",
    ".....................",
    ".....................",
  ],
  // Rocket
  [
    ".....................",
    ".....................",
    ".........CC.........",
    "........CCCC........",
    ".......CCCCCC.......",
    ".......CCCCCC.......",
    "......CCWWWWCC......",
    "......CCWLLWCC......",
    "......CCWLLWCC......",
    "......CCWWWWCC......",
    ".......CCCCCC.......",
    ".......CCCCCC.......",
    ".......GCCCCG.......",
    "......GGCCCCGG......",
    ".......FFFFFF.......",
    ".......FFFFFF.......",
    ".......FFFFFF.......",
    ".....................",
    ".....................",
    ".....................",
  ],
];

const TEMPLATE_COLORS: Record<string, string> = {
  "R": "#ef4444", "W": "#f1f5f9", "B": "#60a5fa", "D": "#92400e",
  "C": "#818cf8", "L": "#a5f3fc", "G": "#6b7280", "F": "#f59e0b",
  ".": "",
};

function initGrid() {
  return Array.from({ length: GRID }, () => Array(GRID).fill(""));
}

function loadTemplate(index: number) {
  const tmpl = TEMPLATES[index];
  return Array.from({ length: GRID }, (_, r) =>
    Array.from({ length: GRID }, (_, c) => {
      const ch = tmpl[r]?.[c] ?? ".";
      return TEMPLATE_COLORS[ch] ?? "";
    })
  );
}

export default function PixelGameSection() {
  const [grid, setGrid] = useState<string[][]>(initGrid);
  const [color, setColor] = useState(PALETTE[0]);
  const [erasing, setErasing] = useState(false);
  const [painting, setPainting] = useState(false);
  const [templateIdx, setTemplateIdx] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const paint = useCallback(
    (r: number, c: number) => {
      setGrid((prev) => {
        const next = prev.map((row) => [...row]);
        next[r][c] = erasing ? "" : color;
        return next;
      });
    },
    [color, erasing]
  );

  const handleMouseDown = (r: number, c: number) => {
    setPainting(true);
    paint(r, c);
  };
  const handleMouseEnter = (r: number, c: number) => {
    if (painting) paint(r, c);
  };

  useEffect(() => {
    const up = () => setPainting(false);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
  }, []);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = GRID * 10;
    canvas.height = GRID * 10;
    ctx.fillStyle = "#050508";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    grid.forEach((row, r) =>
      row.forEach((c, col) => {
        if (c) {
          ctx.fillStyle = c;
          ctx.fillRect(col * 10, r * 10, 10, 10);
        }
      })
    );
    const link = document.createElement("a");
    link.download = "pixelin-art.png";
    link.href = canvas.toDataURL();
    link.click();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const nextTemplate = () => {
    const next = (templateIdx + 1) % TEMPLATES.length;
    setTemplateIdx(next);
    setGrid(loadTemplate(next));
  };

  return (
    <section id="game" className="py-28 px-6 relative">
      <div className="absolute inset-0 pixel-grid-bg opacity-30 pointer-events-none" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/25 bg-pink-500/8 text-pink-300 text-xs font-semibold mb-4 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            Mini Game
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Pixel Art Studio
          </h2>
          <p className="text-slate-400 text-base max-w-md mx-auto">
            Udah capek baca? Santai dulu. Gambar pixel art di sini — bisa dari scratch atau pakai template.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col lg:flex-row gap-6 items-start justify-center"
        >
          {/* Canvas */}
          <div className="relative select-none rounded-2xl overflow-hidden neon-border bg-[#0d0d14] p-4">
            <div
              className="grid cursor-crosshair"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${GRID}, ${CELL}px)`,
                gridTemplateRows: `repeat(${GRID}, ${CELL}px)`,
                gap: "1px",
                background: "#1e1e30",
                border: "1px solid #1e1e30",
              }}
              onMouseLeave={() => setPainting(false)}
            >
              {grid.map((row, r) =>
                row.map((cellColor, c) => (
                  <div
                    key={`${r}-${c}`}
                    className="transition-colors duration-75"
                    style={{
                      width: CELL,
                      height: CELL,
                      backgroundColor: cellColor || "#050508",
                      cursor: erasing ? "cell" : "crosshair",
                    }}
                    onMouseDown={() => handleMouseDown(r, c)}
                    onMouseEnter={() => handleMouseEnter(r, c)}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      setPainting(true);
                      paint(r, c);
                    }}
                    onTouchMove={(e) => {
                      e.preventDefault();
                      const touch = e.touches[0];
                      const el = document.elementFromPoint(touch.clientX, touch.clientY);
                      if (el) {
                        const target = el as HTMLElement;
                        const row2 = parseInt(target.dataset.row ?? "");
                        const col2 = parseInt(target.dataset.col ?? "");
                        if (!isNaN(row2) && !isNaN(col2)) paint(row2, col2);
                      }
                    }}
                    data-row={r}
                    data-col={c}
                  />
                ))
              )}
            </div>
          </div>

          {/* Controls panel */}
          <div className="flex flex-col gap-4 min-w-52">
            {/* Tools */}
            <div className="rounded-xl bg-[#0d0d14] border border-[#1e1e30] p-4">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-3">Tools</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setErasing(false)}
                  className={`flex items-center gap-2 flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    !erasing
                      ? "bg-indigo-600 text-white"
                      : "bg-[#11111c] text-slate-400 hover:text-white border border-[#1e1e30]"
                  }`}
                >
                  <span className="w-3 h-3 rounded-sm" style={{ background: color }} />
                  Draw
                </button>
                <button
                  onClick={() => setErasing(true)}
                  className={`flex items-center gap-2 flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    erasing
                      ? "bg-rose-600 text-white"
                      : "bg-[#11111c] text-slate-400 hover:text-white border border-[#1e1e30]"
                  }`}
                >
                  <Eraser size={12} />
                  Erase
                </button>
              </div>
            </div>

            {/* Palette */}
            <div className="rounded-xl bg-[#0d0d14] border border-[#1e1e30] p-4">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-3">Colors</p>
              <div className="grid grid-cols-6 gap-1.5">
                {PALETTE.map((c) => (
                  <button
                    key={c}
                    className="rounded transition-all duration-150 hover:scale-110"
                    style={{
                      width: 28,
                      height: 28,
                      backgroundColor: c,
                      border: color === c && !erasing ? "2px solid white" : "2px solid transparent",
                      boxShadow: color === c && !erasing ? `0 0 8px ${c}80` : "none",
                    }}
                    onClick={() => {
                      setColor(c);
                      setErasing(false);
                    }}
                    aria-label={`Color ${c}`}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="rounded-xl bg-[#0d0d14] border border-[#1e1e30] p-4">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-3">Actions</p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={nextTemplate}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#11111c] text-slate-300 hover:text-white text-xs font-semibold border border-[#1e1e30] hover:border-slate-600 transition-all"
                >
                  <Shuffle size={12} />
                  Load Template
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/40 text-xs font-semibold border border-indigo-500/30 transition-all"
                >
                  <Download size={12} />
                  Download PNG
                </button>
                <button
                  onClick={() => setGrid(initGrid())}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#11111c] text-slate-500 hover:text-rose-400 text-xs font-semibold border border-[#1e1e30] hover:border-rose-900/50 transition-all"
                >
                  <Trash2 size={12} />
                  Clear All
                </button>
              </div>
            </div>

            {/* Hint */}
            <p className="text-xs text-slate-600 text-center px-2 leading-relaxed">
              Klik & drag untuk gambar. Coba load template dulu untuk inspirasi!
            </p>
          </div>
        </motion.div>

        {/* Download toast */}
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-xl z-50"
          >
            Pixel art tersimpan!
          </motion.div>
        )}

        {/* Hidden canvas for download */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </section>
  );
}
