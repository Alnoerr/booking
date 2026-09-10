import { Button, Card, CardContent, Chip, Container, Typography } from '@mui/material'
import { books, locations } from '../entities/book/demoData'

export function ReservationsPage() {
  const book = books[1]
  const location = locations.find((item) => item.id === book.locationId)

  return (
    <Container component="main" maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4">Мои бронирования</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>Текущие и завершённые бронирования.</Typography>
      <Card>
        <CardContent>
          <Chip label="На руках" color="success" size="small" />
          <Typography variant="h5" sx={{ mt: 2 }}>{book.title}</Typography>
          <Typography color="text.secondary">{book.author}</Typography>
          <Typography sx={{ mt: 2 }}>Вернуть до: 18 сентября</Typography>
          <Typography>Место возврата: {location?.name}</Typography>
          <Button variant="outlined" sx={{ mt: 2 }}>Подробнее</Button>
        </CardContent>
      </Card>
    </Container>
  )
}
