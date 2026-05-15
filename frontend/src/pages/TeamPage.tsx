import { useEffect, useState } from 'react'
import { Typography, Container, Button, List, ListItem, ListItemText, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material'
import { Add, Delete } from '@mui/icons-material'
import api from '../api/axios'
import { useSnackbar } from 'notistack'

export default function TeamPage() {
  const [teams, setTeams] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null)
  const [newMemberId, setNewMemberId] = useState('')
  const { enqueueSnackbar } = useSnackbar()

  const fetchTeams = async () => {
    const res = await api.get('/teams/my-teams')
    setTeams(res.data.data)
  }

  const addMember = async () => {
    if (!selectedTeamId || !newMemberId) return
    try {
      await api.post(`/teams/${selectedTeamId}/members`, { userId: parseInt(newMemberId) })
      enqueueSnackbar('Member added successfully', { variant: 'success' })
      setOpen(false)
      setNewMemberId('')
      fetchTeams()
    } catch (err) {
      enqueueSnackbar('Failed to add member', { variant: 'error' })
    }
  }

  const removeMember = async (teamId: number, userId: number) => {
    try {
      await api.delete(`/teams/${teamId}/members/${userId}`)
      enqueueSnackbar('Member removed', { variant: 'success' })
      fetchTeams()
    } catch (err) {
      enqueueSnackbar('Failed to remove member', { variant: 'error' })
    }
  }

  useEffect(() => {
    fetchTeams()
  }, [])

  return (
    <Container>
      <Typography variant="h4" gutterBottom>My Teams</Typography>

      <List>
        {teams.map((team) => (
          <ListItem key={team.id} secondaryAction={
            <Button startIcon={<Add />} onClick={() => { setSelectedTeamId(team.id); setOpen(true) }}>Add Member</Button>
          }>
            <ListItemText primary={team.name} secondary={team.description} />
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Team Member</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="User ID" type="number" value={newMemberId} onChange={e => setNewMemberId(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={addMember}>Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}