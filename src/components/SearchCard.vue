<script setup lang="ts">
import { ref } from 'vue'
import { Search, Loader2 } from 'lucide-vue-next'
// @ts-ignore
import { buscarPorEmpleado, buscarPorTienda, buscarPorRegion } from '../service/api.js'

interface Movimiento {
  tienda: string
  empleado: string
  descripcion: string
  monto: number
  fecha: string
  plaza: string
  asesor: string
}

const emit = defineEmits<{
  (e: 'searchResult', payload: { movimientos: Movimiento[]; notFound: boolean }): void
}>()

// Estado para cada búsqueda
const plazaVal   = ref('')
const tiendaVal   = ref('')
const empleadoVal = ref('')

const loadingPlaza   = ref(false)
const loadingTienda   = ref(false)
const loadingEmpleado = ref(false)

const errorPlaza   = ref('')
const errorTienda   = ref('')
const errorEmpleado = ref('')

async function doSearch(
  apiFn: (val: string) => Promise<any>,
  value: string,
  setLoading: (v: boolean) => void,
  setError: (v: string) => void,
) {
  if (!value.trim()) return
  setLoading(true)
  setError('')
  try {
    const data = await apiFn(value.trim())
    if (data.total === 0) {
      emit('searchResult', { movimientos: [], notFound: true })
    } else {
      emit('searchResult', { movimientos: data.data, notFound: false })
    }
  } catch (err: any) {
    setError(err.message || 'Error al conectar con el servidor.')
    emit('searchResult', { movimientos: [], notFound: false })
  } finally {
    setLoading(false)
  }
}

const buscarPlaza   = () => doSearch(buscarPorRegion,   plazaVal.value,   v => (loadingPlaza.value = v),   v => (errorPlaza.value = v))
const buscarTienda   = () => doSearch(buscarPorTienda,   tiendaVal.value,   v => (loadingTienda.value = v),   v => (errorTienda.value = v))
const buscarEmpleado = () => doSearch(buscarPorEmpleado, empleadoVal.value, v => (loadingEmpleado.value = v), v => (errorEmpleado.value = v))

const onKey = (e: KeyboardEvent, fn: () => void) => { if (e.key === 'Enter') fn() }
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
    <h2 class="text-2xl font-semibold text-gray-900 mb-1">Búsqueda</h2>
    <p class="text-sm text-gray-500 mb-6">Aquí podrás buscar los datos de los Incentivos.</p>
    <hr class="border-gray-200 mb-6" />

    <!-- Buscar Plaza -->
    <div class="mb-5">
      <label class="block text-sm font-semibold text-gray-800 mb-2">Buscar Plaza:</label>
      <div class="flex gap-3">
        <input
          v-model="plazaVal"
          type="text"
          @keypress="onKey($event, buscarPlaza)"
          placeholder="Ingrese la plaza..."
          :disabled="loadingPlaza"
          class="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent transition-all duration-200 text-gray-800 disabled:opacity-60"
        />
        <button
          @click="buscarPlaza"
          :disabled="!plazaVal.trim() || loadingPlaza"
          class="bg-[#FFCC00] text-gray-900 px-6 py-2.5 rounded-lg font-semibold hover:bg-[#FFD700] active:bg-[#FFC700] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
        >
          <Loader2 v-if="loadingPlaza" class="w-4 h-4 animate-spin" />
          <Search v-else class="w-4 h-4" />
          Buscar
        </button>
      </div>
      <p v-if="errorPlaza" class="mt-2 text-sm text-red-600">{{ errorPlaza }}</p>
    </div>

    <hr class="border-gray-100 mb-5" />

    <!-- Buscar Tienda -->
    <div class="mb-5">
      <label class="block text-sm font-semibold text-gray-800 mb-2">Buscar Tienda:</label>
      <div class="flex gap-3">
        <input
          v-model="tiendaVal"
          type="text"
          @keypress="onKey($event, buscarTienda)"
          placeholder="Ingrese la tienda..."
          :disabled="loadingTienda"
          class="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent transition-all duration-200 text-gray-800 disabled:opacity-60"
        />
        <button
          @click="buscarTienda"
          :disabled="!tiendaVal.trim() || loadingTienda"
          class="bg-[#FFCC00] text-gray-900 px-6 py-2.5 rounded-lg font-semibold hover:bg-[#FFD700] active:bg-[#FFC700] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
        >
          <Loader2 v-if="loadingTienda" class="w-4 h-4 animate-spin" />
          <Search v-else class="w-4 h-4" />
          Buscar
        </button>
      </div>
      <p v-if="errorTienda" class="mt-2 text-sm text-red-600">{{ errorTienda }}</p>
    </div>

    <hr class="border-gray-100 mb-5" />

    <!-- Buscar Empleado -->
    <div>
      <label class="block text-sm font-semibold text-gray-800 mb-2">Buscar Empleado:</label>
      <div class="flex gap-3">
        <input
          v-model="empleadoVal"
          type="text"
          @keypress="onKey($event, buscarEmpleado)"
          placeholder="Ingrese el ID de empleado..."
          :disabled="loadingEmpleado"
          class="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent transition-all duration-200 text-gray-800 disabled:opacity-60"
        />
        <button
          @click="buscarEmpleado"
          :disabled="!empleadoVal.trim() || loadingEmpleado"
          class="bg-[#FFCC00] text-gray-900 px-6 py-2.5 rounded-lg font-semibold hover:bg-[#FFD700] active:bg-[#FFC700] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
        >
          <Loader2 v-if="loadingEmpleado" class="w-4 h-4 animate-spin" />
          <Search v-else class="w-4 h-4" />
          Buscar
        </button>
      </div>
      <p v-if="errorEmpleado" class="mt-2 text-sm text-red-600">{{ errorEmpleado }}</p>
    </div>
  </div>
</template>
