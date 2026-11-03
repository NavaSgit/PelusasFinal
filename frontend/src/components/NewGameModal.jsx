import React, { useState } from 'react';
import { Sparkles, X, Users, Play } from 'lucide-react';
import RubberAvatar from './RubberAvatar';

export default function NewGameModal({ isOpen, onClose, onCreateGame, hasActiveGame = false }) {
  const [playerNames, setPlayerNames] = useState(['Jugador 1', 'Jugador 2']);
  const [isSimulationMode, setIsSimulationMode] = useState(false);
  const [simulationDeckPreset, setSimulationDeckPreset] = useState('none');

  if (!isOpen) return null;

  const handleNameChange = (index, value) => {
    const updated = [...playerNames];
    updated[index] = value;
    setPlayerNames(updated);
  };

  const applyPreset = (count) => {
    setPlayerNames((prev) =>
      Array.from({ length: count }, (_, idx) => (prev[idx] && prev[idx].trim() ? prev[idx] : `Jugador ${idx + 1}`))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanNames = playerNames.map((n) => n.trim()).filter((n) => n.length > 0);
    if (cleanNames.length < 2) {
      alert('Debes ingresar al menos 2 jugadores');
      return;
    }

    let riggedValues = null;
    if (isSimulationMode) {
      if (simulationDeckPreset === 'bust-demo') {
        riggedValues = [4, 5, 4, 5, 8, 9, 10];
      } else if (simulationDeckPreset === 'steal-demo') {
        riggedValues = [7, 7, 3, 4, 5];
      }
    }

    onCreateGame(cleanNames, riggedValues);
  };

  return (
    <div
      className={`modal-overlay ${!hasActiveGame ? 'modal-overlay-welcome' : ''}`}
      data-testid="new-game-modal"
    >
      <div className="modal-card welcome-setup-card">
        <div className="modal-header welcome-modal-header">
          <div className="welcome-header-content">
            <div className="welcome-icon-badge">
              <Sparkles size={22} className="welcome-sparkle-icon" />
            </div>
            <div className="welcome-title-stack">
              <h2 className="modal-title welcome-main-title">Bienvenido a Pelusas</h2>
              <p className="welcome-subtitle">
                Selecciona la cantidad de jugadores y personaliza sus nombres para iniciar la partida
              </p>
            </div>
          </div>
          <button
            className="btn-modal-close"
            onClick={onClose}
            data-testid="btn-close-modal"
            aria-label={hasActiveGame ? "Cerrar modal" : "Volver al Menú Principal"}
            title={hasActiveGame ? "Cerrar modal" : "Volver al Menú Principal"}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="welcome-modal-form" autoComplete="off">
          <div className="welcome-modal-scroll-area">
            {/* Presets rápidos */}
            <div className="form-group">
              <label className="form-label welcome-section-label">
                <Users size={16} className="welcome-label-icon" />
                <span>Plantillas rápidas:</span>
              </label>
              <div className="presets-pill-group welcome-presets-grid">
                {[2, 3, 4, 5, 6].map((count) => (
                  <button
                    key={count}
                    type="button"
                    className={`btn btn-preset-pill welcome-preset-btn ${playerNames.length === count ? 'active-preset-pill' : ''}`}
                    data-testid={`preset-${count}-players`}
                    onClick={() => applyPreset(count)}
                  >
                    <span className="preset-count-number">{count}</span>
                    <span className="preset-count-text">Jugadores</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Lista de nombres */}
            <div className="form-group">
              <div className="form-header-row">
                <label className="form-label welcome-section-label">
                  <span>Nombres de Jugadores ({playerNames.length} / 6):</span>
                </label>
              </div>

              <div className="welcome-players-grid">
                {playerNames.map((name, index) => (
                  <div key={index} className="player-input-row welcome-player-input-card">
                    <div className="player-modal-avatar-wrap">
                      <RubberAvatar size={26} />
                    </div>
                    <input
                      type="text"
                      name={`pelusa_player_name_${index}`}
                      className="form-input welcome-player-input"
                      id={`player-input-${index}`}
                      data-testid={`player-input-${index}`}
                      value={name}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                      onFocus={(e) => e.target.select()}
                      onClick={(e) => e.target.select()}
                      placeholder={`Jugador ${index + 1}`}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="words"
                      spellCheck={false}
                      aria-autocomplete="none"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Modo Sustentación (Controlar Mazo) */}
            <div
              className="form-group"
              style={{
                marginTop: '1.25rem',
                padding: '0.9rem',
                background: 'var(--color-bg)',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--color-border)',
                boxShadow: '0 2px 0 var(--color-border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <input
                  type="checkbox"
                  id="toggle-simulation"
                  data-testid="toggle-simulation"
                  checked={isSimulationMode}
                  onChange={(e) => setIsSimulationMode(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--color-primary)' }}
                />
                <label
                  htmlFor="toggle-simulation"
                  style={{ fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>🎓 Modo Sustentación (Controlar Mazo)</span>
                </label>
              </div>

              {isSimulationMode && (
                <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted, #71717a)' }}>
                    Secuencia predefinida para demostrar una regla al evaluador:
                  </span>
                  <select
                    className="form-input form-select"
                    data-testid="select-preset"
                    value={simulationDeckPreset}
                    onChange={(e) => setSimulationDeckPreset(e.target.value)}
                    style={{ fontSize: '0.85rem', padding: '0.45rem 0.65rem', borderRadius: 'var(--radius-sm)' }}
                  >
                    <option value="none">Mazo estándar (110 cartas barajadas)</option>
                    <option value="bust-demo">Demostración de Busto (4, 5, 4 seguras y 4ta carta 5 repetida)</option>
                    <option value="steal-demo">Demostración de Robo (7 sacado roba 7 al rival)</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="modal-footer welcome-modal-footer">
            <button
              type="button"
              className="btn btn-secondary btn-welcome-cancel"
              onClick={onClose}
              data-testid="btn-cancel-new-game"
            >
              {hasActiveGame ? 'Cancelar' : 'Volver al Menú'}
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-welcome-start"
              id="btn-start-game"
              data-testid="btn-start-game"
            >
              <Play size={18} />
              <span>Comenzar Partida</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

