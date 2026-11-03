import React from 'react';

/**
 * CartoonGlove: Guantelete de caricatura Rubber Hose vintage de los años 30,
 * con silueta blanca limpia, contorno de tinta negra y las 3 costuras clásicas.
 */
export default function CartoonGlove({ className = '', flip = false, style = {} }) {
  return (
    <svg
      viewBox="0 0 44 44"
      width="26"
      height="26"
      className={`rubberhose-svg-glove ${className}`}
      style={{
        transform: flip ? 'scaleX(-1)' : undefined,
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        ...style,
      }}
      aria-hidden="true"
    >
      {/* Muñequera del guante */}
      <rect
        x="6"
        y="28"
        width="14"
        height="8"
        rx="3"
        fill="#FFFFFF"
        stroke="#1E1B18"
        strokeWidth="2.5"
      />
      {/* Palma y dedos clásicos estilo Mickey / Cuphead */}
      <path
        d="M 14 29 C 10 24 8 18 11 12 C 14 7 20 6 25 9 C 27 5 33 6 34 11 C 38 12 39 17 37 21 C 39 23 38 27 34 29 C 29 32 19 33 14 29 Z"
        fill="#FFFFFF"
        stroke="#1E1B18"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Dedo pulgar */}
      <path
        d="M 12 18 C 7 17 6 23 11 25 C 13 25 15 24 16 21"
        fill="#FFFFFF"
        stroke="#1E1B18"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* 3 costuras negras icónicas del guante Rubber Hose */}
      <line x1="21" y1="13" x2="21" y2="21" stroke="#1E1B18" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="26" y1="14" x2="26" y2="22" stroke="#1E1B18" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="31" y1="17" x2="30" y2="23" stroke="#1E1B18" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

