import React from 'react';

/**
 * Avatar común de estilo Rubber Hose de los años 30.
 * Ilustración vectorial limpia, perfectamente circular y sin bordes recortados.
 */
export default function RubberAvatar({ size = 36, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Círculo base con pergamino/marfil suave y trazo negro entintado */}
      <circle cx="24" cy="24" r="21" fill="#FFFDF8" stroke="#1E1B18" strokeWidth="2.8" />

      {/* Ojo izquierdo Rubber Hose con pupila pie-cut */}
      <g>
        <ellipse cx="17" cy="19" rx="4.2" ry="6.2" fill="#1E1B18" />
        <polygon points="17,19 13.5,17.2 13.8,20.2" fill="#FFFDF8" />
        <path d="M13 11 C15 9.5 18.5 10.2 20 11.8" stroke="#1E1B18" strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>

      {/* Ojo derecho Rubber Hose con pupila pie-cut */}
      <g>
        <ellipse cx="31" cy="19" rx="4.2" ry="6.2" fill="#1E1B18" />
        <polygon points="31,19 27.5,17.2 27.8,20.2" fill="#FFFDF8" />
        <path d="M28 11.8 C29.5 10.2 33 9.5 35 11" stroke="#1E1B18" strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>

      {/* Nariz de botón */}
      <circle cx="24" cy="23.2" r="2.2" stroke="#1E1B18" strokeWidth="2" fill="#FFFDF8" />

      {/* Sonrisa alegre abierta de caricatura */}
      <path d="M14 27.5 C16 35 32 35 34 27.5" fill="#1E1B18" stroke="#1E1B18" strokeWidth="2.4" strokeLinecap="round" />
      {/* Lengüita */}
      <path d="M19.5 32 C21.8 30 26.2 30 28.5 32 C27 34 21 34 19.5 32 Z" fill="#E86A61" />
      {/* Hoyuelo izquierdo */}
      <path d="M12.5 26 C13 28 14.2 29 15 29.5" stroke="#1E1B18" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Hoyuelo derecho */}
      <path d="M35.5 26 C35 28 33.8 29 33 29.5" stroke="#1E1B18" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

