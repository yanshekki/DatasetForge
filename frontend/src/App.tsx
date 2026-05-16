import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getTheme } from './theme';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import DatasetDetailPage from './pages/DatasetDetailPage';
import UploadPage from './pages/UploadPage';
import TeamPage from './pages/TeamPage';
import ActivityLogPage from './pages/ActivityLogPage';
import UserProfilePage from './pages/UserProfilePage';
import UserSettingsPage from './pages/UserSettingsPage';

const queryClient = new QueryClient();

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as 'light' | 'dark' | null;
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Router>
          <Layout toggleTheme={toggleTheme} currentMode={mode}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={<DashboardPage />} />
              <Route path="/datasets/:id" element={<DatasetDetailPage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/activity" element={<ActivityLogPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/settings" element={<UserSettingsPage toggleTheme={toggleTheme} currentMode={mode} />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
