<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
          <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
      </div>
      <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">
        Sign in to your organization
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        New to the platform?
        <router-link to="/auth/organization/signup" class="font-medium text-primary-600 hover:text-primary-500">
          Register your organization
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <!-- Desktop App Authentication Notice -->
        <div v-if="isDesktopAuth" class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-blue-800">
                Desktop App Authentication
              </h3>
              <div class="mt-2 text-sm text-blue-700">
                <p>You're signing in from the Computer AI Automation desktop app. After successful authentication, you'll be redirected back to the application.</p>
              </div>
            </div>
          </div>
        </div>

        <form @submit.prevent="handleSignIn" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                :class="{ 'border-red-300': errors.email }"
              />
              <p v-if="errors.email" class="mt-2 text-sm text-red-600">{{ errors.email }}</p>
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1 relative">
              <input
                id="password"
                v-model="form.password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                class="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                :class="{ 'border-red-300': errors.password }"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeOff v-if="showPassword" class="h-5 w-5 text-gray-400" />
                <Eye v-else class="h-5 w-5 text-gray-400" />
              </button>
              <p v-if="errors.password" class="mt-2 text-sm text-red-600">{{ errors.password }}</p>
            </div>
          </div>

          <div v-if="isDesktopAuth">
            <label for="machineId" class="block text-sm font-medium text-gray-700">
              Machine ID
            </label>
            <div class="mt-1">
              <input
                id="machineId"
                v-model="form.machineId"
                name="machineId"
                type="text"
                required
                readonly
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500 sm:text-sm"
              />
              <p class="mt-2 text-xs text-gray-500">
                This is automatically detected from your desktop application.
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="form.rememberMe"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-primary-600 hover:text-primary-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <XCircle class="h-5 w-5 text-red-400" />
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">
                  Sign in failed
                </h3>
                <div class="mt-2 text-sm text-red-700">
                  <p>{{ errorMessage }}</p>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Need to set up your organization?</span>
            </div>
          </div>

          <div class="mt-6">
            <router-link
              to="/auth/organization/signup"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              Register Organization
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { Eye, EyeOff, XCircle } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

useHead({
  title: 'Sign In - Computer AI Automation',
  meta: [
    { name: 'description', content: 'Sign in to your Computer AI Automation account to access your dashboard and manage your automations.' }
  ]
})

const loading = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')

const form = reactive({
  email: '',
  password: '',
  machineId: '',
  rememberMe: false
})

const errors = reactive({
  email: '',
  password: ''
})

// Check if this is desktop app authentication
const isDesktopAuth = computed(() => {
  return route.query.app_id || route.query.callback || route.query.machine_id
})

const validateForm = () => {
  errors.email = ''
  errors.password = ''
  
  if (!form.email) {
    errors.email = 'Email is required'
    return false
  }
  
  if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    return false
  }
  
  if (!form.password) {
    errors.password = 'Password is required'
    return false
  }
  
  if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    return false
  }
  
  return true
}

const handleSignIn = async () => {
  if (!validateForm()) return
  
  loading.value = true
  errorMessage.value = ''
  
  try {
    const result = await authStore.signIn({
      email: form.email,
      password: form.password,
      machineId: form.machineId || null,
      rememberMe: form.rememberMe
    })
    
    if (result.success) {
      if (result.isDesktopAuth) {
        // Redirect to success page for desktop auth
        router.push('/auth/success')
      } else {
        // Redirect based on user role
        const user = result.user
        if (user.role === 'admin') {
          router.push('/dashboard/admin')
        } else {
          router.push('/dashboard/employee')
        }
      }
    }
  } catch (error) {
    errorMessage.value = error.message || 'An error occurred during sign in'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  // Extract machine ID from query params if present (desktop auth)
  if (route.query.machine_id) {
    form.machineId = route.query.machine_id
  }
  
  // Pre-fill email if provided
  if (route.query.email) {
    form.email = route.query.email
  }
})
</script>