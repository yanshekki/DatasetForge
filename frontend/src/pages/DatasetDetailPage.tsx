import { useState } from 'react';
import { Typography, Container, Paper, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Chip, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/axios';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

export default function DatasetDetailPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [tagDialogOpen, setTagDialogOpen] = useState(false);
  const [newTag, setNewTag] = useState('');

  const { data: dataset, isLoading } = useQuery({
    queryKey: ['dataset', id],
    queryFn: () => api.get(`/datasets/${id}`).then(res => res.data.data),
  });

  const addTagMutation = useMutation({
    mutationFn: (tagName: string) => api.post(`/datasets/${id}/tags`, { tagName }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dataset', id] });
      setNewTag('');
    },
  });

  const removeTagMutation = useMutation({
    mutationFn: (tagId: number) => api.delete(`/datasets/${id}/tags/${tagId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dataset', id] });
    },
  });

  const handleAddTag = () => {
    if (newTag.trim()) {
      addTagMutation.mutate(newTag.trim());
    }
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (!dataset) return <Typography>Dataset not found</Typography>;

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">{dataset.name}</Typography>
        <Box>
          <Button variant="contained" onClick={() => setShareDialogOpen(true)} sx={{ mr: 1 }}>
            Share
          </Button>
          <Button variant="outlined" onClick={() => setTagDialogOpen(true)}>
            Manage Tags
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Typography variant="body1" color="text.secondary">
          {dataset.description || 'No description'}
        </Typography>

        <Box mt={3}>
          <Typography variant="h6" gutterBottom>Tags</Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {dataset.tags?.length > 0 ? (
              dataset.tags.map((tag: any) => (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  onDelete={() => removeTagMutation.mutate(tag.id)}
                  color="primary"
                  variant="outlined"
                />
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

      {/* Tag Management Dialog */}
      <Dialog open={tagDialogOpen} onClose={() => setTagDialogOpen(false)}>
        <DialogTitle>Manage Tags</DialogTitle>
        <DialogContent>
          <Box display="flex" gap={1} mb={2}>
            <TextField
              size="small"
              placeholder="New tag name"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            />
            <Button variant="contained" onClick={handleAddTag} disabled={!newTag.trim()}>
              Add
            </Button>
          </Box>

          <Box display="flex" flexWrap="wrap" gap={1}>
            {dataset.tags?.map((tag: any) => (
              <Chip
                key={tag.id}
                label={tag.name}
                onDelete={() => removeTagMutation.mutate(tag.id)}
                color="primary"
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTagDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Share Dialog (existing code) */}
      {/* ... */}
    </Container>
  );
}
