import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField, Container, Typography, Box } from '@mui/material'
import api from '../api/axios'

function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      await api.post('/auth/register', { email, password, name })
      navigate('/login')
    } catch (err) {
      alert('Registration failed')
    }
  }

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" gutterBottom>Create Account</Typography>
        <TextField fullWidth label="Name" margin="normal" value={name} onChange={e => setName(e.target.value)} />
        <TextField fullWidth label="Email" margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
        <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
        <Button fullWidth variant="contained" onClick={handleRegister} sx={{ mt: 2 }}>Register</Button>
      </Box>
    </Container>
  )
}

export default RegisterPage