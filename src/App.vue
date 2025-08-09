<template>
  <div id="app" class="min-h-screen bg-white">
    <router-view />
  </div>
</template>

<script setup>
import { useHead } from '@vueuse/head'

useHead({
  titleTemplate: (title) => title ? `${title} - Computer AI Automation` : 'Computer AI Automation',
  meta: [
    { name: 'theme-color', content: '#0ea5e9' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
  ],
  link: [
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/manifest.json' },
  ]
})
</script>