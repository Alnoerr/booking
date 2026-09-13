import { useEffect, useState } from 'react'
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import type { Location } from '../../entities/book/apiTypes'
import { api } from '../../shared/api'

interface Props {
  open: boolean
  location: Location | null
  onClose: () => void
  onSaved: (location: Location) => void
}

export function LocationDialog({ open, location, onClose, onSaved }: Props) {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [hours, setHours] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setName(location?.name ?? '')
    setAddress(location?.address ?? '')
    setHours(location?.working_hours ?? '')
    setError('')
  }, [location, open])

  async function save() {
    if (!name.trim() || !address.trim() || !hours.trim()) {
      setError('Заполните все поля')
      return
    }
    try {
      const saved = await api<Location>(location ? `/locations/${location.id}` : '/locations', {
        method: location ? 'PATCH' : 'POST',
        body: JSON.stringify({ name, address, working_hours: hours }),
      }, true)
      onSaved(saved)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка сохранения')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{location ? 'Изменить место' : 'Новое место'}</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
        <TextField label="Название" fullWidth value={name} onChange={(e) => setName(e.target.value)} sx={{ mt: 2 }} />
        <TextField label="Адрес" fullWidth value={address} onChange={(e) => setAddress(e.target.value)} sx={{ mt: 2 }} />
        <TextField label="Время работы" fullWidth value={hours} onChange={(e) => setHours(e.target.value)} sx={{ mt: 2 }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={save}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  )
}

