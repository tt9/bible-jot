<script setup lang="ts">
import { ref, watch } from 'vue'
import { useIconCache } from './useIconCache'

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

const iconCache = useIconCache()
const svgContent = ref<string | null>(null)

const fetchSvg = async () => {
  if (!props.name) return

  if (iconCache.hasIconData(props.name)) {
    svgContent.value = iconCache.getCachedIconData(props.name)! // Load from cache
    return
  }

  try {
    const response = await fetch(`/icons/${props.name}.svg`, {
      cache: 'force-cache', // Use server-side caching
    })
    if (!response.ok) throw new Error('Failed to load icon')
    const svgText = await response.text()
    iconCache.setIconData(props.name, svgText) // Store in cache
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
