import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, CircularProgress } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

export default function DownloadStatsPage({ showError }: { showError: (msg: string) => void }) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/stats/downloads');
        setStats(res.data.data);
      } catch (error: any) {
        showError('Failed to load download statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;
  }

  if (!stats) {
    return <Typography>No statistics available</Typography>;
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Download Statistics</Typography>

      <Grid container spacing={3}>
        {/* Total Downloads */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">Total Downloads</Typography>
            <Typography variant="h3" color="primary">{stats.totalDownloads || 0}</Typography>
          </Paper>
        </Grid>

        {/* Top Datasets */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Top Downloaded Datasets</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.topDatasets || []}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="downloadCount" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Downloads */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Recent Downloads (Last 7 Days)</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stats.recentDownloads || []}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4caf50" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
