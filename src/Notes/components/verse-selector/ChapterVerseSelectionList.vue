<script lang="ts" setup>
import { ref, watch } from 'vue'
import VerseText from '../VerseText.vue'
import { verseToAddress, type BibleVerse } from '../../../bible/Bible'
import BibleService from '../../../bible/BibleService'
import IconButton from '../../../components/atoms/IconButton.vue'
import NoTextSelection from '../../../components/atoms/NoTextSelection.vue'
import AppButton from '../../../components/atoms/AppButton.vue'

interface ChapterVerseSelectionListProps {
  version: string
  bookKey: string
  chapter: number
}

interface ChapterVerseSelectionListEmits {
  (e: 'click:back'): void
  (e: 'select:verses', verseAddresses: string[]): void
}

const props = defineProps<ChapterVerseSelectionListProps>()
const emit = defineEmits<ChapterVerseSelectionListEmits>()
const loadingVerses = ref<boolean>(false)
const verses = ref<BibleVerse[]>([])
const selectedVerses = ref<Set<number>>(new Set())

const isVerseSelected = (verseNumber: number) => {
  return selectedVerses.value.has(verseNumber)
}

const toggleVerseSelection = (verseNumber: number) => {
  if (isVerseSelected(verseNumber)) {
    selectedVerses.value.delete(verseNumber)
  } else {
    selectedVerses.value.add(verseNumber)
  }
}

const handleAddVerses = () => {
  const results = Array.from(selectedVerses.value).map((verseNumber) => {
    return verseToAddress({
      bookKey: props.bookKey,
      chapter: props.chapter,
      verseNumber,
    })
  })
  emit('select:verses', results)
}

const handleToggleSelectAll = () => {
  if (selectedVerses.value.size == verses.value.length) {
    selectedVerses.value.clear()
  } else {
    selectedVerses.value = new Set(
      verses.value.map((verse) => verse.verseNumber),
    )
  }
}

watch(
  [() => props.bookKey, () => props.chapter],
  async () => {
    loadingVerses.value = true
    verses.value = await BibleService.getVersesInChapter(
      props.version,
      props.bookKey,
      props.chapter,
    )
    loadingVerses.value = false
  },
  {
    immediate: true,
  },
)
</script>
<template>
  <div class="chapter-verse-display">
    <div class="chapter-verse-display--header">
      <IconButton name="arrow-left" @click="emit('click:back')"></IconButton>
      <p class="chapter-verse-display--title">Select Verses</p>
      <div class="flex-spacer"></div>
      <IconButton
        name="check-square"
        variant="transparent"
        @click="handleToggleSelectAll"
      ></IconButton>
    </div>
    <div class="chapter-verse-display--verse-selection-list">
      <div v-if="loadingVerses">
        <span>Loading verses...</span>
      </div>
      <NoTextSelection v-else>
        <div
          class="chapter-verse-display--verse-selection-list-item"
          v-for="verse in verses"
        >
          <VerseText
            :verse="verse"
            :selected="isVerseSelected(verse.verseNumber)"
            @click="toggleVerseSelection(verse.verseNumber)"
          ></VerseText>
        </div>
      </NoTextSelection>
    </div>
    <div class="chapter-verse-display--fab" v-if="selectedVerses.size">
      <AppButton
        variant="outline"
        color="secondary"
        @click="selectedVerses.clear()"
        >Clear</AppButton
      >
      <AppButton @click="handleAddVerses">Add</AppButton>
    </div>
  </div>
</template>
<style lang="scss">
.chapter-verse-display {
  position: relative;
  &--header {
    display: flex;
    justify-content: flex-start;
    gap: 0.5rem;
    align-items: center;
    margin-block-end: 0.5rem;
  }
  &--title {
    font-weight: bold;
    margin: 0;
    font-size: var(--font-size-3);
  }
  &--verse-selection-list {
    max-height: 65vh;
    overflow-y: auto;
  }
  &--verse-selection-list-item {
    border-bottom: 1px solid var(--color-gray);
  }
  &--fab {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    bottom: 1rem;
    right: 1rem;
  }
}
</style>
