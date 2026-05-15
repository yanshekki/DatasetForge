import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage'
import DatasetListPage from './pages/DatasetListPage'
import DatasetDetailPage from './pages/DatasetDetailPage'
import UploadPage from './pages/UploadPage'
import TeamPage from './pages/TeamPage'
import ActivityLogPage from './pages/ActivityLogPage'
import UserProfilePage from './pages/UserProfilePage'
import { useAuth } from './contexts/AuthContext'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="datasets" element={<DatasetListPage />} />
        <Route path="datasets/:id" element={<DatasetDetailPage />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="teams" element={<TeamPage />} />
        <Route path="activity-logs" element={<ActivityLogPage />} />
        <Route path="profile" element={<UserProfilePage />} />
      </Route>
    </Routes>
  )
}

export default App}