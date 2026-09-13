import { useEffect, useState } from 'react'
import { Alert, Box, Button, CircularProgress, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { BookCard } from '../entities/book/BookCard'
import type { Book } from '../entities/book/apiTypes'
import { BookSearch } from '../features/book-search/BookSearch'
import { api } from '../shared/api'
import { useAuth } from '../app/AuthContext'

export function CatalogPage() {
  const { user } = useAuth()
  const [books, setBooks] = useState<Book[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const query = search.toLowerCase()
  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author} ${book.genre}`.toLowerCase().includes(query),
  )

  useEffect(() => {
    api<Book[]>('/books')
      .then(setBooks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Container component="main" maxWidth="lg" className="page" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Typography variant="h4">Каталог книг</Typography>
        <Button component={Link} to={user ? '/books/new' : '/login'} variant="contained">Добавить книгу</Button>
      </Box>
      <Typography color="text.secondary" sx={{ mt: 1 }}>Найдите книгу и забронируйте её.</Typography>

      <BookSearch value={search} onChange={setSearch} />

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : filteredBooks.length === 0 ? (
        <Alert severity="info">Книги не найдены</Alert>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {filteredBooks.map((book) => <BookCard key={book.id} book={book} />)}
        </Box>
      )}
    </Container>
  )
}
