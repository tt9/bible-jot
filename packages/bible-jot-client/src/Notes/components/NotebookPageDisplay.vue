<script lang="ts" setup>
import IconButton from '../../components/atoms/IconButton.vue'
import Modal from '../../components/molecules/Modal.vue'
import VerseSelector from './verse-selector/VerseSelector.vue'
import NotesList from './NotesList.vue'
import type { Notebook } from '../Notebook'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'vue-router'

interface NotebookPageDisplayProps {
  notebook: Notebook
  activePageIndex: number
}
const props = defineProps<NotebookPageDisplayProps>()
const verseSelectionModalOpen = ref<boolean>(false)
const router = useRouter()

const handleVersesSelected = (verseAddresses: string[]) => {
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
  closeModalAndPopWindowState()
}

const popWindowState = () => {
  window.history.back()
}
const closeModalAndPopWindowState = () => {
  verseSelectionModalOpen.value = false
  popWindowState()
}

const exitToNotesList = () => {
  router.replace({ path: '/notes' })
}
</script>

<template>
  <div class="notebook-page" v-if="notebook">
    <div class="notebook-page--actions">
      <IconButton
        @click="verseSelectionModalOpen = true"
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

    <Modal v-model="verseSelectionModalOpen" width="600px">
      <div class="modal-content-wrap">
        <VerseSelector
          :reset-state="verseSelectionModalOpen"
          :version="props.notebook.version || ''"
          @select:verses="handleVersesSelected"
          @click:back="closeModalAndPopWindowState()"
        ></VerseSelector>
      </div>
    </Modal>
  </div>
</template>

<style lang="scss" scoped>
.notebook-page {
  position: relative;
  .notebook-page--actions {
    display: flex;
    gap: 0.5rem;
    min-height: 48px;
    align-items: center;
    justify-content: flex-start;
    padding: 0.5rem;
  }
}
</style>
