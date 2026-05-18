import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Chip } from '@mui/material';
import CommentSection from '../components/CommentSection';

// ... existing imports and code ...

export default function DatasetDetailPage({ showError }: { showError: (msg: string) => void }) {
  const { id } = useParams<{ id: string }>(); 
  const datasetId = parseInt(id || '0');

  // ... existing code ...

  return (
    <Box p={3}>
      {/* ... existing dataset details ... */}

      {/* Comments Section */}
      <CommentSection datasetId={datasetId} showError={showError} />
    </Box>
  );
}
