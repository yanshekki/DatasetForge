import { useState } from 'react'
import { Typography, Container, Button, TextField, Box } from '@mui/material'
import api from '../api/axios'

export default function UploadPage() {
  const [datasetId, setDatasetId] = useState('')
  const [version, setVersion] = useState('v1')
  const [fileName, setFileName] = useState('')
  const [uploadUrl, setUploadUrl] = useState('')

  const getPresignedUrl = async () => {
    const res = await api.post('/upload/presigned-url', {
      datasetId: parseInt(datasetId),
      version,
      fileName,
    })
    setUploadUrl(res.data.data.url)
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Upload File</Typography>

      <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>
        <TextField label="Dataset ID" value={datasetId} onChange={e => setDatasetId(e.target.value)} />
        <TextField label="Version" value={version} onChange={e => setVersion(e.target.value)} />
        <TextField label="File Name" value={fileName} onChange={e => setFileName(e.target.value)} />

        <Button variant="contained" onClick={getPresignedUrl}>Get Upload URL</Button>

        {uploadUrl && (
          <Box>
            <Typography>Upload URL (use PUT request):</Typography>
            <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>{uploadUrl}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  )
}