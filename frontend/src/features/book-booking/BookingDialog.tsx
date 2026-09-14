import { useState } from 'react'
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { api } from '../../shared/api'

interface Props {
  open: boolean
  bookId: number
  bookTitle: string
  onClose: () => void
  onBooked: () => void
}

export function BookingDialog({ open, bookId, bookTitle, onClose, onBooked }: Props) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit() {
    setLoading(true)
    setError('')
    try {
      await api('/reservations', {
        method: 'POST',
        body: JSON.stringify({ book_id: bookId }),
      }, true)
      onBooked()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка бронирования')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Бронирование</DialogTitle>
      <DialogContent>
        <p>{bookTitle}</p>
        {error && <Alert severity="error">{error}</Alert>}
        <p>Срок возврата — 21 день.</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={submit} variant="contained" disabled={loading}>
          {loading ? 'Сохранение...' : 'Забронировать'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

