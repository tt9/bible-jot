<script lang="ts" setup>
// import AppInput from '../../../components/atoms/AppInput.vue'
// import AppIcon from '../../../components/atoms/AppIcon.vue'
import BibleBookSelectionGrid from './BibleBookSelectionGrid.vue'
import { ref, watch } from 'vue'
import ChapterSelectionGrid from './ChapterSelectionGrid.vue'
import type { BibleBookDefinition } from '../../../bible/Bible'
import ChapterVerseSelectionList from './ChapterVerseSelectionList.vue'
import IconButton from '../../../components/atoms/IconButton.vue'
enum SearchState {
  INITIAL,
  SELECT_CHAPTER,
  SELECT_VERSE,
  SEARCH_RESULTS,
}

interface VerseSelectProps {
  resetState: boolean
  version: string
}

interface VerseSelectEmits {
  (e: 'select:verses', verses: string[]): void
  (e: 'click:back'): void
}

const props = defineProps<VerseSelectProps>()
const emit = defineEmits<VerseSelectEmits>()

const currentSearchState = ref<SearchState>(SearchState.INITIAL)
const selectedBook = ref<BibleBookDefinition | null>(null)
const selectedChapter = ref<number | null>(null)

const resetVerseSelectionComponent = () => {
  currentSearchState.value = SearchState.INITIAL
}

const goToChapterSelection = () => {
  currentSearchState.value = SearchState.SELECT_CHAPTER
  selectedChapter.value = null
}

// TODO: this is an awful way to handle the state reset
// of the verse selection. Need to consider using
// router or something to handle this.
watch(
  () => props.resetState,
  (newValue, oldValue) => {
    if (newValue && !oldValue) resetVerseSelectionComponent()
  },
)

const handleSelectBook = (book: BibleBookDefinition) => {
  selectedBook.value = book
  currentSearchState.value = SearchState.SELECT_CHAPTER
}

const handleSelectChapter = (chapter: number) => {
  selectedChapter.value = chapter
  currentSearchState.value = SearchState.SELECT_VERSE
}

const handleVersesSelected = (verses: string[]) => {
  emit('select:verses', verses)
}
</script>

<template>
  <template v-if="currentSearchState == SearchState.INITIAL">
    <div class="select-verse--header">
      <IconButton name="arrow-left" @click="emit('click:back')"></IconButton>
      <h6 class="select-verse--title">Add Verses</h6>
    </div>
    <div>
      <!-- TODO: add search -->
      <!-- <div class="select-verse--search">
        <p class="select-verse--search-title">
          Search <AppIcon name="info"></AppIcon>
        </p>
        <AppInput id="select-verse--search-input"></AppInput>
      </div> -->
      <BibleBookSelectionGrid
        @select:book="handleSelectBook"
      ></BibleBookSelectionGrid>
    </div>
  </template>
  <template
    v-else-if="currentSearchState == SearchState.SELECT_CHAPTER && selectedBook"
  >
    <ChapterSelectionGrid
      :book="selectedBook"
      @click:back="resetVerseSelectionComponent"
      @select:chapter="handleSelectChapter"
    ></ChapterSelectionGrid>
  </template>
  <template
    v-else-if="
      currentSearchState == SearchState.SELECT_VERSE && selectedChapter
    "
  >
    <ChapterVerseSelectionList
      :version="props.version"
      :bookKey="selectedBook?.bookKey || ''"
      :chapter="selectedChapter"
      @click:back="goToChapterSelection"
      @select:verses="handleVersesSelected"
    ></ChapterVerseSelectionList>
  </template>
</template>

<style lang="scss" scoped>
.select-verse--title,
.select-verse--search-title {
  margin: 0.5rem 0;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
}

.select-book--title {
  margin-block-start: 0.5rem;
  margin-block-end: 0.5rem;
  font-weight: bold;
}
.select-verse--search {
  margin-block-end: 1rem;
}

.select-verse--header {
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  align-items: center;
}
</style>
