import { useEffect, useState } from 'react'
import { Typography, Container, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function DatasetListPage() {
  const [datasets, setDatasets] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [newDataset, setNewDataset] = useState({ name: '', description: '' })
  const navigate = useNavigate()

  const fetchDatasets = async () => {
    const res = await api.get('/datasets')
    setDatasets(res.data.data)
  }

  const createDataset = async () => {
    await api.post('/datasets', newDataset)
    setOpen(false)
    setNewDataset({ name: '', description: '' })
    fetchDatasets()
  }

  useEffect(() => {
    fetchDatasets()
  }, [])

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Datasets</Typography>
      <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Create Dataset
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datasets.map((ds) => (
              <TableRow key={ds.id} hover onClick={() => navigate(`/datasets/${ds.id}`)} style={{ cursor: 'pointer' }}>
                <TableCell>{ds.name}</TableCell>
                <TableCell>{ds.description}</TableCell>
                <TableCell>{new Date(ds.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button size="small" onClick={(e) => { e.stopPropagation(); navigate(`/datasets/${ds.id}`) }}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Dataset</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Name" margin="normal" value={newDataset.name} onChange={e => setNewDataset({...newDataset, name: e.target.value})} />
          <TextField fullWidth label="Description" margin="normal" value={newDataset.description} onChange={e => setNewDataset({...newDataset, description: e.target.value})} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={createDataset}>Create</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}