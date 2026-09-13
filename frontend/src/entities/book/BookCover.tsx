import { Box, Typography } from '@mui/material'
import type { Book } from './apiTypes'

const colors = ['#395144', '#a8443a', '#647d86', '#526d82', '#8d6e63']

export function BookCover({ book }: { book: Book }) {
  return (
    <Box sx={{ height: 220, bgcolor: colors[book.id % colors.length], color: 'white', p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRadius: 1 }}>
      <Typography variant="h6">{book.title}</Typography>
    </Box>
  )
}
