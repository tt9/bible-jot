<script setup lang="ts">
import { computed } from 'vue'
import OrderableList from '../../components/molecules/OrderableList.vue'
import type { Notebook, VerseNote } from '../Notebook'
import NotesItem from './NotesItem.vue'

interface DraggableNotesListProps {
  notebook: Notebook
  activePageIndex: number
}

const props = defineProps<DraggableNotesListProps>()
const notebookPage = computed(() => {
  return props.notebook.pages[props.activePageIndex]
})

const sortNotesByOrder = () => {
  notebookPage.value.verseNotes.sort((a, b) => a.order - b.order)
}
const normalizeOrder = () => {
  notebookPage.value.verseNotes.forEach((note, index) => {
    note.order = index
  })
}

const swapNote = (fromIndex: number, toIndex: number) => {
  const temp = notebookPage.value.verseNotes[fromIndex]
  notebookPage.value.verseNotes[fromIndex] =
    notebookPage.value.verseNotes[toIndex]
  notebookPage.value.verseNotes[toIndex] = temp
}
const handleOrderItemUp = (item: VerseNote, _: VerseNote[]) => {
  sortNotesByOrder()
  const index = notebookPage.value.verseNotes.findIndex((i) => i.id === item.id)
  if (index === 0) {
    return
  }
  swapNote(index, index - 1)
  normalizeOrder()
}

const handleOrderItemDown = (item: VerseNote, _: VerseNote[]) => {
  sortNotesByOrder()
  const index = notebookPage.value.verseNotes.findIndex((i) => i.id === item.id)
  if (index >= notebookPage.value.verseNotes.length - 1) {
    return
  }
  swapNote(index, index + 1)
  normalizeOrder()
}
</script>
<template>
  <OrderableList
    :items="notebookPage.verseNotes"
    :compare="(a, b) => a.order - b.order"
    @order:up="handleOrderItemUp"
    @order:down="handleOrderItemDown"
  >
    <template #item="{ item }">
      <NotesItem
        :notebook="props.notebook"
        :notebookPage="notebookPage"
        :note="item"
      ></NotesItem>
    </template>
  </OrderableList>
  <div class="notes-list--spacer"></div>
</template>

<style lang="scss" scoped>
.notes-list--spacer {
  height: 350px;
}
</style>
