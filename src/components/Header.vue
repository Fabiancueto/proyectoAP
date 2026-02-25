<script setup lang="ts">
import { LogOut, BarChart2, Home } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

const navItems = [
  { label: 'Inicio', to: { name: 'home' }, icon: Home },
  { label: 'Gráfica', to: { name: 'graficas' }, icon: BarChart2 },
]

defineEmits<{ (e: 'logout'): void }>()
</script>

<template>
  <header class="fixed top-0 left-0 right-0 h-16 bg-[#D50000] z-50" style="box-shadow: 0 2px 8px rgba(0,0,0,0.25);">
    <!-- Barra amarilla inferior -->
    <div class="absolute bottom-0 left-0 right-0 h-1 bg-[#FFCC00]"></div>

    <div class="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

      <!-- Logo OXXO -->
      <div class="flex items-center">
        <img src="/oxxo-logo.png" alt="OXXO" class="h-10 w-auto" />
      </div>

      <!-- Navegación + Logout -->
      <nav class="flex items-center gap-8">
        <RouterLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.to"
          class="flex items-center gap-1.5 text-white relative group transition-colors duration-200"
          active-class="text-[#FFCC00]"
        >
          <component :is="item.icon" class="w-4 h-4" />
          <span class="text-sm font-semibold">{{ item.label }}</span>
          <span
            class="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-[#FFCC00] group-hover:w-full transition-all duration-300"
          ></span>
        </RouterLink>

        <button
          @click="$emit('logout')"
          class="flex items-center gap-1.5 text-white text-sm font-semibold hover:text-[#FFCC00] transition-colors duration-200"
          title="Cerrar sesión"
        >
          <LogOut class="w-4 h-4" />
          <span>Salir</span>
        </button>
      </nav>
    </div>
  </header>
</template>
