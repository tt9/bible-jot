<script lang="ts" setup>
import AsyncVerseText from './AsyncVerseText.vue'
import NotesText from './NotesText.vue'
import type { VerseNote } from '../Notebook'
import NoTextSelection from '../../components/atoms/NoTextSelection.vue'
import NoteEditor from './edit/NoteEditor.vue'
import { ref } from 'vue'
import { useNotebook } from '../useNotebook'

const defaultVersion = 'kjv'
interface NoteBookNodeProps {
  note: VerseNote
}
const props = withDefaults(defineProps<NoteBookNodeProps>(), {})
const { activePage, activeNotebook } = useNotebook()
const editorOpen = ref<boolean>(false)

const toggleEditorOpen = () => {
  editorOpen.value = !editorOpen.value
}

const handleDeleteVerseNote = () => {
  const id = props.note.id
  const index = activePage.value.verseNotes.findIndex((i) => i.id === id)
  activePage.value.verseNotes.splice(index, 1)
}
</script>

<template>
  <div
    class="notes-item"
    :class="{ 'editor-open': editorOpen }"
    :style="{ backgroundColor: props.note.color || '#FFFFFF' }"
  >
    <NoTextSelection @click="toggleEditorOpen()">
      <AsyncVerseText
        :showVersion="activeNotebook.meta?.displayBibleVersion"
        :version="
          props.note.version || activeNotebook.version || defaultVersion
        "
        :verseAddress="props.note.verseAddress"
      >
      </AsyncVerseText>
    </NoTextSelection>
    <NotesText
      v-if="note?.notes && !editorOpen"
      @click="toggleEditorOpen()"
      :content="props.note.notes || ''"
    >
    </NotesText>
    <NoteEditor
      v-if="editorOpen"
      v-model="props.note.notes"
      :note="props.note"
      @delete="handleDeleteVerseNote"
    ></NoteEditor>
  </div>
</template>

<style lang="scss" scoped>
.notes-item {
  position: relative;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  padding: 0.5rem;
  height: 100%;
  cursor: pointer;

  &.editor-open {
    border-bottom: none;
    &::after {
      pointer-events: none;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 4px solid var(--color-primary);
    }
  }
}
</style>
