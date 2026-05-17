import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

interface SharedDataset {
  id: number;
  name: string;
  description: string;
  versions: any[];
}

export default function PublicSharePage() {
  const { token } = useParams<{ token: string }>(); 
  const [dataset, setDataset] = useState<SharedDataset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSharedDataset = async () => {
      try {
        const res = await axios.get(`/api/shared/${token}`);
        setDataset(res.data.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load shared dataset');
      } finally {
        setLoading(false);
      }
    };

    fetchSharedDataset();
  }, [token]);

  if (loading) {
    return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;
  }

  if (error) {
    return <Typography color="error" align="center" mt={4}>{error}</Typography>;
  }

  if (!dataset) {
    return <Typography align="center" mt={4}>Dataset not found</Typography>;
  }

  return (
    <Box maxWidth="800px" mx="auto" p={3}>
      <Typography variant="h4" gutterBottom>{dataset.name}</Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        {dataset.description}
      </Typography>

      <Typography variant="h6" mt={3}>Versions</Typography>
      {dataset.versions?.length > 0 ? (
        dataset.versions.map((v: any) => (
          <Box key={v.id} p={2} border={1} borderColor="grey.300" borderRadius={1} mb={1}>
            <Typography variant="subtitle1">Version {v.version}</Typography>
            <Typography variant="body2" color="text.secondary">
              {v.fileName} ({(v.fileSize / 1024 / 1024).toFixed(2)} MB)
            </Typography>
            <Button 
              variant="outlined" 
              size="small" 
              href={`/api/versions/${v.id}/download`}
              sx={{ mt: 1 }}
            >
              Download
            </Button>
          </Box>
        ))
      ) : (
        <Typography>No versions available</Typography>
      )}
    </Box>
  );
}
