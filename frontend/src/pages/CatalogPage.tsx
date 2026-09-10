import { useState } from 'react'
import { Alert, Box, Container, Typography } from '@mui/material'
import { BookCard } from '../entities/book/BookCard'
import { books } from '../entities/book/demoData'
import { BookSearch } from '../features/book-search/BookSearch'

export function CatalogPage() {
  const [search, setSearch] = useState('')
  const query = search.toLowerCase()
  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author} ${book.genre}`.toLowerCase().includes(query),
  )

  return (
    <Container component="main" maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4">Каталог книг</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>Найдите книгу и забронируйте её.</Typography>

      <BookSearch value={search} onChange={setSearch} />

      {filteredBooks.length === 0 ? (
        <Alert severity="info">Книги не найдены</Alert>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {filteredBooks.map((book) => <BookCard key={book.id} book={book} />)}
        </Box>
      )}
    </Container>
  )
}
