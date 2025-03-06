<script setup lang="ts">
import PopoverMenu from '../../../components/molecules/PopoverMenu.vue'
import PopoverMenuItem from '../../../components/molecules/PopoverMenuItem.vue'
import type { VerseNote } from '../../Notebook'
import { useNotebook } from '../../useNotebook'
import { v4 as uuidv4 } from 'uuid'

interface NoteEditorProps {
  note: VerseNote
}
interface NoteEditorEmits {
  (e: 'delete', id: string): void
}

const { activePage, activeNotebook, orderPageNotesByIndex } = useNotebook()
const props = defineProps<NoteEditorProps>()
const emit = defineEmits<NoteEditorEmits>()
const { selectVersesWithPicker } = useNotebook()
const editorValue = defineModel<string | null>()

const selectableColors = [
  '#F8B8B8', // red
  '#B8F8DA', // green
  '#B8DFF8', // blue
  '#D6B8F8', // purple
  '#F8F7B8', // yellow
  '#FFCAA7', // tan
]

const handleNoteColorClicked = (_: any, color: string) => {
  if (props.note.color !== color) {
    props.note.color = color
  } else {
    props.note.color = undefined
  }
}

const handleDeleteItemClicked = (close: Function) => {
  emit('delete', props.note.id)
  close()
}

const addVerseNotesAdjacentToNote = async (before: boolean) => {
  const verses = await selectVersesWithPicker()
  if (verses.length > 0) {
    const index = activePage.value.verseNotes.findIndex((verseNote) => {
      return verseNote.id === props.note.id
    })
    const verseItems = verses.map((verseAddress, index) => ({
      id: uuidv4(),
      order: index,
      verseAddress: verseAddress,
      notebookId: activeNotebook.value.id,
      color: props.note.color,
    }))
    activePage.value.verseNotes.splice(
      before ? index : index + 1,
      0,
      ...verseItems,
    )
    orderPageNotesByIndex()
  }
}
const handleAddVersesBeforeClicked = (close: Function) => {
  close()
  addVerseNotesAdjacentToNote(true)
}

const handleAddVersesAfterClicked = async (close: Function) => {
  close()
  addVerseNotesAdjacentToNote(false)
}
</script>
<template>
  <div class="note-editor">
    <div class="note-editor--toolbar">
      <div class="note-editor--toolbar--color-grid">
        <div
          class="note-editor--toolbar--color-grid-item"
          v-for="color in selectableColors"
          :style="{ backgroundColor: color }"
          :class="{ active: color === note.color?.toUpperCase() }"
          @click="handleNoteColorClicked($event, color)"
        ></div>
      </div>
      <PopoverMenu v-slot="{ closePopover }">
        <PopoverMenuItem
          @click="handleAddVersesBeforeClicked(closePopover)"
          icon-name="book"
        >
          Add Verse Before
        </PopoverMenuItem>
        <PopoverMenuItem
          @click="handleAddVersesAfterClicked(closePopover)"
          icon-name="book"
        >
          Add Verse After
        </PopoverMenuItem>
        <PopoverMenuItem
          @click="handleDeleteItemClicked(closePopover)"
          icon-name="trash"
        >
          Delete
        </PopoverMenuItem>
      </PopoverMenu>
    </div>
    <textarea
      class="note-editor--editor"
      v-model="editorValue"
      rows="15"
    ></textarea>
  </div>
</template>
<style lang="scss" scoped>
.note-editor {
  width: 100%;
  position: relative;
  &--editor {
    box-sizing: border-box;
    padding: 0.5rem;
    width: 100%;
    max-height: 200px;
    height: auto;
    border-radius: 0.25rem;
  }
  &--toolbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.note-editor--toolbar--color-grid {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(8, 1fr);

  &-item {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    border: 1px solid var(--color-gray);
  }
  &-item.active {
    border: 2px solid var(--color-primary);
  }
}
</style>
