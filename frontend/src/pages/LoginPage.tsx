import { FormEvent, useState } from 'react'
import { Alert, Button, Container, Paper, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../app/AuthContext'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/catalog')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="xs" sx={{ py: 6 }}>
      <Paper component="form" onSubmit={submit} sx={{ p: 3 }}>
        <Typography variant="h5">Вход</Typography>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <TextField label="Почта" type="email" required fullWidth value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mt: 3 }} />
        <TextField label="Пароль" type="password" required fullWidth value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mt: 2 }} />
        <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ mt: 3 }}>{loading ? 'Вход...' : 'Войти'}</Button>
        <Button component={Link} to="/register" fullWidth sx={{ mt: 1 }}>Регистрация</Button>
      </Paper>
    </Container>
  )
}

