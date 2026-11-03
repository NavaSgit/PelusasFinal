# Documentación de Endpoints REST - cURL (Pelusas API)

Esta guía contiene todos los comandos `curl` para interactuar y verificar cada uno de los endpoints expuestos por el backend de Pelusas.

La API corre por defecto en `http://localhost:8080`.

---

## 1. Crear una nueva partida
Permite crear e inicializar una partida con entre 2 y 6 jugadores, barajando el mazo oficial de 110 cartas.

```bash
curl -X POST http://localhost:8080/api/games \
  -H "Content-Type: application/json" \
  -d '{
    "playerNames": ["Fabian", "Laura", "Carlos"]
  }'
```

### Opcional: Crear partida con mazo controlado (Modo Pruebas / Demostración)
Permite especificar el orden de las cartas en el mazo para reproducir escenarios de prueba (por ejemplo: busto con repetición):

```bash
curl -X POST http://localhost:8080/api/games \
  -H "Content-Type: application/json" \
  -d '{
    "playerNames": ["Fabian", "Laura"],
    "riggedDeckValues": [4, 5, 4, 5, 8, 9]
  }'
```

---

## 2. Consultar el estado de una partida
Obtiene el estado completo de la partida (jugador activo, cartas en riesgo, cartas guardadas, fase actual, cartas en el mazo y en el descarte).

```bash
curl -X GET http://localhost:8080/api/games/{GAME_ID}
```
*(Reemplazar `{GAME_ID}` con el identificador UUID retornado en la creación).*

---

## 3. Consultar los jugadores de una partida
Lista todos los jugadores que participan en la partida indicada.

```bash
curl -X GET http://localhost:8080/api/games/{GAME_ID}/players
```

---

## 4. Paso 1: Guardar pelusas (Bank)
Si el jugador activo posee cartas boca arriba delante de él provenientes de un turno anterior, las asegura en su montón de puntos protegido.

```bash
curl -X POST http://localhost:8080/api/games/{GAME_ID}/bank
```

---

## 5. Paso 2 y 3: Sacar una carta (Draw) y Robar a rivales
Extrae una carta del montón de polvo. Ejecuta automáticamente los robos a rivales si aplica y valida la regla de pérdida de turno (busto).

```bash
curl -X POST http://localhost:8080/api/games/{GAME_ID}/draw
```

### Respuesta de ejemplo (Extracción exitosa):
```json
{
  "drawnCard": { "value": 7 },
  "busted": false,
  "lostCards": [],
  "steals": [
    {
      "victimPlayerId": "player-2",
      "victimPlayerName": "Laura",
      "cardValue": 7,
      "count": 1
    }
  ],
  "gameState": { ... }
}
```

### Respuesta de ejemplo (Busto / Pérdida de turno):
```json
{
  "drawnCard": { "value": 5 },
  "busted": true,
  "lostCards": [
    { "value": 4 },
    { "value": 5 },
    { "value": 4 },
    { "value": 5 }
  ],
  "steals": [],
  "gameState": { ... }
}
```

---

## 6. Finalizar voluntariamente el turno (Plantarse / Stop)
El jugador decide plantarse. Sus cartas acumuladas permanecen delante de él en riesgo y el turno pasa al siguiente jugador.

```bash
curl -X POST http://localhost:8080/api/games/{GAME_ID}/stop
```

---

## 7. Consultar el resultado de una partida
Obtiene el resumen y resultado actual o final de la partida.

```bash
curl -X GET http://localhost:8080/api/games/{GAME_ID}/result
```

---

## 8. Consultar el histórico de partidas terminadas
Consulta todas las partidas terminadas que han sido persistidas en la base de datos (con fecha, jugadores, ganador y puntuación final).

```bash
curl -X GET http://localhost:8080/api/history
```
*(También disponible en `/api/games/history`).*

---

## 9. Consultar detalle de una partida en el histórico
Consulta los detalles de una partida específica en el histórico por su ID.

```bash
curl -X GET http://localhost:8080/api/history/{GAME_ID}
```

---

## 10. Ejemplo de Flujo Completo en un solo script (Bash / PowerShell)

```bash
# 1. Crear partida
GAME_RESPONSE=$(curl -s -X POST http://localhost:8080/api/games \
  -H "Content-Type: application/json" \
  -d '{"playerNames": ["Alice", "Bob"]}')

GAME_ID=$(echo $GAME_RESPONSE | grep -o '"id":"[^"]*' | cut -d'"' -f4)
echo "Partida creada con ID: $GAME_ID"

# 2. Sacar carta
curl -s -X POST http://localhost:8080/api/games/$GAME_ID/draw

# 3. Plantarse
curl -s -X POST http://localhost:8080/api/games/$GAME_ID/stop

# 4. Consultar nuevo estado
curl -s -X GET http://localhost:8080/api/games/$GAME_ID
```
