import React from 'react';
import PelusaCard from './PelusaCard';

const AVATAR_COLORS = [
  'linear-gradient(135deg, #f43f5e, #e11d48)',
  'linear-gradient(135deg, #0ea5e9, #0284c7)',
  'linear-gradient(135deg, #10b981, #059669)',
  'linear-gradient(135deg, #f59e0b, #d97706)',
  'linear-gradient(135deg, #8b5cf6, #7c3aed)',
  'linear-gradient(135deg, #ec4899, #db2777)',
];

/**
 * RivalsTopBar: Paneles superiores compactos para mostrar las colecciones de los rivales.
 * Muestra el avatar, nombre, puntuación guardada y las cartas en riesgo que pueden ser robadas.
 */
export default function RivalsTopBar({ rivals = [], _activePlayerIndex, allPlayers = [] }) {
  if (!rivals || rivals.length === 0) return null;

  return (
    <div className="rivals-top-bar" aria-label="Colecciones de Rivales">
      <div className="rivals-bar-header">
        <span className="rivals-bar-title">👥 Rivales en la Mesa</span>
        <span className="rivals-bar-hint">¡Roba sus cartas sacando el mismo número!</span>
      </div>

      <div className="rivals-panels-list">
        {rivals.map((rival) => {
          const originalIndex = allPlayers.findIndex((p) => p.id === rival.id);
          const avatarColor = AVATAR_COLORS[(originalIndex >= 0 ? originalIndex : 0) % AVATAR_COLORS.length];
          const initial = rival.name ? rival.name.charAt(0).toUpperCase() : '?';

          // Agrupar cartas delante por valor
          const groupedInFront = (rival.cardsInFront || []).reduce((acc, card) => {
            acc[card.value] = (acc[card.value] || 0) + 1;
            return acc;
          }, {});

          return (
            <div
              key={rival.id}
              className="rival-compact-panel"
            >
              <div className="rival-panel-header">
                <div className="rival-avatar" style={{ background: avatarColor }}>
                  {initial}
                </div>
                <div className="rival-info">
                  <div className="rival-name">{rival.name}</div>
                  <div className="rival-score-tag">
                    <span className="score-star">⭐</span>
                    <span className="score-val">{rival.score || 0} pts</span>
                    <span className="banked-count">({rival.bankedCardsCount || 0} seguras)</span>
                  </div>
                </div>
              </div>

              {/* Cartas en riesgo del rival */}
              <div className="rival-cards-preview">
                <div className="rival-cards-label">
                  <span>En riesgo ({rival.cardsInFrontCount || 0})</span>
                </div>
                <div className="rival-cards-strip">
                  {rival.cardsInFrontCount === 0 ? (
                    <span className="rival-no-cards">Sin cartas expuestas</span>
                  ) : (
                    Object.entries(groupedInFront).map(([value, count]) => (
                      <PelusaCard
                        key={value}
                        value={Number(value)}
                        count={count}
                        isCompact
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
