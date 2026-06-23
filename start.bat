@echo off
cd /d %~dp0
echo Starting COC query tool...
start http://localhost:5173
npm run dev
pause