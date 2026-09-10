import { CssBaseline, ThemeProvider } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'
import { theme } from './theme'
import { AppShell } from '../shared/AppShell'
import { BookDetailsPage } from '../pages/BookDetailsPage'
import { CatalogPage } from '../pages/CatalogPage'
import { LocationsPage } from '../pages/LocationsPage'
import { ReservationsPage } from '../pages/ReservationsPage'
import { StatisticsPage } from '../pages/StatisticsPage'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Navigate to="/catalog" replace />} />
        <Route element={<AppShell />}>
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:bookId" element={<BookDetailsPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/catalog" replace />} />
      </Routes>
    </ThemeProvider>
  )
}
