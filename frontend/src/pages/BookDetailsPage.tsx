import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Button, Chip, Container, Paper, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { BookCover } from '../entities/book/BookCover'
import { books, locations } from '../entities/book/demoData'

export function BookDetailsPage() {
  const { bookId } = useParams()
  const book = books.find((item) => item.id === Number(bookId)) ?? books[0]
  const location = locations.find((item) => item.id === book.locationId)

  return (
    <Container component="main" maxWidth="md" sx={{ py: 4 }}>
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
            <Button variant="contained" disabled={!book.available} sx={{ mt: 3 }}>Забронировать</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}
