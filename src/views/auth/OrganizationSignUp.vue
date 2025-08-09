<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
          <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </div>
      </div>
      <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">
        Register Your Organization
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Create an enterprise account to manage your team's automation workflows
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="handleRegistration" class="space-y-6">
          <!-- Organization Information -->
          <div class="border-b border-gray-200 pb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Organization Details</h3>
            
            <div>
              <label for="organizationName" class="block text-sm font-medium text-gray-700">
                Organization Name *
              </label>
              <div class="mt-1">
                <input
                  id="organizationName"
                  v-model="form.organizationName"
                  name="organizationName"
                  type="text"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  :class="{ 'border-red-300': errors.organizationName }"
                  placeholder="Enter your company name"
                />
                <p v-if="errors.organizationName" class="mt-2 text-sm text-red-600">{{ errors.organizationName }}</p>
              </div>
            </div>

            <div class="mt-4">
              <label for="organizationEmail" class="block text-sm font-medium text-gray-700">
                Organization Email *
              </label>
              <div class="mt-1">
                <input
                  id="organizationEmail"
                  v-model="form.organizationEmail"
                  name="organizationEmail"
                  type="email"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  :class="{ 'border-red-300': errors.organizationEmail }"
                  placeholder="admin@yourcompany.com"
                />
                <p v-if="errors.organizationEmail" class="mt-2 text-sm text-red-600">{{ errors.organizationEmail }}</p>
              </div>
            </div>

            <div class="mt-4">
              <label for="organizationDescription" class="block text-sm font-medium text-gray-700">
                Description (Optional)
              </label>
              <div class="mt-1">
                <textarea
                  id="organizationDescription"
                  v-model="form.organizationDescription"
                  name="organizationDescription"
                  rows="3"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Brief description of your organization"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Admin User Information -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Administrator Account</h3>
            
            <div>
              <label for="adminName" class="block text-sm font-medium text-gray-700">
                Admin Full Name *
              </label>
              <div class="mt-1">
                <input
                  id="adminName"
                  v-model="form.adminName"
                  name="adminName"
                  type="text"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  :class="{ 'border-red-300': errors.adminName }"
                  placeholder="Enter admin's full name"
                />
                <p v-if="errors.adminName" class="mt-2 text-sm text-red-600">{{ errors.adminName }}</p>
              </div>
            </div>

            <div class="mt-4">
              <label for="adminEmail" class="block text-sm font-medium text-gray-700">
                Admin Email *
              </label>
              <div class="mt-1">
                <input
                  id="adminEmail"
                  v-model="form.adminEmail"
                  name="adminEmail"
                  type="email"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  :class="{ 'border-red-300': errors.adminEmail }"
                  placeholder="admin@yourcompany.com"
                />
                <p v-if="errors.adminEmail" class="mt-2 text-sm text-red-600">{{ errors.adminEmail }}</p>
              </div>
            </div>

            <div class="mt-4">
              <label for="adminPassword" class="block text-sm font-medium text-gray-700">
                Admin Password *
              </label>
              <div class="mt-1 relative">
                <input
                  id="adminPassword"
                  v-model="form.adminPassword"
                  name="adminPassword"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  :class="{ 'border-red-300': errors.adminPassword }"
                  placeholder="Create a secure password"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <EyeOff v-if="showPassword" class="h-5 w-5 text-gray-400" />
                  <Eye v-else class="h-5 w-5 text-gray-400" />
                </button>
                <p v-if="errors.adminPassword" class="mt-2 text-sm text-red-600">{{ errors.adminPassword }}</p>
              </div>
            </div>

            <div class="mt-4">
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
                Confirm Password *
              </label>
              <div class="mt-1 relative">
                <input
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  name="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  required
                  class="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  :class="{ 'border-red-300': errors.confirmPassword }"
                  placeholder="Confirm your password"
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
          </div>

          <!-- Terms and Conditions -->
          <div class="flex items-center">
            <input
              id="agreeTerms"
              v-model="form.agreeTerms"
              name="agreeTerms"
              type="checkbox"
              required
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label for="agreeTerms" class="ml-2 block text-sm text-gray-900">
              I agree to the
              <router-link to="/terms" class="text-primary-600 hover:text-primary-500">Terms of Service</router-link>
              and
              <router-link to="/privacy" class="text-primary-600 hover:text-primary-500">Privacy Policy</router-link>
            </label>
          </div>

          <!-- Submit Button -->
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
              {{ loading ? 'Creating Organization...' : 'Create Organization' }}
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

        <!-- Sign In Link -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Already have an organization?</span>
            </div>
          </div>

          <div class="mt-6">
            <router-link
              to="/auth/signin"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              Sign in to existing organization
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import { Eye, EyeOff, XCircle } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

useHead({
  title: 'Register Organization - Computer AI Automation',
  meta: [
    { name: 'description', content: 'Register your organization to start managing your team\'s automation workflows with Computer AI Automation.' }
  ]
})

const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const errorMessage = ref('')

const form = reactive({
  organizationName: '',
  organizationEmail: '',
  organizationDescription: '',
  adminName: '',
  adminEmail: '',
  adminPassword: '',
  confirmPassword: '',
  agreeTerms: false
})

const errors = reactive({
  organizationName: '',
  organizationEmail: '',
  adminName: '',
  adminEmail: '',
  adminPassword: '',
  confirmPassword: ''
})

const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
  
  let isValid = true
  
  // Organization validation
  if (!form.organizationName.trim()) {
    errors.organizationName = 'Organization name is required'
    isValid = false
  }
  
  if (!form.organizationEmail.trim()) {
    errors.organizationEmail = 'Organization email is required'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(form.organizationEmail)) {
    errors.organizationEmail = 'Please enter a valid email address'
    isValid = false
  }
  
  // Admin validation
  if (!form.adminName.trim()) {
    errors.adminName = 'Admin name is required'
    isValid = false
  }
  
  if (!form.adminEmail.trim()) {
    errors.adminEmail = 'Admin email is required'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(form.adminEmail)) {
    errors.adminEmail = 'Please enter a valid email address'
    isValid = false
  }
  
  if (!form.adminPassword) {
    errors.adminPassword = 'Password is required'
    isValid = false
  } else if (form.adminPassword.length < 8) {
    errors.adminPassword = 'Password must be at least 8 characters'
    isValid = false
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.adminPassword)) {
    errors.adminPassword = 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    isValid = false
  }
  
  if (form.adminPassword !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
    isValid = false
  }
  
  return isValid
}

const handleRegistration = async () => {
  if (!validateForm()) return
  
  loading.value = true
  errorMessage.value = ''
  
  try {
    const result = await authStore.registerOrganization({
      organizationName: form.organizationName,
      organizationEmail: form.organizationEmail,
      organizationDescription: form.organizationDescription,
      adminName: form.adminName,
      adminEmail: form.adminEmail,
      adminPassword: form.adminPassword
    })
    
    if (result.success) {
      // Redirect to admin dashboard
      router.push('/dashboard/admin')
    }
  } catch (error) {
    errorMessage.value = error.message || 'An error occurred during registration'
  } finally {
    loading.value = false
  }
}
</script>