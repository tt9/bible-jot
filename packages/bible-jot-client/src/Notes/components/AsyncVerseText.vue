<script lang="ts" setup>
// Async wrapper for retrieving verses
import { ref, watch } from 'vue'
import BibleService from '../../bible/BibleService'
import type { BibleVerse } from '../../bible/Bible'
import VerseText from './VerseText.vue'

interface AsyncVerseTextProps {
  version: string
  verseAddress: string
  showVersion?: boolean
}
const props = defineProps<AsyncVerseTextProps>()
const verseResult = ref<BibleVerse | null>()

const loading = ref<boolean>(true)

watch(
  () => props.verseAddress,
  async () => {
    loading.value = true
    const results = await BibleService.getVerses(
      props.version,
      props.verseAddress,
    )
    verseResult.value = results && results.length ? results[0] : null
    loading.value = false
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <p v-if="loading">Loading Verse...</p>
  <VerseText
    v-else-if="verseResult"
    :verse="verseResult"
    :version="props.showVersion ? props.version : undefined"
  ></VerseText>
</template>
