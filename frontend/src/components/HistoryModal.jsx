import React, { useEffect, useState } from 'react';
import { History, X, Trophy, Inbox } from 'lucide-react';
import { gameApi } from '../api/gameApi';

export default function HistoryModal({ isOpen, onClose }) {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    let active = true;
    gameApi.getHistory()
      .then((data) => {
        if (active) {
          setHistory(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || 'Error al cargar el histórico');
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" data-testid="history-modal">
      <div className="modal-card modal-card-wide">
        <div className="modal-header">
          <div className="modal-title-wrap">
            <History size={20} className="modal-title-icon" />
            <h2 className="modal-title">Histórico de Partidas Terminadas</h2>
          </div>
          <button className="btn-modal-close" onClick={onClose} data-testid="btn-close-history" aria-label="Cerrar historial">
            <X size={18} />
          </button>
        </div>

        {isLoading ? (
          <div className="modal-loading-state">
            Cargando historial desde la base de datos...
          </div>
        ) : error ? (
          <div className="modal-error-alert">
            {error}
          </div>
        ) : history.length === 0 ? (
          <div className="modal-empty-state">
            <Inbox size={40} className="empty-state-icon" />
            <p>Aún no hay partidas terminadas registradas en la base de datos.</p>
          </div>
        ) : (
          <div className="history-table-container">
            <table className="history-table" data-testid="history-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Ganador(es)</th>
                  <th>Jugadores</th>
                  <th>Puntuaciones</th>
                  <th>Resumen</th>
                </tr>
              </thead>
              <tbody>
                {history.map((game) => (
                  <tr key={game.gameId} data-testid={`history-row-${game.gameId}`}>
                    <td className="history-date-cell">
                      {new Date(game.playedAt).toLocaleDateString()} {new Date(game.playedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td>
                      <span className="history-winner-badge">
                        <Trophy size={14} className="winner-icon" />
                        <span>{game.winnerName || 'N/A'}</span>
                      </span>
                    </td>
                    <td>{game.totalPlayers}</td>
                    <td>
                      <div className="history-players-list">
                        {(game.players || []).map((p, i) => (
                          <span key={i} className={`history-player-score ${p.isWinner ? 'is-winner' : ''}`}>
                            {p.playerName}: {p.finalScore} pts ({p.accumulatedCards} cartas)
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="history-summary-cell">
                      {game.resultSummary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

