<script setup lang="ts">
import NotesToolPanel from './NotesToolPanel.vue'
import NotesToolbar from './NotesToolbar.vue'
import type { Notebook } from '../Notebook'
import { ref } from 'vue'

interface NotesLayoutProps {
  notebook: Notebook
}

const props = defineProps<NotesLayoutProps>()
const panelOpen = ref<boolean>(false)
</script>

<template>
  <NotesToolbar
    :title="props.notebook.name"
    @menu:click="panelOpen = true"
  ></NotesToolbar>
  <slot name="default"></slot>

  <NotesToolPanel v-model="panelOpen"></NotesToolPanel>
</template>
