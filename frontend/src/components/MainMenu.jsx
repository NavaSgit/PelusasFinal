import React from 'react';

/**
 * MainMenu: Pantalla principal animada estilo Rubber Hose (1930s cartoon)
 * Se muestra antes de la configuración de la partida.
 * Incluye fondo animado con estética de proyector antiguo, grano de película
 * y el botón de PLAY con animación continua de squash & stretch / rebote elástico.
 */
export default function MainMenu({ onPlay, hasActiveGame = false, onResumeGame }) {
  return (
    <div className="main-menu-screen" data-testid="main-menu-screen">
      {/* Capas de animación cinematográfica vintage 1930s */}
      <div className="vintage-film-overlay" aria-hidden="true" />
      <div className="vintage-flicker-layer" aria-hidden="true" />
      <div className="vintage-dust-lines" aria-hidden="true" />

      {/* Escenario central: Ilustración maestra del juego con animación de vida/respiración */}
      <main className="main-menu-stage">
        <div className="main-menu-artwork-wrap">
          <img
            src="/rubberhose/main-menu-bg.jpg"
            alt="Pelusas Juego de Mesa - Estilo Rubber Hose"
            className="main-menu-artwork-img"
            draggable="false"
          />
        </div>

        {/* Zona inferior: Botón PLAY animado ubicado abajo de todo, sin sobreponerse al logo */}
        <div className="main-menu-bottom-zone">
          <button
            type="button"
            className="play-button-trigger"
            onClick={onPlay}
            data-testid="btn-open-new-game"
            aria-label="Jugar a Pelusas"
          >
            <img
              src="/rubberhose/play-button.png"
              alt="¡JUGAR!"
              className="play-button-img"
              draggable="false"
            />
            <span className="sr-only">Jugar</span>
          </button>

          {hasActiveGame && onResumeGame && (
            <button
              type="button"
              className="btn-resume-game"
              onClick={onResumeGame}
              data-testid="btn-resume-game"
            >
              <span>Continuar Partida en Curso</span>
            </button>
          )}
        </div>
      </main>

      {/* Pie sutil del menú */}
      <footer className="main-menu-footer">
        <span className="footer-credits">¡Roba con cuidado y no te quedes sin pelusas!</span>
      </footer>
    </div>
  );
}
