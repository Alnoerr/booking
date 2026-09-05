import { Box, Card, CardContent, Container, Typography } from '@mui/material'

const metrics = [
  { label: 'Книг в каталоге', value: 1248 },
  { label: 'Успешных обменов', value: 3672 },
  { label: 'Читателей', value: 594 },
]

export function StatisticsPage() {
  return (
    <Container component="main" maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4">Статистика</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>Простая статистика сервиса.</Typography>
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
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6">Самый популярный жанр</Typography>
          <Typography sx={{ mt: 1 }}>Классика — 32% обменов</Typography>
        </CardContent>
      </Card>
    </Container>
  )
}
