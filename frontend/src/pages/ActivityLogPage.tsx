import React, { useState } from 'react';
import { Box, Typography, Button, TextField, MenuItem, Select, FormControl, InputLabel, Stack } from '@mui/material';
import { Download, FilterList } from '@mui/icons-material';
import axios from 'axios';

export default function ActivityLogPage({ showError }: { showError: (msg: string) => void }) {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    startDate: '',
    endDate: '',
    userId: '',
  });

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.type) params.append('type', filters.type);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      if (filters.userId) params.append('userId', filters.userId);

      const res = await axios.get(`/api/activity-logs?${params.toString()}`);
      setLogs(res.data.data || []);
    } catch (error: any) {
      showError(error.response?.data?.error || 'Failed to fetch activity logs');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format: 'csv' | 'json') => {
    try {
      const response = await axios.get(`/api/activity-logs/export?format=${format}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `activity-logs.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      showError('Failed to export activity logs');
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Activity Log</Typography>

      {/* Advanced Filters */}
      <Box mb={3} p={2} border={1} borderColor="grey.300" borderRadius={1}>
        <Typography variant="h6" gutterBottom><FilterList /> Advanced Filters</Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={filters.type}
              label="Type"
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="DATASET_CREATED">Dataset Created</MenuItem>
              <MenuItem value="COMMENT">Comment</MenuItem>
              <MenuItem value="SHARE">Share</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Start Date"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          />

          <TextField
            label="End Date"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          />

          <Button variant="contained" onClick={fetchLogs} disabled={loading}>
            Apply Filters
          </Button>
        </Stack>
      </Box>

      {/* Export Buttons */}
      <Stack direction="row" spacing={2} mb={2}>
        <Button
          variant="outlined"
          startIcon={<Download />}
          onClick={() => handleExport('csv')}
        >
          Export CSV
        </Button>
        <Button
          variant="outlined"
          startIcon={<Download />}
          onClick={() => handleExport('json')}
        >
          Export JSON
        </Button>
      </Stack>

      {/* Activity Log List */}
      <Box>
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <Box key={index} p={2} mb={1} border={1} borderColor="grey.200" borderRadius={1}>
              <Typography variant="subtitle2">{log.type}</Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(log.createdAt).toLocaleString()} - {log.message}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography color="text.secondary">No activity logs found. Apply filters to see results.</Typography>
        )}
      </Box>
    </Box>
  );
}
