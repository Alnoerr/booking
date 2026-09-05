import SearchIcon from '@mui/icons-material/Search'
import { Box, Container, InputAdornment, TextField, Typography } from '@mui/material'
import { BookCard } from '../components/BookCard'
import { books } from '../data/demoData'

export function CatalogPage() {
  return (
    <Container component="main" maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4">Каталог книг</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>Найдите книгу и забронируйте её.</Typography>

      <TextField
        fullWidth
        placeholder="Поиск по названию или автору"
        sx={{ mt: 3, mb: 4, maxWidth: 600, bgcolor: 'white' }}
        slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> } }}
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        {books.map((book) => <BookCard key={book.id} book={book} />)}
      </Box>
    </Container>
  )
}
