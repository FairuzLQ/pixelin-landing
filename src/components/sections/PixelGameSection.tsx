"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Eraser, Trash2, Download, Shuffle, Paintbrush, Zap } from "lucide-react";

// ─── Pixel Art Studio ────────────────────────────────────────────────────────

const ART_GRID = 20;
const PALETTE = [
  "#818cf8","#22d3ee","#f472b6","#34d399","#f59e0b",
  "#fb7185","#a78bfa","#60a5fa","#ffffff","#94a3b8","#1e1e30","#050508",
];
const TEMPLATES = [
  // Rocket
  [
    "....................",".........RR.........",".......RRRRRR.......",
    "......RRRRRRRR......",".....RRRRRRRRRR.....",
    "....RRRRRRRRRRRR....","...WWWWWWWWWWWWWW...",
    "...WWWWWWWWWWWWWW...","...WWWBBBBWWWWWWW...",
    "...WWWBBBBWWWWWWW...","...WWWBBBBWWWWWWW...",
    "...WWWWWWWWDDDDWW...","...WWWWWWWWDDDDWW...",
    "...WWWWWWWWDDDDWW...",
    "....................","....................","....................","....................","....................",".....................",
  ],
  // Robot
  [
    ".....................",".....................","..........CC.........",
    ".........CCCC........","........CCCCCC.......",
    "........CCCCCC.......","......CCWWWWWCC......",
    "......CCWLLLLWCC.....","......CCWLLLLWCC.....",
    "......CCWWWWWCC......","........CCCCCC.......",
    "........CCCCCC.......","........GCCCCG.......",
    ".......GGCCCCGG......",".........FFFF........",
    ".........FFFF........",".........FFFF........",
    ".....................","......................",...[".....................", "....................."],
  ],
  // Heart
  [
    "....................","....................","....................",
    "......HH..HH........",
    ".....HHHHHHHH.......",
    ".....HHHHHHHH.......",
    "......HHHHHH........",
    ".......HHHH.........",
    "........HH..........",
    "....................","....................","....................","....................","....................","....................","....................","....................","....................","....................",".....................",
  ],
  // Space Alien
  [
    "....................","....................",
    ".......A.....A......",
    ".....AAAAAAAAAAA....",
    ".....AAEAAAAEAAA....",
    "....AAAAAAAAAAAAA...",
    "....A.AAAAAAAAA.A...",
    ".....A...........A..",
    "....................","....................","....................","....................","....................","....................","....................","....................","....................","....................","....................",".....................",
  ],
  // Crystal Diamond
  [
    "....................","....................","....................",
    ".........KK.........",
    "........KKKK........",
    ".......LKKKKL.......",
    "......LKKKKKKKL.....",
    ".....LKKKKKKKKKKL...",
    "......LKKKKKKKL.....",
    ".......LKKKKL.......",
    "........LKKL........",
    ".........KK.........",
    "....................","....................","....................","....................","....................","....................","....................",".....................",
  ],
  // Pixel Sword
  [
    "....................","....................","..........SS........","..........SS........",
    ".........SSSS.......",
    "..........SS........","..........SS........","..........SS........","..........SS........","..........SS........",
    ".....SSSSSSSSS......",
    "..........SS........",
    ".........DDSS.......",
    ".........DDSS.......",
    ".........DDSS.......",
    ".........FFFF.......",
    "....................","....................","....................",".....................",
  ],
];
const TEMPLATE_COLORS: Record<string, string> = {
  R:"#ef4444",W:"#f1f5f9",B:"#60a5fa",D:"#92400e",
  C:"#818cf8",L:"#a5f3fc",G:"#6b7280",F:"#f59e0b",
  H:"#f472b6",A:"#34d399",E:"#0d0d14",K:"#22d3ee",
  S:"#94a3b8",".":"",
};

function initArtGrid() {
  return Array.from({ length: ART_GRID }, () => Array(ART_GRID).fill(""));
}
function loadTemplate(idx: number) {
  const tmpl = TEMPLATES[idx % TEMPLATES.length];
  return Array.from({ length: ART_GRID }, (_, r) =>
    Array.from({ length: ART_GRID }, (_, c) => {
      const ch = tmpl[r]?.[c] ?? ".";
      return TEMPLATE_COLORS[ch] ?? "";
    })
  );
}

