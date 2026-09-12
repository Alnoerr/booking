import { FormEvent, useState } from 'react'
import { Alert, Button, Container, Paper, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../app/AuthContext'

export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function submit(event: FormEvent) {
    event.preventDefault()
    if (password.length < 8) {
      setError('Минимум 8 символов')
      return
    }
    try {
      await register(email, password)
      navigate('/catalog')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка регистрации')
    }
  }

  return (
    <Container maxWidth="xs" sx={{ py: 6 }}>
      <Paper component="form" onSubmit={submit} sx={{ p: 3 }}>
        <Typography variant="h5">Регистрация</Typography>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <TextField label="Почта" type="email" required fullWidth value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mt: 3 }} />
        <TextField label="Пароль" type="password" required fullWidth value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mt: 2 }} />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>Создать аккаунт</Button>
        <Button component={Link} to="/login" fullWidth sx={{ mt: 1 }}>Уже есть аккаунт</Button>
      </Paper>
    </Container>
  )
}

