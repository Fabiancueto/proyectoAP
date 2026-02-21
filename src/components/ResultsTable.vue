<script setup lang="ts">
interface Movimiento {
  tienda: string
  empleado: string
  descripcion: string
  monto: number
  at: string
  plaza: string
}

defineProps<{
  movimientos: Movimiento[]
  notFound: boolean
  hasSearched: boolean
}>()

const formatMonto = (monto: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(monto)
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
    <h2 class="text-2xl font-semibold text-gray-900 mb-4">Resultado de Búsqueda</h2>
    <hr class="border-gray-200 mb-6" />

    <template v-if="hasSearched">
      <!-- Movimientos encontrados -->
      <div v-if="movimientos.length > 0">
        <p class="text-sm text-gray-500 mb-4">
          Se encontraron <span class="font-semibold text-gray-800">{{ movimientos.length }}</span> movimiento(s).
        </p>

        <div class="overflow-x-auto">
          <table class="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-200">
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tienda</th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700"># Empleado</th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Descripción</th>
                <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">Monto</th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fecha</th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Plaza</th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Asesor</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(mov, index) in movimientos"
                :key="index"
                class="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
              >
                <td class="px-4 py-3 text-sm text-gray-900 font-medium">{{ mov.tienda }}</td>
                <td class="px-4 py-3 text-sm text-gray-900">{{ mov.empleado }}</td>
                <td class="px-4 py-3 text-sm text-gray-700">{{ mov.descripcion }}</td>
                <td class="px-4 py-3 text-sm text-gray-900 text-right font-medium">{{ formatMonto(mov.monto) }}</td>
                <td class="px-4 py-3 text-sm text-gray-700">{{ mov.at }}</td>
                <td class="px-4 py-3 text-sm text-gray-700">{{ mov.plaza }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Empleado no encontrado -->
      <p v-if="notFound" class="text-sm text-gray-500 mt-2">
        No se encontraron movimientos para ese ID de empleado.
      </p>
    </template>

    <!-- Sin búsqueda todavía -->
    <template v-else>
      <p class="text-sm text-gray-400">
        Ingresa un ID de empleado para ver sus movimientos.
      </p>
    </template>
  </div>
</template>
