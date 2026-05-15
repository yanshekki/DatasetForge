import { Typography, Container, Paper, Box, Avatar, Divider, Button } from '@mui/material'
import { useAuth } from '../contexts/AuthContext'

export default function UserProfilePage() {
  const { user } = useAuth()

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Profile</Typography>

      <Paper sx={{ p: 4, mt: 3 }} elevation={2}>
        <Box display="flex" alignItems="center" gap={3} mb={3}>
          <Avatar sx={{ width: 80, height: 80, fontSize: '2rem', bgcolor: 'primary.main' }}>
            {user?.email?.[0]?.toUpperCase() || 'U'}
          </Avatar>
          <Box>
            <Typography variant="h5">{user?.name || 'User'}</Typography>
            <Typography color="text.secondary">{user?.email}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>Account Information</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          More profile settings (change password, update name, etc.) will be available soon.
        </Typography>

        <Button variant="outlined" disabled>
          Edit Profile (Coming Soon)
        </Button>
      </Paper>
    </Container>
  )
}