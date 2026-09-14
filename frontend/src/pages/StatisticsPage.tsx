import { useEffect, useState } from 'react'
import { Alert, Box, Card, CardContent, CircularProgress, Container, Typography } from '@mui/material'
import type { Statistics } from '../entities/book/apiTypes'
import { api } from '../shared/api'

export function StatisticsPage() {
  const [statistics, setStatistics] = useState<Statistics | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api<Statistics>('/statistics').then(setStatistics).catch((err) => setError(err.message))
  }, [])

  const metrics = statistics ? [
    { label: 'Книг', value: statistics.books },
    { label: 'Всего бронирований', value: statistics.reservations },
    { label: 'Активных бронирований', value: statistics.active_reservations },
  ] : []

  return (
    <Container component="main" maxWidth="md" className="page" sx={{ py: 4 }}>
      <Typography variant="h4">Статистика</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>Простая статистика сервиса.</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {!statistics && !error && <CircularProgress />}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2 }}>
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent>
              <Typography color="text.secondary">{metric.label}</Typography>
              <Typography variant="h4" sx={{ mt: 1 }}>{metric.value}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  )
}
