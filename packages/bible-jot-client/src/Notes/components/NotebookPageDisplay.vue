<script lang="ts" setup>
import IconButton from '../../components/atoms/IconButton.vue'
import NotesList from './NotesList.vue'
import type { Notebook } from '../Notebook'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'vue-router'
import { useNotebook } from '../useNotebook'

interface NotebookPageDisplayProps {
  notebook: Notebook
  activePageIndex: number
}
const props = defineProps<NotebookPageDisplayProps>()
const router = useRouter()

const { selectVersesWithPicker } = useNotebook()

const exitToNotesList = () => {
  router.replace({ path: '/notes' })
}

const handleSelectVersesClicked = async () => {
  const verseAddresses = await selectVersesWithPicker()

  const activePage = props.notebook.pages[props.activePageIndex]
  const verseNotes = verseAddresses.map((verseAddress, index) => {
    return {
      id: uuidv4(),
      order: activePage.verseNotes.length + index,
      verseAddress: verseAddress,
      notebookId: props.notebook.id,
    }
  })

  activePage.verseNotes.push(...verseNotes)
}
</script>

<template>
  <div class="notebook-page" v-if="notebook">
    <div class="notebook-page--actions">
      <IconButton
        @click="handleSelectVersesClicked"
        color="secondary"
        size="sm"
        name="book-open"
      >
        <small>Add Verses</small>
      </IconButton>
      <IconButton color="secondary" size="sm" name="edit">
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

    <p
      class="centered-text p-1"
      v-if="!props.notebook.pages[props.activePageIndex]?.verseNotes?.length"
    >
      <em> Click on the "Add Verses" button to start taking notes. </em>
    </p>

    <NotesList
      :notebook="props.notebook"
      :activePageIndex="props.activePageIndex"
    ></NotesList>
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
