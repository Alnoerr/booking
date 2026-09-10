import { Card, CardActionArea, CardContent, Chip, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import type { Book } from './types'
import { BookCover } from './BookCover'

export function BookCard({ book }: { book: Book }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea component={Link} to={`/catalog/${book.id}`} sx={{ height: '100%' }}>
        <BookCover book={book} />
        <CardContent>
          <Typography fontWeight="bold">{book.title}</Typography>
          <Typography variant="body2" color="text.secondary">{book.author}</Typography>
          <Chip label={book.available ? 'Доступна' : 'Забронирована'} size="small" color={book.available ? 'success' : 'default'} sx={{ mt: 2 }} />
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
