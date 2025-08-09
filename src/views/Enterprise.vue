<template>
  <div class="min-h-screen">
    <Header />
    
    <!-- Hero Section -->
    <section class="pt-24 pb-16 sm:pt-32 sm:pb-20">
      <div class="container">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Enterprise-Grade
            <span class="gradient-text">AI Automation</span>
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Scale your automation across your entire organization with enterprise security, compliance, and dedicated support.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              @click="openContactModal"
              class="btn btn-primary text-lg px-8 py-4"
            >
              Contact Sales
            </button>
            <button 
              @click="scheduleDemo"
              class="btn btn-secondary text-lg px-8 py-4"
            >
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Enterprise Features -->
    <section class="section bg-gray-50">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Built for Enterprise Scale
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to deploy AI automation across your organization
          </p>
        </div>
        
        <div class="grid lg:grid-cols-3 gap-8">
          <div class="card p-8">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Shield class="w-6 h-6 text-blue-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Enterprise Security</h3>
            <p class="text-gray-600 mb-6">
              Bank-level security with SOC 2 compliance, SSO integration, and advanced access controls.
            </p>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-center">
                <Check class="w-4 h-4 text-green-500 mr-2" />
                SOC 2 Type II Certified
              </li>
              <li class="flex items-center">
                <Check class="w-4 h-4 text-green-500 mr-2" />
                SAML/SSO Integration
              </li>
              <li class="flex items-center">
                <Check class="w-4 h-4 text-green-500 mr-2" />
                Role-based Access Control
              </li>
              <li class="flex items-center">
                <Check class="w-4 h-4 text-green-500 mr-2" />
                Data Encryption at Rest
              </li>
            </ul>
          </div>
          
          <div class="card p-8">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <Users class="w-6 h-6 text-green-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Team Management</h3>
            <p class="text-gray-600 mb-6">
              Centralized user management with advanced permissions and audit trails.
            </p>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-center">
                <Check class="w-4 h-4 text-green-500 mr-2" />
                Unlimited Team Members
              </li>
              <li class="flex items-center">
                <Check class="w-4 h-4 text-green-500 mr-2" />
                Advanced Permissions
              </li>
              <li class="flex items-center">
                <Check class="w-4 h-4 text-green-500 mr-2" />
                Activity Audit Logs
              </li>
              <li class="flex items-center">
                <Check class="w-4 h-4 text-green-500 mr-2" />
                Usage Analytics
              </li>
            </ul>
          </div>
          
          <div class="card p-8">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <Settings class="w-6 h-6 text-purple-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Custom Deployment</h3>
            <p class="text-gray-600 mb-6">
              On-premise, private cloud, or hybrid deployment options to meet your requirements.
            </p>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-center">
                <Check class="w-4 h-4 text-green-500 mr-2" />
                On-Premise Installation
              </li>
              <li class="flex items-center">
                <Check class="w-4 h-4 text-green-500 mr-2" />
                Private Cloud Options
              </li>
              <li class="flex items-center">
                <Check class="w-4 h-4 text-green-500 mr-2" />
                Custom Integrations
              </li>
              <li class="flex items-center">
                <Check class="w-4 h-4 text-green-500 mr-2" />
                API Customization
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Support & SLA -->
    <section class="section">
      <div class="container">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Dedicated Support & SLA
            </h2>
            <p class="text-lg text-gray-600 mb-8">
              Get the support your enterprise needs with dedicated account management, 
              priority support, and guaranteed uptime SLAs.
            </p>
            
            <div class="space-y-6">
              <div class="flex items-start">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <Phone class="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-2">24/7 Priority Support</h3>
                  <p class="text-gray-600">Direct access to our enterprise support team with guaranteed response times.</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <UserCheck class="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-2">Dedicated Account Manager</h3>
                  <p class="text-gray-600">Personal account manager to help with onboarding, training, and optimization.</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <Clock class="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-2">99.9% Uptime SLA</h3>
                  <p class="text-gray-600">Guaranteed uptime with financial penalties if we don't meet our commitments.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
            <h3 class="text-xl font-bold mb-6">Enterprise Support Metrics</h3>
            
            <div class="space-y-6">
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm text-gray-300">Response Time</span>
                  <span class="text-sm font-bold">< 1 hour</span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                  <div class="bg-green-500 rounded-full h-2 w-5/6"></div>
                </div>
              </div>
              
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm text-gray-300">Resolution Time</span>
                  <span class="text-sm font-bold">< 4 hours</span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                  <div class="bg-blue-500 rounded-full h-2 w-4/5"></div>
                </div>
              </div>
              
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm text-gray-300">Customer Satisfaction</span>
                  <span class="text-sm font-bold">98.5%</span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                  <div class="bg-yellow-500 rounded-full h-2 w-full"></div>
                </div>
              </div>
            </div>
            
            <div class="mt-8 p-4 bg-white/10 rounded-lg">
              <div class="text-sm text-gray-300 mb-1">This Month</div>
              <div class="text-lg font-bold">99.97% Uptime</div>
              <div class="text-sm text-green-400">Above SLA target</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Testimonials -->
    <section class="section bg-gray-50">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Enterprise Leaders
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            See how leading organizations are transforming their operations with our AI automation platform
          </p>
        </div>
        
        <div class="grid lg:grid-cols-3 gap-8">
          <div class="card p-8">
            <div class="mb-6">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  T
                </div>
                <div class="ml-4">
                  <div class="font-semibold text-gray-900">TechCorp Inc.</div>
                  <div class="text-sm text-gray-600">Fortune 500 Technology</div>
                </div>
              </div>
              <p class="text-gray-600 italic">
                "Computer AI Automation has transformed our operations. We've reduced manual processing time by 80% 
                and improved accuracy significantly. The enterprise support is exceptional."
              </p>
            </div>
            <div class="text-sm text-gray-500">
              — Sarah Johnson, CTO
            </div>
          </div>
          
          <div class="card p-8">
            <div class="mb-6">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  F
                </div>
                <div class="ml-4">
                  <div class="font-semibold text-gray-900">FinanceFirst</div>
                  <div class="text-sm text-gray-600">Financial Services</div>
                </div>
              </div>
              <p class="text-gray-600 italic">
                "The security features and compliance certifications were crucial for our industry. 
                The platform scales beautifully across our global operations."
              </p>
            </div>
            <div class="text-sm text-gray-500">
              — Michael Chen, Head of Operations
            </div>
          </div>
          
          <div class="card p-8">
            <div class="mb-6">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  H
                </div>
                <div class="ml-4">
                  <div class="font-semibold text-gray-900">HealthSystem Pro</div>
                  <div class="text-sm text-gray-600">Healthcare</div>
                </div>
              </div>
              <p class="text-gray-600 italic">
                "Implementation was smooth with excellent support. Our staff productivity has increased 
                dramatically, allowing us to focus more on patient care."
              </p>
            </div>
            <div class="text-sm text-gray-500">
              — Dr. Lisa Rodriguez, Chief Medical Officer
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Contact CTA -->
    <section class="section bg-primary-600">
      <div class="container text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Transform Your Enterprise?
        </h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Let's discuss how Computer AI Automation can scale across your organization
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            @click="openContactModal"
            class="btn bg-white text-primary-600 hover:bg-gray-50 text-lg px-8 py-4"
          >
            Contact Sales Team
          </button>
          <button 
            @click="scheduleDemo"
            class="btn btn-ghost text-white border-white hover:bg-white/10 text-lg px-8 py-4"
          >
            Schedule Live Demo
          </button>
        </div>
      </div>
    </section>
    
    <!-- Contact Modal -->
    <div 
      v-if="showContactModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="closeContactModal"
    >
      <div 
        class="bg-white rounded-2xl p-8 max-w-md w-full"
        @click.stop
      >
        <div class="text-center mb-6">
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Contact Sales</h3>
          <p class="text-gray-600">Get in touch with our enterprise team</p>
        </div>
        
        <form @submit.prevent="submitContact" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input 
              v-model="contactForm.name"
              type="text" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              v-model="contactForm.email"
              type="email" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Company</label>
            <input 
              v-model="contactForm.company"
              type="text" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea 
              v-model="contactForm.message"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            ></textarea>
          </div>
          
          <div class="flex gap-4">
            <button 
              type="button"
              @click="closeContactModal"
              class="btn btn-secondary flex-1"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="btn btn-primary flex-1"
              :disabled="submitting"
            >
              {{ submitting ? 'Sending...' : 'Send Message' }}
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useHead } from '@vueuse/head'
import { Shield, Users, Settings, Check, Phone, UserCheck, Clock } from 'lucide-vue-next'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

useHead({
  title: 'Enterprise Solutions - Scalable AI Automation',
  meta: [
    { name: 'description', content: 'Enterprise-grade AI automation with advanced security, compliance, and dedicated support. Scale automation across your organization.' }
  ]
})

const showContactModal = ref(false)
const submitting = ref(false)

const contactForm = reactive({
  name: '',
  email: '',
  company: '',
  message: ''
})

const openContactModal = () => {
  showContactModal.value = true
}

const closeContactModal = () => {
  showContactModal.value = false
  // Reset form
  Object.keys(contactForm).forEach(key => {
    contactForm[key] = ''
  })
}

const submitContact = async () => {
  submitting.value = true
  
  try {
    // Here you would typically send the form data to your backend
    console.log('Contact form submitted:', contactForm)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show success message or redirect
    alert('Thank you for your interest! Our sales team will contact you within 24 hours.')
    closeContactModal()
  } catch (error) {
    console.error('Error submitting contact form:', error)
    alert('There was an error sending your message. Please try again.')
  } finally {
    submitting.value = false
  }
}

const scheduleDemo = () => {
  // This could open a calendar booking widget or redirect to a scheduling page
  window.open('https://calendly.com/computer-ai-automation/demo', '_blank')
}
</script>