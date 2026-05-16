import { useState } from 'react';
import { Typography, Container, Paper, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Chip, IconButton, Snackbar, Table, TableBody, TableCell, TableRow, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Menu } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/axios';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';

export default function DatasetDetailPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [sharePermission, setSharePermission] = useState<'READ' | 'WRITE'>('READ');
  const [shareExpires, setShareExpires] = useState(7);
  const [generatedLink, setGeneratedLink] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [compareDialogOpen, setCompareDialogOpen] = useState(false);
  const [version1, setVersion1] = useState('');
  const [version2, setVersion2] = useState('');
  const [comparisonResult, setComparisonResult] = useState<any>(null);
  const [newComment, setNewComment] = useState('');
  const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(null);

  const { data: dataset, isLoading } = useQuery({
    queryKey: ['dataset', id],
    queryFn: () => api.get(`/datasets/${id}`).then(res => res.data.data),
  });

  const { data: comments, isLoading: commentsLoading } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => api.get(`/datasets/${id}/comments`).then(res => res.data.data),
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

  const incrementVersionDownloadMutation = useMutation({
    mutationFn: (versionId: number) => api.post(`/datasets/${id}/versions/${versionId}/download`),
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

  const exportCSVMutation = useMutation({
    mutationFn: () => api.get(`/datasets/${id}/export/csv`, { responseType: 'blob' }),
    onSuccess: (res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `dataset-${id}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
  });

  const exportJSONMutation = useMutation({
    mutationFn: () => api.get(`/datasets/${id}/export/json`, { responseType: 'blob' }),
    onSuccess: (res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `dataset-${id}.json`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
  });

  const compareVersionsMutation = useMutation({
    mutationFn: () => api.get(`/datasets/${id}/versions/compare?versionId1=${version1}&versionId2=${version2}`),
    onSuccess: (res) => {
      setComparisonResult(res.data.data);
    },
  });

  const handleCompare = () => {
    if (version1 && version2) {
      compareVersionsMutation.mutate();
    }
  };

  const createCommentMutation = useMutation({
    mutationFn: () => api.post(`/datasets/${id}/comments`, { content: newComment }),
    onSuccess: () => {
      setNewComment('');
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => api.delete(`/comments/${commentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
    },
  });

  const handlePostComment = () => {
    if (newComment.trim()) {
      createCommentMutation.mutate();
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
            Share Link
          </Button>
          <Button variant="outlined" onClick={() => setTagDialogOpen(true)}>
            Manage Tags
          </Button>
          <Button variant="contained" color="secondary" onClick={(e) => setExportAnchorEl(e.currentTarget)}>
            Export <DownloadIcon sx={{ ml: 1 }} />
          </Button>
          <Button variant="outlined" onClick={() => setCompareDialogOpen(true)}>
            Compare Versions
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
              <Box key={v.id} display="flex" alignItems="center" gap={1} mb={1}>
                <Chip label={v.version} />
                <Typography variant="body2" color="text.secondary">
                  Downloads: {v.downloadCount || 0}
                </Typography>
                <Button size="small" onClick={() => incrementVersionDownloadMutation.mutate(v.id)}>
                  Download
                </Button>
              </Box>
            ))
          ) : (
            <Typography color="text.secondary">No versions yet</Typography>
          ))}
        </Box>
      </Paper>

      {/* Comments Section (existing code) */}
      {/* ... */}

      {/* Export Menu */}
      <Menu
        anchorEl={exportAnchorEl}
        open={Boolean(exportAnchorEl)}
        onClose={() => setExportAnchorEl(null)}
      >
        <MenuItem onClick={() => { exportZipMutation.mutate(); setExportAnchorEl(null); }}>Export as ZIP</MenuItem>
        <MenuItem onClick={() => { exportCSVMutation.mutate(); setExportAnchorEl(null); }}>Export as CSV</MenuItem>
        <MenuItem onClick={() => { exportJSONMutation.mutate(); setExportAnchorEl(null); }}>Export as JSON</MenuItem>
      </Menu>

      {/* Share Link Dialog (existing code) */}
      {/* ... */}

      {/* Compare Versions Dialog (existing code) */}
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
