<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="text-center">
          <!-- Error Icon -->
          <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
            <XCircle class="h-8 w-8 text-red-600" />
          </div>
          
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Authentication Failed
          </h2>
          
          <p class="text-gray-600 mb-6">
            {{ errorMessage || 'An error occurred during authentication. Please try again.' }}
          </p>
          
          <!-- Error Details -->
          <div v-if="errorDetails" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <h3 class="text-sm font-medium text-red-800 mb-2">Error Details:</h3>
            <p class="text-sm text-red-700">{{ errorDetails }}</p>
          </div>
          
          <!-- Actions -->
          <div class="space-y-3">
            <router-link
              to="/auth"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Try Again
            </router-link>
            
            <button
              @click="closeWindow"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Close Window
            </button>
            
            <router-link
              to="/"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Go to Home
            </router-link>
          </div>
          
          <!-- Help Section -->
          <div class="mt-8 pt-6 border-t border-gray-200">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Need Help?</h3>
            <div class="text-sm text-gray-600 space-y-2">
              <p>
                <a href="/support" class="text-primary-600 hover:text-primary-500">
                  Contact Support
                </a>
              </p>
              <p>
                <a href="/docs" class="text-primary-600 hover:text-primary-500">
                  View Documentation
                </a>
              </p>
              <p>
                <a href="/pricing" class="text-primary-600 hover:text-primary-500">
                  Purchase License
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { XCircle } from 'lucide-vue-next'

const route = useRoute()

useHead({
  title: 'Authentication Error - Computer AI Automation'
})

const errorMessage = ref('')
const errorDetails = ref('')

const closeWindow = () => {
  // Try to close the window (works if opened by script)
  if (window.opener) {
    window.close()
  } else {
    // If can't close, try to go back or redirect
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = '/'
    }
  }
}

onMounted(() => {
  // Get error message from query params
  errorMessage.value = route.query.error || 'Authentication failed'
  errorDetails.value = route.query.details || ''
  
  // Send error message to desktop app if callback URL is provided
  const callbackUrl = route.query.callback
  if (callbackUrl) {
    try {
      // Redirect to callback URL with error
      const errorParam = encodeURIComponent(errorMessage.value)
      window.location.href = `${callbackUrl}?status=error&error=${errorParam}`
    } catch (error) {
      console.error('Failed to redirect to callback URL:', error)
    }
  }
})
</script>