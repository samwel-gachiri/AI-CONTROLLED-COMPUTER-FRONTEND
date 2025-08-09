<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <nav class="container">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2 group">
          <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <Bot class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
            Computer AI
          </span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link to="/features" class="nav-link">Features</router-link>
          <router-link to="/pricing" class="nav-link">Pricing</router-link>
          <router-link to="/enterprise" class="nav-link">Enterprise</router-link>
          <router-link to="/blog" class="nav-link">Blog</router-link>
        </div>

        <!-- Right Side Actions -->
        <div class="flex items-center space-x-4">
          <!-- Authenticated User Menu -->
          <div v-if="isAuthenticated" class="relative">
            <button 
              @click="toggleUserMenu"
              class="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <div class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span class="text-white font-medium">{{ userInitials }}</span>
              </div>
              <span class="hidden md:block text-gray-700">{{ user?.email }}</span>
              <ChevronDown class="w-4 h-4 text-gray-500" />
            </button>
            
            <!-- User Dropdown -->
            <div 
              v-show="userMenuOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
            >
              <router-link 
                to="/dashboard" 
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="closeUserMenu"
              >
                Dashboard
              </router-link>
              <router-link 
                to="/dashboard/license" 
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="closeUserMenu"
              >
                License Management
              </router-link>
              <router-link 
                to="/dashboard/billing" 
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="closeUserMenu"
              >
                Billing History
              </router-link>
              <div class="border-t border-gray-100"></div>
              <button 
                @click="handleSignOut"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </div>
          </div>
          
          <!-- Guest Actions -->
          <template v-else>
            <!-- Sign In -->
            <router-link to="/auth/signin" class="nav-link hidden sm:block">
              Sign In
            </router-link>
            
            <!-- Download Button -->
            <button 
              @click="handleDownload"
              class="btn btn-primary"
            >
              <Download class="w-4 h-4 mr-2" />
              {{ downloadText }}
            </button>
          </template>

          <!-- Mobile Menu Button -->
          <button 
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Menu v-if="!mobileMenuOpen" class="w-5 h-5" />
            <X v-else class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition name="slide">
        <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-100">
          <div class="flex flex-col space-y-4">
            <router-link to="/features" class="nav-link" @click="closeMobileMenu">Features</router-link>
            <router-link to="/pricing" class="nav-link" @click="closeMobileMenu">Pricing</router-link>
            <router-link to="/enterprise" class="nav-link" @click="closeMobileMenu">Enterprise</router-link>
            <router-link to="/blog" class="nav-link" @click="closeMobileMenu">Blog</router-link>
            <router-link to="/auth" class="nav-link" @click="closeMobileMenu">Sign In</router-link>
          </div>
        </div>
      </transition>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Bot, Download, Menu, X, ChevronDown } from 'lucide-vue-next'
import { useDeviceDetection } from '@/composables/useDeviceDetection'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const mobileMenuOpen = ref(false)
const userMenuOpen = ref(false)
const { platform, downloadText } = useDeviceDetection()

// Auth computed properties
const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)

const userInitials = computed(() => {
  if (!user.value?.email) return 'U'
  return user.value.email.charAt(0).toUpperCase()
})

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

const closeUserMenu = () => {
  userMenuOpen.value = false
}

const handleSignOut = async () => {
  try {
    await authStore.signOut()
    router.push('/')
  } catch (error) {
    console.error('Sign out error:', error)
  }
  closeUserMenu()
}

const handleDownload = () => {
  // Detect user's platform and trigger appropriate download
  const downloadUrl = getDownloadUrl()
  
  // Track download event
  if (window.gtag) {
    window.gtag('event', 'download', {
      event_category: 'engagement',
      event_label: platform.value
    })
  }
  
  // Trigger download
  window.open(downloadUrl, '_blank')
}

const getDownloadUrl = () => {
  // Return appropriate download URL based on platform
  const baseUrl = '/downloads'
  
  switch (platform.value) {
    case 'Windows':
      return `${baseUrl}/computer-ai-automation-windows.exe`
    case 'macOS':
      return `${baseUrl}/computer-ai-automation-macos.dmg`
    case 'Linux':
      return `${baseUrl}/computer-ai-automation-linux.AppImage`
    default:
      return `${baseUrl}/computer-ai-automation-windows.exe`
  }
}

// Close menus when clicking outside
const handleClickOutside = (event) => {
  if (mobileMenuOpen.value && !event.target.closest('nav')) {
    closeMobileMenu()
  }
  if (userMenuOpen.value && !event.target.closest('.relative')) {
    closeUserMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>