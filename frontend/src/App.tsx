import { Routes, Route } from 'react-router-dom'
import { Container, Typography, Box } from '@mui/material'

function App() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          DatasetForge
        </Typography>
        <Typography variant="h5" color="text.secondary">
          AI Dataset Management Platform
        </Typography>

        <Routes>
          <Route path="/" element={
            <Box sx={{ mt: 4 }}>
              <Typography>Welcome to DatasetForge</Typography>
            </Box>
          } />
          <Route path="/datasets" element={<Typography>Datasets Page (Coming soon)</Typography>} />
        </Routes>
      </Box>
    </Container>
  )
}

export default App