import { useEffect, useState } from 'react'
import { Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box } from '@mui/material'
import api from '../api/axios'
import { useSnackbar } from 'notistack'

export default function ActivityLogPage() {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { enqueueSnackbar } = useSnackbar()

  const fetchLogs = async () => {
    try {
      const res = await api.get('/activity-logs')
      setLogs(res.data.data)
    } catch (err) {
      enqueueSnackbar('Failed to load activity logs', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Activity Log</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        View your recent actions in the system.
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={8}>
          <CircularProgress size={60} />
        </Box>
      ) : logs.length === 0 ? (
        <Typography color="text.secondary">No activity logs found.</Typography>
      ) : (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Action</strong></TableCell>
                <TableCell><strong>Details</strong></TableCell>
                <TableCell><strong>Time</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.details || '-'}</TableCell>
                  <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  )
}