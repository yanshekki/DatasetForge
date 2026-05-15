import { useEffect, useState } from 'react'
import { Typography, Container, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, TextField, DialogActions, CircularProgress, Box, IconButton, Tooltip } from '@mui/material'
import { Add, Delete, Visibility, Edit } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useSnackbar } from 'notistack'

export default function DatasetListPage() {
  const [datasets, setDatasets] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [datasetToDelete, setDatasetToDelete] = useState<any>(null)
  const [datasetToEdit, setDatasetToEdit] = useState<any>(null)
  const [newDataset, setNewDataset] = useState({ name: '', description: '' })
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const fetchDatasets = async () => {
    setLoading(true)
    try {
      const res = await api.get('/datasets')
      setDatasets(res.data.data)
    } catch (err) {
      enqueueSnackbar('Failed to load datasets', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const createDataset = async () => {
    if (!newDataset.name) {
      enqueueSnackbar('Dataset name is required', { variant: 'warning' })
      return
    }
    try {
      await api.post('/datasets', newDataset)
      enqueueSnackbar('Dataset created successfully!', { variant: 'success' })
      setOpen(false)
      setNewDataset({ name: '', description: '' })
      fetchDatasets()
    } catch (err) {
      enqueueSnackbar('Failed to create dataset', { variant: 'error' })
    }
  }

  const openEditDialog = (dataset: any, e: React.MouseEvent) => {
    e.stopPropagation()
    setDatasetToEdit(dataset)
    setNewDataset({ name: dataset.name, description: dataset.description || '' })
    setEditOpen(true)
  }

  const updateDataset = async () => {
    if (!datasetToEdit || !newDataset.name) return
    try {
      await api.put(`/datasets/${datasetToEdit.id}`, newDataset)
      enqueueSnackbar('Dataset updated successfully!', { variant: 'success' })
      setEditOpen(false)
      setDatasetToEdit(null)
      setNewDataset({ name: '', description: '' })
      fetchDatasets()
    } catch (err) {
      enqueueSnackbar('Failed to update dataset', { variant: 'error' })
    }
  }

  const handleDeleteClick = (dataset: any, e: React.MouseEvent) => {
    e.stopPropagation()
    setDatasetToDelete(dataset)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!datasetToDelete) return
    try {
      await api.delete(`/datasets/${datasetToDelete.id}`)
      enqueueSnackbar('Dataset deleted successfully', { variant: 'success' })
      setDeleteDialogOpen(false)
      setDatasetToDelete(null)
      fetchDatasets()
    } catch (err) {
      enqueueSnackbar('Failed to delete dataset', { variant: 'error' })
    }
  }

  useEffect(() => {
    fetchDatasets()
  }, [])

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Datasets</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)} size="large">
          Create New Dataset
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={8}>
          <CircularProgress size={60} />
        </Box>
      ) : datasets.length === 0 ? (
        <Box textAlign="center" mt={8}>
          <Typography variant="h6" color="text.secondary" gutterBottom>No datasets yet</Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Create your first dataset to start organizing your AI training data.
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>
            Create Your First Dataset
          </Button>
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Created</strong></TableCell>
                <TableCell align="right"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datasets.map((ds) => (
                <TableRow key={ds.id} hover onClick={() => navigate(`/datasets/${ds.id}`)} style={{ cursor: 'pointer' }}>
                  <TableCell>{ds.name}</TableCell>
                  <TableCell>{ds.description || <em style={{ color: '#999' }}>No description</em>}</TableCell>
                  <TableCell>{new Date(ds.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="View Details">
                      <IconButton onClick={(e) => { e.stopPropagation(); navigate(`/datasets/${ds.id}`) }}>
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Dataset">
                      <IconButton onClick={(e) => openEditDialog(ds, e)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Dataset">
                      <IconButton color="error" onClick={(e) => handleDeleteClick(ds, e)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Create Dataset Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create New Dataset</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Dataset Name" margin="normal" value={newDataset.name} onChange={e => setNewDataset({...newDataset, name: e.target.value})} required />
          <TextField fullWidth label="Description (optional)" margin="normal" multiline rows={3} value={newDataset.description} onChange={e => setNewDataset({...newDataset, description: e.target.value})} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={createDataset}>Create Dataset</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dataset Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Dataset</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Dataset Name" margin="normal" value={newDataset.name} onChange={e => setNewDataset({...newDataset, name: e.target.value})} required />
          <TextField fullWidth label="Description (optional)" margin="normal" multiline rows={3} value={newDataset.description} onChange={e => setNewDataset({...newDataset, description: e.target.value})} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={updateDataset}>Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Dataset?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete <strong>{datasetToDelete?.name}</strong>? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}