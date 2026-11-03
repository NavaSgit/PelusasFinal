const API_BASE = '/api';

export const gameApi = {
  async createGame(playerNames, riggedDeckValues = null, autoSteal = false) {
    const payload = { playerNames, autoSteal };
    if (riggedDeckValues && riggedDeckValues.length > 0) {
      payload.riggedDeckValues = riggedDeckValues;
    }

    const response = await fetch(`${API_BASE}/games`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al crear la partida');
    }
    return response.json();
  },

  async getGame(id) {
    const response = await fetch(`${API_BASE}/games/${id}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al obtener la partida');
    }
    return response.json();
  },

  async drawCard(id) {
    const response = await fetch(`${API_BASE}/games/${id}/draw`, {
      method: 'POST',
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al sacar carta');
    }
    return response.json();
  },

  async bankCards(id) {
    const response = await fetch(`${API_BASE}/games/${id}/bank`, {
      method: 'POST',
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al guardar cartas');
    }
    return response.json();
  },

  async stopTurn(id) {
    const response = await fetch(`${API_BASE}/games/${id}/stop`, {
      method: 'POST',
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al finalizar el turno');
    }
    return response.json();
  },

  async stealCards(id, victimPlayerId = null, cardValue = null) {
    const body = {};
    if (victimPlayerId) body.victimPlayerId = victimPlayerId;
    if (cardValue) body.cardValue = cardValue;

    const response = await fetch(`${API_BASE}/games/${id}/steal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al robar cartas al rival');
    }
    return response.json();
  },

  async getHistory() {
    const response = await fetch(`${API_BASE}/history`);
    if (!response.ok) {
      throw new Error('Error al consultar el historial');
    }
    return response.json();
  },
};
