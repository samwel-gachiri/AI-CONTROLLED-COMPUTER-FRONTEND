<template>
  <div class="min-h-screen">
    <Header />
    
    <!-- Hero Section -->
    <section class="pt-24 pb-16 sm:pt-32 sm:pb-20">
      <div class="container">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Download Computer AI
            <span class="gradient-text">Automation</span>
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get started with the most advanced AI-powered desktop automation suite. 
            Available for Windows, macOS, and Linux.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Download Options -->
    <section class="pb-20">
      <div class="container">
        <div class="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <!-- Windows -->
          <div class="card p-8 text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.351"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Windows</h3>
            <p class="text-gray-600 mb-6">
              Compatible with Windows 10 and 11. Supports both x64 and ARM64 architectures.
            </p>
            
            <div class="space-y-3 mb-8">
              <button 
                @click="downloadWindows('x64')"
                class="btn btn-primary w-full"
                :disabled="downloading.windows_x64"
              >
                <Download class="w-4 h-4 mr-2" />
                {{ downloading.windows_x64 ? 'Downloading...' : 'Download for Windows (x64)' }}
              </button>
              
              <button 
                @click="downloadWindows('arm64')"
                class="btn btn-secondary w-full"
                :disabled="downloading.windows_arm64"
              >
                <Download class="w-4 h-4 mr-2" />
                {{ downloading.windows_arm64 ? 'Downloading...' : 'Download for Windows (ARM64)' }}
              </button>
            </div>
            
            <div class="text-sm text-gray-500 space-y-1">
              <div>Version: {{ version }}</div>
              <div>Size: ~85 MB</div>
              <div>Requirements: Windows 10+</div>
            </div>
          </div>
          
          <!-- macOS -->
          <div class="card p-8 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">macOS</h3>
            <p class="text-gray-600 mb-6">
              Universal binary supporting both Intel and Apple Silicon Macs. macOS 11.0 or later required.
            </p>
            
            <div class="space-y-3 mb-8">
              <button 
                @click="downloadMac('universal')"
                class="btn btn-primary w-full"
                :disabled="downloading.mac_universal"
              >
                <Download class="w-4 h-4 mr-2" />
                {{ downloading.mac_universal ? 'Downloading...' : 'Download for macOS (Universal)' }}
              </button>
              
              <button 
                @click="downloadMac('intel')"
                class="btn btn-secondary w-full"
                :disabled="downloading.mac_intel"
              >
                <Download class="w-4 h-4 mr-2" />
                {{ downloading.mac_intel ? 'Downloading...' : 'Intel Macs Only' }}
              </button>
            </div>
            
            <div class="text-sm text-gray-500 space-y-1">
              <div>Version: {{ version }}</div>
              <div>Size: ~92 MB</div>
              <div>Requirements: macOS 11.0+</div>
            </div>
          </div>
          
          <!-- Linux -->
          <div class="card p-8 text-center">
            <div class="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 01-.088.066c-.297.168-.623.336-.995.268a.809.809 0 01-.04-.007c-.138-.023-.234-.08-.290-.136-.08-.08-.131-.181-.144-.293-.016-.16-.016-.353.131-.521.063-.067.158-.135.238-.167.393-.15.181-.657-.022-.934-.02-.043-.048-.094-.079-.146a.014.014 0 01-.002-.006c-.02-.042-.04-.084-.04-.14 0-.093.016-.184.033-.274.016-.09.033-.182.016-.258-.007-.039-.016-.077-.025-.112-.005-.018-.01-.037-.015-.054l.076-.064c.178-.135.352-.201.528-.268z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Linux</h3>
            <p class="text-gray-600 mb-6">
              AppImage format for easy installation on most Linux distributions. Supports x64 and ARM64.
            </p>
            
            <div class="space-y-3 mb-8">
              <button 
                @click="downloadLinux('x64')"
                class="btn btn-primary w-full"
                :disabled="downloading.linux_x64"
              >
                <Download class="w-4 h-4 mr-2" />
                {{ downloading.linux_x64 ? 'Downloading...' : 'Download for Linux (x64)' }}
              </button>
              
              <button 
                @click="downloadLinux('arm64')"
                class="btn btn-secondary w-full"
                :disabled="downloading.linux_arm64"
              >
                <Download class="w-4 h-4 mr-2" />
                {{ downloading.linux_arm64 ? 'Downloading...' : 'Download for Linux (ARM64)' }}
              </button>
            </div>
            
            <div class="text-sm text-gray-500 space-y-1">
              <div>Version: {{ version }}</div>
              <div>Size: ~78 MB</div>
              <div>Format: AppImage</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Installation Instructions -->
    <section class="section bg-gray-50">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Installation Instructions
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Quick setup guides for each platform
          </p>
        </div>
        
        <div class="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <!-- Windows Instructions -->
          <div class="card p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.351"/>
              </svg>
              Windows Setup
            </h3>
            <ol class="space-y-3 text-sm text-gray-600">
              <li class="flex items-start">
                <span class="bg-primary-100 text-primary-800 text-xs font-bold px-2 py-1 rounded-full mr-3 mt-0.5">1</span>
                Download the installer for your architecture
              </li>
              <li class="flex items-start">
                <span class="bg-primary-100 text-primary-800 text-xs font-bold px-2 py-1 rounded-full mr-3 mt-0.5">2</span>
                Run the .exe file as administrator
              </li>
              <li class="flex items-start">
                <span class="bg-primary-100 text-primary-800 text-xs font-bold px-2 py-1 rounded-full mr-3 mt-0.5">3</span>
                Follow the installation wizard
              </li>
              <li class="flex items-start">
                <span class="bg-primary-100 text-primary-800 text-xs font-bold px-2 py-1 rounded-full mr-3 mt-0.5">4</span>
                Launch from Start Menu or Desktop
              </li>
            </ol>
          </div>
          
          <!-- macOS Instructions -->
          <div class="card p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              macOS Setup
            </h3>
            <ol class="space-y-3 text-sm text-gray-600">
              <li class="flex items-start">
                <span class="bg-primary-100 text-primary-800 text-xs font-bold px-2 py-1 rounded-full mr-3 mt-0.5">1</span>
                Download the .dmg file
              </li>
              <li class="flex items-start">
                <span class="bg-primary-100 text-primary-800 text-xs font-bold px-2 py-1 rounded-full mr-3 mt-0.5">2</span>
                Open the disk image
              </li>
              <li class="flex items-start">
                <span class="bg-primary-100 text-primary-800 text-xs font-bold px-2 py-1 rounded-full mr-3 mt-0.5">3</span>
                Drag app to Applications folder
              </li>
              <li class="flex items-start">
                <span class="bg-primary-100 text-primary-800 text-xs font-bold px-2 py-1 rounded-full mr-3 mt-0.5">4</span>
                Launch from Applications or Launchpad
              </li>
            </ol>
          </div>
          
          <!-- Linux Instructions -->
          <div class="card p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 text-orange-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 01-.088.066c-.297.168-.623.336-.995.268a.809.809 0 01-.04-.007c-.138-.023-.234-.08-.29-.136-.08-.08-.131-.181-.144-.293-.016-.16-.016-.353.131-.521.063-.067.158-.135.238-.167.393-.15.181-.657-.022-.934-.02-.043-.048-.094-.079-.146a.014.014 0 01-.002-.006c-.02-.042-.04-.084-.04-.14 0-.093.016-.184.033-.274.016-.09.033-.182.016-.258-.007-.039-.016-.077-.025-.112-.005-.018-.01-.037-.015-.054l.076-.064c.178-.135.352-.201.528-.268z"/>
              </svg>
              Linux Setup
            </h3>
            <ol class="space-y-3 text-sm text-gray-600">
              <li class="flex items-start">
                <span class="bg-primary-100 text-primary-800 text-xs font-bold px-2 py-1 rounded-full mr-3 mt-0.5">1</span>
                Download the .AppImage file
              </li>
              <li class="flex items-start">
                <span class="bg-primary-100 text-primary-800 text-xs font-bold px-2 py-1 rounded-full mr-3 mt-0.5">2</span>
                Make it executable: chmod +x *.AppImage
              </li>
              <li class="flex items-start">
                <span class="bg-primary-100 text-primary-800 text-xs font-bold px-2 py-1 rounded-full mr-3 mt-0.5">3</span>
                Run the AppImage file
              </li>
              <li class="flex items-start">
                <span class="bg-primary-100 text-primary-800 text-xs font-bold px-2 py-1 rounded-full mr-3 mt-0.5">4</span>
                Optional: Integrate with AppImageLauncher
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
    
    <!-- System Requirements -->
    <section class="section">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            System Requirements
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Minimum and recommended specifications for optimal performance
          </p>
        </div>
        
        <div class="max-w-4xl mx-auto">
          <div class="grid md:grid-cols-2 gap-8">
            <!-- Minimum Requirements -->
            <div class="card p-8">
              <h3 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                  <AlertTriangle class="w-4 h-4 text-yellow-600" />
                </div>
                Minimum Requirements
              </h3>
              
              <div class="space-y-4">
                <div>
                  <div class="font-medium text-gray-900 mb-1">Operating System</div>
                  <div class="text-sm text-gray-600">Windows 10, macOS 11.0, or Linux (Ubuntu 18.04+)</div>
                </div>
                <div>
                  <div class="font-medium text-gray-900 mb-1">Processor</div>
                  <div class="text-sm text-gray-600">Intel Core i3 or AMD Ryzen 3 (2.0 GHz+)</div>
                </div>
                <div>
                  <div class="font-medium text-gray-900 mb-1">Memory</div>
                  <div class="text-sm text-gray-600">4 GB RAM</div>
                </div>
                <div>
                  <div class="font-medium text-gray-900 mb-1">Storage</div>
                  <div class="text-sm text-gray-600">500 MB available space</div>
                </div>
                <div>
                  <div class="font-medium text-gray-900 mb-1">Display</div>
                  <div class="text-sm text-gray-600">1280x720 resolution</div>
                </div>
              </div>
            </div>
            
            <!-- Recommended Requirements -->
            <div class="card p-8 border-2 border-green-200">
              <h3 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <CheckCircle class="w-4 h-4 text-green-600" />
                </div>
                Recommended
              </h3>
              
              <div class="space-y-4">
                <div>
                  <div class="font-medium text-gray-900 mb-1">Operating System</div>
                  <div class="text-sm text-gray-600">Windows 11, macOS 12.0+, or Linux (Ubuntu 20.04+)</div>
                </div>
                <div>
                  <div class="font-medium text-gray-900 mb-1">Processor</div>
                  <div class="text-sm text-gray-600">Intel Core i5 or AMD Ryzen 5 (3.0 GHz+)</div>
                </div>
                <div>
                  <div class="font-medium text-gray-900 mb-1">Memory</div>
                  <div class="text-sm text-gray-600">8 GB RAM or more</div>
                </div>
                <div>
                  <div class="font-medium text-gray-900 mb-1">Storage</div>
                  <div class="text-sm text-gray-600">2 GB available space (SSD preferred)</div>
                </div>
                <div>
                  <div class="font-medium text-gray-900 mb-1">Display</div>
                  <div class="text-sm text-gray-600">1920x1080 resolution or higher</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useHead } from '@vueuse/head'
