<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <div class="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">
          Authentication Successful!
        </h2>
        <p class="text-gray-600 mb-8">
          You can now close this browser window and return to the desktop application.
        </p>
        
        <div v-if="userInfo" class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Welcome!</h3>
          <p class="text-gray-600">
            <strong>{{ userInfo.name }}</strong><br>
            <span v-if="userInfo.organization">{{ userInfo.organization.name }}</span>
          </p>
        </div>
        
        <div class="text-sm text-gray-500">
          <p>The desktop application should automatically detect your authentication.</p>
          <p class="mt-2">If it doesn't, please restart the desktop application.</p>
        </div>
        
        <button 
          @click="closeWindow"
          class="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Close Window
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const userInfo = ref(null)

onMounted(() => {
  // Get user info from auth store
  userInfo.value = authStore.user
  
  // Auto-close after 10 seconds
  setTimeout(() => {
    closeWindow()
  }, 10000)
})

const closeWindow = () => {
  // Try to close the window
  if (window.opener) {
    window.close()
  } else {
    // If we can't close, redirect to home
    window.location.href = '/'
  }
}
</script>