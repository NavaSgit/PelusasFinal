import React from 'react';

/**
 * PointsSack: Ilustración SVG del saco de puntos ("Montón de Puntos")
 * lleno de bolitas de pelusa coloridas / pompones como en el diseño de referencia.
 */
export default function PointsSack({ score = 0, _count = 0, size = 110 }) {
  return (
    <div className="points-sack-wrap" style={{ width: size, textAlign: 'center' }}>
      <svg
        width={size}
        height={size * 0.9}
        viewBox="0 0 120 108"
        className="points-sack-svg"
        aria-label="Saco de pelusas de puntos"
      >
        <defs>
          {/* Degradado del saco de cuero/tela cálido */}
          <linearGradient id="sackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8c582f" />
            <stop offset="60%" stopColor="#633917" />
            <stop offset="100%" stopColor="#48270e" />
          </linearGradient>
          {/* Cuello del saco */}
          <linearGradient id="sackRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4c270e" />
            <stop offset="50%" stopColor="#824e26" />
            <stop offset="100%" stopColor="#4c270e" />
          </linearGradient>
        </defs>

        {/* Bolitas de pelusa coloridas desbordándose por la abertura */}
        <g className="sack-pompons">
          {/* Fila trasera de pompones */}
          <circle cx="36" cy="30" r="10" fill="#f43f5e" />
          <circle cx="52" cy="22" r="11" fill="#facc15" />
          <circle cx="70" cy="24" r="10.5" fill="#38bdf8" />
          <circle cx="86" cy="30" r="10" fill="#ec4899" />
          {/* Fila delantera de pompones */}
          <circle cx="44" cy="33" r="9.5" fill="#22c55e" />
          <circle cx="61" cy="31" r="10" fill="#fb923c" />
          <circle cx="77" cy="34" r="9" fill="#a855f7" />
          <circle cx="53" cy="38" r="8.5" fill="#06b6d4" />
          {/* Texturas de felpa en las bolitas */}
          <circle cx="50" cy="20" r="3" fill="#fef08a" opacity="0.6" />
          <circle cx="68" cy="22" r="3" fill="#bae6fd" opacity="0.6" />
          <circle cx="42" cy="31" r="2.5" fill="#86efac" opacity="0.6" />
          <circle cx="59" cy="29" r="2.5" fill="#fed7aa" opacity="0.6" />
        </g>

        {/* Cuerpo del saco de cuero/arpillera */}
        <path
          d="M 28 42 C 22 55 12 72 16 90 C 20 102 36 106 60 106 C 84 106 100 102 104 90 C 108 72 98 55 92 42 C 86 38 74 36 60 36 C 46 36 34 38 28 42 Z"
          fill="url(#sackGrad)"
          stroke="#391b07"
          strokeWidth="3.5"
          filter="drop-shadow(0 6px 8px rgba(0,0,0,0.35))"
        />

        {/* Cuello fruncido / Dobladillo atado */}
        <path
          d="M 26 42 Q 60 48 94 42 Q 60 36 26 42 Z"
          fill="url(#sackRimGrad)"
          stroke="#391b07"
          strokeWidth="2.5"
        />

        {/* Costuras punteadas del saco (estilo artesanal) */}
        <path
          d="M 25 80 C 28 96 42 100 60 100 C 78 100 92 96 95 80"
          stroke="#f6d8ae"
          strokeWidth="2"
          strokeDasharray="4 4"
          fill="none"
          opacity="0.75"
        />

        {/* Cuerda / Lazada de atar */}
        <path d="M 38 43 Q 32 48 30 55" stroke="#f6d8ae" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 40 44 Q 44 50 48 56" stroke="#f6d8ae" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>

      {/* Rótulo y Puntuación dentro/bajo el saco */}
      <div className="sack-label-wrap">
        <div className="sack-title">Montón de Puntos</div>
        <div className="sack-score-num">
          <strong>{score}</strong> <span className="sack-score-unit">PTS</span>
        </div>
      </div>
    </div>
  );
}