function PixelArtStudio() {
  const [grid, setGrid] = useState<string[][]>(initArtGrid);
  const [color, setColor] = useState(PALETTE[0]);
  const [erasing, setErasing] = useState(false);
  const [painting, setPainting] = useState(false);
  const [templateIdx, setTemplateIdx] = useState(0);
  const [toast, setToast] = useState(false);
  const [cellSize, setCellSize] = useState(18);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Responsive cell size
  useEffect(() => {
    const calc = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth - 32;
      const size = Math.max(13, Math.min(22, Math.floor((w - ART_GRID + 1) / ART_GRID)));
      setCellSize(size);
    };
    calc();
    const ro = new ResizeObserver(calc);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const paint = useCallback((r: number, c: number) => {
    setGrid(prev => {
      const next = prev.map(row => [...row]);
      next[r][c] = erasing ? "" : color;
      return next;
    });
  }, [color, erasing]);

  useEffect(() => {
    const up = () => setPainting(false);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => { window.removeEventListener("mouseup", up); window.removeEventListener("touchend", up); };
  }, []);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = ART_GRID * 10;
    canvas.height = ART_GRID * 10;
    ctx.fillStyle = "#050508";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    grid.forEach((row, r) => row.forEach((c, col) => { if (c) { ctx.fillStyle = c; ctx.fillRect(col*10, r*10, 10, 10); } }));
    const link = document.createElement("a");
    link.download = "pixelin-art.png";
    link.href = canvas.toDataURL();
    link.click();
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 items-start justify-center">
      {/* Canvas */}
      <div ref={containerRef} className="w-full lg:w-auto">
        <div
          className="select-none rounded-xl overflow-hidden border border-[#1e1e30] mx-auto"
          style={{ width: "fit-content" }}
          onMouseLeave={() => setPainting(false)}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${ART_GRID}, ${cellSize}px)`,
              gridTemplateRows: `repeat(${ART_GRID}, ${cellSize}px)`,
              gap: "1px",
              background: "#1e1e30",
            }}
          >
            {grid.map((row, r) =>
              row.map((cellColor, c) => (
                <div
                  key={`${r}-${c}`}
                  data-row={r}
                  data-col={c}
                  style={{ width: cellSize, height: cellSize, backgroundColor: cellColor || "#050508", cursor: erasing ? "cell" : "crosshair" }}
                  onMouseDown={() => { setPainting(true); paint(r, c); }}
                  onMouseEnter={() => { if (painting) paint(r, c); }}
                  onTouchStart={(e) => { e.preventDefault(); setPainting(true); paint(r, c); }}
                  onTouchMove={(e) => {
                    e.preventDefault();
                    const t = e.touches[0];
                    const el = document.elementFromPoint(t.clientX, t.clientY) as HTMLElement;
                    const row2 = parseInt(el?.dataset.row ?? "");
                    const col2 = parseInt(el?.dataset.col ?? "");
                    if (!isNaN(row2) && !isNaN(col2)) paint(row2, col2);
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-row lg:flex-col gap-3 flex-wrap lg:min-w-48 w-full lg:w-auto">
        {/* Tools */}
        <div className="rounded-xl bg-[#0d0d14] border border-[#1e1e30] p-3 flex-1 lg:flex-none">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Tools</p>
          <div className="flex gap-2">
            <button onClick={() => setErasing(false)} className={`flex items-center gap-1.5 flex-1 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${!erasing ? "bg-indigo-600 text-white" : "bg-[#11111c] text-slate-400 border border-[#1e1e30]"}`}>
              <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: color }} />
              Draw
            </button>
            <button onClick={() => setErasing(true)} className={`flex items-center gap-1.5 flex-1 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${erasing ? "bg-rose-600 text-white" : "bg-[#11111c] text-slate-400 border border-[#1e1e30]"}`}>
              <Eraser size={11} />
              Erase
            </button>
          </div>
        </div>

        {/* Palette */}
        <div className="rounded-xl bg-[#0d0d14] border border-[#1e1e30] p-3 flex-1 lg:flex-none">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Colors</p>
          <div className="grid grid-cols-6 gap-1">
            {PALETTE.map((c) => (
              <button
                key={c}
                onClick={() => { setColor(c); setErasing(false); }}
                className="rounded transition-all hover:scale-110"
                style={{ width: 26, height: 26, backgroundColor: c, border: color === c && !erasing ? "2px solid white" : "2px solid transparent", boxShadow: color === c && !erasing ? `0 0 8px ${c}80` : "none" }}
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="rounded-xl bg-[#0d0d14] border border-[#1e1e30] p-3 flex-1 lg:flex-none">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Actions</p>
          <div className="flex flex-col gap-1.5">
            <button onClick={() => { setTemplateIdx(i => (i+1) % TEMPLATES.length); setGrid(loadTemplate((templateIdx+1) % TEMPLATES.length)); }} className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-[#11111c] text-slate-300 hover:text-white text-xs font-semibold border border-[#1e1e30] hover:border-slate-600 transition-all">
              <Shuffle size={11} />Template
            </button>
            <button onClick={handleDownload} className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/40 text-xs font-semibold border border-indigo-500/30 transition-all">
              <Download size={11} />Download
            </button>
            <button onClick={() => setGrid(initArtGrid())} className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-[#11111c] text-slate-500 hover:text-rose-400 text-xs font-semibold border border-[#1e1e30] transition-all">
              <Trash2 size={11} />Clear
            </button>
          </div>
        </div>
      </div>

      {toast && (
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-xl z-50">
          Pixel art tersimpan!
        </motion.div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

// ─── Pixel Catch Game ─────────────────────────────────────────────────────────

const CATCH_GRID = 6;
const CATCH_COLORS = ["#818cf8","#22d3ee","#f472b6","#34d399","#f59e0b","#fb7185"];

function PixelCatchGame() {
  const [phase, setPhase] = useState<"idle"|"playing"|"over">("idle");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [highScore, setHighScore] = useState(0);
  const [activeCell, setActiveCell] = useState<{r:number;c:number;color:string}|null>(null);
  const [progress, setProgress] = useState(100);
  const [round, setRound] = useState(0);
  const [missFlash, setMissFlash] = useState(false);

  // Refs to avoid stale closures
  const catchedRef = useRef(false);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const phaseRef = useRef<"idle"|"playing"|"over">("idle");

  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { livesRef.current = lives; }, [lives]);
  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => {
    const saved = localStorage.getItem("pixelin-catch-hs");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  // Spawn logic — triggers on round change while playing
  useEffect(() => {
    if (phaseRef.current !== "playing") return;

    catchedRef.current = false;
    const r = Math.floor(Math.random() * CATCH_GRID);
    const c = Math.floor(Math.random() * CATCH_GRID);
    const color = CATCH_COLORS[Math.floor(Math.random() * CATCH_COLORS.length)];
    setActiveCell({ r, c, color });
    setProgress(100);

    const expireMs = Math.max(500, 1600 - scoreRef.current * 30);
    const startTime = Date.now();

    const progressTick = setInterval(() => {
      setProgress(Math.max(0, (1 - (Date.now() - startTime) / expireMs) * 100));
    }, 50);

    const expireTimeout = setTimeout(() => {
      clearInterval(progressTick);
      if (catchedRef.current) return;
      // Miss
      setActiveCell(null);
      setMissFlash(true);
      setTimeout(() => setMissFlash(false), 400);
      const newLives = livesRef.current - 1;
      livesRef.current = newLives;
      setLives(newLives);
      if (newLives <= 0) {
        phaseRef.current = "over";
        setPhase("over");
        const finalScore = scoreRef.current;
        setHighScore(prev => {
          const best = Math.max(prev, finalScore);
          localStorage.setItem("pixelin-catch-hs", best.toString());
          return best;
        });
      } else {
        setTimeout(() => setRound(v => v + 1), 350);
      }
    }, expireMs);

    return () => { clearInterval(progressTick); clearTimeout(expireTimeout); };
  }, [round]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCatch = (r: number, c: number) => {
    if (phaseRef.current !== "playing" || !activeCell || activeCell.r !== r || activeCell.c !== c) return;
    catchedRef.current = true;
    setActiveCell(null);
    const newScore = scoreRef.current + 1;
    scoreRef.current = newScore;
    setScore(newScore);
    setTimeout(() => setRound(v => v + 1), 120);
  };

  const startGame = () => {
    scoreRef.current = 0; livesRef.current = 3; phaseRef.current = "playing";
    setScore(0); setLives(3); setPhase("playing"); setActiveCell(null);
    setTimeout(() => setRound(v => v + 1), 400);
  };

  const level = Math.floor(score / 5) + 1;

  return (
    <div className="flex flex-col items-center gap-5 max-w-sm mx-auto">
      {/* Header stats */}
      <div className="w-full flex items-center justify-between px-1">
        <div className="flex items-center gap-1">
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i} className={`text-lg transition-all ${i < lives ? "opacity-100" : "opacity-20"}`}>❤️</span>
          ))}
        </div>
        <div className="text-center">
          <div className="text-2xl font-black gradient-text">{score}</div>
          <div className="text-xs text-slate-500">score</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-slate-400">Lv.{level}</div>
          <div className="text-xs text-slate-600">best: {highScore}</div>
        </div>
      </div>

      {/* Progress bar */}
      {phase === "playing" && activeCell && (
        <div className="w-full h-1.5 rounded-full bg-[#1e1e30] overflow-hidden">
          <div
            className="h-full rounded-full transition-none"
            style={{ width: `${progress}%`, background: progress > 50 ? "#22d3ee" : progress > 25 ? "#f59e0b" : "#fb7185" }}
          />
        </div>
      )}

      {/* Game grid */}
      <div
        className={`relative w-full rounded-2xl overflow-hidden border transition-all duration-200 ${missFlash ? "border-rose-500/60" : "border-[#1e1e30]"}`}
        style={{ background: missFlash ? "rgba(251,113,133,0.05)" : "#0d0d14", padding: "12px" }}
      >
        <div
          className="grid gap-1.5 sm:gap-2"
          style={{ gridTemplateColumns: `repeat(${CATCH_GRID}, 1fr)` }}
        >
          {Array.from({ length: CATCH_GRID }, (_, ri) =>
            Array.from({ length: CATCH_GRID }, (_, ci) => {
              const isActive = activeCell?.r === ri && activeCell?.c === ci;
              return (
                <button
                  key={`${ri}-${ci}`}
                  onClick={() => handleCatch(ri, ci)}
                  className={`aspect-square rounded-lg sm:rounded-xl transition-all duration-100 ${isActive ? "scale-90" : "scale-100"}`}
                  style={{
                    background: isActive ? activeCell!.color : "#11111c",
                    boxShadow: isActive ? `0 0 20px ${activeCell!.color}70, 0 0 40px ${activeCell!.color}30` : "none",
                    cursor: phase === "playing" ? "pointer" : "default",
                  }}
                />
              );
            })
          )}
        </div>

        {/* Overlay for idle/game over */}
        {phase !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0d14]/90 rounded-2xl gap-4 px-6 text-center">
            {phase === "over" ? (
              <>
                <div className="text-4xl font-black gradient-text">{score}</div>
                <p className="text-slate-400 text-sm">
                  {score >= highScore && score > 0 ? "🎉 New high score!" : `Best: ${highScore}`}
                </p>
                <button onClick={startGame} className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all">
                  Coba Lagi
                </button>
              </>
            ) : (
              <>
                <p className="text-slate-300 text-sm font-medium">Tap pixel yang nyala sebelum menghilang!</p>
                <p className="text-slate-500 text-xs">Makin tinggi score, makin cepat</p>
                <button onClick={startGame} className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-indigo-500/25">
                  Mulai Main
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <p className="text-xs text-slate-600 text-center">
        Setiap 5 poin naik level — pixel makin cepat hilang!
      </p>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function PixelGameSection() {
  const [tab, setTab] = useState<"art"|"catch">("art");

  return (
    <section id="game" className="py-28 px-6 relative">
      <div className="absolute inset-0 pixel-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/25 bg-pink-500/8 text-pink-300 text-xs font-semibold mb-4 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            Mini Games
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
            Santai dulu.
          </h2>
          <p className="text-slate-400 text-base max-w-md mx-auto">
            Udah baca sekilas tentang Pixelin? Main dulu.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="flex gap-1 p-1 rounded-xl bg-[#0d0d14] border border-[#1e1e30]">
            <button
              onClick={() => setTab("art")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === "art" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-slate-400 hover:text-white"}`}
            >
              <Paintbrush size={14} />
              Pixel Art
            </button>
            <button
              onClick={() => setTab("catch")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === "catch" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-slate-400 hover:text-white"}`}
            >
              <Zap size={14} />
              Pixel Catch
            </button>
          </div>
        </motion.div>

        {/* Game content */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {tab === "art" ? <PixelArtStudio /> : <PixelCatchGame />}
        </motion.div>
      </div>
    </section>
  );
}
