<template>
  <div class="min-h-screen">
    <Header />
    
    <!-- Hero Section -->
    <section class="pt-24 pb-16 sm:pt-32 sm:pb-20">
      <div class="container">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Powerful Features for
            <span class="gradient-text">Smart Automation</span>
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover how our AI-powered automation suite transforms the way you interact with your computer
          </p>
        </div>
      </div>
    </section>
    
    <!-- Core Features -->
    <section class="section bg-gray-50">
      <div class="container">
        <div class="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <Brain class="w-6 h-6 text-blue-600" />
              </div>
              <h2 class="text-3xl font-bold text-gray-900">AI-Powered Intelligence</h2>
            </div>
            <p class="text-lg text-gray-600 mb-6">
              Our advanced AI understands your screen content, recognizes patterns, and makes intelligent decisions about how to complete tasks efficiently.
            </p>
            <ul class="space-y-3">
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">Computer vision for screen analysis</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">Natural language task understanding</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">Adaptive learning from user behavior</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">Context-aware decision making</span>
              </li>
            </ul>
          </div>
          <div class="relative">
            <div class="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <div class="mb-4">
                <div class="text-sm opacity-75 mb-2">AI Analysis</div>
                <div class="text-lg font-semibold">Screen Content Recognition</div>
              </div>
              <div class="space-y-3">
                <div class="bg-white/20 rounded-lg p-3">
                  <div class="text-sm">✓ Email interface detected</div>
                </div>
                <div class="bg-white/20 rounded-lg p-3">
                  <div class="text-sm">✓ Recipient field identified</div>
                </div>
                <div class="bg-white/20 rounded-lg p-3">
                  <div class="text-sm">✓ Subject line located</div>
                </div>
                <div class="bg-white/20 rounded-lg p-3">
                  <div class="text-sm">✓ Message body ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div class="lg:order-2">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                <Zap class="w-6 h-6 text-yellow-600" />
              </div>
              <h2 class="text-3xl font-bold text-gray-900">Lightning Fast Execution</h2>
            </div>
            <p class="text-lg text-gray-600 mb-6">
              Execute complex workflows in seconds. What takes hours manually can be accomplished in minutes with our optimized automation engine.
            </p>
            <ul class="space-y-3">
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">Parallel task execution</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">Optimized mouse and keyboard actions</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">Smart waiting and timing</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">Batch processing capabilities</span>
              </li>
            </ul>
          </div>
          <div class="lg:order-1 relative">
            <div class="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 text-white">
              <div class="mb-4">
                <div class="text-sm opacity-75 mb-2">Performance Metrics</div>
                <div class="text-lg font-semibold">Task Execution Speed</div>
              </div>
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <span class="text-sm">Email Processing</span>
                  <span class="text-sm font-bold">2.3s</span>
                </div>
                <div class="w-full bg-white/20 rounded-full h-2">
                  <div class="bg-white rounded-full h-2 w-4/5"></div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm">Form Filling</span>
                  <span class="text-sm font-bold">1.8s</span>
                </div>
                <div class="w-full bg-white/20 rounded-full h-2">
                  <div class="bg-white rounded-full h-2 w-full"></div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm">Data Entry</span>
                  <span class="text-sm font-bold">0.9s</span>
                </div>
                <div class="w-full bg-white/20 rounded-full h-2">
                  <div class="bg-white rounded-full h-2 w-3/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <Shield class="w-6 h-6 text-green-600" />
              </div>
              <h2 class="text-3xl font-bold text-gray-900">Predictable & Reliable</h2>
            </div>
            <p class="text-lg text-gray-600 mb-6">
              Built for enterprise reliability with comprehensive error handling, logging, and recovery mechanisms to ensure consistent results every time.
            </p>
            <ul class="space-y-3">
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">Automatic error recovery</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">Detailed execution logging</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">Rollback capabilities</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">99.9% success rate</span>
              </li>
            </ul>
          </div>
          <div class="relative">
            <div class="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-8 text-white">
              <div class="mb-4">
                <div class="text-sm opacity-75 mb-2">System Status</div>
                <div class="text-lg font-semibold">Reliability Dashboard</div>
              </div>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm">Uptime</span>
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-green-300 rounded-full mr-2"></div>
                    <span class="text-sm font-bold">99.9%</span>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm">Success Rate</span>
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-green-300 rounded-full mr-2"></div>
                    <span class="text-sm font-bold">99.7%</span>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm">Error Recovery</span>
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-green-300 rounded-full mr-2"></div>
                    <span class="text-sm font-bold">98.5%</span>
                  </div>
                </div>
                <div class="mt-4 p-3 bg-white/20 rounded-lg">
                  <div class="text-xs opacity-75">Last 24 hours</div>
                  <div class="text-sm font-semibold">2,847 tasks completed successfully</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Feature Grid -->
    <section class="section">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Complete Automation Suite
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to automate your computer tasks efficiently
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            v-for="feature in allFeatures" 
            :key="feature.id"
            :feature="feature"
          />
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="section bg-primary-600">
      <div class="container text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Experience the Future?
        </h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Start automating your workflows today with our 7-day free trial
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            @click="handleDownload"
            class="btn bg-white text-primary-600 hover:bg-gray-50 text-lg px-8 py-4"
          >
            <Download class="w-5 h-5 mr-3" />
            {{ downloadText }}
          </button>
          <router-link to="/pricing" class="btn btn-ghost text-white border-white hover:bg-white/10 text-lg px-8 py-4">
            View Pricing
          </router-link>
        </div>
      </div>
    </section>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useHead } from '@vueuse/head'
import { Brain, Zap, Shield, Check, Download, Mouse, Keyboard, Eye, Settings, Database, Cloud } from 'lucide-vue-next'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import FeatureCard from '@/components/ui/FeatureCard.vue'
import { useDeviceDetection } from '@/composables/useDeviceDetection'

const { downloadText, handleDownload } = useDeviceDetection()

useHead({
  title: 'Features - AI-Powered Computer Automation',
  meta: [
    { name: 'description', content: 'Discover powerful features of our AI automation suite including intelligent screen recognition, lightning-fast execution, and enterprise reliability.' }
  ]
})

const allFeatures = ref([
  {
    id: 1,
    icon: Mouse,
    title: 'Smart Mouse Control',
    description: 'Precise mouse movements and clicks with intelligent target recognition and adaptive positioning.',
    color: 'text-blue-600'
  },
  {
    id: 2,
    icon: Keyboard,
    title: 'Intelligent Typing',
    description: 'Natural text input with context awareness, auto-correction, and variable substitution.',
    color: 'text-green-600'
  },
  {
    id: 3,
    icon: Eye,
    title: 'Computer Vision',
    description: 'Advanced screen analysis to identify UI elements, text, and interactive components.',
    color: 'text-purple-600'
  },
  {
    id: 4,
    icon: Settings,
    title: 'Workflow Builder',
    description: 'Visual workflow designer with drag-and-drop interface for complex automation sequences.',
    color: 'text-yellow-600'
  },
  {
    id: 5,
    icon: Database,
    title: 'Data Integration',
    description: 'Connect to databases, APIs, and files to automate data-driven tasks seamlessly.',
    color: 'text-red-600'
  },
  {
    id: 6,
    icon: Cloud,
    title: 'Cloud Sync',
    description: 'Synchronize your automations across devices with secure cloud storage and backup.',
    color: 'text-indigo-600'
  }
])
</script>