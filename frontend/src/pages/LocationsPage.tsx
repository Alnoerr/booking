import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Card, CardContent, Container, Stack, Typography } from '@mui/material'
import { locations } from '../data/demoData'

export function LocationsPage() {
  return (
    <Container component="main" maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4">Места выдачи</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>Здесь можно получить или вернуть книгу.</Typography>
      <Stack spacing={2}>
        {locations.map((location) => (
          <Card key={location.id}>
            <CardContent>
              <Stack direction="row" spacing={2}>
                <LocationOnIcon color="primary" />
                <div>
                  <Typography fontWeight="bold">{location.name}</Typography>
                  <Typography color="text.secondary">{location.address}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>Время работы: {location.hours}</Typography>
                </div>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  )
}
