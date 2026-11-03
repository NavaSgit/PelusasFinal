@echo off
echo ===================================================
echo     Iniciando Juego de Mesa Pelusas (Fullstack)
echo ===================================================

echo [1/2] Iniciando Backend Spring Boot (Puerto 8080)...
start "Pelusas - Backend (Spring Boot)" cmd /k "cd /d %~dp0backend && mvn spring-boot:run"

echo [2/2] Iniciando Frontend Vite (Puerto 5173)...
start "Pelusas - Frontend (React + Vite)" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ===================================================
echo Servidores en proceso de inicio:
echo  - Frontend Web: http://localhost:5173
echo  - Backend REST: http://localhost:8080
echo  - Consola H2:   http://localhost:8080/h2-console
echo ===================================================
pause
