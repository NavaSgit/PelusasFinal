import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import PelusaCard from './PelusaCard';
import CartoonGlove from './CartoonGlove';

/**
 * TableCenter: Centro de la mesa de juego digital de Pelusas.
 * Estructura editorial en 3 zonas claras:
 *  1. Mazo para robar (con representación física limpia y borde negro uniforme).
 *  2. Carta actual y controles de acción (Robar carta y Plantarse).
 *  3. Zona de descarte de bustos.
 */
export default function TableCenter({
  gameState,
  onDraw,
  onBank,
  onStop,
  isLoading,
  isDealing = false,
  isBusting = false,
  bustEvent = null,
}) {
  if (!gameState) return null;

  const isRevealingBust = bustEvent?.phase === 'reveal';
  const showBustCard = Boolean(bustEvent && (isRevealingBust || !gameState.lastDrawnCard));

  const activePlayer = gameState.activePlayer;
  const canDraw = gameState.canDraw && !isLoading && !isRevealingBust;
  const canStop = gameState.canStop && !isLoading && !isRevealingBust;
  const canBank = gameState.canBank && !isLoading && !isRevealingBust;

  return (
    <div className="table-center-container">
      <div className={`game-table-card ${isRevealingBust ? 'table-bust-alert' : ''}`}>
        {/* 1. Mazo de Robo con personaje Rubber Hose */}
        <div className="deck-zone">
          <div className="zone-header-label">
            <span>MAZO DE ROBO</span>
          </div>

          <div className="deck-stack-wrapper">
            <div
              className={`deck-card-button deck-rubberhose-btn ${canDraw ? 'deck-active' : 'deck-disabled'}`}
              onClick={() => canDraw && onDraw()}
              id="btn-deck-draw"
              data-testid="deck-draw-trigger"
              role="button"
              tabIndex={canDraw ? 0 : -1}
            >
              <div className="deck-character-artwork">
                <img
                  src="/rubberhose/deck-character.png"
                  alt="Mazo de Pelusas"
                  className="rubberhose-deck-img"
                  draggable="false"
                />
              </div>
              <div className="deck-counter-badge rubber-counter-badge" data-testid="deck-count">
                {gameState.remainingDeckCards} cartas
              </div>
            </div>
          </div>
          <span className="zone-hint-text">Toca el mazo para sacar carta</span>
        </div>

        {/* 2. Área Central: Turno activo, Mesa/Carta y Botones Rubber Hose */}
        <div className="play-area-zone">
          {/* Indicador de turno actual */}
          <div className={`turn-indicator-pill rubberhose-turn-pill ${isRevealingBust ? 'turn-pill-bust' : ''}`}>
            <span className="turn-label">{isRevealingBust ? '¡Perdió el turno!:' : 'Turno de:'}</span>
            <strong className="turn-player-name" data-testid="active-player-name">
              {activePlayer?.name}
            </strong>
          </div>

          {/* Escaparate de la carta actual o Personaje de Mesa Animada */}
          <div className={`active-card-stage ${isDealing ? 'dealing-anim' : ''} ${isBusting ? 'busting-anim' : ''}`}>
            {showBustCard ? (
              <div
                className={`bust-card-showcase ${isRevealingBust ? 'bust-showcase-reveal' : 'bust-showcase-settled'}`}
                data-testid="bust-card-showcase"
              >
                <div className="drawn-card-wrapper bust-card-frame">
                  <PelusaCard value={bustEvent.drawnCard.value} isLarge isAnimated />
                  <div className="bust-stamp-overlay">¡PERDIÓ!</div>
                </div>

                <div className="bust-info-side">
                  <div className="bust-alert-badge" data-testid="bust-card-badge">
                    <AlertTriangle size={14} />
                    <span>¡CARTA REPETIDA!</span>
                  </div>

                  <div className="bust-details-caption">
                    <span className="bust-player-text">
                      <strong>{bustEvent.playerName}</strong> sacó otro <strong>{bustEvent.drawnCard.value}</strong> y perdió sus cartas
                    </span>
                    {bustEvent.lostCards?.length > 0 && (
                      <div className="bust-lost-cards-row">
                        <span className="bust-lost-label">Descartadas:</span>
                        <div className="bust-lost-pills">
                          {bustEvent.lostCards.map((c, idx) => (
                            <span
                              key={idx}
                              className={`bust-mini-card-pill ${c.value === bustEvent.drawnCard.value ? 'is-repeated-pill' : ''}`}
                            >
                              {c.value}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : gameState.lastDrawnCard ? (
              <div className="drawn-card-wrapper">
                <PelusaCard value={gameState.lastDrawnCard.value} isLarge />
              </div>
            ) : (
              <div className="drawn-card-placeholder rubberhose-table-stage">
                <div className="rubberhose-table-character-wrap">
                  <img
                    src="/rubberhose/table-character.png"
                    alt="Mesa lista para sacar carta"
                    className="rubberhose-table-character-img"
                    draggable="false"
                  />
                </div>
                <div className="mesa-pill-label">Mesa lista para sacar carta</div>
              </div>
            )}
          </div>

          {/* Botones de acción principales con manos Rubber Hose */}
          <div className="turn-actions-toolbar rubberhose-actions-toolbar">
            {canBank && (
              <button
                className="btn btn-bank-action btn-rubber-bank"
                id="btn-bank"
                data-testid="btn-bank"
                onClick={onBank}
                disabled={!canBank}
              >
                <Shield size={16} />
                <span>Guardar Pelusas</span>
              </button>
            )}

            <button
              className="btn btn-primary btn-draw-action btn-rubber-draw"
              id="btn-draw"
              data-testid="btn-draw"
              onClick={onDraw}
              disabled={!canDraw}
            >
              <CartoonGlove className="btn-glove-left" />
              <span>Sacar Carta</span>
              <CartoonGlove className="btn-glove-right" flip />
            </button>

            <button
              className="btn btn-secondary btn-stop-action btn-rubber-stop"
              id="btn-stop"
              data-testid="btn-stop"
              onClick={onStop}
              disabled={!canStop}
            >
              <span>Plantarse</span>
              <CartoonGlove className="btn-glove-right" flip />
            </button>
          </div>
        </div>

        {/* 3. Zona de Descarte con personaje de Bote de Basura Rubber Hose */}
        <div className="discard-zone">
          <div className="zone-header-label">
            <span>DESCARTE</span>
          </div>

          <div className="discard-card-wrapper">
            <div className={`discard-pile-card discard-rubber-card ${isBusting ? 'discard-shake' : ''}`} data-testid="discard-zone">
              <div className="discard-rubber-character-wrap">
                <img
                  src="/rubberhose/trash-character.png"
                  alt="Bustos"
                  className="discard-rubber-character-img"
                  draggable="false"
                />
              </div>
              <div className="discard-count-badge rubber-counter-badge" data-testid="discard-count">
                {gameState.discardPileCount} cartas
              </div>
            </div>
          </div>
          <span className="zone-hint-text">Cartas descartadas</span>
        </div>
      </div>
    </div>
  );
}

