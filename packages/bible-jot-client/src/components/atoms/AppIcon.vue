<script setup lang="ts">
import { ref, watch } from 'vue'

type IconProps = {
  name: string
  color?: string
  width?: string | number
  height?: string | number
}

const props = withDefaults(defineProps<IconProps>(), {
  color: 'black',
  width: 24,
  height: 24,
})

const svgCache = new Map<string, string>() // Cache to store fetched SVGs
const svgContent = ref<string | null>(null)

const fetchSvg = async () => {
  if (!props.name) return

  if (svgCache.has(props.name)) {
    svgContent.value = svgCache.get(props.name)! // Load from cache
    return
  }

  try {
    const response = await fetch(`/icons/${props.name}.svg`, {
      cache: 'force-cache', // Use server-side caching
    })
    if (!response.ok) throw new Error('Failed to load icon')
    const svgText = await response.text()
    svgCache.set(props.name, svgText) // Store in cache
    svgContent.value = svgText
  } catch (error) {
    console.error('Error fetching SVG:', error)
  }
}

watch(() => props.name, fetchSvg, { immediate: true })
</script>

<template>
  <div
    v-if="svgContent"
    v-html="svgContent"
    class="app-icon"
    :style="{ width: `${props.width}px`, height: `${props.height}px` }"
  ></div>
</template>

<style scoped>
.app-icon svg {
  width: 100%;
  height: 100%;
}
</style>
