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
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <h1 class="text-2xl font-bold text-gray-900">{{ organizationName }} - Dashboard</h1>
              <p class="text-sm text-gray-500">Welcome back, {{ user?.name }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-700">{{ userRole }}</span>
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
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
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
                <FileText class="h-6 w-6 text-gray-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Personal Tasks</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ personalTasks.length }}</dd>
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
                  <dt class="text-sm font-medium text-gray-500 truncate">Tasks Executed</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ executedTasks }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Dashboard Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Shared Tasks -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Shared Tasks</h3>
              <span class="text-sm text-gray-500">{{ sharedTasks.length }} available</span>
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
                      <p class="text-sm text-gray-500 truncate">Shared by {{ task.created_by }}</p>
                      <div class="mt-1 flex items-center space-x-2">
                        <span v-if="task.permissions.execution_allowed"
                          class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          <Play class="h-3 w-3 mr-1" />
                          Can Execute
                        </span>
                        <span v-if="task.permissions.editable_components?.length > 0"
                          class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          <Edit class="h-3 w-3 mr-1" />
                          Limited Edit
                        </span>
                        <span v-else
                          class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          <Eye class="h-3 w-3 mr-1" />
                          View Only
                        </span>
                      </div>
                    </div>
                    <div class="flex-shrink-0">
                      <button @click="openTask(task)"
                        class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200">
                        Open
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div v-if="sharedTasks.length === 0" class="text-center py-6">
              <Share class="mx-auto h-12 w-12 text-gray-400" />
              <h3 class="mt-2 text-sm font-medium text-gray-900">No shared tasks</h3>
              <p class="mt-1 text-sm text-gray-500">Your admin hasn't shared any tasks with you yet.</p>
            </div>
          </div>
        </div>

        <!-- Personal Tasks -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Personal Tasks</h3>
              <button @click="createPersonalTask"
                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <Plus class="h-4 w-4 mr-1" />
                Create Task
              </button>
            </div>

            <div class="flow-root">
              <ul class="-my-5 divide-y divide-gray-200">
                <li v-for="task in personalTasks" :key="task.id" class="py-4">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <FileText class="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate">{{ task.name }}</p>
                      <p class="text-sm text-gray-500 truncate">Created {{ formatDate(task.created_at) }}</p>
                      <div class="mt-1">
                        <span
                          class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          <Settings class="h-3 w-3 mr-1" />
                          Full Control
                        </span>
                      </div>
                    </div>
                    <div class="flex-shrink-0 flex space-x-2">
                      <button @click="editTask(task)" class="text-primary-600 hover:text-primary-900">
                        <Edit class="h-4 w-4" />
                      </button>
                      <button @click="deleteTask(task)" class="text-red-600 hover:text-red-900">
                        <Trash2 class="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div v-if="personalTasks.length === 0" class="text-center py-6">
              <FileText class="mx-auto h-12 w-12 text-gray-400" />
              <h3 class="mt-2 text-sm font-medium text-gray-900">No personal tasks</h3>
              <p class="mt-1 text-sm text-gray-500">Create your first automation task to get started.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="mt-8 bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Activity</h3>

          <div class="flow-root">
            <ul class="-mb-8">
              <li v-for="(activity, index) in recentActivity" :key="activity.id">
                <div class="relative pb-8" :class="{ 'pb-0': index === recentActivity.length - 1 }">
                  <span v-if="index !== recentActivity.length - 1"
                    class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                  <div class="relative flex space-x-3">
                    <div>
                      <span :class="[
                        'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                        activity.type === 'task_executed' ? 'bg-green-500' :
                          activity.type === 'task_shared' ? 'bg-blue-500' : 'bg-gray-500'
                      ]">
                        <Play v-if="activity.type === 'task_executed'" class="h-4 w-4 text-white" />
                        <Share v-else-if="activity.type === 'task_shared'" class="h-4 w-4 text-white" />
                        <FileText v-else class="h-4 w-4 text-white" />
                      </span>
                    </div>
                    <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p class="text-sm text-gray-500">{{ activity.description }}</p>
                      </div>
                      <div class="text-right text-sm whitespace-nowrap text-gray-500">
                        {{ formatDate(activity.timestamp) }}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div v-if="recentActivity.length === 0" class="text-center py-6">
            <Activity class="mx-auto h-12 w-12 text-gray-400" />
            <h3 class="mt-2 text-sm font-medium text-gray-900">No recent activity</h3>
            <p class="mt-1 text-sm text-gray-500">Your activity will appear here as you use the system.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import {
  Share, FileText, Activity, Plus, Edit, Trash2, Play, Eye, Settings
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

// Configure axios with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
})

const router = useRouter()
const authStore = useAuthStore()

useHead({
  title: 'Employee Dashboard - Computer AI Automation'
})

// State
const sharedTasks = ref([])
const personalTasks = ref([])
const recentActivity = ref([])
const executedTasks = ref(0)

// Computed
const user = computed(() => authStore.user)
const organizationName = computed(() => authStore.organizationName)
const userRole = computed(() => authStore.userRole)

// Methods
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

const loadPersonalTasks = async () => {
  // This would load personal tasks from local storage or API
  // For now, we'll use mock data
  personalTasks.value = [
    {
      id: 1,
      name: 'Daily Report Automation',
      created_at: new Date().toISOString(),
      type: 'personal'
    },
    {
      id: 2,
      name: 'Email Processing',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      type: 'personal'
    }
  ]
}

const loadRecentActivity = async () => {
  // Mock recent activity data
  recentActivity.value = [
    {
      id: 1,
      type: 'task_executed',
      description: 'Executed "Daily Report Automation" task',
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      type: 'task_shared',
      description: 'New task "Data Processing" shared by admin',
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 3,
      type: 'task_created',
      description: 'Created personal task "Email Processing"',
      timestamp: new Date(Date.now() - 86400000).toISOString()
    }
  ]
}

const openTask = (task) => {
  // This would open the task in the desktop application
  alert(`Opening task: ${task.name}\n\nThis would launch the desktop application with the task loaded and appropriate permissions applied.`)
}

const createPersonalTask = () => {
  // This would open the task creation interface
  alert('This would open the desktop application to create a new personal task.')
}

const editTask = (task) => {
  // This would open the task editor
  alert(`Editing task: ${task.name}\n\nThis would open the desktop application task editor.`)
}

const deleteTask = (task) => {
  if (confirm(`Are you sure you want to delete "${task.name}"?`)) {
    personalTasks.value = personalTasks.value.filter(t => t.id !== task.id)
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = (now - date) / (1000 * 60 * 60)

  if (diffInHours < 1) {
    return 'Just now'
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)} hours ago`
  } else {
    return date.toLocaleDateString()
  }
}

const handleSignOut = async () => {
  await authStore.signOut()
  router.push('/auth/signin')
}

// Lifecycle
onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/auth/signin')
    return
  }

  loadSharedTasks()
  loadPersonalTasks()
  loadRecentActivity()

  // Mock executed tasks count
  executedTasks.value = 12
})
</script>