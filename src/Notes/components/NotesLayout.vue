<script setup lang="ts">
import NotesSideToolbar from './NotesSideToolbar.vue'
import NotesToolbar from './NotesToolbar.vue'
import { ref } from 'vue'
import { useNotebook } from '../useNotebook'

const { notebook } = useNotebook()
const panelOpen = ref<boolean>(false)
</script>

<template>
  <NotesToolbar
    :title="notebook?.name || ''"
    @menu:click="panelOpen = true"
  ></NotesToolbar>
  <slot name="default"></slot>
  <NotesSideToolbar v-model="panelOpen"></NotesSideToolbar>
</template>
