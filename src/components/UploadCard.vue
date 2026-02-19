<script setup lang="ts">
import { ref } from "vue"
import { FileSpreadsheet, Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-vue-next"

type UploadState = "idle" | "loading" | "success" | "error"

const uploadState = ref<UploadState>("idle")
const isDragging = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

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
    simulateUpload()
  }
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    simulateUpload()
  }
}

const simulateUpload = () => {
  uploadState.value = "loading"
  setTimeout(() => {
    uploadState.value = "success"
    setTimeout(() => {
      uploadState.value = "idle"
    }, 3000)
  }, 2000)
}

const triggerFileInput = () => {
  if (uploadState.value !== "loading") {
    fileInput.value?.click()
  }
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
    </div>

    <!-- Botón de subir -->
    <button
      @click="triggerFileInput"
      :disabled="uploadState === 'loading'"
      class="w-full mt-6 bg-[#D50000] text-white py-3 rounded-lg font-semibold hover:bg-[#B00000] active:bg-[#900000] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      <Upload class="w-5 h-5" />
      <span>Subir CSV</span>
    </button>

    <!-- Estado: Procesando -->
    <div
      v-if="uploadState === 'loading'"
      class="mt-4 flex items-center gap-2 text-gray-600"
    >
      <Loader2 class="w-5 h-5 animate-spin text-[#D50000]" />
      <span class="text-sm">Procesando archivo...</span>
    </div>

    <!-- Estado: Éxito -->
    <div
      v-if="uploadState === 'success'"
      class="mt-4 flex items-center gap-2"
    >
      <CheckCircle class="w-5 h-5 text-green-600 flex-shrink-0" />
      <p class="text-sm">
        <span class="text-green-600 font-semibold">¡Carga exitosa!</span>
        Datos actulzados correctamente.
      </p>
    </div>

    <!-- Estado: Error -->
    <div
      v-if="uploadState === 'error'"
      class="mt-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg"
    >
      <AlertCircle class="w-5 h-5 text-red-600 flex-shrink-0" />
      <p class="text-sm text-red-800">
        Error al subir. Revisa el formato del archivo e intenta de nuevo.
      </p>
    </div>
  </div>
</template>
