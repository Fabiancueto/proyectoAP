<script setup lang="ts">
import { ref } from "vue"

import Header from "./components/Header.vue"
import UploadCard from "./components/UploadCard.vue"
import SearchCard from "./components/SearchCard.vue"
import ResultsTable from "./components/ResultsTable.vue"

interface Employee {
  id: string
  name: string
  department: string
  position: string
  salary: string
  hireDate: string
}

const searchResult = ref<Employee | null>(null)
const notFound = ref(false)
const hasSearched = ref(false)

const handleSearchResult = (payload: { employee: Employee | null; notFound: boolean }) => {
  searchResult.value = payload.employee
  notFound.value = payload.notFound
  hasSearched.value = true
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Header />

    <!-- Contenido principal -->
    <main class="pt-24 pb-12 px-6">
      <div class="max-w-7xl mx-auto">
        <!-- Grid de dos columnas -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <UploadCard />
          <SearchCard @searchResult="handleSearchResult" />
        </div>

        <!-- Tabla de resultados (siempre visible) -->
        <ResultsTable
          :employee="searchResult"
          :notFound="notFound"
          :hasSearched="hasSearched"
        />
      </div>
    </main>
  </div>
</template>
