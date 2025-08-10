<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div
                class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <h1 class="text-2xl font-bold text-gray-900">{{ organizationName }} - Admin Dashboard</h1>
              <p class="text-sm text-gray-500">Manage your organization's automation workflows</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-700">Welcome, {{ user?.name }}</span>
            <button @click="handleSignOut"
              class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <Users class="h-6 w-6 text-gray-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Employees</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ employees.length }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <Share class="h-6 w-6 text-gray-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Shared Tasks</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ sharedTasks.length }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <Activity class="h-6 w-6 text-gray-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Active Users</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ activeEmployees }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <Shield class="h-6 w-6 text-gray-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Protected Fields</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ protectedFieldsCount }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Field Protection Section -->
      <div class="mb-8">
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900">🔒 Field Protection Management</h3>
              <button @click="showFieldProtection = !showFieldProtection"
                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <Shield class="h-4 w-4 mr-1" />
                {{ showFieldProtection ? 'Hide' : 'Manage' }} Field Protection
              </button>
            </div>

            <div v-if="!showFieldProtection" class="text-center py-6">
              <Shield class="mx-auto h-12 w-12 text-gray-400" />
              <h3 class="mt-2 text-sm font-medium text-gray-900">Field Protection</h3>
              <p class="mt-1 text-sm text-gray-500">Manage protected fields and access requests from your team.</p>
              <div class="mt-4 flex justify-center space-x-4 text-sm text-gray-600">
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  {{ pendingRequestsCount }} pending requests
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  {{ protectedFieldsCount }} protected fields
                </div>
              </div>
            </div>

            <div v-if="showFieldProtection" class="field-protection-container">
              <FieldProtection />
            </div>
          </div>
        </div>
      </div>

      <!-- Main Dashboard Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Employee Management -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Employee Management</h3>
              <button @click="showAddEmployeeModal = true"
                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <Plus class="h-4 w-4 mr-1" />
                Add Employee
              </button>
            </div>

            <div class="flow-root">
              <ul class="-my-5 divide-y divide-gray-200">
                <li v-for="employee in employees" :key="employee.id" class="py-4">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <div class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span class="text-sm font-medium text-gray-700">{{ employee.name.charAt(0) }}</span>
                      </div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate">{{ employee.name }}</p>
                      <p class="text-sm text-gray-500 truncate">{{ employee.email }}</p>
                    </div>
                    <div class="flex-shrink-0">
                      <span :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        employee.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                      ]">
                        {{ employee.role }}
                      </span>
                    </div>
                    <div class="flex-shrink-0">
                      <button @click="removeEmployee(employee)" class="text-red-600 hover:text-red-900">
                        <Trash2 class="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div v-if="employees.length === 0" class="text-center py-6">
              <Users class="mx-auto h-12 w-12 text-gray-400" />
              <h3 class="mt-2 text-sm font-medium text-gray-900">No employees</h3>
              <p class="mt-1 text-sm text-gray-500">Get started by adding your first employee.</p>
            </div>
          </div>
        </div>

        <!-- Task Sharing -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Shared Tasks</h3>
              <button @click="shareTask"
                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <Share class="h-4 w-4 mr-1" />
                Share Task
              </button>
            </div>

            <div class="flow-root">
              <ul class="-my-5 divide-y divide-gray-200">
                <li v-for="task in sharedTasks" :key="task.id" class="py-4">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <div class="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <FileText class="h-4 w-4 text-primary-600" />
                      </div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate">{{ task.name }}</p>
                      <p class="text-sm text-gray-500 truncate">Created by {{ task.created_by }}</p>
                    </div>
                    <div class="flex-shrink-0">
                      <span class="text-xs text-gray-500">{{ formatDate(task.created_at) }}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div v-if="sharedTasks.length === 0" class="text-center py-6">
              <Share class="mx-auto h-12 w-12 text-gray-400" />
              <h3 class="mt-2 text-sm font-medium text-gray-900">No shared tasks</h3>
              <p class="mt-1 text-sm text-gray-500">Share tasks with your team to get started.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Employee Modal -->
    <div v-if="showAddEmployeeModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Add New Employee</h3>
            <button @click="showAddEmployeeModal = false" class="text-gray-400 hover:text-gray-600">
              <X class="h-5 w-5" />
            </button>
          </div>

          <form @submit.prevent="addEmployee" class="space-y-4">
            <div>
              <label for="employeeName" class="block text-sm font-medium text-gray-700">Full Name</label>
              <input id="employeeName" v-model="newEmployee.name" type="text" required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
            </div>

            <div>
              <label for="employeeEmail" class="block text-sm font-medium text-gray-700">Email</label>
              <input id="employeeEmail" v-model="newEmployee.email" type="email" required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
            </div>

            <div>
              <label for="employeePassword" class="block text-sm font-medium text-gray-700">Password</label>
              <input id="employeePassword" v-model="newEmployee.password" type="password" required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
            </div>

            <div>
              <label for="employeeRole" class="block text-sm font-medium text-gray-700">Role</label>
              <select id="employeeRole" v-model="newEmployee.role"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div class="flex justify-end space-x-3 pt-4">
              <button type="button" @click="showAddEmployeeModal = false"
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" :disabled="addingEmployee"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50">
                {{ addingEmployee ? 'Adding...' : 'Add Employee' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Task Sharing Modal -->
    <TaskSharingModal :is-open="showTaskSharingModal" :task="selectedTaskForSharing" :employees="employees"
      @close="closeTaskSharingModal" @shared="handleTaskShared" />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import {
  Users, Share, Activity, Shield, Plus, Trash2, FileText, X
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'
import TaskSharingModal from '@/components/modals/TaskSharingModal.vue'
import FieldProtection from '@/views/dashboard/FieldProtection.vue'

// Configure axios with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
})

const router = useRouter()
const authStore = useAuthStore()

useHead({
  title: 'Admin Dashboard - Computer AI Automation'
})

// State
const employees = ref([])
const sharedTasks = ref([])
const showAddEmployeeModal = ref(false)
const addingEmployee = ref(false)
const showTaskSharingModal = ref(false)
const selectedTaskForSharing = ref(null)
const showFieldProtection = ref(false)
const protectedFieldsCount = ref(0)
const pendingRequestsCount = ref(0)

const newEmployee = reactive({
  name: '',
  email: '',
  password: '',
  role: 'employee'
})

// Computed
const user = computed(() => authStore.user)
const organizationName = computed(() => authStore.organizationName)

const activeEmployees = computed(() => {
  return employees.value.filter(emp => emp.last_login).length
})

const adminCount = computed(() => {
  return employees.value.filter(emp => emp.role === 'admin').length
})

// Methods
const loadEmployees = async () => {
  try {
    const response = await api.get('/api/organization/employees', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    employees.value = response.data.employees || []
  } catch (error) {
    console.error('Failed to load employees:', error)
  }
}

const loadSharedTasks = async () => {
  try {
    const response = await api.get('/api/tasks/shared', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    sharedTasks.value = response.data.tasks || []
  } catch (error) {
    console.error('Failed to load shared tasks:', error)
  }
}

const loadFieldProtectionData = async () => {
  try {
    // Load protected fields count
    const protectedResponse = await api.get('/api/field-protection/permissions', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    if (protectedResponse.data.success) {
      protectedFieldsCount.value = Object.keys(protectedResponse.data.protected_fields || {}).length
    }

    // Load pending requests count
    const requestsResponse = await api.get('/api/field-protection/pending-requests', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    if (requestsResponse.data.success) {
      pendingRequestsCount.value = requestsResponse.data.requests?.length || 0
    }
  } catch (error) {
    console.error('Failed to load field protection data:', error)
  }
}

const addEmployee = async () => {
  addingEmployee.value = true

  try {
    await api.post('/api/organization/employees', newEmployee, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    await loadEmployees()
    showAddEmployeeModal.value = false

    // Reset form
    Object.assign(newEmployee, {
      name: '',
      email: '',
      password: '',
      role: 'employee'
    })
  } catch (error) {
    console.error('Failed to add employee:', error)
    const errorMessage = error.response?.data?.error || 'Failed to add employee'
    alert(errorMessage)
  } finally {
    addingEmployee.value = false
  }
}

const removeEmployee = async (employee) => {
  if (!confirm(`Are you sure you want to remove ${employee.name}?`)) {
    return
  }

  try {
    await api.delete(`/api/organization/employees/${employee.id}`, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    await loadEmployees()
  } catch (error) {
    console.error('Failed to remove employee:', error)
    const errorMessage = error.response?.data?.error || 'Failed to remove employee'
    alert(errorMessage)
  }
}

const shareTask = (task = null) => {
  selectedTaskForSharing.value = task || {
    id: null,
    name: 'New Automation Task',
    description: 'Share a new automation task with your team'
  }
  showTaskSharingModal.value = true
}

const handleTaskShared = (data) => {
  console.log('Task shared:', data)
  // Refresh shared tasks list
  loadSharedTasks()
}

const closeTaskSharingModal = () => {
  showTaskSharingModal.value = false
  selectedTaskForSharing.value = null
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const handleSignOut = async () => {
  await authStore.signOut()
  router.push('/auth/signin')
}

// Lifecycle
onMounted(() => {
  if (!authStore.isAuthenticated || !authStore.isAdmin) {
    router.push('/auth/signin')
    return
  }

  loadEmployees()
  loadSharedTasks()
  loadFieldProtectionData()
})
</script>

<style scoped>
.field-protection-container {
  max-height: 600px;
  overflow-y: auto;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
}
</style>