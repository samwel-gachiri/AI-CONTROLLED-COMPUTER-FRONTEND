<template>
  <div class="card p-8 group hover:scale-105 transform transition-all duration-300">
    <div class="flex items-center justify-center w-12 h-12 rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300"
         :class="iconBgClass">
      <component :is="feature.icon" class="w-6 h-6" :class="feature.color" />
    </div>
    
    <h3 class="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
      {{ feature.title }}
    </h3>
    
    <p class="text-gray-600 leading-relaxed">
      {{ feature.description }}
    </p>
    
    <!-- Optional CTA -->
    <div v-if="feature.cta" class="mt-6">
      <a 
        :href="feature.cta.href" 
        class="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
      >
        {{ feature.cta.text }}
        <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  feature: {
    type: Object,
    required: true,
    validator: (feature) => {
      return feature.title && feature.description && feature.icon
    }
  }
})

const iconBgClass = computed(() => {
  const colorMap = {
    'text-blue-600': 'bg-blue-100',
    'text-green-600': 'bg-green-100',
    'text-yellow-600': 'bg-yellow-100',
    'text-purple-600': 'bg-purple-100',
    'text-red-600': 'bg-red-100',
    'text-indigo-600': 'bg-indigo-100',
    'text-pink-600': 'bg-pink-100',
    'text-gray-600': 'bg-gray-100'
  }
  
  return colorMap[props.feature.color] || 'bg-primary-100'
})
</script>