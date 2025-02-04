<script lang="ts" setup>
import {
  BibleBookDefinitions,
  type BibleBookDefinition,
} from '../../../bible/Bible'
interface BibleBookSelectionGridEmits {
  (e: 'select:book', book: BibleBookDefinition): void
}
const emit = defineEmits<BibleBookSelectionGridEmits>()
</script>
<template>
  <div class="book-display">
    <p class="book-display--title">Books</p>
    <div class="book-display--grid">
      <div class="book-display--grid-item" v-for="book in BibleBookDefinitions">
        <button @click="emit('select:book', book)">
          {{ book.bookName }}
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.book-display--title {
  font-weight: bold;
}
.book-display--grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  max-height: 45vh;
  overflow-y: auto;
}
.book-display--grid-item button {
  width: 100%;
  display: block;
  box-sizing: border-box;
  padding: 0.5rem;

  @media all and (min-width: 768px) {
    .book-display--grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
