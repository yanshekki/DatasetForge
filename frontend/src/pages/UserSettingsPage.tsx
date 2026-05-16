import { useState } from 'react';
import { Typography, Container, Paper, Box, Button, TextField, FormControlLabel, Switch, Snackbar } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/axios';

export default function UserSettingsPage() {
  const queryClient = useQueryClient();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { data: preferences, isLoading } = useQuery({
    queryKey: ['userPreferences'],
    queryFn: () => api.get('/users/preferences').then(res => res.data.data),
  });

  const [formData, setFormData] = useState({
    emailNotifications: true,
    darkMode: false,
    language: 'en',
    ...preferences,
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => api.put('/users/preferences', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPreferences'] });
      setSnackbarOpen(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>User Settings</Typography>

      <Paper sx={{ p: 4, mt: 3 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>Notifications</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={formData.emailNotifications}
                onChange={(e) => setFormData({ ...formData, emailNotifications: e.target.checked })}
              />
            }
            label="Email Notifications"
          />

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Appearance</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={formData.darkMode}
                onChange={(e) => setFormData({ ...formData, darkMode: e.target.checked })}
              />
            }
            label="Dark Mode"
          />

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Language</Typography>
          <TextField
            select
            fullWidth
            label="Language"
            value={formData.language}
            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            SelectProps={{ native: true }}
          >
            <option value="en">English</option>
            <option value="zh">中文</option>
          </TextField>

          <Box mt={4}>
            <Button type="submit" variant="contained" disabled={updateMutation.isPending}>
              Save Preferences
            </Button>
          </Box>
        </form>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Preferences saved successfully!"
      />
    </Container>
  );
}
