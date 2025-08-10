<template>
  <div class="field-protection-dashboard">
    <div class="header">
      <h1>🔒 Field Protection Management</h1>
      <p class="subtitle">Manage protected fields and access requests</p>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button :class="['tab', { active: activeTab === 'requests' }]" @click="activeTab = 'requests'">
        🔓 Access Requests
        <span v-if="pendingRequests.length > 0" class="badge">{{ pendingRequests.length }}</span>
      </button>
      <button :class="['tab', { active: activeTab === 'protected' }]" @click="activeTab = 'protected'">
        🔒 Protected Fields
      </button>
      <button :class="['tab', { active: activeTab === 'history' }]" @click="activeTab = 'history'">
        📋 Access History
      </button>
    </div>

    <!-- Access Requests Tab -->
    <div v-if="activeTab === 'requests'" class="tab-content">
      <div class="section-header">
        <h2>Pending Access Requests</h2>
        <button @click="refreshRequests" class="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      <div v-if="loading" class="loading">
        Loading requests...
      </div>

      <div v-else-if="pendingRequests.length === 0" class="empty-state">
        <div class="empty-icon">📭</div>
        <h3>No Pending Requests</h3>
        <p>All field access requests have been reviewed.</p>
      </div>

      <div v-else class="requests-list">
        <div v-for="request in pendingRequests" :key="request.id" class="request-card">
          <div class="request-header">
            <div class="field-info">
              <h3>{{ request.field_name }}</h3>
              <span class="field-id">{{ request.field_id }}</span>
              <span v-if="request.task_id" class="task-id">Task: {{ request.task_id }}</span>
            </div>
            <div class="request-meta">
              <div class="requester">
                <strong>{{ request.requested_by_name }}</strong>
                <span class="email">{{ request.requested_by_email }}</span>
              </div>
              <div class="timestamp">
                {{ formatDate(request.requested_at) }}
              </div>
            </div>
          </div>

          <div class="request-body">
            <div class="current-value">
              <label>Current Value:</label>
              <div class="value-display">{{ request.current_value || '(empty)' }}</div>
            </div>

            <div class="reason">
              <label>Reason for Access:</label>
              <div class="reason-text">{{ request.reason }}</div>
            </div>
          </div>

          <div class="request-actions">
            <div class="duration-selector">
              <label>Grant access for:</label>
              <select v-model="request.selectedDuration" class="duration-select">
                <option value="0.5">30 minutes</option>
                <option value="1" selected>1 hour</option>
                <option value="2">2 hours</option>
                <option value="4">4 hours</option>
                <option value="8">8 hours</option>
                <option value="24">24 hours</option>
              </select>
            </div>

            <div class="action-buttons">
              <button @click="approveRequest(request)" class="approve-btn" :disabled="processingRequest === request.id">
                <span v-if="processingRequest === request.id">⏳</span>
                <span v-else>✅</span>
                Approve
              </button>
              <button @click="denyRequest(request)" class="deny-btn" :disabled="processingRequest === request.id">
                <span v-if="processingRequest === request.id">⏳</span>
                <span v-else>❌</span>
                Deny
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Protected Fields Tab -->
    <div v-if="activeTab === 'protected'" class="tab-content">
      <div class="section-header">
        <h2>Protected Fields</h2>
        <button @click="refreshProtectedFields" class="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      <div class="protected-fields-list">
        <div v-for="field in protectedFields" :key="`${field.task_id || 'global'}:${field.field_id}`"
          class="field-card">
          <div class="field-header">
            <h3>{{ field.field_name }}</h3>
            <span class="field-id">{{ field.field_id }}</span>
            <span v-if="field.task_id" class="task-id">Task: {{ field.task_id }}</span>
          </div>

          <div class="field-actions">
            <button @click="unprotectField(field)" class="unprotect-btn" :disabled="processingField === field.field_id">
              <span v-if="processingField === field.field_id">⏳</span>
              <span v-else>🔓</span>
              Remove Protection
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Access History Tab -->
    <div v-if="activeTab === 'history'" class="tab-content">
      <div class="section-header">
        <h2>Access History</h2>
        <button @click="refreshHistory" class="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      <div class="history-list">
        <div v-for="item in accessHistory" :key="item.id" class="history-item">
          <div class="history-header">
            <span class="field-name">{{ item.field_name }}</span>
            <span :class="['status', item.status]">{{ item.status.toUpperCase() }}</span>
            <span class="timestamp">{{ formatDate(item.reviewed_at || item.requested_at) }}</span>
          </div>

          <div class="history-details">
            <div class="requester">{{ item.requested_by_name }}</div>
            <div class="reason">{{ item.reason }}</div>
            <div v-if="item.expires_at && item.status === 'approved'" class="expiry">
              Expires: {{ formatDate(item.expires_at) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Toast -->
    <div v-if="notification" :class="['notification', notification.type]">
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

// Configure axios with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
})

