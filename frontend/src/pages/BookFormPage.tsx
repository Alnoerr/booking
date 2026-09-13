import { FormEvent, useEffect, useState } from 'react'
import { Alert, Button, Container, MenuItem, Paper, TextField, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import type { Book, Location } from '../entities/book/apiTypes'
import { api } from '../shared/api'

export function BookFormPage() {
  const { bookId } = useParams()
  const navigate = useNavigate()
  const [locations, setLocations] = useState<Location[]>([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [genre, setGenre] = useState('')
  const [year, setYear] = useState('')
  const [description, setDescription] = useState('')
  const [locationId, setLocationId] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    api<Location[]>('/locations').then(setLocations).catch((err) => setError(err.message))
    if (bookId) {
      api<Book>(`/books/${bookId}`).then((book) => {
        setTitle(book.title)
        setAuthor(book.author)
        setGenre(book.genre)
        setYear(String(book.year))
        setDescription(book.description)
        setLocationId(String(book.location_id))
      }).catch((err) => setError(err.message))
    }
  }, [bookId])

  async function submit(event: FormEvent) {
    event.preventDefault()
    if (!title.trim() || !author.trim() || !genre.trim() || !year || !locationId) {
      setError('Заполните обязательные поля')
      return
    }

    try {
      const book = await api<Book>(bookId ? `/books/${bookId}` : '/books', {
        method: bookId ? 'PATCH' : 'POST',
        body: JSON.stringify({
          title,
          author,
          genre,
          year: Number(year),
          description,
          location_id: Number(locationId),
        }),
      }, true)
      navigate(`/catalog/${book.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка сохранения')
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper component="form" onSubmit={submit} sx={{ p: 3 }}>
        <Typography variant="h5">{bookId ? 'Изменить книгу' : 'Новая книга'}</Typography>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <TextField label="Название" required fullWidth value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mt: 3 }} />
        <TextField label="Автор" required fullWidth value={author} onChange={(e) => setAuthor(e.target.value)} sx={{ mt: 2 }} />
        <TextField label="Жанр" required fullWidth value={genre} onChange={(e) => setGenre(e.target.value)} sx={{ mt: 2 }} />
        <TextField label="Год" type="number" required fullWidth value={year} onChange={(e) => setYear(e.target.value)} sx={{ mt: 2 }} />
        <TextField label="Описание" multiline rows={3} fullWidth value={description} onChange={(e) => setDescription(e.target.value)} sx={{ mt: 2 }} />
        <TextField select label="Место выдачи" required fullWidth value={locationId} onChange={(e) => setLocationId(e.target.value)} sx={{ mt: 2 }}>
          {locations.map((location) => <MenuItem key={location.id} value={location.id}>{location.name}</MenuItem>)}
        </TextField>
        {locations.length === 0 && <Typography color="text.secondary" variant="body2" sx={{ mt: 1 }}>Сначала добавьте место выдачи.</Typography>}
        <Button type="submit" variant="contained" sx={{ mt: 3 }}>Сохранить</Button>
        <Button onClick={() => navigate(-1)} sx={{ mt: 3 }}>Отмена</Button>
      </Paper>
    </Container>
  )
}

