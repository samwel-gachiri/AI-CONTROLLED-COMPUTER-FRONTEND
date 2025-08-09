<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <!-- Page Header -->
    <div class="bg-white shadow">
      <div class="container py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Billing History</h1>
            <p class="text-gray-600">View your payment history and download invoices</p>
          </div>
          <router-link to="/dashboard" class="btn btn-secondary">
            Back to Dashboard
          </router-link>
        </div>
      </div>
    </div>
    
    <!-- Billing Content -->
    <div class="container py-8">
      <div class="grid lg:grid-cols-4 gap-8">
        <!-- Billing History -->
        <div class="lg:col-span-3">
          <!-- Current Plan -->
          <div class="card p-6 mb-8">
            <h2 class="text-lg font-semibold text-gray-900 mb-6">Current Plan</h2>
            
            <div class="flex items-center justify-between p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 capitalize">
                  {{ user?.user_type || 'Personal' }} Plan
                </h3>
                <p class="text-sm text-gray-600">
                  {{ getPlanDescription(user?.user_type) }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-2xl font-bold text-primary-600">
                  {{ getPlanPrice(user?.user_type) }}
                </p>
                <p class="text-sm text-gray-600">per year</p>
              </div>
            </div>
            
            <div class="mt-6 flex gap-3">
              <router-link to="/pricing" class="btn btn-primary">
                Change Plan
              </router-link>
              <button @click="downloadCurrentInvoice" class="btn btn-secondary">
                Download Current Invoice
              </button>
            </div>
          </div>
          
          <!-- Payment History -->
          <div class="card p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-semibold text-gray-900">Payment History</h2>
              <div class="flex items-center space-x-4">
                <select v-model="filterYear" class="text-sm border border-gray-300 rounded-lg px-3 py-2">
                  <option value="">All Years</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
                <button @click="exportHistory" class="btn btn-secondary text-sm">
                  Export CSV
                </button>
              </div>
            </div>
            
            <!-- Payment Table -->
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="payment in filteredPayments" :key="payment.id">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ formatDate(payment.date) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ payment.description }}</div>
                      <div class="text-sm text-gray-500">{{ payment.plan }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${{ payment.amount }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                            :class="getStatusClass(payment.status)">
                        {{ payment.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        @click="downloadInvoice(payment.id)"
                        class="text-primary-600 hover:text-primary-900"
                        :disabled="payment.status !== 'paid'"
                      >
                        <Download class="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Empty State -->
            <div v-if="filteredPayments.length === 0" class="text-center py-12">
              <CreditCard class="mx-auto h-12 w-12 text-gray-400" />
              <h3 class="mt-2 text-sm font-medium text-gray-900">No payments found</h3>
              <p class="mt-1 text-sm text-gray-500">
                {{ filterYear ? `No payments found for ${filterYear}` : 'You haven\'t made any payments yet.' }}
              </p>
            </div>
          </div>
        </div>
        
        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Billing Summary -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Billing Summary</h3>
            
            <div class="space-y-4">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Total Paid</span>
                <span class="text-sm font-medium text-gray-900">${{ totalPaid }}</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">This Year</span>
                <span class="text-sm font-medium text-gray-900">${{ thisYearTotal }}</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Next Payment</span>
                <span class="text-sm font-medium text-gray-900">
                  {{ nextPaymentDate }}
                </span>
              </div>
            </div>
          </div>
          
          <!-- Payment Method -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
            
            <div class="flex items-center p-3 border border-gray-200 rounded-lg">
              <CreditCard class="w-8 h-8 text-gray-400 mr-3" />
              <div>
                <p class="text-sm font-medium text-gray-900">•••• •••• •••• 4242</p>
                <p class="text-xs text-gray-500">Expires 12/25</p>
              </div>
            </div>
            
            <button class="w-full mt-4 btn btn-secondary text-sm">
              Update Payment Method
            </button>
          </div>
          
          <!-- Support -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
            
            <div class="space-y-3">
              <a href="/docs/billing" 
                 class="flex items-center text-sm text-primary-600 hover:text-primary-700">
                <BookOpen class="w-4 h-4 mr-2" />
                Billing FAQ
              </a>
              
              <a href="/support" 
                 class="flex items-center text-sm text-primary-600 hover:text-primary-700">
                <MessageCircle class="w-4 h-4 mr-2" />
                Contact Support
              </a>
              
              <a href="/pricing" 
                 class="flex items-center text-sm text-primary-600 hover:text-primary-700">
                <Eye class="w-4 h-4 mr-2" />
                View All Plans
              </a>
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
  Download, CreditCard, BookOpen, MessageCircle, Eye 
} from 'lucide-vue-next'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

useHead({
  title: 'Billing History - Computer AI Automation'
})

const filterYear = ref('')

const user = computed(() => authStore.user)

const payments = ref([
  {
    id: 'inv_001',
    date: '2024-03-15',
    description: 'Annual License Renewal',
    plan: 'Personal Plan',
    amount: '49.00',
    status: 'paid'
  },
  {
    id: 'inv_002',
    date: '2023-03-15',
    description: 'Annual License Purchase',
    plan: 'Personal Plan',
    amount: '49.00',
    status: 'paid'
  },
  {
    id: 'inv_003',
    date: '2023-01-10',
    description: 'License Upgrade',
    plan: 'Enterprise Plan',
    amount: '199.00',
    status: 'paid'
  }
])

const filteredPayments = computed(() => {
  if (!filterYear.value) return payments.value
  
  return payments.value.filter(payment => 
    payment.date.startsWith(filterYear.value)
  )
})

const totalPaid = computed(() => {
  return payments.value
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + parseFloat(p.amount), 0)
    .toFixed(2)
})

const thisYearTotal = computed(() => {
  const currentYear = new Date().getFullYear().toString()
  return payments.value
    .filter(p => p.status === 'paid' && p.date.startsWith(currentYear))
    .reduce((sum, p) => sum + parseFloat(p.amount), 0)
    .toFixed(2)
})

const nextPaymentDate = computed(() => {
  if (!user.value?.expires_at) return 'N/A'
  
  const expiresAt = new Date(user.value.expires_at * 1000)
  return expiresAt.toLocaleDateString()
})

const getPlanDescription = (planType) => {
  const descriptions = {
    personal: 'Perfect for individual users',
    enterprise: 'Advanced features for teams'
  }
  return descriptions[planType] || 'Basic automation features'
}

const getPlanPrice = (planType) => {
  const prices = {
    personal: '$49',
    enterprise: '$199'
  }
  return prices[planType] || '$49'
}

const getStatusClass = (status) => {
  const classes = {
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const downloadInvoice = async (invoiceId) => {
  try {
    // In a real implementation, this would download the actual invoice
    const link = document.createElement('a')
    link.href = `/api/invoices/${invoiceId}/download`
    link.download = `invoice-${invoiceId}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Download error:', error)
    alert('Failed to download invoice. Please try again.')
  }
}

const downloadCurrentInvoice = () => {
  const latestInvoice = payments.value.find(p => p.status === 'paid')
  if (latestInvoice) {
    downloadInvoice(latestInvoice.id)
  }
}

const exportHistory = () => {
  try {
    const csvContent = [
      ['Date', 'Description', 'Plan', 'Amount', 'Status'],
      ...filteredPayments.value.map(p => [
        p.date, p.description, p.plan, p.amount, p.status
      ])
    ].map(row => row.join(',')).join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `billing-history-${filterYear.value || 'all'}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Export error:', error)
    alert('Failed to export billing history. Please try again.')
  }
}

onMounted(() => {
  // Fetch user data if not already loaded
  if (!user.value) {
    authStore.fetchUser()
  }
})
</script>