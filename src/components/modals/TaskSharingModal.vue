<template>
  <div v-if="isOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div class="mt-3">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Share Task</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <X class="h-6 w-6" />
          </button>
        </div>

        <!-- Task Info -->
        <div v-if="task" class="mb-4 p-3 bg-gray-50 rounded-lg">
          <h4 class="font-medium text-gray-900">{{ task.name }}</h4>
          <p class="text-sm text-gray-600 mt-1">{{ task.description || 'No description available' }}</p>
        </div>

        <!-- Share Options -->
        <div class="space-y-4">
          <!-- Share with Organization -->
          <div>
            <label class="flex items-center">
              <input v-model="shareWithOrganization" type="checkbox"
                class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              <span class="ml-2 text-sm text-gray-700">Share with entire organization</span>
            </label>
          </div>

          <!-- Specific Users -->
          <div v-if="!shareWithOrganization">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Select specific users:
            </label>
            <div class="max-h-40 overflow-y-auto border border-gray-300 rounded-md">
              <div v-for="employee in employees" :key="employee.id" class="flex items-center p-2 hover:bg-gray-50">
                <input v-model="selectedUsers" :value="employee.id" type="checkbox"
                  class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">{{ employee.name }}</p>
                  <p class="text-xs text-gray-500">{{ employee.email }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Permissions -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Permissions:
            </label>
            <select v-model="permission"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
              <option value="view">View Only</option>
              <option value="execute">View & Execute</option>
              <option value="edit">View, Execute & Edit</option>
            </select>
          </div>

          <!-- Share Message -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Message (optional):
            </label>
            <textarea v-model="shareMessage" rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Add a message about this shared task..."></textarea>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-3 mt-6">
          <button @click="closeModal"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">
            Cancel
          </button>
          <button @click="shareTask" :disabled="isSharing || (!shareWithOrganization && selectedUsers.length === 0)"
            class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 rounded-md">
            {{ isSharing ? 'Sharing...' : 'Share Task' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { X } from 'lucide-vue-next'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

// Configure axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
})

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  task: {
    type: Object,
    default: null
  },
  employees: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'shared'])

const authStore = useAuthStore()

// State
const shareWithOrganization = ref(false)
const selectedUsers = ref([])
const permission = ref('view')
const shareMessage = ref('')
const isSharing = ref(false)

// Methods
const closeModal = () => {
  // Reset form
  shareWithOrganization.value = false
  selectedUsers.value = []
  permission.value = 'view'
  shareMessage.value = ''
  isSharing.value = false

  emit('close')
}

const shareTask = async () => {
  if (!props.task) return

  isSharing.value = true

  try {
    const shareData = {
      task_id: props.task.id,
      share_with_organization: shareWithOrganization.value,
      user_ids: shareWithOrganization.value ? [] : selectedUsers.value,
      permission: permission.value,
      message: shareMessage.value
    }

    await api.post('/api/tasks/share', shareData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    emit('shared', {
      task: props.task,
      shareData
    })

    closeModal()
  } catch (error) {
    console.error('Failed to share task:', error)
    const errorMessage = error.response?.data?.error || 'Failed to share task'
    alert(errorMessage)
  } finally {
    isSharing.value = false
  }
}

// Watch for modal open to reset form
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    shareWithOrganization.value = false
    selectedUsers.value = []
    permission.value = 'view'
    shareMessage.value = ''
  }
})
</script>