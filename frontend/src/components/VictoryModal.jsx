import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Crown, Layers, Plus, Eye } from 'lucide-react';

/**
 * VictoryModal: Modal editorial de fin de partida para el juego Pelusas.
 * Incluye celebración con canvas-confetti, resumen de posiciones y estadísticas.
 */
export default function VictoryModal({ isOpen, gameState, onClose, onNewGame }) {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
        });

        const timer1 = setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
          });
        }, 250);

        const timer2 = setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
          });
        }, 400);

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      } catch {
        // Ignorar si canvas no está disponible
      }
    }
  }, [isOpen]);

  if (!isOpen || !gameState) return null;

  const winnerNames = gameState.winnerNames || [];
  const players = gameState.players || [];

  // Ordenar jugadores por puntuación descendente, desempatando por cartas acumuladas
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score || b.bankedCardsCount - a.bankedCardsCount);

  return (
    <div className="modal-overlay" data-testid="victory-modal">
      <div className="modal-card victory-card">
        {/* Cabecera con trofeo Rubber Hose */}
        <div className="victory-trophy-wrap">
          <div className="victory-rubber-trophy-circle">
            <img
              src="/rubberhose/trophy-character.png"
              alt="Trofeo Campeón"
              className="victory-rubber-trophy-img"
            />
          </div>
        </div>

        <h2 className="victory-title">
          ¡Partida Finalizada!
        </h2>

        <div className="victory-winner-banner">
          <div className="winner-label-row">
            <Crown size={18} className="crown-icon" />
            <span>{winnerNames.length > 1 ? 'Empate de Campeones' : '¡Tenemos Campeón!'}</span>
          </div>
          <div className="winner-names-highlight">
            {winnerNames.join(' & ')}
          </div>
        </div>

        {/* Podio y desglose de jugadores */}
        <div className="victory-podium-section">
          <div className="podium-section-title">Clasificación Final</div>
          <div className="podium-player-list">
            {sortedPlayers.map((player, index) => {
              const isWinner = index === 0 || winnerNames.includes(player.name);
              const rankLabel = index === 0 ? '1.º' : index === 1 ? '2.º' : index === 2 ? '3.º' : `${index + 1}.º`;

              return (
                <div
                  key={player.id}
                  className={`podium-row ${isWinner ? 'podium-winner-row' : ''}`}
                >
                  <div className="podium-player-info">
                    <span className={`podium-rank-badge ${isWinner ? 'rank-winner' : ''}`}>{rankLabel}</span>
                    <span className="podium-player-name">{player.name}</span>
                    {isWinner && (
                      <span className="winner-tag">
                        <Sparkles size={12} />
                        <span>Ganador</span>
                      </span>
                    )}
                  </div>

                  <div className="podium-player-stats">
                    <span className="podium-cards-count">
                      <Layers size={13} />
                      <span>{player.bankedCardsCount} cartas</span>
                    </span>
                    <span className="podium-score">
                      <strong>{player.score}</strong> pts
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="modal-footer victory-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            <Eye size={16} />
            <span>Ver Tablero</span>
          </button>
          <button
            className="btn btn-primary"
            id="btn-play-again"
            data-testid="btn-play-again"
            onClick={onNewGame}
          >
            <Plus size={16} />
            <span>Nueva Partida</span>
          </button>
        </div>
      </div>
    </div>
  );
}

