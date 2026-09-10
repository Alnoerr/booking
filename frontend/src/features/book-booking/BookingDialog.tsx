import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { locations } from '../../entities/book/demoData'

interface Props {
  open: boolean
  bookTitle: string
  onClose: () => void
  onBooked: () => void
}

export function BookingDialog({ open, bookTitle, onClose, onBooked }: Props) {
  const [locationId, setLocationId] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function submit() {
    if (!locationId) {
      setError('Выберите место выдачи')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setLocationId('')
      setError('')
      onBooked()
    }, 500)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Бронирование</DialogTitle>
      <DialogContent>
        <p>{bookTitle}</p>
        <FormControl fullWidth error={Boolean(error)}>
          <InputLabel>Место выдачи</InputLabel>
          <Select
            value={locationId}
            label="Место выдачи"
            onChange={(event) => {
              setLocationId(event.target.value)
              setError('')
            }}
          >
            {locations.map((location) => (
              <MenuItem key={location.id} value={location.id}>{location.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{error}</FormHelperText>
        </FormControl>
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

