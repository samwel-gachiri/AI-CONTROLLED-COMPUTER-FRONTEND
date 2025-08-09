<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <!-- Dashboard Header -->
    <div class="bg-white shadow">
      <div class="container py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p class="text-gray-600">Welcome back, {{ user?.email }}</p>
          </div>
          <div class="flex items-center space-x-4">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                  :class="licenseStatusClass">
              <div class="w-2 h-2 rounded-full mr-2" :class="licenseStatusDotClass"></div>
              {{ licenseStatusText }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Dashboard Content -->
    <div class="container py-8">
      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="card p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity class="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Automations Run</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.automationsRun }}</p>
            </div>
          </div>
        </div>
        
        <div class="card p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock class="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Time Saved</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.timeSaved }}h</p>
            </div>
          </div>
        </div>
        
        <div class="card p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap class="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Success Rate</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.successRate }}%</p>
            </div>
          </div>
        </div>
        
        <div class="card p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <TrendingUp class="w-4 h-4 text-yellow-600" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">This Month</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.thisMonth }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Main Content Grid -->
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Recent Activity -->
        <div class="lg:col-span-2">
          <div class="card p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <button class="text-sm text-primary-600 hover:text-primary-700">View All</button>
            </div>
            
            <div class="space-y-4">
              <div v-for="activity in recentActivity" :key="activity.id" 
                   class="flex items-center p-4 bg-gray-50 rounded-lg">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center"
                       :class="activity.status === 'success' ? 'bg-green-100' : 
                               activity.status === 'error' ? 'bg-red-100' : 'bg-yellow-100'">
                    <CheckCircle v-if="activity.status === 'success'" class="w-4 h-4 text-green-600" />
                    <XCircle v-else-if="activity.status === 'error'" class="w-4 h-4 text-red-600" />
                    <Clock v-else class="w-4 h-4 text-yellow-600" />
                  </div>
                </div>
                <div class="ml-4 flex-1">
                  <p class="text-sm font-medium text-gray-900">{{ activity.name }}</p>
                  <p class="text-sm text-gray-600">{{ activity.description }}</p>
                </div>
                <div class="text-sm text-gray-500">
                  {{ formatTime(activity.timestamp) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- License Info & Quick Actions -->
        <div class="space-y-6">
          <!-- License Information -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">License Information</h2>
            
            <div class="space-y-4">
              <div>
                <p class="text-sm font-medium text-gray-600">License Type</p>
                <p class="text-sm text-gray-900 capitalize">{{ user?.license_type || 'Personal' }}</p>
              </div>
              
              <div v-if="user?.expires_at">
                <p class="text-sm font-medium text-gray-600">Expires</p>
                <p class="text-sm text-gray-900">{{ formatDate(user.expires_at) }}</p>
              </div>
              
              <div>
                <p class="text-sm font-medium text-gray-600">Status</p>
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                      :class="licenseStatusClass">
                  {{ licenseStatusText }}
                </span>
              </div>
            </div>
            
            <div class="mt-6 space-y-3">
              <router-link to="/dashboard/license" 
                           class="w-full btn btn-primary text-sm">
                Manage License
              </router-link>
              <router-link to="/dashboard/billing" 
                           class="w-full btn btn-secondary text-sm">
                Billing History
              </router-link>
            </div>
          </div>
          
          <!-- Quick Actions -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            
            <div class="space-y-3">
              <button @click="downloadApp" 
                      class="w-full btn btn-secondary text-sm flex items-center justify-center">
                <Download class="w-4 h-4 mr-2" />
                Download App
              </button>
              
              <button @click="viewDocumentation" 
                      class="w-full btn btn-secondary text-sm flex items-center justify-center">
                <BookOpen class="w-4 h-4 mr-2" />
                Documentation
              </button>
              
              <button @click="contactSupport" 
                      class="w-full btn btn-secondary text-sm flex items-center justify-center">
                <MessageCircle class="w-4 h-4 mr-2" />
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useHead } from '@vueuse/head'
import { 
  Activity, Clock, Zap, TrendingUp, CheckCircle, XCircle, 
  Download, BookOpen, MessageCircle 
} from 'lucide-vue-next'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

useHead({
  title: 'Dashboard - Computer AI Automation',
  meta: [
    { name: 'description', content: 'Manage your Computer AI Automation account, view usage statistics, and access your automations.' }
  ]
})

const user = computed(() => authStore.user)

const stats = ref({
  automationsRun: 1247,
  timeSaved: 156,
  successRate: 98.5,
  thisMonth: 89
})

const recentActivity = ref([
  {
    id: 1,
    name: 'Email Automation',
    description: 'Processed 25 emails successfully',
    status: 'success',
    timestamp: Date.now() - 1000 * 60 * 30 // 30 minutes ago
  },
  {
    id: 2,
    name: 'Data Entry Task',
    description: 'Completed form filling for 15 records',
    status: 'success',
    timestamp: Date.now() - 1000 * 60 * 60 * 2 // 2 hours ago
  },
  {
    id: 3,
    name: 'Report Generation',
    description: 'Generated monthly sales report',
    status: 'success',
    timestamp: Date.now() - 1000 * 60 * 60 * 4 // 4 hours ago
  },
  {
    id: 4,
    name: 'Web Scraping',
    description: 'Failed to connect to target website',
    status: 'error',
    timestamp: Date.now() - 1000 * 60 * 60 * 6 // 6 hours ago
  }
])

const licenseStatusClass = computed(() => {
  if (!user.value?.expires_at) return 'bg-gray-100 text-gray-800'
  
  const expiresAt = new Date(user.value.expires_at * 1000)
  const now = new Date()
  const daysUntilExpiry = Math.ceil((expiresAt - now) / (1000 * 60 * 60 * 24))
  
  if (daysUntilExpiry < 0) return 'bg-red-100 text-red-800'
  if (daysUntilExpiry < 30) return 'bg-yellow-100 text-yellow-800'
  return 'bg-green-100 text-green-800'
})

const licenseStatusDotClass = computed(() => {
  if (!user.value?.expires_at) return 'bg-gray-400'
  
  const expiresAt = new Date(user.value.expires_at * 1000)
  const now = new Date()
  const daysUntilExpiry = Math.ceil((expiresAt - now) / (1000 * 60 * 60 * 24))
  
  if (daysUntilExpiry < 0) return 'bg-red-500'
  if (daysUntilExpiry < 30) return 'bg-yellow-500'
  return 'bg-green-500'
})

const licenseStatusText = computed(() => {
  if (!user.value?.expires_at) return 'No Expiration'
  
  const expiresAt = new Date(user.value.expires_at * 1000)
  const now = new Date()
  const daysUntilExpiry = Math.ceil((expiresAt - now) / (1000 * 60 * 60 * 24))
  
  if (daysUntilExpiry < 0) return 'Expired'
  if (daysUntilExpiry < 30) return `Expires in ${daysUntilExpiry} days`
  return 'Active'
})

const formatTime = (timestamp) => {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return 'Just now'
}

const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A'
  return new Date(timestamp * 1000).toLocaleDateString()
}

const downloadApp = () => {
  window.location.href = '/download'
}

const viewDocumentation = () => {
  window.open('/docs', '_blank')
}

const contactSupport = () => {
  window.open('/support', '_blank')
}

onMounted(() => {
  // Fetch user data if not already loaded
  if (!user.value) {
    authStore.fetchUser()
  }
})
</script>