<script setup lang="ts">
import { ref } from "vue"
import { Search } from "lucide-vue-next"

interface Employee {
  id: string
  name: string
  department: string
  position: string
  salary: string
  hireDate: string
}

const emit = defineEmits<{
  (e: "searchResult", payload: { employee: Employee | null; notFound: boolean }): void
}>()

const searchId = ref("")

// Datos mock de empleados
const mockEmployees: Employee[] = [
  {
    id: "001",
    name: "Carlos Martínez",
    department: "Operaciones",
    position: "Gerente de Tienda",
    salary: "$35,000",
    hireDate: "2020-03-15",
  },
  {
    id: "002",
    name: "María García",
    department: "Finanzas",
    position: "Contadora",
    salary: "$28,000",
    hireDate: "2019-07-22",
  },
  {
    id: "003",
    name: "Juan Rodríguez",
    department: "TI",
    position: "Analista de Sistemas",
    salary: "$32,000",
    hireDate: "2021-01-10",
  },
  {
    id: "004",
    name: "Ana López",
    department: "RH",
    position: "Especialista en RH",
    salary: "$30,000",
    hireDate: "2018-11-05",
  },
  {
    id: "1023",
    name: "Maria Gómez",
    department: "Ventas",
    position: "Vendedora",
    salary: "$12,500",
    hireDate: "2021-04-15",
  },
]

const handleSearch = () => {
  if (!searchId.value.trim()) return

  const employee = mockEmployees.find(
    (emp) => emp.id === searchId.value.trim()
  )

  if (employee) {
    emit("searchResult", { employee, notFound: false })
  } else {
    emit("searchResult", { employee: null, notFound: true })
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
          class="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent transition-all duration-200 text-gray-800"
        />
        <button
          @click="handleSearch"
          :disabled="!searchId.trim()"
          class="bg-[#FFCC00] text-gray-900 px-6 py-2.5 rounded-lg font-semibold hover:bg-[#FFD700] active:bg-[#FFC700] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
        >
          <Search class="w-4 h-4" />
          Buscar
        </button>
      </div>
    </div>
  </div>
</template>
