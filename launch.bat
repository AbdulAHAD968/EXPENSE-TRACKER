@echo off
:: Start Backend (minimized)
start "Backend" /min cmd /k "cd /d D:\HTML\expense-tracker\server && npm run dev"

:: Start Frontend (minimized)
start "Frontend" /min cmd /k "cd /d D:\HTML\expense-tracker\ && npm start"

:: Open the browser after a short delay
timeout /t 2 >nul
start http://localhost:3000
