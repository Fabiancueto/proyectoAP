<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { Loader2 } from 'lucide-vue-next'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMsg = ref('')

const handleLogin = async () => {
  if (!email.value.trim() || !password.value) return

  isLoading.value = true
  errorMsg.value = ''

  try {
    await auth.login(email.value.trim(), password.value)
    router.push({ name: 'home' })
  } catch {
    errorMsg.value = 'Credenciales inválidas. Intente de nuevo.'
  } finally {
    isLoading.value = false
  }
}

const handleKeyPress = (e: KeyboardEvent) => {
  if (e.key === 'Enter') handleLogin()
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Header -->
    <header
      class="fixed top-0 left-0 right-0 h-16 bg-[#D50000] z-50"
      style="box-shadow: 0 2px 8px rgba(0,0,0,0.25)"
    >
      <div class="absolute bottom-0 left-0 right-0 h-1 bg-[#FFCC00]"></div>
      <div class="max-w-7xl mx-auto px-6 h-full flex items-center">
        <img src="/oxxo-logo.png" alt="OXXO" class="h-10 w-auto" />
      </div>
    </header>

    <!-- Contenido centrado -->
    <main class="flex-1 flex items-center justify-center pt-16 px-4">
      <div class="w-full max-w-sm">
        <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
          <!-- Título -->
          <h1 class="text-2xl font-semibold text-gray-900 mb-1">Iniciar Sesión</h1>
          <p class="text-sm text-gray-500 mb-6">Ingresa tus credenciales para continuar.</p>

          <hr class="border-gray-200 mb-6" />

          <!-- Formulario -->
          <div class="space-y-4">
            <!-- Email -->
            <div>
              <label class="block text-sm font-semibold text-gray-800 mb-1.5">
                Correo electrónico
              </label>
              <input
                v-model="email"
                type="email"
                placeholder="correo@oxxo.com"
                :disabled="isLoading"
                @keypress="handleKeyPress"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent transition-all duration-200 text-gray-800 disabled:opacity-60"
              />
            </div>

            <!-- Contraseña -->
            <div>
              <label class="block text-sm font-semibold text-gray-800 mb-1.5">
                Contraseña
              </label>
              <input
                v-model="password"
                type="password"
                placeholder="••••••••••"
                :disabled="isLoading"
                @keypress="handleKeyPress"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent transition-all duration-200 text-gray-800 disabled:opacity-60"
              />
            </div>

            <!-- Error -->
            <p v-if="errorMsg" class="text-sm text-red-600">{{ errorMsg }}</p>

            <!-- Botón -->
            <button
              @click="handleLogin"
              :disabled="!email.trim() || !password || isLoading"
              class="w-full bg-[#D50000] text-white py-2.5 rounded-lg font-semibold hover:bg-[#B00000] active:bg-[#900000] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              <Loader2 v-if="isLoading" class="w-4 h-4 animate-spin" />
              <span>{{ isLoading ? 'Ingresando...' : 'Ingresar' }}</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
