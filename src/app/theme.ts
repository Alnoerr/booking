import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#34523f', dark: '#20392a', contrastText: '#fffdf8' },
    secondary: { main: '#d97941' },
    background: { default: '#f5f2ea', paper: '#fffdf8' },
    text: { primary: '#1b2820', secondary: '#687169' },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.04em' },
    h2: { fontWeight: 700, letterSpacing: '-0.03em' },
    h3: { fontWeight: 650, letterSpacing: '-0.02em' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: { styleOverrides: { root: { boxShadow: 'none' } } },
    MuiCard: { styleOverrides: { root: { boxShadow: '0 12px 36px rgba(31, 48, 37, 0.07)' } } },
  },
})

