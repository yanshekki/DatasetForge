import { useEffect, useState } from 'react'
import { Typography, Container, Button, List, ListItem, ListItemText } from '@mui/material'
import api from '../api/axios'

export default function TeamPage() {
  const [teams, setTeams] = useState<any[]>([])

  const fetchTeams = async () => {
    const res = await api.get('/teams/my-teams')
    setTeams(res.data.data)
  }

  useEffect(() => {
    fetchTeams()
  }, [])

  return (
    <Container>
      <Typography variant="h4" gutterBottom>My Teams</Typography>
      <Button variant="contained" sx={{ mb: 2 }}>Create Team</Button>

      <List>
        {teams.map((team) => (
          <ListItem key={team.id}>
            <ListItemText primary={team.name} secondary={team.description} />
          </ListItem>
        ))}
      </List>
    </Container>
  )
}