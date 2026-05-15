import { Typography, Container, Button } from '@mui/material'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

function DashboardPage() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Welcome to DatasetForge</Typography>
      <Typography>Welcome, {user?.email}</Typography>
      <Button variant="outlined" onClick={() => { logout(); navigate('/login') }} sx={{ mt: 2 }}>
        Logout
      </Button>
    </Container>
  )
}

export default DashboardPage