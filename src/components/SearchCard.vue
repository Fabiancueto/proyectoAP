<script setup lang="ts">
import { ref } from "vue"
import { Search, Loader2 } from "lucide-vue-next"
import { buscarPorEmpleado } from "../service/api.js"

interface Movimiento {
  tienda: string
  empleado: string
  descripcion: string
  monto: number
  at: string
  plaza: string
}

const emit = defineEmits<{
  (e: "searchResult", payload: { movimientos: Movimiento[]; notFound: boolean }): void
}>()

const searchId = ref("")
const isLoading = ref(false)
const errorMsg = ref("")

const handleSearch = async () => {
  if (!searchId.value.trim()) return

  isLoading.value = true
  errorMsg.value = ""

  try {
    const data = await buscarPorEmpleado(searchId.value.trim())

    if (data.total === 0) {
      emit("searchResult", { movimientos: [], notFound: true })
    } else {
      emit("searchResult", { movimientos: data.data, notFound: false })
    }
  } catch (err: any) {
    errorMsg.value = err.message || "Error al conectar con el servidor."
    emit("searchResult", { movimientos: [], notFound: false })
  } finally {
    isLoading.value = false
  }
}

const handleKeyPress = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    handleSearch()
  }
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
    <h2 class="text-2xl font-semibold text-gray-900 mb-2">Buscar Empleado</h2>

    <p class="text-sm text-gray-500 mb-6">
      Busca un empleado por su IdEmpleado.
    </p>

    <hr class="border-gray-200 mb-6" />

    <!-- Label + Input + Botón -->
    <div class="mb-2">
      <label class="block text-sm font-semibold text-gray-800 mb-2">
        ID de Empleado:
      </label>
      <div class="flex gap-3">
        <input
          v-model="searchId"
          type="text"
          @keypress="handleKeyPress"
          placeholder="Ingrese el ID..."
          :disabled="isLoading"
          class="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent transition-all duration-200 text-gray-800 disabled:opacity-60"
        />
        <button
          @click="handleSearch"
          :disabled="!searchId.trim() || isLoading"
          class="bg-[#FFCC00] text-gray-900 px-6 py-2.5 rounded-lg font-semibold hover:bg-[#FFD700] active:bg-[#FFC700] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
        >
          <Loader2 v-if="isLoading" class="w-4 h-4 animate-spin" />
          <Search v-else class="w-4 h-4" />
          Buscar
        </button>
      </div>

      <!-- Error de conexión -->
      <p v-if="errorMsg" class="mt-2 text-sm text-red-600">{{ errorMsg }}</p>
    </div>
  </div>
</template>
