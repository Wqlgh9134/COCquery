@echo off
cd /d %~dp0

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js / npm not found. Please install Node.js first: https://nodejs.org/
  pause
  exit /b 1
)

if not exist node_modules (
  echo First run detected. Installing dependencies, please wait...
  call npm install
  if errorlevel 1 (
    echo [ERROR] Failed to install dependencies. Check your network or proxy settings and try again.
    pause
    exit /b 1
  )
)

echo Starting COC query tool...
start http://localhost:5173
call npm run dev
pause
