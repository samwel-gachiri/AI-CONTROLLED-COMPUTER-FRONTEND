<template>
  <button 
    @click="handleDownload"
    :class="[
      'btn btn-primary group relative overflow-hidden',
      class
    ]"
    :disabled="loading"
  >
    <!-- Loading state -->
    <div v-if="loading" class="flex items-center space-x-2">
      <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Detecting...</span>
    </div>
    
    <!-- Default state -->
    <div v-else class="flex items-center space-x-2">
      <svg class="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span>{{ downloadText }}</span>
    </div>
    
    <!-- Hover effect -->
    <div class="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
  </button>
</template>

<script setup>
import { useDeviceDetection } from '@/composables/useDeviceDetection'

defineProps({
  class: {
    type: String,
    default: ''
  }
})

const { loading, downloadText, handleDownload } = useDeviceDetection()
</script>