import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography, Container, Button, List, ListItem, ListItemText, Divider } from '@mui/material'
import api from '../api/axios'

export default function DatasetDetailPage() {
  const { id } = useParams()
  const [dataset, setDataset] = useState<any>(null)
  const [versions, setVersions] = useState<any[]>([])

  const fetchData = async () => {
    const dsRes = await api.get(`/datasets/${id}`)
    setDataset(dsRes.data.data)

    const verRes = await api.get(`/datasets/${id}/versions`)
    setVersions(verRes.data.data)
  }

  useEffect(() => {
    if (id) fetchData()
  }, [id])

  if (!dataset) return <Typography>Loading...</Typography>

  return (
    <Container>
      <Typography variant="h4" gutterBottom>{dataset.name}</Typography>
      <Typography color="text.secondary" gutterBottom>{dataset.description}</Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>Versions</Typography>
      <List>
        {versions.length > 0 ? versions.map((v) => (
          <ListItem key={v.id}>
            <ListItemText primary={v.version} secondary={v.description || 'No description'} />
          </ListItem>
        )) : <ListItem><ListItemText primary="No versions yet" /></ListItem>}
      </List>
    </Container>
  )
}