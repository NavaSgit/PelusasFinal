import React from 'react';

/**
 * PelusasLogo: Renderiza el logo oficial de 'PELUSAS' en estilo 'Rubber Hose',
 * con sus personajes originales y fondo completamente transparente.
 */
export default function PelusasLogo({ size = 'normal', className = '' }) {
  return (
    <div className={`pelusas-logo-frame logo-size-${size} ${className}`}>
      <img
        src="/pelusas-logo.png"
        alt="Pelusas Logo"
        className="pelusas-logo-img"
        draggable="false"
      />
    </div>
  );
}

