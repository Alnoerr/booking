import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { api, clearTokens, getRefreshToken, saveTokens } from '../shared/api'
import type { Tokens } from '../shared/api'

interface User {
  id: number
  email: string
}

interface AuthValue {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api<User>('/auth/me', {}, true)
      .then(setUser)
      .catch(() => clearTokens())
      .finally(() => setLoading(false))
  }, [])

  async function authenticate(path: string, email: string, password: string) {
    const tokens = await api<Tokens>(path, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    saveTokens(tokens)
    setUser(await api<User>('/auth/me', {}, true))
  }

  async function logout() {
    const refreshToken = getRefreshToken()
    if (refreshToken) {
      await api('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({ refresh_token: refreshToken }),
      }).catch(() => undefined)
    }
    clearTokens()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login: (email, password) => authenticate('/auth/login', email, password),
      register: (email, password) => authenticate('/auth/register', email, password),
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error('AuthProvider не подключён')
  return value
}

