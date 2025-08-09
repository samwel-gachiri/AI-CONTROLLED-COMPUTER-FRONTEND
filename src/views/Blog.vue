<template>
  <div class="min-h-screen">
    <Header />
    
    <!-- Hero Section -->
    <section class="pt-24 pb-16 sm:pt-32 sm:pb-20">
      <div class="container">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            AI Automation
            <span class="gradient-text">Insights</span>
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Stay updated with the latest trends, tips, and insights in AI-powered automation
          </p>
        </div>
      </div>
    </section>
    
    <!-- Featured Post -->
    <section class="pb-16">
      <div class="container">
        <div class="card overflow-hidden max-w-4xl mx-auto">
          <div class="grid lg:grid-cols-2 gap-0">
            <div class="relative h-64 lg:h-auto">
              <div class="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <div class="text-white text-center">
                  <div class="text-6xl mb-4">🤖</div>
                  <div class="text-lg font-medium">Featured Article</div>
                </div>
              </div>
            </div>
            <div class="p-8 lg:p-12">
              <div class="flex items-center mb-4">
                <span class="bg-primary-100 text-primary-800 text-xs font-medium px-3 py-1 rounded-full">
                  Featured
                </span>
                <span class="text-gray-500 text-sm ml-4">March 15, 2024</span>
              </div>
              <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                The Future of AI-Powered Desktop Automation
              </h2>
              <p class="text-gray-600 mb-6">
                Explore how artificial intelligence is revolutionizing the way we interact with computers, 
                from simple task automation to complex workflow orchestration.
              </p>
              <router-link 
                to="/blog/future-of-ai-desktop-automation"
                class="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                Read Full Article
                <ArrowRight class="w-4 h-4 ml-2" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Blog Posts Grid -->
    <section class="section bg-gray-50">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Latest Articles
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover insights, tutorials, and best practices for AI automation
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article 
            v-for="post in blogPosts" 
            :key="post.id"
            class="card overflow-hidden group hover:scale-105 transform transition-all duration-300"
          >
            <div class="relative h-48 bg-gradient-to-br overflow-hidden" :class="post.gradient">
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-white text-4xl">{{ post.emoji }}</div>
              </div>
              <div class="absolute top-4 left-4">
                <span class="bg-white/20 text-white text-xs font-medium px-2 py-1 rounded-full">
                  {{ post.category }}
                </span>
              </div>
            </div>
            
            <div class="p-6">
              <div class="flex items-center text-sm text-gray-500 mb-3">
                <Calendar class="w-4 h-4 mr-2" />
                {{ post.date }}
                <span class="mx-2">•</span>
                <Clock class="w-4 h-4 mr-1" />
                {{ post.readTime }}
              </div>
              
              <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                {{ post.title }}
              </h3>
              
              <p class="text-gray-600 mb-4 line-clamp-3">
                {{ post.excerpt }}
              </p>
              
              <router-link 
                :to="`/blog/${post.slug}`"
                class="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                Read More
                <ArrowRight class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </router-link>
            </div>
          </article>
        </div>
        
        <!-- Load More Button -->
        <div class="text-center mt-12">
          <button 
            @click="loadMorePosts"
            class="btn btn-secondary"
            :disabled="loading"
          >
            {{ loading ? 'Loading...' : 'Load More Articles' }}
          </button>
        </div>
      </div>
    </section>
    
    <!-- Newsletter Signup -->
    <section class="section bg-primary-600">
      <div class="container text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
          Stay Updated
        </h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Get the latest AI automation insights delivered to your inbox
        </p>
        
        <form @submit.prevent="subscribeNewsletter" class="max-w-md mx-auto">
          <div class="flex gap-4">
            <input 
              v-model="email"
              type="email" 
              placeholder="Enter your email"
              required
              class="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
            >
            <button 
              type="submit"
              class="btn bg-white text-primary-600 hover:bg-gray-50 px-6 py-3"
              :disabled="subscribing"
            >
              {{ subscribing ? 'Subscribing...' : 'Subscribe' }}
            </button>
          </div>
          <p class="text-primary-100 text-sm mt-3">
            No spam, unsubscribe at any time
          </p>
        </form>
      </div>
    </section>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useHead } from '@vueuse/head'
import { ArrowRight, Calendar, Clock } from 'lucide-vue-next'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

useHead({
  title: 'Blog - AI Automation Insights & Tutorials',
  meta: [
    { name: 'description', content: 'Stay updated with the latest trends, tips, and insights in AI-powered automation. Learn best practices and discover new possibilities.' }
  ]
})

const loading = ref(false)
const subscribing = ref(false)
const email = ref('')

const blogPosts = ref([
  {
    id: 1,
    title: '10 Ways AI Can Automate Your Daily Workflow',
    slug: '10-ways-ai-automate-daily-workflow',
    excerpt: 'Discover practical applications of AI automation that can save you hours every day, from email management to data processing.',
    category: 'Tutorial',
    date: 'March 12, 2024',
    readTime: '5 min read',
    emoji: '⚡',
    gradient: 'from-yellow-400 to-orange-500'
  },
  {
    id: 2,
    title: 'Building Your First AI Automation Workflow',
    slug: 'building-first-ai-automation-workflow',
    excerpt: 'A step-by-step guide to creating your first automated workflow using our visual workflow builder.',
    category: 'Getting Started',
    date: 'March 10, 2024',
    readTime: '8 min read',
    emoji: '🔧',
    gradient: 'from-blue-400 to-purple-500'
  },
  {
    id: 3,
    title: 'Enterprise Security in AI Automation',
    slug: 'enterprise-security-ai-automation',
    excerpt: 'Learn about the security measures and compliance standards that make AI automation safe for enterprise use.',
    category: 'Security',
    date: 'March 8, 2024',
    readTime: '6 min read',
    emoji: '🔒',
    gradient: 'from-green-400 to-teal-500'
  },
  {
    id: 4,
    title: 'The ROI of AI-Powered Automation',
    slug: 'roi-ai-powered-automation',
    excerpt: 'Calculate the return on investment of implementing AI automation in your organization with real-world examples.',
    category: 'Business',
    date: 'March 5, 2024',
    readTime: '7 min read',
    emoji: '📈',
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    id: 5,
    title: 'Advanced AI Features: Computer Vision',
    slug: 'advanced-ai-computer-vision',
    excerpt: 'Explore how computer vision technology enables AI to understand and interact with your screen content.',
    category: 'Technology',
    date: 'March 3, 2024',
    readTime: '9 min read',
    emoji: '👁️',
    gradient: 'from-indigo-400 to-blue-500'
  },
  {
    id: 6,
    title: 'Troubleshooting Common Automation Issues',
    slug: 'troubleshooting-automation-issues',
    excerpt: 'Solutions to the most common problems users encounter when setting up automated workflows.',
    category: 'Support',
    date: 'March 1, 2024',
    readTime: '4 min read',
    emoji: '🔍',
    gradient: 'from-red-400 to-orange-500'
  }
])

const loadMorePosts = async () => {
  loading.value = true
  
  try {
    // Simulate API call to load more posts
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In a real app, you would fetch more posts from your API
    console.log('Loading more posts...')
  } catch (error) {
    console.error('Error loading more posts:', error)
  } finally {
    loading.value = false
  }
}

const subscribeNewsletter = async () => {
  subscribing.value = true
  
  try {
    // Simulate API call to subscribe to newsletter
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Newsletter subscription:', email.value)
    alert('Thank you for subscribing! You\'ll receive our latest updates.')
    email.value = ''
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    alert('There was an error subscribing. Please try again.')
  } finally {
    subscribing.value = false
  }
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>