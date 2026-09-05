import { CssBaseline, ThemeProvider } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'
import { theme } from './theme'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Navigate to="/catalog" replace />} />
        <Route path="*" element={<Navigate to="/catalog" replace />} />
      </Routes>
    </ThemeProvider>
  )
}

