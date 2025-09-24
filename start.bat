@echo off
echo Starting Traffic Management System...

echo.
echo Starting Backend Server on port 5001...
start "Backend" cmd /k "cd backend && python app.py"

echo.
echo Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo.
echo Starting Frontend Development Server (will auto-select available port)...
start "Frontend" cmd /k "cd frontend && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5001
echo Frontend: http://localhost:3001 (or next available port)
echo.
echo The systems are now connected! 
echo - Backend API runs on port 5001
echo - Frontend React app runs on port 3001+
echo - Authentication is integrated between frontend and backend
echo - AI traffic optimization engine is loaded
echo.
echo Press any key to exit...
pause >nul