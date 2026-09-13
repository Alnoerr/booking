import { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Alert, Box, Button, Chip, CircularProgress, Container, Paper, Snackbar, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { BookCover } from '../entities/book/BookCover'
import type { Book, Location } from '../entities/book/apiTypes'
import { BookingDialog } from '../features/book-booking/BookingDialog'
import { api } from '../shared/api'

export function BookDetailsPage() {
  const { bookId } = useParams()
  const [book, setBook] = useState<Book | null>(null)
  const [location, setLocation] = useState<Location | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [booked, setBooked] = useState(false)
  const [messageOpen, setMessageOpen] = useState(false)

  useEffect(() => {
    Promise.all([
      api<Book>(`/books/${bookId}`),
      api<Location[]>('/locations'),
    ])
      .then(([bookData, locations]) => {
        setBook(bookData)
        setLocation(locations.find((item) => item.id === bookData.location_id) ?? null)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [bookId])

  if (loading) return <CircularProgress sx={{ m: 4 }} />
  if (error || !book) return <Alert severity="error" sx={{ m: 4 }}>{error || 'Книга не найдена'}</Alert>

  return (
    <Container component="main" maxWidth="md" className="page" sx={{ py: 4 }}>
      <Button component={Link} to="/catalog" startIcon={<ArrowBackIcon />}>Назад</Button>
      <Paper sx={{ mt: 2, p: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '260px 1fr' }, gap: 4 }}>
          <BookCover book={book} />
          <Box>
            <Chip label={book.available ? 'Доступна' : 'Забронирована'} color={book.available ? 'success' : 'default'} />
            <Typography variant="h4" sx={{ mt: 2 }}>{book.title}</Typography>
            <Typography color="text.secondary">{book.author}, {book.year}</Typography>
            <Typography sx={{ mt: 3 }}>{book.description}</Typography>
            <Typography sx={{ mt: 3 }}><b>Место выдачи:</b> {location?.name}</Typography>
            <Typography color="text.secondary">{location?.address}</Typography>
            <Typography sx={{ mt: 2 }}><b>Срок чтения:</b> 21 день</Typography>
            <Button variant="contained" disabled={!book.available || booked} onClick={() => setDialogOpen(true)} sx={{ mt: 3 }}>
              {booked ? 'Забронировано' : 'Забронировать'}
            </Button>
          </Box>
        </Box>
      </Paper>
      <BookingDialog
        open={dialogOpen}
        bookTitle={book.title}
        onClose={() => setDialogOpen(false)}
        onBooked={() => {
          setDialogOpen(false)
          setBooked(true)
          setMessageOpen(true)
        }}
      />
      <Snackbar open={messageOpen} autoHideDuration={2500} message="Книга забронирована" onClose={() => setMessageOpen(false)} />
    </Container>
  )
}
