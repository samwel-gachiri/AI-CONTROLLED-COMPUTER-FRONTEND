<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <!-- Page Header -->
    <div class="bg-white shadow">
      <div class="container py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">License Management</h1>
            <p class="text-gray-600">Manage your Computer AI Automation license</p>
          </div>
          <router-link to="/dashboard" class="btn btn-secondary">
            Back to Dashboard
          </router-link>
        </div>
      </div>
    </div>
    
    <!-- License Information -->
    <div class="container py-8">
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Current License -->
        <div class="lg:col-span-2">
          <div class="card p-6 mb-8">
            <h2 class="text-lg font-semibold text-gray-900 mb-6">Current License</h2>
            
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h3 class="text-sm font-medium text-gray-600 mb-2">License Type</h3>
                <p class="text-lg font-semibold text-gray-900 capitalize">
                  {{ user?.user_type || 'Personal' }}
                </p>
              </div>
              
              <div>
                <h3 class="text-sm font-medium text-gray-600 mb-2">Status</h3>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                      :class="licenseStatusClass">
                  <div class="w-2 h-2 rounded-full mr-2" :class="licenseStatusDotClass"></div>
                  {{ licenseStatusText }}
                </span>
              </div>
              
              <div v-if="user?.expires_at">
                <h3 class="text-sm font-medium text-gray-600 mb-2">Expires</h3>
                <p class="text-lg font-semibold text-gray-900">
                  {{ formatDate(user.expires_at) }}
                </p>
              </div>
              
              <div>
                <h3 class="text-sm font-medium text-gray-600 mb-2">Machine ID</h3>
                <p class="text-sm font-mono text-gray-700 bg-gray-100 px-3 py-2 rounded">
                  {{ user?.machine_id || 'Not available' }}
                </p>
              </div>
            </div>
            
            <!-- License Actions -->
            <div class="mt-8 pt-6 border-t border-gray-200">
              <h3 class="text-sm font-medium text-gray-900 mb-4">License Actions</h3>
              <div class="flex flex-wrap gap-3">
                <button 
                  @click="renewLicense"
                  class="btn btn-primary"
                  :disabled="loading"
                >
                  {{ loading ? 'Processing...' : 'Renew License' }}
                </button>
                
                <button 
                  @click="upgradeLicense"
                  class="btn btn-secondary"
                  v-if="user?.user_type === 'personal'"
                >
                  Upgrade to Enterprise
                </button>
                
                <button 
                  @click="transferLicense"
                  class="btn btn-secondary"
                >
                  Transfer License
                </button>
              </div>
            </div>
          </div>
          
          <!-- License History -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-6">License History</h2>
            
            <div class="space-y-4">
              <div v-for="event in licenseHistory" :key="event.id" 
                   class="flex items-center p-4 bg-gray-50 rounded-lg">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center"
                       :class="event.type === 'activated' ? 'bg-green-100' : 
                               event.type === 'renewed' ? 'bg-blue-100' : 'bg-yellow-100'">
                    <CheckCircle v-if="event.type === 'activated'" class="w-4 h-4 text-green-600" />
                    <RefreshCw v-else-if="event.type === 'renewed'" class="w-4 h-4 text-blue-600" />
                    <AlertTriangle v-else class="w-4 h-4 text-yellow-600" />
                  </div>
                </div>
                <div class="ml-4 flex-1">
                  <p class="text-sm font-medium text-gray-900">{{ event.title }}</p>
                  <p class="text-sm text-gray-600">{{ event.description }}</p>
                </div>
                <div class="text-sm text-gray-500">
                  {{ formatDate(event.timestamp) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Quick Stats -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">License Usage</h3>
            
            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-600">Days Remaining</span>
                  <span class="font-medium">{{ daysRemaining }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-primary-600 h-2 rounded-full" 
                       :style="{ width: `${Math.max(0, Math.min(100, (daysRemaining / 365) * 100))}%` }"></div>
                </div>
              </div>
              
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-600">Automations This Month</span>
                  <span class="font-medium">{{ monthlyUsage.current }} / {{ monthlyUsage.limit }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-green-600 h-2 rounded-full" 
                       :style="{ width: `${(monthlyUsage.current / monthlyUsage.limit) * 100}%` }"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Support -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
            
            <div class="space-y-3">
              <a href="/docs/licensing" 
                 class="flex items-center text-sm text-primary-600 hover:text-primary-700">
                <BookOpen class="w-4 h-4 mr-2" />
                License Documentation
              </a>
              
              <a href="/support" 
                 class="flex items-center text-sm text-primary-600 hover:text-primary-700">
                <MessageCircle class="w-4 h-4 mr-2" />
                Contact Support
              </a>
              
              <a href="/pricing" 
                 class="flex items-center text-sm text-primary-600 hover:text-primary-700">
                <CreditCard class="w-4 h-4 mr-2" />
                View Pricing Plans
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Transfer License Modal -->
    <div v-if="showTransferModal" 
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
         @click="closeTransferModal">
      <div class="bg-white rounded-2xl p-8 max-w-md w-full" @click.stop>
        <h3 class="text-xl font-bold text-gray-900 mb-4">Transfer License</h3>
        <p class="text-gray-600 mb-6">
          Transfer your license to a different machine. This will deactivate the license on the current machine.
        </p>
        
        <form @submit.prevent="submitTransfer" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">New Machine ID</label>
            <input 
              v-model="transferForm.machineId"
              type="text" 
              required
              placeholder="Enter the new machine ID"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
            >
          </div>
          
          <div class="flex gap-4">
            <button 
              type="button"
              @click="closeTransferModal"
              class="btn btn-secondary flex-1"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="btn btn-primary flex-1"
              :disabled="transferLoading"
            >
              {{ transferLoading ? 'Transferring...' : 'Transfer' }}
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useHead } from '@vueuse/head'
import { 
  CheckCircle, RefreshCw, AlertTriangle, BookOpen, 
  MessageCircle, CreditCard 
} from 'lucide-vue-next'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

useHead({
  title: 'License Management - Computer AI Automation'
})

const loading = ref(false)
const showTransferModal = ref(false)
const transferLoading = ref(false)

const transferForm = reactive({
  machineId: ''
})

const user = computed(() => authStore.user)

const monthlyUsage = ref({
  current: 89,
  limit: 1000
})

const licenseHistory = ref([
  {
    id: 1,
    type: 'activated',
    title: 'License Activated',
    description: 'License successfully activated on this machine',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 30 // 30 days ago
  },
  {
    id: 2,
    type: 'renewed',
    title: 'License Renewed',
    description: 'License renewed for another year',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 15 // 15 days ago
  }
])

const daysRemaining = computed(() => {
  if (!user.value?.expires_at) return 0
  
  const expiresAt = new Date(user.value.expires_at * 1000)
  const now = new Date()
  const diffTime = expiresAt - now
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return Math.max(0, diffDays)
})

const licenseStatusClass = computed(() => {
  if (daysRemaining.value < 0) return 'bg-red-100 text-red-800'
  if (daysRemaining.value < 30) return 'bg-yellow-100 text-yellow-800'
  return 'bg-green-100 text-green-800'
})

const licenseStatusDotClass = computed(() => {
  if (daysRemaining.value < 0) return 'bg-red-500'
  if (daysRemaining.value < 30) return 'bg-yellow-500'
  return 'bg-green-500'
})

const licenseStatusText = computed(() => {
  if (daysRemaining.value < 0) return 'Expired'
  if (daysRemaining.value < 30) return `Expires in ${daysRemaining.value} days`
  return 'Active'
})

const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A'
  const date = typeof timestamp === 'number' ? new Date(timestamp) : new Date(timestamp * 1000)
  return date.toLocaleDateString()
}

const renewLicense = async () => {
  loading.value = true
  
  try {
    // Redirect to pricing page for renewal
    window.location.href = '/pricing?action=renew'
  } catch (error) {
    console.error('Renewal error:', error)
    alert('Failed to initiate license renewal. Please try again.')
  } finally {
    loading.value = false
  }
}

const upgradeLicense = () => {
  // Redirect to enterprise pricing
  window.location.href = '/enterprise'
}

const transferLicense = () => {
  showTransferModal.value = true
}

const closeTransferModal = () => {
  showTransferModal.value = false
  transferForm.machineId = ''
}

const submitTransfer = async () => {
  transferLoading.value = true
  
  try {
    // In a real implementation, this would call the API to transfer the license
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
    
    alert('License transfer initiated. You will receive an email with further instructions.')
    closeTransferModal()
  } catch (error) {
    console.error('Transfer error:', error)
    alert('Failed to transfer license. Please try again.')
  } finally {
    transferLoading.value = false
  }
}

onMounted(() => {
  // Fetch user data if not already loaded
  if (!user.value) {
    authStore.fetchUser()
  }
})
</script>