import { Download, AlertTriangle, CheckCircle } from 'lucide-vue-next'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

useHead({
  title: 'Download - Get Computer AI Automation',
  meta: [
    { name: 'description', content: 'Download Computer AI Automation for Windows, macOS, and Linux. Free 7-day trial with full features.' }
  ]
})

const version = ref('1.2.3')

const downloading = reactive({
  windows_x64: false,
  windows_arm64: false,
  mac_universal: false,
  mac_intel: false,
  linux_x64: false,
  linux_arm64: false
})

const downloadFile = async (platform, arch, filename) => {
  const key = `${platform}_${arch}`
  downloading[key] = true
  
  try {
    // Track download event
    if (window.gtag) {
      window.gtag('event', 'download', {
        'event_category': 'software',
        'event_label': `${platform}-${arch}`,
        'value': 1
      })
    }
    
    // Simulate download delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Create download link
    const link = document.createElement('a')
    link.href = `/downloads/${filename}`
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
  } catch (error) {
    console.error('Download error:', error)
    alert('Download failed. Please try again.')
  } finally {
    downloading[key] = false
  }
}

const downloadWindows = (arch) => {
  const filename = `computer-ai-automation-windows-${arch}.exe`
  downloadFile('windows', arch, filename)
}

const downloadMac = (arch) => {
  const filename = `computer-ai-automation-macos-${arch}.dmg`
  downloadFile('mac', arch, filename)
}

const downloadLinux = (arch) => {
  const filename = `computer-ai-automation-linux-${arch}.AppImage`
  downloadFile('linux', arch, filename)
}
</script>