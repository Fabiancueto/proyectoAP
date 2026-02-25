import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loginApi } from '../service/api.js'
import { hashPassword } from '../utils/crypto.js'

const TOKEN_KEY = 'ap_token'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY))

  const isAuthenticated = computed(() => !!token.value)

  async function login(email: string, password: string): Promise<void> {
    const passwordHash = await hashPassword(password)
    const data = await loginApi(email, passwordHash)
    token.value = data.access_token
    localStorage.setItem(TOKEN_KEY, data.access_token)
  }

  function logout(): void {
    token.value = null
    localStorage.removeItem(TOKEN_KEY)
  }

  function getToken(): string | null {
    return token.value
  }

  return { token, isAuthenticated, login, logout, getToken }
})
