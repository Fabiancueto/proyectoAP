<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from 'chart.js'
import { fetchTodosMovimientos } from '../service/api.js'
import Header from '../components/Header.vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import {
  ArrowLeft, BarChart2, TrendingUp, Hash,
  ChevronRight, ChevronDown, MousePointerClick, Users, Tag, X,
} from 'lucide-vue-next'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

interface Movimiento {
  tienda: string
  empleado: string
  descripcion: string
  monto: number
  fecha: string
  plaza: string
  asesor: string
}

const authStore = useAuthStore()
const router    = useRouter()

const movimientos    = ref<Movimiento[]>([])
const loading        = ref(true)
const error          = ref('')
const selectedPlaza  = ref<string | null>(null)
const selectedTienda = ref<string | null>(null)

// ── Filtros globales ──────────────────────────────────────────────────────────
const selectedMes       = ref<number>(0)   // 0 = todos
const selectedAño       = ref<number>(0)   // 0 = todos
const selectedIncentivo = ref<string>('')  // '' = todos

const MESES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']

function getFechaYear(fecha: string): number {
  const d = new Date(fecha)
  return isNaN(d.getTime()) ? 0 : d.getFullYear()
}
function getFechaMonth(fecha: string): number {
  const d = new Date(fecha)
  return isNaN(d.getTime()) ? 0 : d.getMonth() + 1
}

const hayFiltrosActivos = computed(() =>
  !!(selectedMes.value || selectedAño.value || selectedIncentivo.value),
)
function limpiarFiltros() {
  selectedMes.value = 0
  selectedAño.value = 0
  selectedIncentivo.value = ''
}

// 0 = plazas | 1 = tiendas | 2 = empleados
const currentLevel = computed(() => {
  if (selectedTienda.value) return 2
  if (selectedPlaza.value)  return 1
  return 0
})

function handleLogout() {
  authStore.logout()
  router.push({ name: 'login' })
}

onMounted(async () => {
  try {
    const result = await fetchTodosMovimientos()
    movimientos.value = result.data || []
  } catch (err: any) {
    error.value = err.message || 'Error al cargar los datos.'
  } finally {
    loading.value = false
  }
})

// ── Helpers ───────────────────────────────────────────────────────────────────
function agregaPor(
  source: Movimiento[],
  keyFn: (m: Movimiento) => string,
): Map<string, number> {
  const map = new Map<string, number>()
  for (const m of source) {
    const k = keyFn(m)?.trim() || 'N/D'
    map.set(k, (map.get(k) ?? 0) + (Number(m.monto) || 0))
  }
  return new Map([...map.entries()].sort((a, b) => b[1] - a[1]))
}

/** Genera array de rojos con opacidad decreciente según ranking */
function redGradient(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const o = 0.95 - (i / Math.max(count - 1, 1)) * 0.55
    return `rgba(213,0,0,${o.toFixed(2)})`
  })
}

