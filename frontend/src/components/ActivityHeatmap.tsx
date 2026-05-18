import React, { useState, useEffect } from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import axios from 'axios';

interface HeatmapData {
  date: string;
  count: number;
}

export default function ActivityHeatmap({ userId, showError }: { userId?: number; showError: (msg: string) => void }) {
  const [data, setData] = useState<HeatmapData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeatmap = async () => {
      try {
        const url = userId 
          ? `/api/users/${userId}/activity/heatmap` 
          : '/api/users/me/activity/heatmap';
        const res = await axios.get(url);
        setData(res.data.data || []);
      } catch (error: any) {
        showError('Failed to load activity heatmap');
      } finally {
        setLoading(false);
      }
    };

    fetchHeatmap();
  }, [userId]);

  const getColor = (count: number) => {
    if (count === 0) return '#ebedf0';
    if (count <= 2) return '#9be9a8';
    if (count <= 5) return '#40c463';
    if (count <= 10) return '#30a14e';
    return '#216e39';
  };

  // Generate last 30 days
  const days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split('T')[0];
  });

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Activity Heatmap (Last 30 Days)</Typography>
      <Box display="flex" gap={0.5} flexWrap="wrap">
        {days.map((date, index) => {
          const dayData = data.find(d => d.date === date);
          const count = dayData?.count || 0;
          return (
            <Tooltip key={index} title={`${date}: ${count} activities`}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  backgroundColor: getColor(count),
                  borderRadius: 1,
                  border: '1px solid #d0d7de',
                }}
              />
            </Tooltip>
          );
        })}
      </Box>
      <Typography variant="caption" color="text.secondary" mt={1} display="block">
        Darker = More Activity
      </Typography>
    </Box>
  );
}
