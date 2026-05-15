import { useState } from 'react'
import { Typography, Container, Button, TextField, Box, LinearProgress, Alert } from '@mui/material'
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
      enqueueSnackbar('Upload successful!', { variant: 'success' })
      setProgress(0)
      setFile(null)
    } catch (err) {
      enqueueSnackbar('Upload failed. Please try again.', { variant: 'error' })
    } finally {
      setUploading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Upload File</Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Upload completed successfully! 
          <Button size="small" onClick={() => navigate(`/datasets/${datasetId}`)}>View Dataset</Button>
        </Alert>
      )}

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField label="Dataset ID" value={datasetId} onChange={e => setDatasetId(e.target.value)} />
        <TextField label="Version" value={version} onChange={e => setVersion(e.target.value)} />

        <Button variant="outlined" component="label">
          Select File
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

        {file && <Typography variant="body2">Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</Typography>}

        <Button 
          variant="contained" 
          onClick={uploadFile} 
          disabled={uploading || !file || !datasetId}
          size="large"
        >
          {uploading ? 'Uploading...' : 'Upload to Dataset'}
        </Button>

        {uploading && <LinearProgress variant="determinate" value={progress} />}
      </Box>
    </Container>
  )
}