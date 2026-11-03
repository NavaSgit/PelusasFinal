import React from 'react';
import { BookOpen, X, Target, Layers, RotateCcw, AlertTriangle, Trophy } from 'lucide-react';

export default function RulesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" data-testid="rules-modal">
      <div className="modal-card modal-card-wide">
        <div className="modal-header">
          <div className="modal-title-wrap">
            <BookOpen size={20} className="modal-title-icon" />
            <h2 className="modal-title">Reglamento Oficial de Pelusas</h2>
          </div>
          <button className="btn-modal-close" onClick={onClose} data-testid="btn-close-rules" aria-label="Cerrar reglamento">
            <X size={18} />
          </button>
        </div>

        <div className="rules-content-body">
          <div className="rule-section">
            <div className="rule-section-header">
              <Target size={16} className="rule-icon-target" />
              <h3>Objetivo del Juego</h3>
            </div>
            <p>
              Acumular la mayor cantidad de puntos en tu montón protegido de pelusas recolectando cartas del montón de polvo y robándoselas a tus rivales.
            </p>
          </div>

          <div className="rule-section rule-box-subtle">
            <div className="rule-section-header">
              <Layers size={16} className="rule-icon-deck" />
              <h3>Composición del Mazo (110 Cartas)</h3>
            </div>
            <ul className="rule-list">
              <li><strong>Valores 1 al 5:</strong> 13 cartas de cada valor (65 cartas en total).</li>
              <li><strong>Valores 6 al 10:</strong> 9 cartas de cada valor (45 cartas en total).</li>
              <li><strong>Total:</strong> 110 cartas (distribución oficial no uniforme).</li>
            </ul>
          </div>

          <div className="rule-section">
            <div className="rule-section-header">
              <RotateCcw size={16} className="rule-icon-turn" />
              <h3>Estructura de un Turno</h3>
            </div>
            <ol className="rule-ordered-list">
              <li>
                <strong>Paso 1 — Guardar pelusas:</strong> Si tienes cartas acumuladas delante de un turno anterior, puedes asegurarlas en tu montón de puntos al comenzar tu turno antes de sacar cartas.
              </li>
              <li>
                <strong>Paso 2 — Buscar pelusas:</strong> Sacas una carta del montón de polvo y la colocas boca arriba delante de ti.
              </li>
              <li>
                <strong>Paso 3 — Robar cartas:</strong> Tomas todas las cartas del mismo valor que estén delante de los demás jugadores.
              </li>
              <li>
                <strong>Decisión:</strong> Eliges si continúas sacando otra carta o te plantas (finalizas voluntariamente tu turno).
              </li>
            </ol>
          </div>

          <div className="rule-section rule-box-alert">
            <div className="rule-section-header">
              <AlertTriangle size={16} className="rule-icon-alert" />
              <h3>Regla de Pérdida del Turno (Busto)</h3>
            </div>
            <p>
              Las <strong>3 primeras cartas</strong> delante del jugador están <strong>siempre protegidas</strong>. Después de la 3.ª carta (a partir de la 4.ª carta), el jugador <strong>pierde el turno</strong> si saca una carta cuyo valor ya tiene delante.
            </p>
            <ul className="rule-list">
              <li>Repetición en las 3 primeras cartas (ej. saca [4, 5, 4] → total 3) → <strong>NO pierde</strong> (están protegidas).</li>
              <li>Repetición después de la 3.ª carta (ej. tiene [4, 5, 4] y saca 5 → 4.ª carta) → <strong>¡PIERDE!</strong></li>
              <li>Al perder el turno, <strong>todas</strong> las cartas de delante son descartadas y el turno pasa al siguiente jugador.</li>
            </ul>
          </div>

          <div className="rule-section">
            <div className="rule-section-header">
              <Trophy size={16} className="rule-icon-trophy" />
              <h3>Fin de la Partida y Desempate</h3>
            </div>
            <p>
              La partida finaliza cuando se agota el montón de polvo. Las cartas restantes se guardan automáticamente. Gana quien sume más puntos. En caso de empate, gana quien tenga <strong>más cartas acumuladas</strong>.
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}