export default {
  name: 'FieldProtection',
  setup() {
    const authStore = useAuthStore()
    const activeTab = ref('requests')
    const loading = ref(false)
    const processingRequest = ref(null)
    const processingField = ref(null)
    const notification = ref(null)

    const pendingRequests = ref([])
    const protectedFields = ref([])
    const accessHistory = ref([])

    const refreshRequests = async () => {
      loading.value = true
      try {
        const response = await api.get('/api/field-protection/pending-requests', {
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        })

        if (response.data.success) {
          pendingRequests.value = response.data.requests.map(req => ({
            ...req,
            selectedDuration: 1 // Default 1 hour
          }))
        } else {
          showNotification('Failed to load requests: ' + response.data.error, 'error')
        }
      } catch (error) {
        showNotification('Error loading requests: ' + error.message, 'error')
      } finally {
        loading.value = false
      }
    }

    const refreshProtectedFields = async () => {
      try {
        const response = await api.get('/api/field-protection/permissions', {
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        })

        if (response.data.success) {
          protectedFields.value = Object.values(response.data.protected_fields)
        } else {
          showNotification('Failed to load protected fields: ' + response.data.error, 'error')
        }
      } catch (error) {
        showNotification('Error loading protected fields: ' + error.message, 'error')
      }
    }

    const refreshHistory = async () => {
      try {
        // This would need a new API endpoint for history
        // For now, we'll show a placeholder
        accessHistory.value = []
      } catch (error) {
        showNotification('Error loading history: ' + error.message, 'error')
      }
    }

    const approveRequest = async (request) => {
      processingRequest.value = request.id
      try {
        const response = await api.post('/api/field-protection/approve-request', {
          request_id: request.id,
          duration_hours: request.selectedDuration
        }, {
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        })

        if (response.data.success) {
          showNotification(`Access granted for ${request.selectedDuration} hour(s)`, 'success')
          await refreshRequests()
        } else {
          showNotification('Failed to approve request: ' + response.data.error, 'error')
        }
      } catch (error) {
        showNotification('Error approving request: ' + error.message, 'error')
      } finally {
        processingRequest.value = null
      }
    }

    const denyRequest = async (request) => {
      const reason = prompt('Reason for denial (optional):')

      processingRequest.value = request.id
      try {
        const response = await api.post('/api/field-protection/deny-request', {
          request_id: request.id,
          reason: reason || ''
        }, {
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        })

        if (response.data.success) {
          showNotification('Request denied', 'success')
          await refreshRequests()
        } else {
          showNotification('Failed to deny request: ' + response.data.error, 'error')
        }
      } catch (error) {
        showNotification('Error denying request: ' + error.message, 'error')
      } finally {
        processingRequest.value = null
      }
    }

    const unprotectField = async (field) => {
      if (!confirm(`Remove protection from "${field.field_name}"?`)) {
        return
      }

      processingField.value = field.field_id
      try {
        const response = await api.post('/api/field-protection/unprotect', {
          field_id: field.field_id,
          task_id: field.task_id
        }, {
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        })

        if (response.data.success) {
          showNotification('Field protection removed', 'success')
          await refreshProtectedFields()
        } else {
          showNotification('Failed to remove protection: ' + response.data.error, 'error')
        }
      } catch (error) {
        showNotification('Error removing protection: ' + error.message, 'error')
      } finally {
        processingField.value = null
      }
    }

    const showNotification = (message, type = 'info') => {
      notification.value = { message, type }
      setTimeout(() => {
        notification.value = null
      }, 5000)
    }

    const formatDate = (dateString) => {
      if (!dateString) return ''
      return new Date(dateString).toLocaleString()
    }

    onMounted(() => {
      refreshRequests()
      refreshProtectedFields()
    })

    return {
      activeTab,
      loading,
      processingRequest,
      processingField,
      notification,
      pendingRequests,
      protectedFields,
      accessHistory,
      refreshRequests,
      refreshProtectedFields,
      refreshHistory,
      approveRequest,
      denyRequest,
      unprotectField,
      formatDate
    }
  }
}
</script>

