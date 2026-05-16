import { useState } from 'react';
import { Typography, Container, Paper, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/axios';

export default function DatasetDetailPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [sharePermission, setSharePermission] = useState<'READ' | 'WRITE'>('READ');

  const { data: dataset, isLoading } = useQuery({
    queryKey: ['dataset', id],
    queryFn: () => api.get(`/datasets/${id}`).then(res => res.data.data),
  });

  const shareMutation = useMutation({
    mutationFn: (data: any) => api.post(`/datasets/${id}/share`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dataset', id] });
      setShareDialogOpen(false);
      setShareEmail('');
    },
  });

  const handleShare = () => {
    shareMutation.mutate({
      email: shareEmail,
      permissionLevel: sharePermission,
    });
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (!dataset) return <Typography>Dataset not found</Typography>;

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">{dataset.name}</Typography>
        <Button variant="contained" onClick={() => setShareDialogOpen(true)}>
          Share Dataset
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Typography variant="body1" color="text.secondary">
          {dataset.description || 'No description'}
        </Typography>

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

      <Dialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Share Dataset</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="User Email"
            fullWidth
            value={shareEmail}
            onChange={(e) => setShareEmail(e.target.value)}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Permission Level</InputLabel>
            <Select
              value={sharePermission}
              onChange={(e) => setSharePermission(e.target.value as 'READ' | 'WRITE')}
            >
              <MenuItem value="READ">Read Only</MenuItem>
              <MenuItem value="WRITE">Read & Write</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShareDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleShare} disabled={!shareEmail}>
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
