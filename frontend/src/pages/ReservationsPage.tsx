import { useEffect, useState } from 'react'
import { Alert, Button, Card, CardContent, Chip, CircularProgress, Container, Stack, Typography } from '@mui/material'
import type { Reservation } from '../entities/book/apiTypes'
import { api } from '../shared/api'

export function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api<Reservation[]>('/reservations', {}, true)
      .then(setReservations)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  async function changeStatus(reservation: Reservation, status: 'returned' | 'cancelled') {
    try {
      const updated = await api<Reservation>(`/reservations/${reservation.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }, true)
      setReservations(reservations.map((item) => item.id === updated.id ? updated : item))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка')
    }
  }

  async function remove(reservation: Reservation) {
    try {
      await api(`/reservations/${reservation.id}`, { method: 'DELETE' }, true)
      setReservations(reservations.filter((item) => item.id !== reservation.id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка')
    }
  }

  return (
    <Container component="main" maxWidth="md" className="page" sx={{ py: 4 }}>
      <Typography variant="h4">Мои бронирования</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>Текущие и завершённые бронирования.</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {loading && <CircularProgress />}
      {!loading && reservations.length === 0 && <Alert severity="info">Бронирований пока нет</Alert>}
      <Stack spacing={2}>
        {reservations.map((reservation) => (
          <Card key={reservation.id}>
            <CardContent>
              <Chip label={reservation.status === 'active' ? 'На руках' : reservation.status === 'returned' ? 'Возвращена' : 'Отменена'} color={reservation.status === 'active' ? 'success' : 'default'} size="small" />
              <Typography variant="h5" sx={{ mt: 2 }}>{reservation.book.title}</Typography>
              <Typography color="text.secondary">{reservation.book.author}</Typography>
              <Typography sx={{ mt: 2 }}>Вернуть до: {reservation.due_date}</Typography>
              {reservation.status === 'active' ? (
                <>
                  <Button variant="contained" onClick={() => changeStatus(reservation, 'returned')} sx={{ mt: 2 }}>Вернуть</Button>
                  <Button onClick={() => changeStatus(reservation, 'cancelled')} sx={{ mt: 2 }}>Отменить</Button>
                </>
              ) : (
                <Button color="error" onClick={() => remove(reservation)} sx={{ mt: 2 }}>Удалить</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  )
}
