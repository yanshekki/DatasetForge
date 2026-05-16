import { useState } from 'react';
import { Typography, Container, Paper, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Chip, IconButton, Snackbar } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/axios';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function DatasetDetailPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [sharePermission, setSharePermission] = useState<'READ' | 'WRITE'>('READ');
  const [shareExpires, setShareExpires] = useState(7);
  const [generatedLink, setGeneratedLink] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { data: dataset, isLoading } = useQuery({
    queryKey: ['dataset', id],
    queryFn: () => api.get(`/datasets/${id}`).then(res => res.data.data),
  });

  const createShareLinkMutation = useMutation({
    mutationFn: () => api.post(`/datasets/${id}/share-links`, {
      permission: sharePermission,
      expiresInDays: shareExpires,
    }),
    onSuccess: (res) => {
      const token = res.data.data.token;
      const link = `${window.location.origin}/shared/${token}`;
      setGeneratedLink(link);
    },
  });

  const handleGenerateLink = () => {
    createShareLinkMutation.mutate();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setSnackbarOpen(true);
  };

  const incrementDownloadMutation = useMutation({
    mutationFn: () => api.post(`/datasets/${id}/download`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dataset', id] });
    },
  });

  const exportZipMutation = useMutation({
    mutationFn: () => api.get(`/datasets/${id}/export`, { responseType: 'blob' }),
    onSuccess: (res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `dataset-${id}.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
  });

  if (isLoading) return <Typography>Loading...</Typography>;
  if (!dataset) return <Typography>Dataset not found</Typography>;

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">{dataset.name}</Typography>
        <Box>
          <Button variant="contained" onClick={() => setShareDialogOpen(true)} sx={{ mr: 1 }}>
            Share Link
          </Button>
          <Button variant="outlined" onClick={() => setTagDialogOpen(true)}>
            Manage Tags
          </Button>
          <Button variant="contained" color="secondary" onClick={() => exportZipMutation.mutate()}>
            Export ZIP
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Typography variant="body1" color="text.secondary">
          {dataset.description || 'No description'}
        </Typography>

        <Box mt={2} display="flex" alignItems="center" gap={2}>
          <Typography variant="body2" color="text.secondary">
            Downloads: {dataset.downloadCount || 0}
          </Typography>
          <Button size="small" onClick={() => incrementDownloadMutation.mutate()}>
            Download
          </Button>
        </Box>

        <Box mt={3}>
          <Typography variant="h6" gutterBottom>Tags</Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {dataset.tags?.length > 0 ? (
              dataset.tags.map((tag: any) => (
                <Chip key={tag.id} label={tag.name} color="primary" variant="outlined" />
              ))
            ) : (
              <Typography color="text.secondary">No tags yet</Typography>
            ))}
          </Box>
        </Box>

        <Box mt={3}>
          <Typography variant="h6" gutterBottom>Versions</Typography>
          {dataset.versions?.length > 0 ? (
            dataset.versions.map((v: any) => (
              <Chip key={v.id} label={v.version} sx={{ mr: 1, mb: 1 }} />
            ))
          ) : (
            <Typography color="text.secondary">No versions yet</Typography>
          ))}
        </Box>
      </Paper>

      {/* Share Link Dialog (existing code) */}
      {/* ... */}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Link copied to clipboard!"
      />
    </Container>
  );
}
