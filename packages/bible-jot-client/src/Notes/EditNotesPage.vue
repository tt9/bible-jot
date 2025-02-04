<script lang="ts" setup>
import NoteBookPageDisplay from './components/NotebookPageDisplay.vue'
import { onMounted, ref, watch } from 'vue'
import NotesLayout from './components/NotesLayout.vue'
import { useNotebook } from './useNotebook'
import { useRoute } from 'vue-router'

const { notebook, loadNotebook, saveNotebook } = useNotebook()
const loading = ref<boolean>(true)
const route = useRoute()
const activePageIndex = 0

watch(
  () => notebook,
  async () => {
    await saveNotebook()
  },
  {
    deep: true,
  },
)

onMounted(async () => {
  loading.value = true
  await loadNotebook(route.params.id as string)
  loading.value = false
})
</script>

<template>
  <div v-if="loading">Loading...</div>
  <template v-else>
    <NotesLayout :notebook="notebook!">
      <div class="container">
        <NoteBookPageDisplay
          :notebook="notebook!"
          :activePageIndex="activePageIndex"
        ></NoteBookPageDisplay>
      </div>
    </NotesLayout>
  </template>
</template>

<style lang="scss" scoped></style>
