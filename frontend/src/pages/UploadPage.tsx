import { useState } from 'react'
import { Typography, Container, Button, TextField, Box, LinearProgress } from '@mui/material'
import api from '../api/axios'

export default function UploadPage() {
  const [datasetId, setDatasetId] = useState('')
  const [version, setVersion] = useState('v1')
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0])
  }

  const uploadFile = async () => {
    if (!file || !datasetId) return alert('Please select file and enter Dataset ID')

    setUploading(true)
    try {
      // 1. Get presigned URL
      const presignedRes = await api.post('/upload/presigned-url', {
        datasetId: parseInt(datasetId),
        version,
        fileName: file.name,
      })

      const { url, objectName } = presignedRes.data.data

      // 2. Upload file directly to MinIO using PUT
      await api.put(url, file, {
        headers: { 'Content-Type': file.type || 'application/octet-stream' },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setProgress(percent)
          }
        }
      })

      // 3. Notify backend
      await api.post('/upload/complete', {
        datasetId: parseInt(datasetId),
        version,
        objectName,
        size: file.size,
      })

      alert('Upload successful!')
      setProgress(0)
      setFile(null)
    } catch (err) {
      console.error(err)
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Upload File</Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField label="Dataset ID" value={datasetId} onChange={e => setDatasetId(e.target.value)} />
        <TextField label="Version" value={version} onChange={e => setVersion(e.target.value)} />
        <Button variant="outlined" component="label">
          Select File
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        {file && <Typography>Selected: {file.name}</Typography>}

        <Button variant="contained" onClick={uploadFile} disabled={uploading || !file}>
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>

        {uploading && <LinearProgress variant="determinate" value={progress} />}
      </Box>
    </Container>
  )
}