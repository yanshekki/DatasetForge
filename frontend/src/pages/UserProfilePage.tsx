import { useState } from 'react';
import { Typography, Container, Paper, Box, Button, TextField, Avatar, Snackbar } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/axios';

export default function UserProfilePage() {
  const queryClient = useQueryClient();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [pictureUrl, setPictureUrl] = useState('');

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => api.get('/auth/me').then(res => res.data.data),
  });

  const updatePictureMutation = useMutation({
    mutationFn: (url: string) => api.put('/users/profile-picture', { pictureUrl: url }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      setSnackbarOpen(true);
    },
  });

  const handleUpload = () => {
    if (pictureUrl.trim()) {
      updatePictureMutation.mutate(pictureUrl.trim());
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>User Profile</Typography>

      <Paper sx={{ p: 4, mt: 3 }}>
        <Box display="flex" alignItems="center" gap={3}>
          <Avatar
            src={user?.profilePicture || ''}
            sx={{ width: 100, height: 100 }}
          />
          <Box>
            <Typography variant="h6">{user?.name}</Typography>
            <Typography color="text.secondary">{user?.email}</Typography>
          </Box>
        </Box>

        <Box mt={4}>
          <Typography variant="h6" gutterBottom>Update Profile Picture</Typography>
          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              placeholder="Image URL (e.g. https://... )"
              value={pictureUrl}
              onChange={(e) => setPictureUrl(e.target.value)}
            />
            <Button variant="contained" onClick={handleUpload} disabled={!pictureUrl.trim()}>
              Upload
            </Button>
          </Box>
          <Typography variant="caption" color="text.secondary" mt={1} display="block">
            Paste a public image URL (we recommend using a service like imgur or your own CDN)
          </Typography>
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Profile picture updated!"
      />
    </Container>
  );
}
