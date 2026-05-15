import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography, Container, Button, List, ListItem, ListItemText, ListItemSecondaryAction, CircularProgress } from '@mui/material'
import { Download } from '@mui/icons-material'
import api from '../api/axios'
import { useSnackbar } from 'notistack'

export default function DatasetDetailPage() {
  const { id } = useParams()
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
      enqueueSnackbar('Failed to load dataset', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const downloadVersion = async (version: string, fileName: string) => {
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

  if (loading) return <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Container>
  if (!dataset) return <Typography>Dataset not found</Typography>

  return (
    <Container>
      <Typography variant="h4" gutterBottom>{dataset.name}</Typography>
      <Typography color="text.secondary" gutterBottom>{dataset.description}</Typography>

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Versions</Typography>

      {versions.length > 0 ? (
        <List>
          {versions.map((v) => (
            <ListItem key={v.id}>
              <ListItemText 
                primary={v.version} 
                secondary={v.description || 'No description'} 
              />
              <ListItemSecondaryAction>
                <Button 
                  startIcon={<Download />} 
                  onClick={() => downloadVersion(v.version, 'data.csv')}
                >
                  Download
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography color="text.secondary">No versions yet. Upload files to create versions.</Typography>
      )}
    </Container>
  )
}