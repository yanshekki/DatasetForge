import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

interface VersionComparisonDialogProps {
  open: boolean;
  onClose: () => void;
  datasetId: number;
  versions: any[];
  showError: (msg: string) => void;
}

export default function VersionComparisonDialog({ open, onClose, datasetId, versions, showError }: VersionComparisonDialogProps) {
  const [version1, setVersion1] = useState('');
  const [version2, setVersion2] = useState('');
  const [diff, setDiff] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    if (!version1 || !version2) {
      showError('Please select two versions to compare');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`/api/datasets/${datasetId}/versions/compare`, {
        params: { v1: version1, v2: version2 }
      });
      setDiff(res.data.data);
    } catch (error: any) {
      showError(error.response?.data?.error || 'Failed to compare versions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Compare Dataset Versions</DialogTitle>
      <DialogContent>
        <Box display="flex" gap={2} mb={3}>
          <FormControl fullWidth>
            <InputLabel>Version 1</InputLabel>
            <Select value={version1} label="Version 1" onChange={(e) => setVersion1(e.target.value)}>
              {versions.map((v) => (
                <MenuItem key={v.id} value={v.id}>{v.version} - {v.fileName}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Version 2</InputLabel>
            <Select value={version2} label="Version 2" onChange={(e) => setVersion2(e.target.value)}>
              {versions.map((v) => (
                <MenuItem key={v.id} value={v.id}>{v.version} - {v.fileName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Button variant="contained" onClick={handleCompare} disabled={loading || !version1 || !version2}>
          Compare
        </Button>

        {diff && (
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>Comparison Result</Typography>
            <Box p={2} bgcolor="grey.100" borderRadius={1}>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.875rem' }}>
                {JSON.stringify(diff, null, 2)}
              </pre>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
