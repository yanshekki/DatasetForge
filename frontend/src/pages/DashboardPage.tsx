import { Typography, Container, Paper, Box, Grid } from '@mui/material'
import { useAuth } from '../contexts/AuthContext'
import { Dataset, Groups, Upload } from '@mui/icons-material'

export default function DashboardPage() {
  const { user } = useAuth()

  const stats = [
    { title: 'My Datasets', value: '12', icon: <Dataset color="primary" fontSize="large" /> },
    { title: 'Teams', value: '3', icon: <Groups color="primary" fontSize="large" /> },
    { title: 'Uploads Today', value: '7', icon: <Upload color="primary" fontSize="large" /> },
  ]

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Welcome back, {user?.name || user?.email?.split('@')[0]}!</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Here's what's happening with your datasets today.
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }} elevation={2}>
              {stat.icon}
              <Box>
                <Typography variant="h4" fontWeight="bold">{stat.value}</Typography>
                <Typography color="text.secondary">{stat.title}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>Quick Actions</Typography>
        <Typography color="text.secondary">
          Use the sidebar to manage your datasets, upload new files, or manage your teams.
        </Typography>
      </Box>
    </Container>
  )
}