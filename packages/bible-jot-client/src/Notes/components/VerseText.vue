<script lang="ts" setup>
import type { BibleVerse } from '../../bible/Bible'

interface VerseTextProps {
  version?: string
  verse: BibleVerse
  selected?: boolean
}
const props = withDefaults(defineProps<VerseTextProps>(), { selected: false })
</script>

<template>
  <p class="bible-text" :class="{ 'bible-text--selected': props.selected }">
    <small
      >{{ props.verse.bookName }} {{ props.verse.chapter }}:{{
        props.verse.verseNumber
      }}</small
    >
    <small v-if="props.version"
      >&nbsp;({{ props.version.toUpperCase() }})</small
    >
    {{ props.verse.text }}
  </p>
</template>

<style lang="scss" scoped>
.bible-text {
  margin: 0.25rem 0;
  font-size: var(--font-size-3);
}

.bible-text.bible-text--selected {
  background-color: var(--color-primary-light);
  color: var(--color-primary-light-contrast);
  border: 2px solid var(--color-primary);
}
</style>
