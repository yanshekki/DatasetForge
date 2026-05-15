import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Typography, Container, Button, List, ListItem, ListItemText, ListItemSecondaryAction, CircularProgress, Box, Paper } from '@mui/material'
import { Download, ArrowBack } from '@mui/icons-material'
import api from '../api/axios'
import { useSnackbar } from 'notistack'

export default function DatasetDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [dataset, setDataset] = useState<any>(null)
  const [versions, setVersions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { enqueueSnackbar } = useSnackbar()

  const fetchData = async () => {
    try {
      const dsRes = await api.get(`/datasets/${id}`)
      setDataset(dsRes.data.data)

      const verRes = await api.get(`/datasets/${id}/versions`)
      setVersions(verRes.data.data)
    } catch (err) {
      enqueueSnackbar('Failed to load dataset details', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const downloadVersion = async (version: string, fileName: string = 'data.csv') => {
    try {
      const res = await api.post('/upload/presigned-url', {
        datasetId: parseInt(id!),
        version,
        fileName,
        operation: 'download'
      })
      window.open(res.data.data.url, '_blank')
      enqueueSnackbar('Download started', { variant: 'success' })
    } catch (err) {
      enqueueSnackbar('Failed to get download link', { variant: 'error' })
    }
  }

  useEffect(() => {
    if (id) fetchData()
  }, [id])

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress size={60} />
      </Container>
    )
  }

  if (!dataset) {
    return (
      <Container>
        <Typography>Dataset not found</Typography>
        <Button onClick={() => navigate('/datasets')} sx={{ mt: 2 }}>Back to Datasets</Button>
      </Container>
    )
  }

  return (
    <Container>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/datasets')} sx={{ mb: 2 }}>
        Back to Datasets
      </Button>

      <Typography variant="h4" gutterBottom>{dataset.name}</Typography>
      <Typography color="text.secondary" gutterBottom>{dataset.description || 'No description'}</Typography>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>Versions ({versions.length})</Typography>

        {versions.length > 0 ? (
          <Paper elevation={1}>
            <List>
              {versions.map((v, index) => (
                <ListItem key={v.id} divider={index !== versions.length - 1}>
                  <ListItemText 
                    primary={v.version} 
                    secondary={v.description || 'No description'} 
                  />
                  <ListItemSecondaryAction>
                    <Button 
                      startIcon={<Download />} 
                      onClick={() => downloadVersion(v.version)}
                    >
                      Download
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : (
          <Typography color="text.secondary">
            No versions yet. Upload files to create new versions.
          </Typography>
        )}
      </Box>
    </Container>
  )
}