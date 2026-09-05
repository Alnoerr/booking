import MenuBookIcon from '@mui/icons-material/MenuBook'
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'

const navigation = [
  { label: 'Каталог', path: '/catalog' },
  { label: 'Бронирования', path: '/reservations' },
  { label: 'Места выдачи', path: '/locations' },
  { label: 'Статистика', path: '/statistics' },
]

export function AppShell() {
  return (
    <Box>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 1, flexWrap: 'wrap' }}>
            <Stack component={Link} to="/catalog" direction="row" spacing={1} alignItems="center" sx={{ mr: 'auto' }}>
              <MenuBookIcon />
              <Typography variant="h6" fontWeight="bold">Обмен книгами</Typography>
            </Stack>
            <Stack direction="row" sx={{ overflowX: 'auto' }}>
              {navigation.map((item) => (
                <Button key={item.path} component={Link} to={item.path} color="inherit">{item.label}</Button>
              ))}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </Box>
  )
}
