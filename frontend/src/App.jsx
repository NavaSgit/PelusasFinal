import React, { useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  History,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Info,
  Trophy,
  Users,
  GraduationCap,
  ChevronDown,
  Menu,
  Home,
} from 'lucide-react';
import { gameApi } from './api/gameApi';
import TableCenter from './components/TableCenter';
import PlayerMat from './components/PlayerMat';
import NewGameModal from './components/NewGameModal';
import HistoryModal from './components/HistoryModal';
import RulesModal from './components/RulesModal';
import VictoryModal from './components/VictoryModal';
import PelusasLogo from './components/PelusasLogo';
import ParchmentBanner from './components/ParchmentBanner';
import MainMenu from './components/MainMenu';

export default function App() {
  const [gameState, setGameState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Estados de animación
  const [isDealing, setIsDealing] = useState(false);
  const [isBusting, setIsBusting] = useState(false);
  const [bustEvent, setBustEvent] = useState(null);
  const [stealingPlayerId, setStealingPlayerId] = useState(null);
  const bustTimerRef = useRef(null);
  const bustEndTimerRef = useRef(null);

  // Vista de pantalla principal (aparece antes de configurar la partida)
  const [showMainMenu, setShowMainMenu] = useState(true);

  // Modals & Dropdown state
  const [isNewGameOpen, setIsNewGameOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuDropdownRef = useRef(null);

  // Estado del Modo Sustentación dentro del menú desplegable del juego
  const [isSimulationMode, setIsSimulationMode] = useState(false);
  const [simulationDeckPreset, setSimulationDeckPreset] = useState('none');

  const clearBustTimers = () => {
    if (bustTimerRef.current) {
      clearTimeout(bustTimerRef.current);
      bustTimerRef.current = null;
    }
    if (bustEndTimerRef.current) {
      clearTimeout(bustEndTimerRef.current);
      bustEndTimerRef.current = null;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuDropdownRef.current && !menuDropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearBustTimers();
    };
  }, []);

  const getRiggedValuesFromPreset = (enabled, preset) => {
    if (!enabled) return null;
    if (preset === 'bust-demo') {
      // [4, 5, 4, 5]: Las 3 primeras cartas (4, 5, 4) están protegidas, y en la 4ta saca 5 repetida -> ¡BUSTO!
      return [4, 5, 4, 5, 8, 9, 10];
    }
    if (preset === 'steal-demo') {
      // [7, 7]: Jugador 1 saca 7 y se planta. Jugador 2 saca 7 y le roba el 7.
      return [7, 7, 3, 4, 5];
    }
    return null;
  };

  const handleCreateGame = async (playerNames, explicitRiggedDeckValues) => {
    clearBustTimers();
    setIsBusting(false);
    setBustEvent(null);
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const riggedValues =
        explicitRiggedDeckValues !== undefined
          ? explicitRiggedDeckValues
          : getRiggedValuesFromPreset(isSimulationMode, simulationDeckPreset);
      // Por defecto creamos partidas con autoSteal: false para que cada jugador robe manualmente
      const newGame = await gameApi.createGame(playerNames, riggedValues, false);
      setGameState(newGame);
      setIsNewGameOpen(false);
      setShowMainMenu(false);
      setIsVictoryOpen(false);
      setIsMenuOpen(false);
    } catch (err) {
      setErrorMessage(err.message || 'Error al crear la partida');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplySimulationInGame = async () => {
    const currentNames =
      gameState?.players?.length >= 2
        ? gameState.players.map((p) => p.name)
        : ['Jugador 1', 'Jugador 2'];
    const riggedValues = getRiggedValuesFromPreset(isSimulationMode, simulationDeckPreset);
    await handleCreateGame(currentNames, riggedValues);
  };

  const handleDrawCard = async () => {
    if (!gameState || isLoading || bustEvent?.phase === 'reveal') return;
    clearBustTimers();
    setIsBusting(false);
    setBustEvent(null);
    setIsLoading(true);
    setErrorMessage(null);
    setIsDealing(true);

    const previousPlayer = gameState.activePlayer;

    try {
      const result = await gameApi.drawCard(gameState.id);

      // Si bustea, mostrar primero la animación de la carta repetida antes de pasar al otro jugador
      if (result.busted) {
        setIsBusting(true);
        setBustEvent({
          drawnCard: result.drawnCard,
          lostCards: result.lostCards || [],
          playerName: previousPlayer?.name || 'Jugador',
          playerId: previousPlayer?.id,
          phase: 'reveal',
        });

        // Actualizar el mensaje del banner de inmediato pero mantener la revelación visual 1.4s
        setGameState((prev) =>
          prev
            ? {
              ...prev,
              remainingDeckCards: result.gameState.remainingDeckCards,
              lastActionMessage: result.gameState.lastActionMessage,
              canDraw: false,
              canStop: false,
              canBank: false,
            }
            : result.gameState
        );

        bustTimerRef.current = setTimeout(() => {
          setGameState(result.gameState);
          setBustEvent((prev) => (prev ? { ...prev, phase: 'settled' } : null));

          if (result.gameState.status === 'FINISHED') {
            setIsVictoryOpen(true);
          }
        }, 1400);

        bustEndTimerRef.current = setTimeout(() => {
          setIsBusting(false);
        }, 2100);
      } else {
        setGameState(result.gameState);

        if (result.gameState.status === 'FINISHED') {
          setIsVictoryOpen(true);
        }
      }
    } catch (err) {
      setErrorMessage(err.message || 'Error al sacar carta');
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsDealing(false), 500);
    }
  };

  const handleBankCards = async () => {
    if (!gameState || isLoading || bustEvent?.phase === 'reveal') return;
    clearBustTimers();
    setBustEvent(null);
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const updated = await gameApi.bankCards(gameState.id);
      setGameState(updated);
    } catch (err) {
      setErrorMessage(err.message || 'Error al guardar cartas');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopTurn = async () => {
    if (!gameState || isLoading || bustEvent?.phase === 'reveal') return;
    clearBustTimers();
    setBustEvent(null);
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const updated = await gameApi.stopTurn(gameState.id);
      setGameState(updated);
    } catch (err) {
      setErrorMessage(err.message || 'Error al finalizar turno');
    } finally {
      setIsLoading(false);
    }
  };

  // Acción de Robo Manual: Cada jugador decide expresamente si roba o se le olvida
  const handleManualSteal = async (victimPlayerId, cardValue) => {
    if (!gameState || isLoading) return;
    setIsLoading(true);
    setErrorMessage(null);
    setStealingPlayerId(victimPlayerId);

    try {
      const updated = await gameApi.stealCards(gameState.id, victimPlayerId, cardValue);
      setGameState(updated);
    } catch (err) {
      setErrorMessage(err.message || 'Error al ejecutar el robo');
    } finally {
      setIsLoading(false);
      setTimeout(() => setStealingPlayerId(null), 600);
    }
  };

  const getBannerType = () => {
    if (!gameState?.lastActionMessage) return 'info';
    const msg = gameState.lastActionMessage.toLowerCase();
    if (msg.includes('pérdida') || msg.includes('busto') || msg.includes('perdió')) return 'bust';
    if (msg.includes('guardó') || msg.includes('victoria') || msg.includes('ganador') || msg.includes('robó')) return 'success';
    return 'info';
  };

  const renderBannerIcon = () => {
    const type = getBannerType();
    if (type === 'bust') return <AlertTriangle size={18} className="banner-icon-bust" />;
    if (type === 'success') return <CheckCircle2 size={18} className="banner-icon-success" />;
    return <Info size={18} className="banner-icon-info" />;
  };

  return (
    <div className="app-container">
      {/* 0. Menú Principal Animado Estilo Rubber Hose (Se muestra antes de la configuración de la partida) */}
      {showMainMenu && (
        <MainMenu
          onPlay={() => {
            setShowMainMenu(false);
            setIsNewGameOpen(true);
          }}
          hasActiveGame={Boolean(gameState)}
          onResumeGame={() => setShowMainMenu(false)}
        />
      )}

      {/* Barra superior con logo original al centro y controles de acción */}
      <header className="app-header">
        <div className="header-brand-wrap" />

        {/* LOGO ORIGINAL DE PELUSAS (INTACTO Y PROPORCIONADO) */}
        <div
          className="header-logo-center clickable-header-logo"
          onClick={() => setShowMainMenu(true)}
          title="Ir al Menú Principal"
          role="button"
          tabIndex={0}
        >
          <PelusasLogo />
        </div>

        <div className="header-actions">
          {/* Desplegable con Historial, Reglas y Modo Sustentación */}
          <div className="header-dropdown-container" ref={menuDropdownRef}>
            <button
              type="button"
              className={`btn btn-secondary btn-header-action btn-dropdown-trigger ${isMenuOpen ? 'dropdown-active' : ''}`}
              data-testid="btn-open-menu"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <Menu size={16} />
              <span>Opciones</span>
              {isSimulationMode && <span className="simulation-active-dot" />}
              <ChevronDown size={15} className={`dropdown-chevron ${isMenuOpen ? 'chevron-open' : ''}`} />
            </button>

            {isMenuOpen && (
              <div className="header-dropdown-menu" data-testid="header-dropdown-menu">
                <button
                  type="button"
                  className="dropdown-menu-item"
                  id="btn-main-menu"
                  data-testid="btn-open-main-menu"
                  onClick={() => {
                    setShowMainMenu(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <Home size={17} className="dropdown-item-icon icon-rules" />
                  <div className="dropdown-item-text">
                    <span className="dropdown-item-title">Menú Principal</span>
                    <span className="dropdown-item-desc">Volver a la portada de inicio</span>
                  </div>
                </button>

                <button
                  type="button"
                  className="dropdown-menu-item"
                  id="btn-rules"
                  data-testid="btn-open-rules"
                  onClick={() => {
                    setIsRulesOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <BookOpen size={17} className="dropdown-item-icon icon-rules" />
                  <div className="dropdown-item-text">
                    <span className="dropdown-item-title">Reglas del Juego</span>
                    <span className="dropdown-item-desc">Consultar el reglamento oficial</span>
                  </div>
                </button>

                <button
                  type="button"
                  className="dropdown-menu-item"
                  id="btn-history"
                  data-testid="btn-open-history"
                  onClick={() => {
                    setIsHistoryOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <History size={17} className="dropdown-item-icon icon-history" />
                  <div className="dropdown-item-text">
                    <span className="dropdown-item-title">Historial BD</span>
                    <span className="dropdown-item-desc">Partidas registradas en base de datos</span>
                  </div>
                </button>

                <div className="dropdown-divider" />

                {/* Sección de Modo Sustentación dentro del desplegable */}
                <div className="dropdown-simulation-section">
                  <div className="simulation-checkbox-row">
                    <input
                      type="checkbox"
                      id="toggle-simulation"
                      data-testid="toggle-simulation"
                      checked={isSimulationMode}
                      onChange={(e) => setIsSimulationMode(e.target.checked)}
                      className="form-checkbox"
                    />
                    <label htmlFor="toggle-simulation" className="simulation-checkbox-label">
                      <GraduationCap size={16} className="cap-icon" />
                      <span>Modo Sustentación (Controlar Mazo)</span>
                    </label>
                  </div>

                  {isSimulationMode && (
                    <div className="simulation-select-wrap">
                      <span className="simulation-hint-text">
                        Secuencia predefinida para demostrar una regla:
                      </span>
                      <select
                        className="form-input form-select dropdown-sim-select"
                        data-testid="select-preset"
                        value={simulationDeckPreset}
                        onChange={(e) => setSimulationDeckPreset(e.target.value)}
                      >
                        <option value="none">Mazo estándar (110 cartas barajadas)</option>
                        <option value="bust-demo">Demostración de Busto (4, 5, 4 seguras y 4ta carta 5 repetida)</option>
                        <option value="steal-demo">Demostración de Robo (7 sacado roba 7 al rival)</option>
                      </select>

                      {gameState && (
                        <button
                          type="button"
                          className="btn btn-primary btn-apply-simulation"
                          data-testid="btn-apply-simulation"
                          onClick={handleApplySimulationInGame}
                        >
                          Aplicar en Partida Actual
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {Boolean(gameState) && !isNewGameOpen && (
            <button
              className="btn btn-primary btn-header-action btn-rubber-new-game"
              id="btn-new-game"
              data-testid="btn-open-new-game"
              onClick={() => setIsNewGameOpen(true)}
            >
              <Plus size={18} strokeWidth={2.4} />
              <span>Nueva Partida</span>
            </button>
          )}
        </div>
      </header>

      {/* Superficie Central de la Mesa */}
      <main className="main-content">
        {/* Banner de error */}
        {!isNewGameOpen && errorMessage && (
          <ParchmentBanner
            bannerType="bust"
            icon={<AlertTriangle size={18} className="banner-icon-bust" />}
            message={errorMessage}
            testId="error-banner"
            isBusting={false}
          />
        )}

        {/* Banner de acción / suceso del turno */}
        {!isNewGameOpen && !errorMessage && gameState && (
          <ParchmentBanner
            bannerType={getBannerType()}
            icon={renderBannerIcon()}
            message={(gameState?.lastActionMessage || `Partida iniciada... ¡Turno inicial de ${gameState?.activePlayer?.name || 'Jugador 1'}!`).replace(
              /\s*¡Hay cartas del mismo valor en rivales disponibles para robar!/i,
              ''
            )}
            testId="action-banner"
            messageTestId="banner-message"
            isBusting={getBannerType() === 'bust'}
            extraAction={
              gameState?.status === 'FINISHED' ? (
                <button
                  className="btn btn-primary btn-podium-trigger"
                  onClick={() => setIsVictoryOpen(true)}
                >
                  <Trophy size={15} />
                  <span>Ver Podio</span>
                </button>
              ) : null
            }
          />
        )}

        {gameState && (
          <>
            {/* Centro de la mesa: Mazo de robo, Área de cartas en juego y Botones Robar/Plantarse */}
            <TableCenter
              gameState={gameState}
              onDraw={handleDrawCard}
              onBank={handleBankCards}
              onStop={handleStopTurn}
              isLoading={isLoading}
              isDealing={isDealing}
              isBusting={isBusting}
              bustEvent={bustEvent}
            />

            {/* Tableros de los jugadores */}
            <section className="players-grid-section">
              <div className="section-header-row">
                <Users size={16} className="section-header-icon" />
                <h2 className="section-title">Tableros de Jugadores</h2>
              </div>

              <div
                className={`players-grid players-count-${gameState?.players?.length || 2}`}
                data-testid="players-grid"
              >
                {gameState?.players?.map((player, index) => (
                  <PlayerMat
                    key={player.id}
                    player={player}
                    index={index}
                    totalPlayers={gameState.players.length}
                    isActive={gameState.activePlayerIndex === index}
                    pendingSteals={gameState.pendingSteals || []}
                    onSteal={handleManualSteal}
                    isBeingStealed={stealingPlayerId === player.id}
                    bustEvent={bustEvent}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Modales */}
      <NewGameModal
        isOpen={isNewGameOpen}
        onClose={() => {
          setIsNewGameOpen(false);
          if (!gameState) {
            setShowMainMenu(true);
          }
        }}
        onCreateGame={handleCreateGame}
        hasActiveGame={Boolean(gameState)}
      />

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />

      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />

      <VictoryModal
        isOpen={isVictoryOpen}
        gameState={gameState}
        onClose={() => setIsVictoryOpen(false)}
        onNewGame={() => {
          setIsVictoryOpen(false);
          setIsNewGameOpen(true);
        }}
      />
    </div>
  );
}

