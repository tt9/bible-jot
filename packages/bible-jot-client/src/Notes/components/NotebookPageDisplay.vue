<script lang="ts" setup>
import IconButton from '../../components/atoms/IconButton.vue'
import NotesList from './NotesList.vue'
import PageNotesSidebar from './PageNotesSidebar.vue'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'vue-router'
import { useNotebook } from '../useNotebook'
import { ref } from 'vue'

const router = useRouter()
const { selectVersesWithPicker, activeNotebook, activePage } = useNotebook()
const sidebarOpen = ref<boolean>(false)

const exitToNotesList = () => {
  router.replace({ path: '/notes' })
}

const handleSelectVersesClicked = async () => {
  const verseAddresses = await selectVersesWithPicker()

  const verseNotes = verseAddresses.map((verseAddress, index) => {
    return {
      id: uuidv4(),
      order: activePage.value.verseNotes.length + index,
      verseAddress: verseAddress,
      notebookId: activeNotebook.value.id,
    }
  })

  activePage.value.verseNotes.push(...verseNotes)
}
</script>

<template>
  <div class="notebook-page">
    <div class="notebook-page--actions">
      <IconButton
        @click="handleSelectVersesClicked"
        color="secondary"
        size="sm"
        name="book-open"
      >
        <small>Add Verses</small>
      </IconButton>
      <IconButton
        color="secondary"
        size="sm"
        name="edit"
        @click="sidebarOpen = true"
      >
        <small>Page Notes</small>
      </IconButton>
      <div aria-hidden="true" class="flex-spacer"></div>
      <IconButton
        size="sm"
        name="x-circle"
        variant="transparent"
        color="secondary"
        @click="exitToNotesList()"
      >
        <small>Exit</small>
      </IconButton>
    </div>
    <p class="centered-text p-1" v-if="!activePage.verseNotes?.length">
      <em> Click on the "Add Verses" button to start taking notes. </em>
    </p>

    <NotesList></NotesList>
    <PageNotesSidebar v-model="sidebarOpen"></PageNotesSidebar>
  </div>
</template>

<style lang="scss" scoped>
.notebook-page {
  position: relative;
  &--actions {
    display: flex;
    gap: 0.5rem;
    min-height: 48px;
    align-items: center;
    justify-content: flex-start;
    padding: 0.5rem;
  }
}
</style>
