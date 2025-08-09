<template>
  <div class="min-h-screen">
    <Header />
    
    <div v-if="loading" class="pt-24 pb-20">
      <div class="container text-center">
        <div class="animate-spin w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-gray-600">Loading article...</p>
      </div>
    </div>
    
    <div v-else-if="error" class="pt-24 pb-20">
      <div class="container text-center">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
        <p class="text-gray-600 mb-8">The article you're looking for doesn't exist or has been moved.</p>
        <router-link to="/blog" class="btn btn-primary">
          Back to Blog
        </router-link>
      </div>
    </div>
    
    <article v-else class="pt-24 pb-20">
      <div class="container max-w-4xl mx-auto">
        <!-- Article Header -->
        <header class="mb-12">
          <div class="flex items-center mb-6">
            <span class="bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full">
              {{ post.category }}
            </span>
            <span class="text-gray-500 text-sm ml-4">{{ post.date }}</span>
            <span class="text-gray-500 text-sm ml-4">{{ post.readTime }}</span>
          </div>
          
          <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {{ post.title }}
          </h1>
          
          <p class="text-xl text-gray-600 leading-relaxed">
            {{ post.excerpt }}
          </p>
        </header>
        
        <!-- Article Content -->
        <div class="prose prose-lg max-w-none">
          <div v-html="post.content"></div>
        </div>
        
        <!-- Article Footer -->
        <footer class="mt-16 pt-8 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-500">Share this article:</span>
              <button 
                @click="shareOnTwitter"
                class="text-gray-400 hover:text-blue-500 transition-colors duration-200"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button 
                @click="shareOnLinkedIn"
                class="text-gray-400 hover:text-blue-700 transition-colors duration-200"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
            </div>
            
            <router-link to="/blog" class="text-primary-600 hover:text-primary-700 font-medium">
              ← Back to Blog
            </router-link>
          </div>
        </footer>
      </div>
    </article>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

const route = useRoute()
const loading = ref(true)
const error = ref(false)
const post = ref({})

// Mock blog post data - in a real app, this would come from an API
const mockPosts = {
  'future-of-ai-desktop-automation': {
    title: 'The Future of AI-Powered Desktop Automation',
    excerpt: 'Explore how artificial intelligence is revolutionizing the way we interact with computers, from simple task automation to complex workflow orchestration.',
    category: 'Technology',
    date: 'March 15, 2024',
    readTime: '8 min read',
    content: `
      <p>Artificial Intelligence has fundamentally transformed how we approach desktop automation. What once required complex scripting and rigid rule-based systems can now be accomplished through natural language instructions and intelligent decision-making.</p>
      
      <h2>The Evolution of Automation</h2>
      <p>Traditional automation tools required users to define exact pixel coordinates, specific window titles, and rigid sequences of actions. This approach was fragile and broke easily when interfaces changed or when working across different systems.</p>
      
      <p>Modern AI-powered automation takes a different approach:</p>
      <ul>
        <li><strong>Computer Vision:</strong> AI can "see" and understand screen content, identifying buttons, forms, and interactive elements regardless of their exact position.</li>
        <li><strong>Natural Language Processing:</strong> Users can describe what they want to accomplish in plain English, rather than programming specific steps.</li>
        <li><strong>Adaptive Learning:</strong> The system learns from user behavior and adapts to changes in applications and workflows.</li>
      </ul>
      
      <h2>Real-World Applications</h2>
      <p>AI automation is already transforming industries:</p>
      
      <h3>Healthcare</h3>
      <p>Medical professionals use AI automation to streamline patient data entry, appointment scheduling, and insurance processing, allowing them to focus more time on patient care.</p>
      
      <h3>Finance</h3>
      <p>Financial institutions leverage AI automation for compliance reporting, transaction processing, and customer onboarding, reducing errors and processing times significantly.</p>
      
      <h3>Education</h3>
      <p>Educational institutions automate student enrollment, grade processing, and administrative tasks, freeing up educators to focus on teaching and student engagement.</p>
      
      <h2>The Road Ahead</h2>
      <p>As AI technology continues to advance, we can expect even more sophisticated automation capabilities:</p>
      
      <ul>
        <li><strong>Predictive Automation:</strong> Systems that anticipate user needs and proactively complete tasks.</li>
        <li><strong>Cross-Platform Intelligence:</strong> Seamless automation across different operating systems and applications.</li>
        <li><strong>Collaborative AI:</strong> Multiple AI agents working together to complete complex, multi-step workflows.</li>
      </ul>
      
      <p>The future of desktop automation is not just about replacing manual tasks—it's about augmenting human capabilities and enabling us to focus on creative, strategic work that truly matters.</p>
      
      <blockquote>
        <p>"The goal of AI automation isn't to replace humans, but to free them from repetitive tasks so they can focus on what they do best: think, create, and innovate."</p>
      </blockquote>
      
      <p>As we continue to push the boundaries of what's possible with AI-powered automation, one thing is clear: the future of work will be more efficient, more intelligent, and more human than ever before.</p>
    `
  }
}

useHead(() => ({
  title: post.value.title ? `${post.value.title} - Blog` : 'Blog Post',
  meta: [
    { name: 'description', content: post.value.excerpt || 'Read our latest insights on AI automation.' }
  ]
}))

const loadPost = async () => {
  loading.value = true
  error.value = false
  
  try {
    const slug = route.params.slug
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const mockPost = mockPosts[slug]
    if (mockPost) {
      post.value = mockPost
    } else {
      error.value = true
    }
  } catch (err) {
    console.error('Error loading post:', err)
    error.value = true
  } finally {
    loading.value = false
  }
}

const shareOnTwitter = () => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(post.value.title)
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
}

const shareOnLinkedIn = () => {
  const url = encodeURIComponent(window.location.href)
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
}

onMounted(() => {
  loadPost()
})
</script>

<style scoped>
.prose {
  @apply text-gray-700 leading-relaxed;
}

.prose h2 {
  @apply text-2xl font-bold text-gray-900 mt-8 mb-4;
}

.prose h3 {
  @apply text-xl font-bold text-gray-900 mt-6 mb-3;
}

.prose p {
  @apply mb-4;
}

.prose ul {
  @apply mb-4 pl-6;
}

.prose li {
  @apply mb-2 list-disc;
}

.prose blockquote {
  @apply border-l-4 border-primary-500 pl-6 py-2 my-6 bg-gray-50 italic;
}

.prose blockquote p {
  @apply mb-0 text-gray-600;
}

.prose strong {
  @apply font-semibold text-gray-900;
}
</style>