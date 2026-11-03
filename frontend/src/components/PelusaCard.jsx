import React, { useState } from 'react';
import PelusaMonster from './PelusaMonster';

/**
 * PelusaCard: Renderiza la carta original de Pelusas (valores 1 al 10)
 * preservando fielmente la ilustración completa sin degradados, filtros
 * ni alteraciones, e incorporando el borde negro uniforme de 2px solid #171717
 * con esquinas redondeadas adaptadas a su forma.
 */
export default function PelusaCard({
  value,
  count = 1,
  isLarge = false,
  isCompact = false,
  onClick,
  isAnimated = false,
}) {
  const cardVal = Number(value) || 1;
  const [imageError, setImageError] = useState(false);

  const sizeClass = isLarge ? 'pelusa-card-lg' : isCompact ? 'pelusa-card-compact' : 'pelusa-card-md';
  const cardClass = `pelusa-card ${imageError ? `card-fallback card-val-${cardVal}` : 'card-official'} ${sizeClass} ${isAnimated ? 'pelusa-card-animated' : ''}`;
  const monsterSize = isLarge ? 82 : isCompact ? 36 : 58;

  return (
    <div
      className={cardClass}
      onClick={onClick}
      data-testid={`card-${cardVal}`}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
    >
      {/* Ilustración oficial original intacta */}
      {!imageError ? (
        <img
          src={`/cards/card-${cardVal}.png`}
          alt={`Pelusa ${cardVal}`}
          className="pelusa-official-card-img"
          onError={() => setImageError(true)}
          loading="eager"
        />
      ) : (
        /* Fallback vectorial solo si la imagen no puede cargarse */
        <>
          <div className="pelusa-card-header">
            <div className="pelusa-furry-number-wrap">
              <span className="pelusa-card-val">{cardVal}</span>
            </div>
            {!isCompact && <span className="pelusa-card-sub">pelusa</span>}
          </div>
          <div className="pelusa-monster-container">
            <PelusaMonster value={cardVal} size={monsterSize} />
          </div>
        </>
      )}

      {/* Badge de cantidad para cartas apiladas */}
      {count > 1 && (
        <span className="card-count-badge">
          x{count}
        </span>
      )}
    </div>
  );
}

