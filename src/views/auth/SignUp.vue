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
        Create your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <router-link to="/auth" class="font-medium text-primary-600 hover:text-primary-500">
          sign in to your existing account
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
                Desktop App Registration
              </h3>
              <div class="mt-2 text-sm text-blue-700">
                <p>You're registering from the Computer AI Automation desktop app. After successful registration, you'll be redirected back to the application.</p>
              </div>
            </div>
          </div>
        </div>

        <form @submit.prevent="handleSignUp" class="space-y-6">
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
                autocomplete="new-password"
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

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div class="mt-1 relative">
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                name="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                autocomplete="new-password"
                required
                class="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                :class="{ 'border-red-300': errors.confirmPassword }"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeOff v-if="showConfirmPassword" class="h-5 w-5 text-gray-400" />
                <Eye v-else class="h-5 w-5 text-gray-400" />
              </button>
              <p v-if="errors.confirmPassword" class="mt-2 text-sm text-red-600">{{ errors.confirmPassword }}</p>
            </div>
          </div>

          <div>
            <label for="licenseKey" class="block text-sm font-medium text-gray-700">
              License Key
            </label>
            <div class="mt-1">
              <input
                id="licenseKey"
                v-model="form.licenseKey"
                name="licenseKey"
                type="text"
                required
                placeholder="Enter your license key"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm font-mono text-xs"
                :class="{ 'border-red-300': errors.licenseKey }"
              />
              <p v-if="errors.licenseKey" class="mt-2 text-sm text-red-600">{{ errors.licenseKey }}</p>
              <p class="mt-2 text-xs text-gray-500">
                Don't have a license key? <a href="/pricing" class="text-primary-600 hover:text-primary-500">Purchase one here</a>
              </p>
            </div>
          </div>

          <div>
            <label for="userType" class="block text-sm font-medium text-gray-700">
              License Type
            </label>
            <div class="mt-1">
              <select
                id="userType"
                v-model="form.userType"
                name="userType"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option value="personal">Personal License</option>
                <option value="enterprise">Enterprise License</option>
              </select>
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
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500 sm:text-sm font-mono text-xs"
              />
              <p class="mt-2 text-xs text-gray-500">
                This is automatically detected from your desktop application.
              </p>
            </div>
          </div>

          <div class="flex items-center">
            <input
              id="agree-terms"
              v-model="form.agreeTerms"
              name="agree-terms"
              type="checkbox"
              required
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label for="agree-terms" class="ml-2 block text-sm text-gray-900">
              I agree to the
              <router-link to="/terms" class="text-primary-600 hover:text-primary-500">Terms of Service</router-link>
              and
              <router-link to="/privacy" class="text-primary-600 hover:text-primary-500">Privacy Policy</router-link>
            </label>
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
              {{ loading ? 'Creating account...' : 'Create account' }}
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
                  Registration failed
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
              <span class="px-2 bg-white text-gray-500">Already have an account?</span>
            </div>
          </div>

          <div class="mt-6">
            <router-link
              to="/auth"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              Sign in instead
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
  title: 'Sign Up - Computer AI Automation',
  meta: [
    { name: 'description', content: 'Create your Computer AI Automation account to start automating your workflows with AI-powered desktop automation.' }
  ]
})

const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const errorMessage = ref('')

const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  licenseKey: '',
  userType: 'personal',
  machineId: '',
  agreeTerms: false
})

const errors = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  licenseKey: ''
})

// Check if this is desktop app authentication
const isDesktopAuth = computed(() => {
  return route.query.app_id || route.query.callback || route.query.machine_id
})

const validateForm = () => {
  errors.email = ''
  errors.password = ''
  errors.confirmPassword = ''
  errors.licenseKey = ''
  
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
  
  if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
    return false
  }
  
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
    errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    return false
  }
  
  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
    return false
  }
  
  if (!form.licenseKey) {
    errors.licenseKey = 'License key is required'
    return false
  }
  
  if (form.licenseKey.length < 10) {
    errors.licenseKey = 'Please enter a valid license key'
    return false
  }
  
  return true
}

const handleSignUp = async () => {
  if (!validateForm()) return
  
  loading.value = true
  errorMessage.value = ''
  
  try {
    const result = await authStore.signUp({
      email: form.email,
      password: form.password,
      licenseKey: form.licenseKey,
      userType: form.userType,
      machineId: form.machineId || null
    })
    
    if (result.success) {
      if (result.isDesktopAuth) {
        // Redirect to success page for desktop auth
        router.push('/auth/success')
      } else {
        // Redirect to dashboard
        router.push('/dashboard')
      }
    }
  } catch (error) {
    errorMessage.value = error.message || 'An error occurred during registration'
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
  
  // Pre-fill license key if provided
  if (route.query.license_key) {
    form.licenseKey = route.query.license_key
  }
})
</script>