const formatMXN = (v: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(v)

const formatMXNFull = (v: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(v)

// ── Opciones disponibles para los filtros ─────────────────────────────────────
const añosDisponibles = computed(() => {
  const years = new Set<number>()
  for (const m of movimientos.value) { const y = getFechaYear(m.fecha); if (y) years.add(y) }
  return [...years].sort((a, b) => b - a)
})
const mesesDisponibles = [1,2,3,4,5,6,7,8,9,10,11,12]
const incentivosDisponibles = computed(() => {
  const types = new Set<string>()
  for (const m of movimientos.value) { const d = m.descripcion?.trim(); if (d) types.add(d) }
  return [...types].sort()
})

// ── Base con filtros globales (mes / año / tipo incentivo) ────────────────────
const baseMovimientos = computed(() => {
  let f = movimientos.value
  if (selectedAño.value)       f = f.filter(m => getFechaYear(m.fecha)  === selectedAño.value)
  if (selectedMes.value)       f = f.filter(m => getFechaMonth(m.fecha) === selectedMes.value)
  if (selectedIncentivo.value) f = f.filter(m => (m.descripcion?.trim() || '') === selectedIncentivo.value)
  return f
})

// ── Filtro contextual según nivel activo ──────────────────────────────────────
const ctxMovimientos = computed(() => {
  let f = baseMovimientos.value
  if (selectedPlaza.value)  f = f.filter(m => (m.plaza?.trim()  || 'N/D') === selectedPlaza.value)
  if (selectedTienda.value) f = f.filter(m => (m.tienda?.trim() || 'N/D') === selectedTienda.value)
  return f
})

// ── Agregaciones drill-down ───────────────────────────────────────────────────
const plazaAgregada    = computed(() => agregaPor(baseMovimientos.value, m => m.plaza))
const tiendaAgregada   = computed(() => selectedPlaza.value
  ? agregaPor(baseMovimientos.value.filter(m => (m.plaza?.trim() || 'N/D') === selectedPlaza.value), m => m.tienda)
  : new Map<string, number>())
const empleadoAgregada = computed(() => (selectedPlaza.value && selectedTienda.value)
  ? agregaPor(ctxMovimientos.value, m => m.empleado)
  : new Map<string, number>())

const activeData = computed(() => {
  if (currentLevel.value === 2) return empleadoAgregada.value
  if (currentLevel.value === 1) return tiendaAgregada.value
  return plazaAgregada.value
})

const activeEntries  = computed(() => [...activeData.value.entries()])
const totalRecaudado = computed(() => [...activeData.value.values()].reduce((a, b) => a + b, 0))
const cantidadBarras = computed(() => activeData.value.size)

// ── Asesor (contextual) ───────────────────────────────────────────────────────
const asesorAgregada = computed(() => agregaPor(ctxMovimientos.value, m => m.asesor))
const totalAsesor    = computed(() => [...asesorAgregada.value.values()].reduce((a, b) => a + b, 0))

// ── Descripción (contextual) ──────────────────────────────────────────────────
const descripcionAgregada = computed(() => agregaPor(ctxMovimientos.value, m => m.descripcion))
const totalDescripcion    = computed(() => [...descripcionAgregada.value.values()].reduce((a, b) => a + b, 0))

// ── Fábrica de ChartData (rojo) ───────────────────────────────────────────────
function makeChartData(map: Map<string, number>): ChartData<'bar'> {
  const colors = redGradient(map.size)
  return {
    labels: [...map.keys()],
    datasets: [{
      data:                [...map.values()],
      backgroundColor:     colors,
      borderColor:         colors.map(c => c.replace(/[\d.]+\)$/, '1)')),
      borderWidth:         1,
      borderRadius:        5,
      hoverBackgroundColor:'#D50000',
    }],
  }
}

const mainChartData        = computed(() => makeChartData(activeData.value))
const asesorChartData      = computed(() => makeChartData(asesorAgregada.value))
const descripcionChartData = computed(() => makeChartData(descripcionAgregada.value))

// ── Fábrica de ChartOptions ───────────────────────────────────────────────────
function makeOptions(
  onClickCb?: (_idx: number) => void,
  isVertical = false,
): ChartOptions<'bar'> {
  return {
    indexAxis: isVertical ? 'x' : 'y',
    responsive: true,
    maintainAspectRatio: false,
    onClick(_e, elements) {
      if (onClickCb && elements.length) onClickCb(elements[0].index)
    },
    onHover(event, elements) {
      const canvas = event.native?.target as HTMLCanvasElement
      if (canvas) canvas.style.cursor = onClickCb && elements.length ? 'pointer' : 'default'
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => `  ${formatMXNFull(isVertical ? ctx.parsed.y : ctx.parsed.x)}`,
        },
      },
    },
    scales: {
      x: isVertical ? {
        // vertical → categorías en X con labels rotadas
        grid: { display: false }, border: { display: false },
        ticks: { font: { size: 11 }, color: '#374151', maxRotation: 30, minRotation: 20 },
      } : {
        // horizontal → valores en X
        grid: { color: 'rgba(0,0,0,0.05)' }, border: { display: false },
        ticks: { callback: v => formatMXN(Number(v)), font: { size: 10 }, color: '#9CA3AF', maxTicksLimit: 5 },
      },
      y: isVertical ? {
        // vertical → valores en Y
        grid: { color: 'rgba(0,0,0,0.05)' }, border: { display: false },
        ticks: { callback: v => formatMXN(Number(v)), font: { size: 10 }, color: '#9CA3AF', maxTicksLimit: 5 },
      } : {
        // horizontal → categorías en Y
        grid: { display: false }, border: { display: false },
        ticks: { font: { size: 11 }, color: '#374151' },
      },
    },
  }
}

