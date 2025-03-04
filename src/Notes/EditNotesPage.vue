<script lang="ts" setup>
import NoteBookPageDisplay from './components/NotebookPageDisplay.vue'
import { onMounted, ref, watch } from 'vue'
import NotesLayout from './components/NotesLayout.vue'
import { useNotebook } from './useNotebook'
import { useRoute } from 'vue-router'
import VerseSelectorModal from './components/verse-selector/VerseSelectorModal.vue'

const { notebook, loadNotebook, saveNotebook } = useNotebook()
const loading = ref<boolean>(true)
const route = useRoute()

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
  <NotesLayout>
    <div v-if="loading" class="container">Loading Notebook...</div>
    <div class="container" v-else>
      <NoteBookPageDisplay></NoteBookPageDisplay>
    </div>
    <!-- 
        Only create one instance of this 
        Additional instances will overwrite the single
        registration refs of this modal and make
        it not usable from the useNotebook composable function
       -->
    <VerseSelectorModal></VerseSelectorModal>
  </NotesLayout>
</template>

<style lang="scss" scoped></style>
