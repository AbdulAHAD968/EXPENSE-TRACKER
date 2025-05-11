Start-Process "cmd.exe" -ArgumentList "/c cd /d D:\HTML\expense-tracker\server && npm run dev" -WindowStyle Hidden
Start-Process "cmd.exe" -ArgumentList "/c cd /d D:\HTML\expense-tracker && npm start" -WindowStyle Hidden
Start-Process "http://localhost:3000"
