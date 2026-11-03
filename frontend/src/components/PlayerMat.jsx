import React from 'react';
import { UserRound, AlertTriangle, Zap, Sparkles } from 'lucide-react';
import PelusaCard from './PelusaCard';
import RubberAvatar from './RubberAvatar';

export default function PlayerMat({
  player,
  isActive,
  totalPlayers = 2,
  pendingSteals = [],
  onSteal,
  isBeingStealed = false,
  bustEvent = null,
}) {
  const isBustingThisMat = bustEvent?.phase === 'reveal' && bustEvent?.playerId === player.id;
  const repeatedCardValue = isBustingThisMat ? bustEvent?.drawnCard?.value : null;

  // Durante la animación de busto mostramos las cartas que el jugador tenía + la repetida recién sacada
  const sourceCards = isBustingThisMat && bustEvent?.lostCards?.length > 0
    ? bustEvent.lostCards
    : player.cardsInFront || [];

  // Agrupar cartas delante por valor
  const groupedInFront = sourceCards.reduce((acc, card) => {
    acc[card.value] = (acc[card.value] || 0) + 1;
    return acc;
  }, {});

  const distinctGroupsCount = Object.keys(groupedInFront).length;
  const isCompactMat = totalPlayers >= 4;

  const displayedCount = isBustingThisMat && bustEvent?.lostCards?.length > 0
    ? bustEvent.lostCards.length
    : player.cardsInFrontCount || 0;


  // Verificar si alguna carta de este jugador puede ser robada por el jugador activo
  const stealableValues = (pendingSteals || [])
    .filter((s) => s.victimPlayerId === player.id)
    .map((s) => s.cardValue);

  return (
    <div
      className={`player-mat-card ${isCompactMat ? 'mat-compact' : ''} ${isActive ? 'active-mat' : ''} ${isBeingStealed ? 'shake-steal' : ''} ${isBustingThisMat ? 'busting-mat' : ''}`}
      data-testid={`player-mat-${player.id}`}
      id={`player-mat-${player.id}`}
    >
      {/* Cabecera del tapete del jugador */}
      <div className="player-mat-header">
        <div className="player-identity">
          <div className="player-avatar-badge player-avatar-rubber">
            <RubberAvatar size={34} />
          </div>
          <div className="player-name-wrap">
            <span className="player-mat-name">{player.name}</span>
          </div>
        </div>

        {isBustingThisMat ? (
          <span className="bust-turn-tag" data-testid="bust-turn-pill">
            <AlertTriangle size={14} className="bust-tag-icon" />
            <span>¡Carta repetida!</span>
          </span>
        ) : isActive ? (
          <span className="active-turn-tag rubber-active-turn" data-testid="active-turn-pill">
            <Sparkles size={14} className="tag-icon" />
            <span>Turno actual</span>
          </span>
        ) : (
          <span className="inactive-player-tag">
            <UserRound size={13} />
            <span>En espera</span>
          </span>
        )}
      </div>

      {/* Cuerpo principal del tapete */}
      <div className="mat-body-content">
        {/* Sección de cartas en riesgo delante */}
        <div className="mat-cards-area">
          <div className={`mat-risk-label ${isBustingThisMat ? 'mat-risk-label-bust' : ''}`}>
            <AlertTriangle size={14} className="risk-icon" />
            <span>
              {isBustingThisMat
                ? `¡Perdiendo ${displayedCount} cartas por repetir el ${repeatedCardValue}!`
                : `En riesgo (${displayedCount} cartas)`}
            </span>
          </div>

          <div className={`cards-in-front-zone ${displayedCount === 0 ? 'empty empty-rubberhose' : ''} ${isBustingThisMat ? 'zone-busting' : ''}`}>
            {displayedCount === 0 ? (
              <div className="empty-zone-simple">
                <span className="empty-zone-text">Sin cartas<span className="sr-only"> delante</span></span>
              </div>
            ) : (
              <div className={`cards-fan-layout ${distinctGroupsCount > 3 ? 'fan-crowded' : ''} ${distinctGroupsCount > 5 ? 'fan-very-crowded' : ''}`}>
                {Object.entries(groupedInFront).map(([value, count]) => {
                  const numVal = Number(value);
                  const isStealable = !isBustingThisMat && stealableValues.includes(numVal);
                  const isRepeatedMatch = isBustingThisMat && numVal === repeatedCardValue;

                  return (
                    <div
                      key={value}
                      className={`card-steal-wrapper ${isRepeatedMatch ? 'card-bust-repeated-wrapper' : ''} ${isBustingThisMat && !isRepeatedMatch ? 'card-bust-fading-wrapper' : ''}`}
                    >
                      <PelusaCard
                        value={numVal}
                        count={count}
                        onClick={isStealable ? () => onSteal && onSteal(player.id, numVal) : undefined}
                      />
                      {isRepeatedMatch && (
                        <span className="repeated-match-pill">
                          ¡Repetida!
                        </span>
                      )}
                      {/* Botón interactivo para robar si coincide con la carta sacada */}
                      {isStealable && (
                        <button
                          className="btn-manual-steal"
                          onClick={() => onSteal && onSteal(player.id, numVal)}
                          data-testid="btn-steal-opportunity"
                          id={`btn-steal-${player.id}-${numVal}`}
                        >
                          <Zap size={13} />
                          <span>¡Robar!</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Sección de puntos asegurados con Trofeo Rubber Hose */}
        <div className="mat-points-area" data-testid={`score-${player.id}`}>
          <div className="points-display-card points-rubber-card">
            <div className="points-rubber-trophy-wrap">
              <img
                src="/rubberhose/trophy-character.png"
                alt="Trofeo"
                className="rubber-trophy-img"
              />
            </div>
            <div className="points-score-label">PUNTOS</div>
            <div className="points-score-value">
              {player.score || 0}
            </div>
            <div className="banked-cards-tag">
              {player.bankedCardsCount || 0} cartas guardadas
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

