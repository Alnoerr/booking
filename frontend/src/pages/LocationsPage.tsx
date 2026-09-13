import { useEffect, useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Alert, Button, Card, CardContent, CircularProgress, Container, Stack, Typography } from '@mui/material'
import type { Location } from '../entities/book/apiTypes'
import { LocationDialog } from '../features/location-form/LocationDialog'
import { api } from '../shared/api'
import { useAuth } from '../app/AuthContext'

export function LocationsPage() {
  const { user } = useAuth()
  const [locations, setLocations] = useState<Location[]>([])
  const [selected, setSelected] = useState<Location | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api<Location[]>('/locations')
      .then(setLocations)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  async function remove(location: Location) {
    if (!window.confirm('Удалить место выдачи?')) return
    try {
      await api(`/locations/${location.id}`, { method: 'DELETE' }, true)
      setLocations(locations.filter((item) => item.id !== location.id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка удаления')
    }
  }

  return (
    <Container component="main" maxWidth="md" className="page" sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">Места выдачи</Typography>
        {user && <Button variant="contained" onClick={() => { setSelected(null); setDialogOpen(true) }}>Добавить</Button>}
      </Stack>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>Здесь можно получить или вернуть книгу.</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {loading && <CircularProgress />}
      {!loading && locations.length === 0 && <Alert severity="info">Мест выдачи пока нет</Alert>}
      <Stack spacing={2}>
        {locations.map((location) => (
          <Card key={location.id}>
            <CardContent>
              <Stack direction="row" spacing={2}>
                <LocationOnIcon color="primary" />
                <div>
                  <Typography fontWeight="bold">{location.name}</Typography>
                  <Typography color="text.secondary">{location.address}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>Время работы: {location.working_hours}</Typography>
                  {user && <>
                    <Button onClick={() => { setSelected(location); setDialogOpen(true) }}>Изменить</Button>
                    <Button color="error" onClick={() => remove(location)}>Удалить</Button>
                  </>}
                </div>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
      <LocationDialog
        open={dialogOpen}
        location={selected}
        onClose={() => setDialogOpen(false)}
        onSaved={(saved) => {
          setLocations(selected
            ? locations.map((item) => item.id === saved.id ? saved : item)
            : [...locations, saved])
          setDialogOpen(false)
        }}
      />
    </Container>
  )
}
