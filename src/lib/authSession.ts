import type { AuthUser } from './types'

const AUTH_TOKEN_KEY = 'ecolyft_auth_token'
const AUTH_USER_KEY = 'ecolyft_auth_user'
const PENDING_EMAIL_KEY = 'ecolyft_pending_email'

export const authSession = {
  setPendingEmail(email: string) {
    sessionStorage.setItem(PENDING_EMAIL_KEY, email)
  },

  getPendingEmail() {
    return sessionStorage.getItem(PENDING_EMAIL_KEY)
  },

  clearPendingEmail() {
    sessionStorage.removeItem(PENDING_EMAIL_KEY)
  },

  setToken(token: string) {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
  },

  getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY)
  },

  setUser(user: AuthUser) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
  },

  getUser(): AuthUser | null {
    const raw = localStorage.getItem(AUTH_USER_KEY)
    if (!raw) return null
    try {
      return JSON.parse(raw) as AuthUser
    } catch {
      return null
    }
  },

  clearSession() {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(AUTH_USER_KEY)
    sessionStorage.removeItem(PENDING_EMAIL_KEY)
  },

  isAuthenticated() {
    return Boolean(this.getToken())
  },
}
