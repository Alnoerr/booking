import { Box, Typography } from '@mui/material'
import type { books } from './demoData'

type Book = (typeof books)[number]

export function BookCover({ book }: { book: Book }) {
  return (
    <Box sx={{ height: 220, bgcolor: book.color, color: 'white', p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRadius: 1 }}>
      <Typography variant="h6">{book.title}</Typography>
    </Box>
  )
}
