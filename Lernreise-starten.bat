@echo off
setlocal
cd /d "%~dp0"

echo.
echo LSB Lernreise wird vorbereitet...

if not exist "node_modules" (
  echo.
  echo Abhaengigkeiten werden installiert...
  call npm install
  if errorlevel 1 (
    echo.
    echo Die Installation konnte nicht abgeschlossen werden.
    pause
    exit /b 1
  )
)

if not exist ".next\BUILD_ID" (
  echo.
  echo Anwendung wird einmalig gebaut...
  call npm run build
  if errorlevel 1 (
    echo.
    echo Der Build konnte nicht abgeschlossen werden.
    pause
    exit /b 1
  )
)

echo.
echo Server wird gestartet...
start "LSB Lernreise Server" powershell -WindowStyle Hidden -Command "$env:APP_ALLOW_SHUTDOWN='1'; Set-Location '%~dp0'; npm run start:host"

echo.
echo Browser wird geoeffnet...
timeout /t 4 /nobreak >nul

if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
  start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --app=http://localhost:3000
  exit /b 0
)

if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
  start "" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" --app=http://localhost:3000
  exit /b 0
)

if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
  start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --app=http://localhost:3000
  exit /b 0
)

if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
  start "" "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" --app=http://localhost:3000
  exit /b 0
)

start "" http://localhost:3000
