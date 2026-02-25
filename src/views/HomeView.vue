<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Header from '../components/Header.vue'
import UploadCard from '../components/UploadCard.vue'
import SearchCard from '../components/SearchCard.vue'
import ResultsTable from '../components/ResultsTable.vue'

interface Movimiento {
  tienda: string
  empleado: string
  descripcion: string
  monto: number
  fecha: string
  plaza: string
  asesor: string
}

const router = useRouter()
const auth = useAuthStore()

const movimientos = ref<Movimiento[]>([])
const notFound = ref(false)
const hasSearched = ref(false)

const handleSearchResult = (payload: { movimientos: Movimiento[]; notFound: boolean }) => {
  movimientos.value = payload.movimientos
  notFound.value = payload.notFound
  hasSearched.value = true
}

const handleLogout = () => {
  auth.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Header @logout="handleLogout" />

    <main class="pt-24 pb-12 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <UploadCard />
          <SearchCard @searchResult="handleSearchResult" />
        </div>

        <ResultsTable
          :movimientos="movimientos"
          :notFound="notFound"
          :hasSearched="hasSearched"
        />
      </div>
    </main>
  </div>
</template>
