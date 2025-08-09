<template>
  <div class="min-h-screen">
    <!-- Header -->
    <Header />
    
    <!-- Hero Section -->
    <section class="pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24">
      <div class="container">
        <div class="text-center max-w-4xl mx-auto">
          <!-- Main Headline -->
          <h1 class="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6 animate-fade-in">
            The Computer AI
            <span class="gradient-text block">Automation</span>
          </h1>
          
          <!-- Subtitle -->
          <p class="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Let AI control your computer and manage tasks in a predictable way
          </p>
          
          <!-- Download Button -->
          <div class="animate-slide-up" style="animation-delay: 0.2s;">
            <button 
              @click="handleDownload"
              class="btn btn-primary text-lg px-8 py-4 mb-4"
            >
              <Download class="w-5 h-5 mr-3" />
              {{ downloadText }}
            </button>
            <p class="text-sm text-gray-500">
              Free 7-day trial • No credit card required
            </p>
          </div>
        </div>
        
        <!-- Hero Visual -->
        <div class="mt-16 sm:mt-20 lg:mt-24 animate-fade-in" style="animation-delay: 0.4s;">
          <div class="relative max-w-5xl mx-auto">
            <!-- Main Screenshot/Demo -->
            <div class="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden">
              <div class="absolute top-4 left-4 flex space-x-2">
                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              
              <!-- Demo Content -->
              <div class="pt-12 pb-8 px-8">
                <div class="bg-gray-800 rounded-lg p-6 font-mono text-sm">
                  <div class="text-green-400 mb-2">$ ai-automation start</div>
                  <div class="text-gray-300 mb-1">🤖 AI Agent initialized...</div>
                  <div class="text-gray-300 mb-1">📋 Analyzing screen content...</div>
                  <div class="text-gray-300 mb-1">⚡ Executing task: "Send email to team"</div>
                  <div class="text-blue-400 mb-1">✓ Email composed with AI assistance</div>
                  <div class="text-blue-400 mb-1">✓ Recipients auto-detected</div>
                  <div class="text-green-400">✓ Task completed successfully</div>
                  <div class="text-gray-500 mt-2 animate-pulse">|</div>
                </div>
              </div>
            </div>
            
            <!-- Floating Elements -->
            <div class="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 animate-float">
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span class="text-sm font-medium text-gray-700">AI Active</span>
              </div>
            </div>
            
            <div class="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 animate-float" style="animation-delay: 1s;">
              <div class="flex items-center space-x-2">
                <Zap class="w-4 h-4 text-yellow-500" />
                <span class="text-sm font-medium text-gray-700">Auto-pilot Mode</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Features Preview -->
    <section class="section bg-gray-50">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Intelligent Automation
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of computer interaction with AI-powered automation
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            v-for="feature in features" 
            :key="feature.id"
            :feature="feature"
          />
        </div>
      </div>
    </section>
    
    <!-- How It Works -->
    <section class="section">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to automate any computer task
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(step, index) in steps" :key="step.id" class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <component :is="step.icon" class="w-8 h-8 text-primary-600" />
            </div>
            <div class="text-sm font-semibold text-primary-600 mb-2">STEP {{ index + 1 }}</div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">{{ step.title }}</h3>
            <p class="text-gray-600">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="section bg-primary-600">
      <div class="container text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Automate Your Workflow?
        </h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Join thousands of users who have transformed their productivity with AI automation
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            @click="handleDownload"
            class="btn bg-white text-primary-600 hover:bg-gray-50 text-lg px-8 py-4"
          >
            <Download class="w-5 h-5 mr-3" />
            {{ downloadText }}
          </button>
          <router-link to="/features" class="btn btn-ghost text-white border-white hover:bg-white/10 text-lg px-8 py-4">
            Learn More
          </router-link>
        </div>
      </div>
    </section>
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useHead } from '@vueuse/head'
import { Download, Zap, Brain, Cog, Play } from 'lucide-vue-next'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import FeatureCard from '@/components/ui/FeatureCard.vue'
import { useDeviceDetection } from '@/composables/useDeviceDetection'

const { downloadText } = useDeviceDetection()

useHead({
  title: 'Let AI Control Your Computer',
  meta: [
    { name: 'description', content: 'Let AI control your computer and manage tasks in a predictable way. The most advanced desktop automation suite powered by artificial intelligence.' },
    { property: 'og:title', content: 'Computer AI Automation - Let AI Control Your Computer' },
    { property: 'og:description', content: 'Let AI control your computer and manage tasks in a predictable way.' },
  ]
})

const features = ref([
  {
    id: 1,
    icon: Brain,
    title: 'AI-Powered Intelligence',
    description: 'Advanced AI understands your screen content and makes intelligent decisions about how to complete tasks.',
    color: 'text-blue-600'
  },
  {
    id: 2,
    icon: Zap,
    title: 'Lightning Fast Execution',
    description: 'Execute complex workflows in seconds. What takes hours manually can be done in minutes with AI.',
    color: 'text-yellow-600'
  },
  {
    id: 3,
    icon: Cog,
    title: 'Predictable Automation',
    description: 'Reliable, consistent results every time. AI learns from your patterns and adapts to changes.',
    color: 'text-green-600'
  }
])

const steps = ref([
  {
    id: 1,
    icon: Brain,
    title: 'Describe Your Task',
    description: 'Simply tell the AI what you want to accomplish in natural language.'
  },
  {
    id: 2,
    icon: Cog,
    title: 'AI Analyzes & Plans',
    description: 'The AI understands your screen, analyzes the task, and creates an execution plan.'
  },
  {
    id: 3,
    icon: Play,
    title: 'Automated Execution',
    description: 'Watch as the AI controls your computer and completes the task perfectly.'
  }
])

const handleDownload = () => {
  // Track download event
  if (window.gtag) {
    window.gtag('event', 'download', {
      event_category: 'engagement',
      event_label: 'hero_cta'
    })
  }
  
  // Trigger download
  const event = new CustomEvent('download-app')
  window.dispatchEvent(event)
}
</script>