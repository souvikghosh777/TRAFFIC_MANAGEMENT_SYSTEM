import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Box, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import ProfessionalLanding from './components/pages/ProfessionalLanding.jsx';
import ProfessionalDashboard from './components/pages/ProfessionalDashboard.jsx';
import ProfessionalLogin from './components/auth/ProfessionalLogin.jsx';
import ProfessionalSignUp from './components/auth/ProfessionalSignUp.jsx';
import AppLayout from './components/layout/AppLayout.jsx';

// Professional Theme Configuration
const createProfessionalTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#667eea',
      dark: '#5a67d8',
      light: '#818cf8',
    },
    secondary: {
      main: '#764ba2',
      dark: '#6b46c1',
      light: '#a78bfa',
    },
    background: {
      default: mode === 'dark' ? '#0f172a' : '#f8fafc',
      paper: mode === 'dark' ? '#1e293b' : '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#f1f5f9' : '#1e293b',
      secondary: mode === 'dark' ? '#94a3b8' : '#475569',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

function App() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const theme = createProfessionalTheme(darkMode ? 'dark' : 'light');
  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isDashboardPage = location.pathname.includes('/dashboard');

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Box sx={{ minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<ProfessionalLanding />} />
            <Route 
              path="/login" 
              element={
                <ProfessionalLogin 
                  onLogin={() => setIsAuthenticated(true)}
                  darkMode={darkMode}
                  toggleTheme={toggleTheme}
                />
              } 
            />
            <Route 
              path="/signup" 
              element={
                <ProfessionalSignUp 
                  onSignUp={() => setIsAuthenticated(true)}
                  darkMode={darkMode}
                  toggleTheme={toggleTheme}
                />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated ? (
                  <AppLayout darkMode={darkMode} toggleTheme={toggleTheme}>
                    <ProfessionalDashboard />
                  </AppLayout>
                ) : (
                  <ProfessionalLogin 
                    onLogin={() => setIsAuthenticated(true)}
                    darkMode={darkMode}
                    toggleTheme={toggleTheme}
                  />
                )
              } 
            />
            <Route 
              path="/dashboard.html" 
              element={
                isAuthenticated ? (
                  <AppLayout darkMode={darkMode} toggleTheme={toggleTheme}>
                    <ProfessionalDashboard />
                  </AppLayout>
                ) : (
                  <ProfessionalLogin 
                    onLogin={() => setIsAuthenticated(true)}
                    darkMode={darkMode}
                    toggleTheme={toggleTheme}
                  />
                )
              } 
            />
          </Routes>
        </Box>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;