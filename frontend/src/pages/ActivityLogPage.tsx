import { useQuery } from '@tanstack/react-query';
import { Typography, Container, Paper, Box, Grid } from '@mui/material';
import { api } from '../api/axios';

export default function ActivityLogPage() {
  const { data: heatmap, isLoading } = useQuery({
    queryKey: ['activityHeatmap'],
    queryFn: () => api.get('/activity-logs/heatmap').then(res => res.data.data),
  });

  if (isLoading) return <Typography>Loading...</Typography>;

  const dates = Object.keys(heatmap || {}).sort();
  const maxCount = Math.max(...Object.values(heatmap || {}), 1);

  const getColor = (count: number) => {
    const intensity = Math.min(count / maxCount, 1);
    return `rgba(25, 118, 210, ${intensity})`;
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Activity Heatmap</Typography>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>Last 30 Days Activity</Typography>
        <Grid container spacing={0.5} sx={{ mt: 2 }}>
          {dates.map((date, index) => (
            <Grid item key={index} xs={1}>
              <Box
                sx={{
                  height: 30,
                  backgroundColor: getColor(heatmap[date]),
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                {heatmap[date]}
              </Box>
              <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 0.5 }}>
                {date.split('-').slice(1).join('/')}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
          Darker = More activity
        </Typography>
      </Paper>
    </Container>
  );
}
