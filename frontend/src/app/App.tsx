import { CircularProgress, CssBaseline, ThemeProvider } from '@mui/material'
import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { theme } from './theme'
import { AppShell } from '../shared/AppShell'
import { BookDetailsPage } from '../pages/BookDetailsPage'
import { CatalogPage } from '../pages/CatalogPage'
import { LocationsPage } from '../pages/LocationsPage'
import { ReservationsPage } from '../pages/ReservationsPage'
import { StatisticsPage } from '../pages/StatisticsPage'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { BookFormPage } from '../pages/BookFormPage'
import { AuthProvider, useAuth } from './AuthContext'

function PrivatePage({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <CircularProgress sx={{ m: 4 }} />
  return user ? children : <Navigate to="/login" replace />
}

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/catalog" replace />} />
          <Route element={<AppShell />}>
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:bookId" element={<BookDetailsPage />} />
            <Route path="/books/new" element={<PrivatePage><BookFormPage /></PrivatePage>} />
            <Route path="/books/:bookId/edit" element={<PrivatePage><BookFormPage /></PrivatePage>} />
            <Route path="/reservations" element={<PrivatePage><ReservationsPage /></PrivatePage>} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/catalog" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}
