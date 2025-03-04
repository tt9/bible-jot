<script setup lang="ts">
import OrderableList from '../../components/molecules/OrderableList.vue'
import type { VerseNote } from '../Notebook'
import NotesItem from './NotesItem.vue'
import { useNotebook } from '../useNotebook'

const { activePage } = useNotebook()

const sortNotesByOrder = () => {
  activePage.value.verseNotes.sort((a, b) => a.order - b.order)
}
const normalizeOrder = () => {
  activePage.value.verseNotes.forEach((note, index) => {
    note.order = index
  })
}

const swapNote = (fromIndex: number, toIndex: number) => {
  const temp = activePage.value.verseNotes[fromIndex]
  activePage.value.verseNotes[fromIndex] = activePage.value.verseNotes[toIndex]
  activePage.value.verseNotes[toIndex] = temp
}
const handleOrderItemUp = (item: VerseNote, _: VerseNote[]) => {
  sortNotesByOrder()
  const index = activePage.value.verseNotes.findIndex((i) => i.id === item.id)
  if (index === 0) {
    return
  }
  swapNote(index, index - 1)
  normalizeOrder()
}

const handleOrderItemDown = (item: VerseNote, _: VerseNote[]) => {
  sortNotesByOrder()
  const index = activePage.value.verseNotes.findIndex((i) => i.id === item.id)
  if (index >= activePage.value.verseNotes.length - 1) {
    return
  }
  swapNote(index, index + 1)
  normalizeOrder()
}
</script>
<template>
  <OrderableList
    :items="activePage.verseNotes"
    :compare="(a, b) => a.order - b.order"
    @order:up="handleOrderItemUp"
    @order:down="handleOrderItemDown"
  >
    <template #item="{ item }">
      <NotesItem :note="item"></NotesItem>
    </template>
  </OrderableList>
  <div class="notes-list--spacer"></div>
</template>

<style lang="scss" scoped>
.notes-list--spacer {
  height: 350px;
}
</style>
