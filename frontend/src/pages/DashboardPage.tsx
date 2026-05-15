import { Typography, Container } from '@mui/material'
import { useAuth } from '../contexts/AuthContext'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Typography>Welcome back, {user?.email}!</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Use the sidebar to navigate between Datasets, Upload, and Teams.
      </Typography>
    </Container>
  )
}