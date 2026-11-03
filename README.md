# 🧶 Pelusas - Juego de Mesa Digital

Proyecto final desarrollado aplicando principios de calidad de software, pruebas automatizadas en múltiples niveles (unitarias, integración, funcionales y de mutación), arquitectura limpia y desarrollo fullstack.

---

## 👥 1. Integrantes del Equipo
- **Estudiante(s):** Fabián Arias, Daniel Navas y Santiago Villegas.
- **Curso:** Calidad de Software / Proyecto Final.

---

## 🚀 2. Tecnologías Utilizadas

### Backend
- **Lenguaje:** Java 21 / 25
- **Framework Web:** Spring Boot 3.3.5
- **Persistencia:** Spring Data JPA / Hibernate
- **Base de Datos:** H2 Database (en memoria y soporte para almacenamiento persistente)
- **Validaciones:** Jakarta Validation API
- **Pruebas Unitarias:** JUnit 5 (Jupiter), Mockito (subclass mock-maker)
- **Pruebas de Integración:** MockMvc, Spring Test, `@DataJpaTest`
- **Cobertura de Código:** JaCoCo Maven Plugin (100% cobertura en lógica de negocio)
- **Pruebas de Mutación:** PIT (Pitest Maven Plugin + pitest-junit5-plugin) (98% mutation score)

### Frontend
- **Framework:** React 19 + Vite
- **Estilos:** CSS3 nativo moderno con variables de diseño, glassmorphism y micro-animaciones
- **Tipografía:** Google Fonts (*Outfit* para encabezados, *Inter* para interfaz)
- **Efectos:** Canvas Confetti para celebración de podio y victoria
- **Pruebas Funcionales (E2E):** Playwright con Chromium y JavaScript

---

## 🏛️ 3. Arquitectura del Proyecto

El proyecto está estructurado con una clara **separación de responsabilidades**:

```
pelusas/
├── backend/
│   ├── src/main/java/com/pelusas/game/
│   │   ├── config/            # Configuración CORS y MVC
│   │   ├── controller/        # Endpoints REST (GameController, GameHistoryController, GlobalExceptionHandler)
│   │   ├── domain/
│   │   │   ├── model/         # Modelos de dominio: Card, Deck (110 cartas), Player, Game, StealResult
│   │   │   └── rules/         # Reglas de negocio puras: TurnRules (busto, robo, guardado, desempates)
│   │   ├── dto/               # DTOs de transferencia para requests y responses
│   │   ├── entity/            # Entidades JPA (ActiveGameEntity, GameHistoryEntity, PlayerHistoryEntity)
│   │   ├── exception/         # Excepciones de negocio (GameNotFoundException, InvalidGameActionException)
│   │   ├── repository/        # Repositorios Spring Data JPA
│   │   └── service/           # Servicios orquestadores (GameService, GameHistoryService)
│   └── src/test/java/         # 90+ pruebas unitarias y de integración
├── frontend/
│   ├── src/
│   │   ├── api/               # Cliente HTTP para servicios REST
│   │   ├── components/        # Componentes UI (PelusaCard, PlayerMat, TableCenter, Modales)
│   │   ├── App.jsx            # Contenedor principal de la aplicación
│   │   └── index.css          # Sistema de diseño y hojas de estilo
│   └── tests/
│       └── pelusas.spec.js    # Pruebas funcionales E2E con Playwright
├── API_CURLS.md               # Comandos cURL listos para probar todos los endpoints
└── README.md
```

### Reglas de Negocio Implementadas en el Backend
1. **Mazo oficial de 110 cartas:**
   - Valores del 1 al 5: 13 cartas de cada valor (65 cartas en total).
   - Valores del 6 al 10: 9 cartas de cada valor (45 cartas en total).
   - No es una distribución uniforme simplista.
2. **Paso 1 — Guardar pelusas:**
   - Si el jugador tiene cartas acumuladas del turno anterior, puede guardarlas en su montón de puntos protegido al inicio del turno.
3. **Paso 2 — Buscar pelusas:**
   - El jugador saca una carta del montón de polvo y decide si continuar o plantarse.
4. **Paso 3 — Robar cartas:**
   - Roba todas las cartas del mismo valor que los rivales tengan boca arriba delante de ellos.
