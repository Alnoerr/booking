const API_URL = 'http://127.0.0.1:8001'

export interface Tokens {
  access_token: string
  refresh_token: string
}

function saveTokens(tokens: Tokens) {
  localStorage.setItem('access_token', tokens.access_token)
  localStorage.setItem('refresh_token', tokens.refresh_token)
}

export function clearTokens() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

export function getRefreshToken() {
  return localStorage.getItem('refresh_token')
}

async function refreshTokens() {
  const refreshToken = getRefreshToken()
  if (!refreshToken) return false

  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  })
  if (!response.ok) {
    clearTokens()
    return false
  }

  saveTokens(await response.json())
  return true
}

export async function api<T>(path: string, options: RequestInit = {}, auth = false): Promise<T> {
  const headers = new Headers(options.headers)
  headers.set('Content-Type', 'application/json')
  if (auth) {
    const token = localStorage.getItem('access_token')
    if (token) headers.set('Authorization', `Bearer ${token}`)
  }

  let response = await fetch(`${API_URL}${path}`, { ...options, headers })
  if (response.status === 401 && auth && await refreshTokens()) {
    headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
    response = await fetch(`${API_URL}${path}`, { ...options, headers })
  }

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new Error(typeof data?.detail === 'string' ? data.detail : 'Ошибка запроса')
  }
  if (response.status === 204) return undefined as T
  return response.json()
}

export { saveTokens }

