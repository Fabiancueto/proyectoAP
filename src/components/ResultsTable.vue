<script setup lang="ts">
import { computed } from "vue"

interface Employee {
  id: string
  name: string
  department: string
  position: string
  salary: string
  hireDate: string
}

const props = defineProps<{
  employee: Employee | null
  notFound: boolean
  hasSearched: boolean
}>()

const formattedDate = computed(() => {
  if (!props.employee) return ""
  const [year, month, day] = props.employee.hireDate.split("-")
  return `${day}/${month}/${year}`
})
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
    <h2 class="text-2xl font-semibold text-gray-900 mb-4">Resultado de Búsqueda</h2>
    <hr class="border-gray-200 mb-6" />

    <template v-if="hasSearched">
      <!-- Empleado encontrado -->
      <div v-if="employee">
        <h3 class="text-base font-semibold text-gray-800 mb-4">Información del Empleado</h3>

        <div class="overflow-x-auto">
          <table class="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-200">
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID Empleado</th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Departamento</th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Puesto</th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Salario</th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fecha de Ingreso</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                <td class="px-4 py-3 text-sm text-gray-900 font-medium">{{ employee.id }}</td>
                <td class="px-4 py-3 text-sm text-gray-900">{{ employee.name }}</td>
                <td class="px-4 py-3 text-sm text-gray-700">{{ employee.department }}</td>
                <td class="px-4 py-3 text-sm text-gray-700">{{ employee.position }}</td>
                <td class="px-4 py-3 text-sm text-gray-900 font-medium">{{ employee.salary }}</td>
                <td class="px-4 py-3 text-sm text-gray-700">{{ formattedDate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Empleado no encontrado -->
      <p v-if="notFound" class="text-sm text-gray-500 mt-2">
        Empleado no encontrado
      </p>
    </template>

    <!-- Sin búsqueda todavía -->
    <template v-else>
      <p class="text-sm text-gray-400">
        Ingresa un ID de empleado para ver sus datos.
      </p>
    </template>
  </div>
</template>
