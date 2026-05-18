import React from 'react';
import { Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Download, Archive, TableChart, Code } from '@mui/icons-material';
import axios from 'axios';

// ... existing code ...

export default function DatasetDetailPage({ showError }: { showError: (msg: string) => void }) {
  const { id } = useParams<{ id: string }>(); 
  const datasetId = parseInt(id || '0');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleExport = async (format: 'zip' | 'csv' | 'json') => {
    setAnchorEl(null);
    try {
      const response = await axios.get(`/api/datasets/${datasetId}/export?format=${format}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `dataset-${datasetId}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      showError('Failed to export dataset');
    }
  };

  return (
    <Box p={3}>
      {/* ... existing dataset details ... */}

      <Button
        variant="outlined"
        startIcon={<Download />}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        Export
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleExport('zip')}>
          <ListItemIcon><Archive /></ListItemIcon>
          <ListItemText>Export as ZIP</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleExport('csv')}>
          <ListItemIcon><TableChart /></ListItemIcon>
          <ListItemText>Export as CSV</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleExport('json')}>
          <ListItemIcon><Code /></ListItemIcon>
          <ListItemText>Export as JSON</ListItemText>
        </MenuItem>
      </Menu>

      {/* ... existing content ... */}
    </Box>
  );
}
