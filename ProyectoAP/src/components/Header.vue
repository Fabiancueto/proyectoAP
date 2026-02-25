<script setup lang="ts">
const navItems = [
  { label: "Inicio", href: "#" },
  { label: "Buscar Empleado", href: "#" },
]
</script>

<template>
  <header class="fixed top-0 left-0 right-0 h-16 bg-[#D50000] z-50" style="box-shadow: 0 2px 8px rgba(0,0,0,0.25);">
    <!-- Barra amarilla inferior -->
    <div class="absolute bottom-0 left-0 right-0 h-1 bg-[#FFCC00]"></div>

    <div class="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

      <!-- Logo OXXO -->
      <div class="flex items-center">
        <img
          src="/oxxo-logo.svg"
          alt="OXXO"
          class="h-10 w-auto"
        />
      </div>

      <!-- Navegación -->
      <nav class="flex items-center gap-8">
        <a
          v-for="item in navItems"
          :key="item.label"
          :href="item.href"
          class="text-white relative group transition-colors duration-200"
        >
          <span class="text-sm font-semibold">{{ item.label }}</span>
          <span
            class="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-[#FFCC00] group-hover:w-full transition-all duration-300"
          ></span>
        </a>
      </nav>
    </div>
  </header>
</template>
