import { useEffect, useState } from 'react'
import { Typography, Container, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { Add } from '@mui/icons-material'
import api from '../api/axios'

export default function DatasetListPage() {
  const [datasets, setDatasets] = useState<any[]>([])

  const fetchDatasets = async () => {
    const res = await api.get('/datasets')
    setDatasets(res.data.data)
  }

  useEffect(() => {
    fetchDatasets()
  }, [])

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Datasets</Typography>
      <Button variant="contained" startIcon={<Add />} sx={{ mb: 2 }}>Create Dataset</Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datasets.map((ds) => (
              <TableRow key={ds.id}>
                <TableCell>{ds.name}</TableCell>
                <TableCell>{ds.description}</TableCell>
                <TableCell>{new Date(ds.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}