<style scoped>
.field-protection-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.subtitle {
  color: #7f8c8d;
  font-size: 16px;
}

.tabs {
  display: flex;
  border-bottom: 2px solid #ecf0f1;
  margin-bottom: 30px;
}

.tab {
  background: none;
  border: none;
  padding: 15px 25px;
  cursor: pointer;
  font-size: 16px;
  color: #7f8c8d;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  position: relative;
}

.tab:hover {
  color: #2c3e50;
  background-color: #f8f9fa;
}

.tab.active {
  color: #3498db;
  border-bottom-color: #3498db;
}

.badge {
  background: #e74c3c;
  color: white;
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 12px;
  margin-left: 8px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.refresh-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.refresh-btn:hover {
  background: #2980b9;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #7f8c8d;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #7f8c8d;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.requests-list,
.protected-fields-list,
.history-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.request-card,
.field-card {
  background: white;
  border: 1px solid #e1e8ed;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.request-card:hover,
.field-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.request-header,
.field-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.field-info h3,
.field-header h3 {
  margin: 0 0 5px 0;
  color: #2c3e50;
}

.field-id,
.task-id {
  background: #ecf0f1;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #7f8c8d;
  margin-right: 8px;
}

.request-meta {
  text-align: right;
}

.requester {
  margin-bottom: 5px;
}

.email {
  display: block;
  font-size: 12px;
  color: #7f8c8d;
}

.timestamp {
  font-size: 12px;
  color: #95a5a6;
}

.request-body {
  margin-bottom: 20px;
}

.current-value,
.reason {
  margin-bottom: 15px;
}

.current-value label,
.reason label {
  display: block;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 5px;
}

.value-display,
.reason-text {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #e9ecef;
  font-family: monospace;
  white-space: pre-wrap;
}

.request-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #ecf0f1;
}

.duration-selector label {
  margin-right: 10px;
  font-weight: bold;
  color: #2c3e50;
}

.duration-select {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.approve-btn,
.deny-btn,
.unprotect-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.approve-btn {
  background: #27ae60;
  color: white;
}

.approve-btn:hover {
  background: #229954;
}

.deny-btn {
  background: #e74c3c;
  color: white;
}

.deny-btn:hover {
  background: #c0392b;
}

.unprotect-btn {
  background: #f39c12;
  color: white;
}

.unprotect-btn:hover {
  background: #e67e22;
}

.approve-btn:disabled,
.deny-btn:disabled,
.unprotect-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.history-item {
  background: white;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  padding: 15px;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.field-name {
  font-weight: bold;
  color: #2c3e50;
}

.status {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.status.approved {
  background: #d5f4e6;
  color: #27ae60;
}

.status.denied {
  background: #fadbd8;
  color: #e74c3c;
}

.status.pending {
  background: #fef9e7;
  color: #f39c12;
}

.history-details {
  color: #7f8c8d;
  font-size: 14px;
}

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  z-index: 1000;
  animation: slideIn 0.3s ease;
}

.notification.success {
  background: #27ae60;
}

.notification.error {
  background: #e74c3c;
}

.notification.info {
  background: #3498db;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>