import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Snackbar, Alert } from '@mui/material';
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as 'light' | 'dark' | null;
    if (savedMode) {
      setMode(savedMode);
    }

    // Global error handler for unhandled promise rejections
    const handleError = (event: PromiseRejectionEvent) => {
      const message = event.reason?.response?.data?.message || event.reason?.message || 'An unexpected error occurred';
      setErrorMessage(message);
      setErrorOpen(true);
    };

    window.addEventListener('unhandledrejection', handleError);

    return () => {
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setErrorOpen(true);
  };

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Router>
          <Layout toggleTheme={toggleTheme} currentMode={mode} showError={showError}>
            <Routes>
              <Route path="/login" element={<LoginPage showError={showError} />} />
              <Route path="/register" element={<RegisterPage showError={showError} />} />
              <Route path="/" element={<DashboardPage showError={showError} />} />
              <Route path="/datasets/:id" element={<DatasetDetailPage showError={showError} />} />
              <Route path="/upload" element={<UploadPage showError={showError} />} />
              <Route path="/team" element={<TeamPage showError={showError} />} />
              <Route path="/activity" element={<ActivityLogPage showError={showError} />} />
              <Route path="/profile" element={<UserProfilePage showError={showError} />} />
              <Route path="/settings" element={<UserSettingsPage toggleTheme={toggleTheme} currentMode={mode} showError={showError} />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </ThemeProvider>

      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={() => setErrorOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setErrorOpen(false)} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