// Nivel 0 (plazas) → barras verticales centradas; niveles 1-2 → horizontales
const mainChartOptions = computed(() =>
  makeOptions(
    (idx) => {
      if (currentLevel.value === 0) selectedPlaza.value  = [...plazaAgregada.value.keys()][idx]
      else if (currentLevel.value === 1) selectedTienda.value = [...tiendaAgregada.value.keys()][idx]
    },
    currentLevel.value === 0,   // isVertical solo en vista plazas
  ),
)

// Asesor y Descripción: sin drill-down
const secondaryChartOptions = makeOptions()

// ── Navegación ────────────────────────────────────────────────────────────────
function volver() {
  if (selectedTienda.value) { selectedTienda.value = null; return }
  selectedPlaza.value = null
}
function resetAll() { selectedPlaza.value = null; selectedTienda.value = null }
function selectItem(nombre: string) {
  if (currentLevel.value === 0)      selectedPlaza.value  = nombre
  else if (currentLevel.value === 1) selectedTienda.value = nombre
}

// ── Textos dinámicos ──────────────────────────────────────────────────────────
const LEVEL_SINGULAR = ['Plaza', 'Tienda', 'Empleado']
const LEVEL_PLURAL   = ['Plazas', 'Tiendas', 'Empleados']

const mainTitle = computed(() =>
  currentLevel.value === 2 ? `ID Empleado — ${selectedTienda.value}`
  : currentLevel.value === 1 ? 'Recaudación por tienda'
  : 'Recaudación por plaza',
)
const mainSubtitle = computed(() =>
  currentLevel.value === 2 ? `${selectedPlaza.value} › ${selectedTienda.value}`
  : currentLevel.value === 1 ? `Plaza: ${selectedPlaza.value}`
  : 'Total acumulado en cada plaza',
)
const asesorTitle = computed(() =>
  selectedTienda.value ? `Asesores — ${selectedTienda.value}`
  : selectedPlaza.value ? `Asesores — ${selectedPlaza.value}`
  : 'Recaudación por asesor',
)
const descripcionTitle = computed(() =>
  selectedTienda.value ? `Tipo de incentivo — ${selectedTienda.value}`
  : selectedPlaza.value ? `Tipo de incentivo — ${selectedPlaza.value}`
  : 'Tipo de incentivo',
)
const hintText = computed(() =>
  currentLevel.value === 0 ? 'Clic → ver tiendas'
  : currentLevel.value === 1 ? 'Clic → ver empleados'
  : null,
)

function rankClass(i: number) {
  if (i === 0) return 'bg-amber-400 text-white'
  if (i === 1) return 'bg-gray-300 text-gray-700'
  if (i === 2) return 'bg-orange-400 text-white'
  return 'bg-gray-100 text-gray-500'
}
</script>

