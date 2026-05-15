import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField, Container, Typography, Box } from '@mui/material'
import api from '../api/axios'
import { useAuth } from '../contexts/AuthContext'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password })
      login(res.data.data.accessToken, res.data.data.user)
      navigate('/dashboard')
    } catch (err) {
      alert('Login failed')
    }
  }

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" gutterBottom>DatasetForge Login</Typography>
        <TextField fullWidth label="Email" margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
        <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
        <Button fullWidth variant="contained" onClick={handleLogin} sx={{ mt: 2 }}>Login</Button>
      </Box>
    </Container>
  )
}

export default LoginPage