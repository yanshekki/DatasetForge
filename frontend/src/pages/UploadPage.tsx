import { useState } from 'react'
import { Typography, Container, Button, TextField, Box, LinearProgress, Alert, Paper } from '@mui/material'
import api from '../api/axios'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'

export default function UploadPage() {
  const [datasetId, setDatasetId] = useState('')
  const [version, setVersion] = useState('v1')
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [success, setSuccess] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
      setSuccess(false)
    }
  }

  const uploadFile = async () => {
    if (!file || !datasetId) {
      enqueueSnackbar('Please select file and enter Dataset ID', { variant: 'warning' })
      return
    }

    setUploading(true)
    setSuccess(false)

    try {
      const presignedRes = await api.post('/upload/presigned-url', {
        datasetId: parseInt(datasetId),
        version,
        fileName: file.name,
      })

      const { url } = presignedRes.data.data

      await api.put(url, file, {
        headers: { 'Content-Type': file.type || 'application/octet-stream' },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setProgress(percent)
          }
        }
      })

      await api.post('/upload/complete', {
        datasetId: parseInt(datasetId),
        version,
        objectName: `datasets/${datasetId}/versions/${version}/${file.name}`,
        size: file.size,
      })

      setSuccess(true)
      enqueueSnackbar('File uploaded successfully!', { variant: 'success' })
      setProgress(0)
      setFile(null)
    } catch (err) {
      enqueueSnackbar('Upload failed. Please check your inputs and try again.', { variant: 'error' })
    } finally {
      setUploading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Upload File</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Upload new versions of your datasets securely.
      </Typography>

      <Paper sx={{ p: 3 }} elevation={2}>
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Upload completed! 
            <Button size="small" onClick={() => navigate(`/datasets/${datasetId}`)}>Go to Dataset</Button>
          </Alert>
        )}

        <Box display="flex" flexDirection="column" gap={2.5}>
          <TextField label="Dataset ID" value={datasetId} onChange={e => setDatasetId(e.target.value)} fullWidth />
          <TextField label="Version Tag" value={version} onChange={e => setVersion(e.target.value)} fullWidth />

          <Button variant="outlined" component="label" size="large">
            Choose File
            <input type="file" hidden onChange={handleFileChange} />
          </Button>

          {file && (
            <Typography variant="body2" color="text.secondary">
              Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </Typography>
          )}

          <Button 
            variant="contained" 
            onClick={uploadFile} 
            disabled={uploading || !file || !datasetId}
            size="large"
          >
            {uploading ? `Uploading... ${progress}%` : 'Upload File'}
          </Button>

          {uploading && <LinearProgress variant="determinate" value={progress} />}
        </Box>
      </Paper>
    </Container>
  )
}