<template>
  <div class="min-h-screen flex flex-col" style="background:#F2F4F7">
    <Header @logout="handleLogout" />

    <!-- ── Barra superior sticky ─────────────────────────────────────────── -->
    <div
      class="sticky top-16 z-40 flex items-center justify-between px-5 py-2 bg-white border-b border-gray-200 flex-shrink-0"
      style="box-shadow:0 1px 4px rgba(0,0,0,.07)"
    >
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2.5 min-w-0">
        <div class="w-7 h-7 rounded-lg bg-[#D50000] flex items-center justify-center flex-shrink-0">
          <BarChart2 class="w-3.5 h-3.5 text-white" />
        </div>
        <div class="min-w-0">
          <p class="text-[10px] text-gray-400 leading-none mb-0.5 uppercase tracking-wide">Análisis de ventas</p>
          <div class="flex items-center gap-1 text-sm font-bold truncate">
            <button @click="resetAll"
              class="hover:text-[#D50000] transition-colors whitespace-nowrap"
              :class="selectedPlaza ? 'text-gray-400 font-normal text-xs' : 'text-gray-900'">
              Todas las plazas
            </button>
            <template v-if="selectedPlaza">
              <ChevronRight class="w-3 h-3 text-gray-400 flex-shrink-0" />
              <button @click="selectedTienda = null"
                class="hover:text-[#D50000] transition-colors whitespace-nowrap"
                :class="selectedTienda ? 'text-gray-400 font-normal text-xs' : 'text-gray-900'">
                {{ selectedPlaza }}
              </button>
            </template>
            <template v-if="selectedTienda">
              <ChevronRight class="w-3 h-3 text-gray-400 flex-shrink-0" />
              <span class="text-gray-900 whitespace-nowrap">{{ selectedTienda }}</span>
            </template>
          </div>
        </div>
      </div>

      <!-- Filtros centrados -->
      <div class="flex items-center gap-2">

        <!-- Mes -->
        <div class="relative">
          <select v-model="selectedMes"
            class="appearance-none rounded-lg px-3 py-1.5 pr-7 text-xs font-medium cursor-pointer transition-colors focus:outline-none border"
            :class="selectedMes ? 'bg-red-50 border-red-200 text-[#D50000]' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'">
            <option :value="0">Mes</option>
            <option v-for="m in mesesDisponibles" :key="m" :value="m">{{ MESES[m - 1] }}</option>
          </select>
          <ChevronDown class="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
            :class="selectedMes ? 'text-[#D50000]' : 'text-gray-400'" />
        </div>

        <!-- Año -->
        <div class="relative">
          <select v-model="selectedAño"
            class="appearance-none rounded-lg px-3 py-1.5 pr-7 text-xs font-medium cursor-pointer transition-colors focus:outline-none border"
            :class="selectedAño ? 'bg-red-50 border-red-200 text-[#D50000]' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'">
            <option :value="0">Año</option>
            <option v-for="a in añosDisponibles" :key="a" :value="a">{{ a }}</option>
          </select>
          <ChevronDown class="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
            :class="selectedAño ? 'text-[#D50000]' : 'text-gray-400'" />
        </div>

        <!-- Tipo de incentivo -->
        <div class="relative">
          <select v-model="selectedIncentivo"
            class="appearance-none rounded-lg px-3 py-1.5 pr-7 text-xs font-medium cursor-pointer transition-colors focus:outline-none border max-w-[170px]"
            :class="selectedIncentivo ? 'bg-red-50 border-red-200 text-[#D50000]' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'">
            <option value="">Tipo de incentivo</option>
            <option v-for="t in incentivosDisponibles" :key="t" :value="t">{{ t }}</option>
          </select>
          <ChevronDown class="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
            :class="selectedIncentivo ? 'text-[#D50000]' : 'text-gray-400'" />
        </div>

        <!-- Limpiar filtros -->
        <button v-if="hayFiltrosActivos" @click="limpiarFiltros"
          class="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium text-[#D50000] hover:bg-red-50 transition-colors border border-transparent hover:border-red-100">
          <X class="w-3 h-3" />
          Limpiar
        </button>
      </div>

      <!-- KPIs + botón volver -->
      <div class="flex items-center gap-2 flex-shrink-0">
        <div class="flex items-center gap-1.5 bg-red-50 border border-red-100 rounded-lg px-3 py-1.5">
          <TrendingUp class="w-3.5 h-3.5 text-[#D50000]" />
          <span class="text-[11px] text-gray-500">Recaudado</span>
          <span class="text-sm font-bold text-gray-900">
            <span v-if="loading">—</span>
            <span v-else>{{ formatMXN(totalRecaudado) }}</span>
          </span>
        </div>
        <div class="flex items-center gap-1.5 bg-red-50 border border-red-100 rounded-lg px-3 py-1.5">
          <Hash class="w-3.5 h-3.5 text-[#D50000]" />
          <span class="text-[11px] text-gray-500">{{ LEVEL_PLURAL[currentLevel] }}</span>
          <span class="text-sm font-bold text-gray-900">
            <span v-if="loading">—</span>
            <span v-else>{{ cantidadBarras }}</span>
          </span>
        </div>
        <button v-if="selectedPlaza" @click="volver"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-red-50 hover:text-[#D50000] hover:border-red-200 transition-colors shadow-sm">
          <ArrowLeft class="w-3.5 h-3.5" />
          Volver
        </button>
      </div>
    </div>

    <!-- ── Contenido ─────────────────────────────────────────────────────── -->
    <main class="flex-1 p-4 pt-4 space-y-4">

      <!-- Loading / error / vacío -->
      <div v-if="loading" class="flex items-center justify-center py-32">
        <div class="text-center">
          <div class="w-11 h-11 border-4 border-[#D50000] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p class="text-sm text-gray-500">Cargando datos…</p>
        </div>
      </div>
      <div v-else-if="error" class="flex items-center justify-center py-20">
        <div class="bg-red-50 border border-red-200 text-red-700 rounded-xl px-6 py-5 text-sm max-w-md text-center">{{ error }}</div>
      </div>
      <div v-else-if="movimientos.length === 0" class="flex flex-col items-center justify-center py-32 gap-3">
        <BarChart2 class="w-14 h-14 text-gray-300" />
        <p class="text-gray-400 text-sm">No hay datos. Sube un archivo CSV primero.</p>
      </div>

      <template v-else>

        <!-- ── Fila 1: Drill-down + Ranking ─────────────────────────────── -->
        <div class="flex gap-4" style="height:56vh; min-height:380px">

          <!-- Gráfica principal -->
          <div class="flex-1 min-w-0 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
            <div class="flex items-center justify-between px-5 py-3 border-b border-gray-100 flex-shrink-0">
              <div>
                <h2 class="text-sm font-bold text-gray-800">{{ mainTitle }}</h2>
                <p class="text-xs text-gray-400 mt-0.5">{{ mainSubtitle }}</p>
              </div>
              <div v-if="hintText"
                class="flex items-center gap-1 text-[11px] text-[#D50000] bg-red-50 border border-red-100 rounded-md px-2.5 py-1">
                <MousePointerClick class="w-3 h-3" />
                {{ hintText }}
              </div>
            </div>
            <!-- Nivel plazas: barras verticales → llenan el panel sin scroll -->
            <div v-if="currentLevel === 0" class="flex-1 min-h-0 px-4 py-3">
              <Bar :data="mainChartData" :options="mainChartOptions" style="height:100%;width:100%" />
            </div>
            <!-- Niveles tienda/empleado: barras horizontales → scroll si hay muchas -->
            <div v-else class="flex-1 overflow-y-auto px-4 py-3">
              <div :style="{ height: `${Math.max(200, cantidadBarras * 36)}px` }">
                <Bar :data="mainChartData" :options="mainChartOptions" />
              </div>
            </div>
          </div>

          <!-- Ranking lateral -->
          <div class="w-64 flex-shrink-0 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
            <div class="px-4 py-3 border-b border-gray-100 flex-shrink-0">
              <h2 class="text-sm font-bold text-gray-800">Ranking</h2>
              <p class="text-xs text-gray-400">{{ LEVEL_PLURAL[currentLevel] }} por recaudación</p>
            </div>
            <div class="flex-1 min-h-0 overflow-y-auto">
              <table class="w-full">
                <thead class="sticky top-0 bg-gray-50 z-10 border-b border-gray-100">
                  <tr>
                    <th class="w-7 px-2 py-2 text-[10px] font-semibold text-gray-500 uppercase text-center">#</th>
                    <th class="px-2 py-2 text-[10px] font-semibold text-gray-500 uppercase text-left">{{ LEVEL_SINGULAR[currentLevel] }}</th>
                    <th class="px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="([nombre, monto], i) in activeEntries"
                    :key="nombre"
                    class="border-b border-gray-50 transition-colors"
                    :class="currentLevel < 2 ? 'cursor-pointer hover:bg-red-50 active:bg-red-100' : 'hover:bg-gray-50'"
                    @click="selectItem(nombre)"
                  >
                    <td class="px-2 py-2 text-center">
                      <span class="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold"
                        :class="rankClass(i)">{{ i + 1 }}</span>
                    </td>
                    <td class="px-2 py-2">
                      <span class="text-[11px] font-medium text-gray-800 block truncate max-w-[110px]">{{ nombre }}</span>
                      <div class="mt-1 h-1 rounded-full bg-red-100 overflow-hidden">
                        <div class="h-full rounded-full bg-[#D50000] transition-all duration-500"
                          :style="{ width: `${totalRecaudado > 0 ? (monto / totalRecaudado) * 100 : 0}%` }">
                        </div>
                      </div>
                    </td>
                    <td class="px-3 py-2 text-right">
                      <span class="text-[11px] font-bold text-gray-900 block">{{ formatMXN(monto) }}</span>
                      <span class="text-[10px] text-gray-400">
                        {{ totalRecaudado > 0 ? ((monto / totalRecaudado) * 100).toFixed(1) : '0.0' }}%
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="flex-shrink-0 border-t-2 border-gray-200 bg-gray-50 px-4 py-2.5 flex items-center justify-between">
              <span class="text-[10px] font-bold text-gray-600 uppercase tracking-wide">Total</span>
              <span class="text-sm font-bold text-gray-900">{{ formatMXN(totalRecaudado) }}</span>
            </div>
          </div>
        </div>

        <!-- ── Fila 2: Asesor + Descripción ─────────────────────────────── -->
        <div class="flex gap-4" style="height:44vh; min-height:300px">

          <!-- Gráfica Asesores -->
          <div class="flex-1 min-w-0 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
            <div class="flex items-center justify-between px-5 py-3 border-b border-gray-100 flex-shrink-0">
              <div>
                <h2 class="text-sm font-bold text-gray-800">{{ asesorTitle }}</h2>
                <p class="text-xs text-gray-400 mt-0.5">Recaudación total por asesor</p>
              </div>
              <div class="flex items-center gap-1.5 bg-red-50 border border-red-100 rounded-md px-2.5 py-1">
                <Users class="w-3.5 h-3.5 text-[#D50000]" />
                <span class="text-[11px] font-semibold text-[#D50000]">
                  {{ asesorAgregada.size }} asesores · {{ formatMXN(totalAsesor) }}
                </span>
              </div>
            </div>
            <div class="flex-1 overflow-y-auto px-4 py-3">
              <div :style="{ height: `${Math.max(160, asesorAgregada.size * 36)}px` }">
                <Bar :data="asesorChartData" :options="secondaryChartOptions" />
              </div>
            </div>
          </div>

          <!-- Gráfica Descripción (tipo de incentivo) -->
          <div class="flex-1 min-w-0 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
            <div class="flex items-center justify-between px-5 py-3 border-b border-gray-100 flex-shrink-0">
              <div>
                <h2 class="text-sm font-bold text-gray-800">{{ descripcionTitle }}</h2>
                <p class="text-xs text-gray-400 mt-0.5">Monto por tipo de incentivo</p>
              </div>
              <div class="flex items-center gap-1.5 bg-red-50 border border-red-100 rounded-md px-2.5 py-1">
                <Tag class="w-3.5 h-3.5 text-[#D50000]" />
                <span class="text-[11px] font-semibold text-[#D50000]">
                  {{ descripcionAgregada.size }} tipos · {{ formatMXN(totalDescripcion) }}
                </span>
              </div>
            </div>
            <div class="flex-1 overflow-y-auto px-4 py-3">
              <div :style="{ height: `${Math.max(160, descripcionAgregada.size * 36)}px` }">
                <Bar :data="descripcionChartData" :options="secondaryChartOptions" />
              </div>
            </div>
          </div>
        </div>

      </template>
    </main>
  </div>
</template>
