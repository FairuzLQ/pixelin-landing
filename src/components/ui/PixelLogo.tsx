"use client";

export default function PixelLogo({ size = 32 }: { size?: number }) {
  const pixel = size / 8;
  // P-I-X dot pixel art logo mark
  const pixels = [
    // outer square ring
    [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],
    [0,1],[7,1],
    [0,2],[7,2],
    [0,3],[7,3],
    [0,4],[7,4],
    [0,5],[7,5],
    [0,6],[7,6],
    [0,7],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],
    // inner P shape
    [2,2],[3,2],[4,2],
    [2,3],[4,3],
    [2,4],[3,4],[4,4],
    [2,5],
    // inner X cross
    [2,2],[4,2],
    [3,3],
    [2,4],[4,4],
  ];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      {/* Glow filter */}
      <defs>
        <filter id="pixelGlow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Background */}
      <rect width={size} height={size} rx={size * 0.1} fill="#0d0d14" />
      {/* Pixel grid */}
      {Array.from({ length: 6 }, (_, row) =>
        Array.from({ length: 6 }, (_, col) => {
          const px = (col + 1) * pixel;
          const py = (row + 1) * pixel;
          const isLit =
            (row === 0 && col >= 0 && col <= 3) ||
            (row === 1 && (col === 0 || col === 3)) ||
            (row === 2 && col >= 0 && col <= 2) ||
            (row === 0 && col === 0) ||
            (col === 5 && row === 0) ||
            (col === 3 && row === 0) ||
            (row === 3 && col === 0) ||
            (row === 3 && col === 5) ||
            (row === 0 && col === 5) ||
            false;
          return null;
        })
      )}
      {/* Simple pixel "P" mark */}
      {[
        [1,1],[2,1],[3,1],
        [1,2],[3,2],
        [1,3],[2,3],[3,3],
        [1,4],
        [1,5],
        // dot
        [5,5],
      ].map(([col, row], i) => (
        <rect
          key={i}
          x={col * pixel}
          y={row * pixel}
          width={pixel - 1}
          height={pixel - 1}
          fill={row === 5 && col === 5 ? "#22d3ee" : "#818cf8"}
          rx={0.5}
          filter="url(#pixelGlow)"
        />
      ))}
    </svg>
  );
}
