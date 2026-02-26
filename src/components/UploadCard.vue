<script setup lang="ts">
import { ref } from "vue"
import { FileSpreadsheet, Upload, CheckCircle, AlertCircle, ServerCog } from "lucide-vue-next"
import { subirCSV } from "../service/api.js"

type UploadState = "idle" | "uploading" | "processing" | "success" | "error"

const uploadState    = ref<UploadState>("idle")
const isDragging     = ref(false)
const fileInput      = ref<HTMLInputElement | null>(null)
const selectedFile   = ref<File | null>(null)
const uploadMessage  = ref("")
const uploadProgress = ref(0)

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
  const files = e.dataTransfer?.files
  if (files && files.length > 0) {
    selectedFile.value = files[0]
    uploadCSV()
  }
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0]
    uploadCSV()
  }
}

const uploadCSV = async () => {
  if (!selectedFile.value) return

  uploadState.value    = "uploading"
  uploadProgress.value = 0
  uploadMessage.value  = ""

  try {
    const result = await subirCSV(selectedFile.value, (pct: number) => {
      uploadProgress.value = pct
      // Cuando llega al 100% de subida, pasa a fase "procesando"
      if (pct >= 100) uploadState.value = "processing"
    })

    uploadState.value    = "success"
    uploadProgress.value = 100
    uploadMessage.value  = result.message || "Datos actualizados correctamente."
    // Sin setTimeout — la notificación se queda hasta la próxima carga
  } catch (err: any) {
    uploadState.value   = "error"
    uploadMessage.value = err.message || "Error al subir el archivo."
  }
}

const triggerFileInput = () => {
  if (uploadState.value === "uploading" || uploadState.value === "processing") return
  // Resetear antes de nueva carga
  uploadState.value    = "idle"
  uploadProgress.value = 0
  fileInput.value?.click()
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
    <h2 class="text-2xl font-semibold text-gray-900 mb-2">Subir Archivo CSV</h2>

    <p class="text-sm text-gray-500 mb-6">
      Sube un archivo CSV para procesar los datos.
    </p>

    <hr class="border-gray-200 mb-6" />

    <!-- Zona de arrastrar y soltar -->
    <div
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
      @click="triggerFileInput"
      :class="[
        'border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-all duration-200',
        isDragging
          ? 'border-[#D50000] bg-red-50'
          : 'border-gray-300 bg-gray-50 hover:border-gray-400'
      ]"
    >
      <input
        ref="fileInput"
        type="file"
        accept=".csv"
        @change="handleFileSelect"
        class="hidden"
      />

      <FileSpreadsheet class="w-16 h-16 mx-auto text-gray-500 mb-4" />

      <p class="text-gray-600">
        Arrastra tu archivo aqui o
        <span class="text-[#D50000] font-semibold">Haz clic</span>
        para subir
      </p>
      <p v-if="selectedFile" class="mt-2 text-sm text-gray-500">
        {{ selectedFile.name }}
      </p>
    </div>

    <!-- Botón de subir -->
    <button
      @click="triggerFileInput"
      :disabled="uploadState === 'uploading' || uploadState === 'processing'"
      class="w-full mt-6 bg-[#D50000] text-white py-3 rounded-lg font-semibold hover:bg-[#B00000] active:bg-[#900000] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      <Upload class="w-5 h-5" />
      <span>Subir CSV</span>
    </button>

    <!-- ── Estado: Subiendo (con barra de progreso) ─────────────────────── -->
    <div v-if="uploadState === 'uploading'" class="mt-5">
      <div class="flex items-center justify-between mb-1.5">
        <span class="text-sm font-medium text-gray-700">Subiendo archivo…</span>
        <span class="text-sm font-bold text-[#D50000]">{{ uploadProgress }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          class="h-full rounded-full bg-[#D50000] transition-all duration-300 ease-out"
          :style="{ width: `${uploadProgress}%` }"
        />
      </div>
      <p class="text-xs text-gray-400 mt-1.5">No cierres esta página mientras se procesa.</p>
    </div>

    <!-- ── Estado: Procesando en servidor ───────────────────────────────── -->
    <div v-if="uploadState === 'processing'" class="mt-5">
      <div class="flex items-center justify-between mb-1.5">
        <div class="flex items-center gap-2 text-sm font-medium text-gray-700">
          <ServerCog class="w-4 h-4 text-[#D50000] animate-pulse" />
          Procesando datos en el servidor…
        </div>
        <span class="text-sm font-bold text-[#D50000]">100%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div class="h-full rounded-full bg-[#D50000] animate-pulse" style="width:100%" />
      </div>
      <p class="text-xs text-gray-400 mt-1.5">Insertando registros en la base de datos…</p>
    </div>

    <!-- ── Estado: Éxito ─────────────────────────────────────────────────── -->
    <div
      v-if="uploadState === 'success'"
      class="mt-5 flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl"
    >
      <CheckCircle class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
      <div>
        <p class="text-sm font-semibold text-green-700">¡Carga exitosa!</p>
        <p class="text-sm text-green-600 mt-0.5">{{ uploadMessage }}</p>
      </div>
    </div>

    <!-- ── Estado: Error ─────────────────────────────────────────────────── -->
    <div
      v-if="uploadState === 'error'"
      class="mt-5 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl"
    >
      <AlertCircle class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
      <div>
        <p class="text-sm font-semibold text-red-700">Error al subir</p>
        <p class="text-sm text-red-600 mt-0.5">{{ uploadMessage || "Revisa el formato del archivo e intenta de nuevo." }}</p>
      </div>
    </div>
  </div>
</template>
