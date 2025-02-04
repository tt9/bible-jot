<script lang="ts" setup>
import { type BibleBookDefinition } from '../../../bible/Bible'
import IconButton from '../../../components/atoms/IconButton.vue'
interface ChapterSelectionGridProps {
  book: BibleBookDefinition
}
interface ChapterSelectionGridEmits {
  (e: 'click:back'): void
  (e: 'select:chapter', chapter: number): void
}
const props = defineProps<ChapterSelectionGridProps>()
const emit = defineEmits<ChapterSelectionGridEmits>()
</script>
<template>
  <div class="chapter-display">
    <div class="select-chapter">
      <IconButton name="arrow-left" @click="emit('click:back')"></IconButton>
      <p class="select-chapter--title">
        {{ props.book.bookName }}
      </p>
    </div>
    <div class="chapter-display--grid">
      <div
        class="chapter-display--grid-item"
        v-for="n in props.book.chapterCount"
      >
        <button @click="emit('select:chapter', n)">
          {{ n }}
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.select-chapter {
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  align-items: center;
  margin-block-end: 1rem;

  &--title {
    font-weight: bold;
    margin: 0;
    font-size: var(--font-size-2);
  }
}
.chapter-display--grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  max-height: 50vh;
  overflow-y: auto;
}
.chapter-display--grid-item button {
  width: 100%;
  display: block;
  box-sizing: border-box;
  padding: 0.5rem;
}
@media all and (min-width: 768px) {
  .chapter-display--grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
