<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-vue-next'

interface Movimiento {
  tienda: string
  empleado: string
  descripcion: string
  monto: number
  fecha: string
  plaza: string
  asesor: string
}

const props = defineProps<{
  movimientos: Movimiento[]
  notFound: boolean
  hasSearched: boolean
}>()

const sortOrder = ref<'none' | 'desc' | 'asc'>('none')

function toggleSort() {
  if (sortOrder.value === 'none') sortOrder.value = 'desc'
  else if (sortOrder.value === 'desc') sortOrder.value = 'asc'
  else sortOrder.value = 'none'
}

function parseFecha(fecha: string): number {
  if (!fecha) return 0
  // DD/MM/YYYY o DD-MM-YYYY
  const parts = fecha.split(/[\/\-]/)
  if (parts.length === 3 && parts[0].length === 2) {
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).getTime()
  }
  return new Date(fecha).getTime()
}

const sortedMovimientos = computed(() => {
  if (sortOrder.value === 'none') return props.movimientos
  return [...props.movimientos].sort((a, b) => {
    const diff = parseFecha(a.fecha) - parseFecha(b.fecha)
    return sortOrder.value === 'desc' ? -diff : diff
  })
})

const formatMonto = (monto: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(monto)
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
    <h2 class="text-2xl font-semibold text-gray-900 mb-4">Resultado de Búsqueda</h2>
    <hr class="border-gray-200 mb-6" />

    <template v-if="hasSearched">
      <!-- Movimientos encontrados -->
      <div v-if="sortedMovimientos.length > 0">
        <p class="text-sm text-gray-500 mb-4">
          Se encontraron <span class="font-semibold text-gray-800">{{ sortedMovimientos.length }}</span> movimiento(s).
        </p>

        <div class="overflow-x-auto">
          <table class="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-200">
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tienda</th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700"># Empleado</th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Descripción</th>
                <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">Monto</th>
                <th
                  class="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer select-none hover:bg-gray-100 transition-colors duration-150"
                  @click="toggleSort"
                >
                  <div class="flex items-center gap-1.5">
                    <span>Fecha</span>
                    <ArrowDown v-if="sortOrder === 'desc'" class="w-3.5 h-3.5 text-[#D50000]" />
                    <ArrowUp  v-else-if="sortOrder === 'asc'" class="w-3.5 h-3.5 text-[#D50000]" />
                    <ArrowUpDown v-else class="w-3.5 h-3.5 text-gray-400" />
                  </div>
                </th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Plaza</th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Asesor</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(mov, index) in sortedMovimientos"
                :key="index"
                class="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
              >
                <td class="px-4 py-3 text-sm text-gray-900 font-medium">{{ mov.tienda }}</td>
                <td class="px-4 py-3 text-sm text-gray-900">{{ mov.empleado }}</td>
                <td class="px-4 py-3 text-sm text-gray-700">{{ mov.descripcion }}</td>
                <td class="px-4 py-3 text-sm text-gray-900 text-right font-medium">{{ formatMonto(mov.monto) }}</td>
                <td class="px-4 py-3 text-sm text-gray-700">{{ mov.fecha }}</td>
                <td class="px-4 py-3 text-sm text-gray-700">{{ mov.plaza }}</td>
                <td class="px-4 py-3 text-sm text-gray-700">{{ mov.asesor }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- No encontrado -->
      <p v-if="notFound" class="text-sm text-gray-500 mt-2">
        No se encontraron resultados para esa búsqueda.
      </p>
    </template>

    <!-- Sin búsqueda todavía -->
    <template v-else>
      <p class="text-sm text-gray-400">
        Usa cualquiera de los filtros de búsqueda para ver los Incentivos.
      </p>
    </template>
  </div>
</template>
