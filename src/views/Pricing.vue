<template>
  <div class="min-h-screen">
    <Header />
    
    <!-- Hero Section -->
    <section class="pt-24 pb-16 sm:pt-32 sm:pb-20">
      <div class="container">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Simple, Transparent
            <span class="gradient-text">Pricing</span>
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Choose the perfect plan for your automation needs. Start free, upgrade when you're ready.
          </p>
          
          <!-- Billing Toggle -->
          <div class="flex items-center justify-center mb-12">
            <span class="text-gray-700 mr-3">Monthly</span>
            <button 
              @click="toggleBilling"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              :class="isAnnual ? 'bg-primary-600' : 'bg-gray-200'"
            >
              <span 
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                :class="isAnnual ? 'translate-x-6' : 'translate-x-1'"
              ></span>
            </button>
            <span class="text-gray-700 ml-3">Annual</span>
            <span class="ml-2 text-sm text-green-600 font-medium">(Save 20%)</span>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Pricing Cards -->
    <section class="pb-20">
      <div class="container">
        <div class="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <!-- Free Plan -->
          <div class="card p-8 relative">
            <div class="text-center mb-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Free Trial</h3>
              <p class="text-gray-600 mb-6">Perfect for trying out the platform</p>
              <div class="mb-6">
                <span class="text-4xl font-bold text-gray-900">$0</span>
                <span class="text-gray-600">/7 days</span>
              </div>
              <button class="btn btn-secondary w-full">
                Start Free Trial
              </button>
            </div>
            
            <ul class="space-y-4">
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">Up to 50 automation runs</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">Basic AI features</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">Community support</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">Basic templates</span>
              </li>
            </ul>
          </div>
          
          <!-- Pro Plan -->
          <div class="card p-8 relative border-2 border-primary-500 transform scale-105">
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span class="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
            
            <div class="text-center mb-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
              <p class="text-gray-600 mb-6">For individuals and small teams</p>
              <div class="mb-6">
                <span class="text-4xl font-bold text-gray-900">
                  ${{ isAnnual ? '39' : '49' }}
                </span>
                <span class="text-gray-600">/month</span>
                <div v-if="isAnnual" class="text-sm text-green-600 font-medium">
                  Save $120/year
                </div>
              </div>
              <button class="btn btn-primary w-full">
                Get Started
              </button>
            </div>
            
            <ul class="space-y-4">
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">Unlimited automation runs</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">Advanced AI features</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">Priority support</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">Premium templates</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">Cloud sync</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">API access</span>
              </li>
            </ul>
          </div>
          
          <!-- Enterprise Plan -->
          <div class="card p-8 relative">
            <div class="text-center mb-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <p class="text-gray-600 mb-6">For large organizations</p>
              <div class="mb-6">
                <span class="text-4xl font-bold text-gray-900">Custom</span>
              </div>
              <router-link to="/enterprise" class="btn btn-secondary w-full">
                Contact Sales
              </router-link>
            </div>
            
            <ul class="space-y-4">
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">Everything in Professional</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">Dedicated support</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">Custom integrations</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">On-premise deployment</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">SLA guarantee</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">Training & onboarding</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    
    <!-- FAQ Section -->
    <section class="section bg-gray-50">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our pricing and plans
          </p>
        </div>
        
        <div class="max-w-3xl mx-auto">
          <div class="space-y-6">
            <div 
              v-for="faq in faqs" 
              :key="faq.id"
              class="card p-6"
            >
              <button 
                @click="toggleFaq(faq.id)"
                class="flex justify-between items-center w-full text-left"
              >
                <h3 class="text-lg font-semibold text-gray-900">{{ faq.question }}</h3>
                <ChevronDown 
                  class="w-5 h-5 text-gray-500 transition-transform duration-200"
                  :class="{ 'rotate-180': faq.open }"
                />
              </button>
              <div 
                v-show="faq.open"
                class="mt-4 text-gray-600 animate-fade-in"
              >
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="section bg-primary-600">
      <div class="container text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Start your free trial today and experience the power of AI automation
        </p>
        
        <button 
          @click="handleDownload"
          class="btn bg-white text-primary-600 hover:bg-gray-50 text-lg px-8 py-4"
        >
          <Download class="w-5 h-5 mr-3" />
          {{ downloadText }}
        </button>
      </div>
    </section>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useHead } from '@vueuse/head'
import { Check, ChevronDown, Download } from 'lucide-vue-next'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import { useDeviceDetection } from '@/composables/useDeviceDetection'

const { downloadText, handleDownload } = useDeviceDetection()

useHead({
  title: 'Pricing - Affordable AI Automation Plans',
  meta: [
    { name: 'description', content: 'Choose the perfect plan for your automation needs. Start with a free trial and upgrade when ready. Transparent pricing with no hidden fees.' }
  ]
})

const isAnnual = ref(false)

const toggleBilling = () => {
  isAnnual.value = !isAnnual.value
}

const faqs = ref([
  {
    id: 1,
    question: 'Can I change my plan at any time?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing adjustments.',
    open: false
  },
  {
    id: 2,
    question: 'What happens after my free trial ends?',
    answer: 'After your 7-day free trial, you can choose to upgrade to a paid plan or continue with limited free features. No credit card required for the trial.',
    open: false
  },
  {
    id: 3,
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 30-day money-back guarantee on all paid plans. If you\'re not satisfied, contact us for a full refund.',
    open: false
  },
  {
    id: 4,
    question: 'Is there a limit on automation runs?',
    answer: 'The free trial includes 50 automation runs. Professional plans include unlimited runs, while Enterprise plans are customized to your needs.',
    open: false
  },
  {
    id: 5,
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise customers. All payments are processed securely.',
    open: false
  }
])

const toggleFaq = (id) => {
  const faq = faqs.value.find(f => f.id === id)
  if (faq) {
    faq.open = !faq.open
  }
}
</script>