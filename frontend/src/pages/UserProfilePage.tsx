import React, { useState } from 'react';
import { Box, Typography, Avatar, Button, CircularProgress } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import axios from 'axios';

export default function UserProfilePage({ showError }: { showError: (msg: string) => void }) {
  const [profilePicture, setProfilePicture] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('picture', file);

    try {
      const res = await axios.post('/api/users/profile/picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProfilePicture(res.data.data.profilePicture);
      showError('Profile picture updated successfully!');
    } catch (error: any) {
      showError(error.response?.data?.error || 'Failed to upload profile picture');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>User Profile</Typography>

      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Avatar
          src={profilePicture}
          sx={{ width: 120, height: 120, fontSize: '3rem' }}
        >
          U
        </Avatar>

        <Button
          variant="contained"
          component="label"
          startIcon={<PhotoCamera />}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Profile Picture'}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileUpload}
          />
        </Button>

        {uploading && <CircularProgress size={24} />}
      </Box>
    </Box>
  );
}