5. **Regla de Pérdida del Turno (Busto):**
   - Las **3 primeras cartas** siempre están protegidas (seguras): si se repite un valor en las 3 primeras cartas (ej. `[4, 5, 4]`), el jugador **NO pierde**.
   - Después de la 3.ª carta (a partir de la 4.ª carta delante), el jugador pierde el turno si saca una carta de un valor que ya tiene delante.
   - Al perder, todas las cartas de delante van al montón de descarte y el turno pasa inmediatamente.
6. **Fin de Partida y Desempates:**
   - Se agota el mazo -> Los jugadores guardan automáticamente sus cartas restantes -> Mayor puntuación gana.
   - Desempate: Quien tenga **más cartas acumuladas**.

---

## ⚙️ 4. Requisitos Previos

- **Java JDK 21 o superior** (verificado en Java 21 y Java 25 LTS).
- **Apache Maven 3.9+**.
- **Node.js v18+ y npm**.

---

## 📦 5. Instalación y Configuración

### 5.1 Backend
```bash
cd backend
mvn clean compile
```

### 5.2 Frontend
```bash
cd ../frontend
npm install
npx playwright install chromium
```

---

## 🏃 6. Ejecución de la Aplicación

### 6.1 Ejecutar el Backend (Spring Boot)
Desde la carpeta `backend`:
```bash
mvn spring-boot:run
```
- API REST disponible en: `http://localhost:8080`
- Consola de base de datos H2: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:pelusasdb`
  - Usuario: `sa`
  - Contraseña: *(vacía)*

### 6.2 Ejecutar el Frontend (Vite)
Desde la carpeta `frontend`:
```bash
npm run dev
```
- Aplicación web accesible en: `http://localhost:5173`

---

## 🧪 7. Ejecución de Pruebas Automatizadas

### 7.1 Pruebas Unitarias y de Integración (Backend)
Ejecuta la suite completa de más de 90 pruebas que cubren lógica de negocio, controladores REST y repositorios:
```bash
cd backend
mvn clean test
```

### 7.2 Pruebas de Mutación con PITest (Mutation Score ≥ 90%)
Ejecuta el análisis de pruebas de mutación sobre las reglas de negocio y el dominio:
```bash
cd backend
mvn test-compile pitest:mutationCoverage
```
**Resultado obtenido:**
- **Mutation Score:** **98%** (44 mutantes eliminados de 45 generados).
- **Cobertura de línea en clases mutadas:** **98% - 100%**.
- Supera con creces el umbral mínimo del 90% requerido.

### 7.3 Reporte de Cobertura con JaCoCo (100% en Reglas de Negocio)
El reporte HTML se genera automáticamente tras ejecutar `mvn test` en:
`backend/target/site/jacoco/index.html`
- **Deck.java:** 100% Cobertura
- **TurnRules.java:** 100% Cobertura
- **Player.java:** 100% Cobertura
- **Card.java:** 100% Cobertura

### 7.4 Pruebas Funcionales E2E con Playwright (Frontend)
Asegúrate de que el backend y frontend estén ejecutándose y corre:
```bash
cd frontend
npm run test:e2e
```
O directamente:
```bash
npx playwright test
```

**Escenarios cubiertos en Playwright:**
1. **Caso Obligatorio 1 — Turno Exitoso:** Abrir app, crear partida, iniciar turno, sacar carta, plantarse y verificar estado.
2. **Caso Obligatorio 2 — Turno Perdido:** Configurar jugadores, alcanzar 3 cartas con duplicado, detectar busto, verificar descarte de cartas y cambio de turno.
3. **Caso Adicional — Robo de Cartas:** Demostración de robo entre jugadores activos y rivales.
4. **Caso Adicional — Histórico BD:** Consulta del histórico de partidas persistidas en base de datos.

---

## 📡 8. Documentación de la API (cURL)

Consulta el archivo [API_CURLS.md](file:///c:/dev/pelusas/API_CURLS.md) para ver ejemplos listos para copiar y pegar de todos los endpoints:
- `POST /api/games` - Crear partida
- `GET /api/games/{id}` - Consultar estado de la partida
- `GET /api/games/{id}/players` - Consultar jugadores
- `POST /api/games/{id}/draw` - Sacar carta y robar a rivales
- `POST /api/games/{id}/bank` - Guardar pelusas
- `POST /api/games/{id}/stop` - Plantarse / finalizar turno voluntariamente
- `GET /api/games/{id}/result` - Consultar resultado
- `GET /api/history` - Consultar histórico en base de datos
