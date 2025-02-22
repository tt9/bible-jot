<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { createNotebook, getNotebooksFromIndexDb } from './NotebookService'
import type { Notebook } from './Notebook'
import MenuLayout from '../components/templates/MenuLayout.vue'
import AppIcon from '../components/atoms/AppIcon.vue'
import Modal from '../components/molecules/Modal.vue'
import CreateNotebook from './components/create-notebook/CreateNotebook.vue'
import SelectNotebookItem from './components/SelectNotebookItem.vue'

const loading = ref<boolean>(true)
const notebooks = ref<Partial<Notebook>[]>([])
const createNotebookModalOpen = ref<boolean>(false)
const router = useRouter()

const handleAddItemClicked = () => {
  createNotebookModalOpen.value = true
}

const handleCreateNotebook = async (formData: any) => {
  const notebookId = await createNotebook({
    name: formData.notebookName,
    version: 'kjv',
  })

  router.push({ path: `/notes/${notebookId}` })
}

onMounted(async () => {
  const results = await getNotebooksFromIndexDb()
  notebooks.value = results
  loading.value = false
})
</script>
<template>
  <MenuLayout>
    <div class="container">
      <h4 class="p-2 mt-0 mb-2">My Notes</h4>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div class="notebook-grid">
          <button class="notebook-grid--add-item" @click="handleAddItemClicked">
            <span>New Notebook</span><AppIcon name="plus-circle" />
          </button>
          <SelectNotebookItem
            v-for="notebook in notebooks"
            :notebook="notebook"
          ></SelectNotebookItem>
        </div>
      </div>
    </div>
  </MenuLayout>
  <Modal v-model="createNotebookModalOpen">
    <div class="modal-content-wrap">
      <CreateNotebook @create:notebook="handleCreateNotebook"></CreateNotebook>
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
.notebook-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  padding: 0.5rem;

  &--add-item {
    border: 3px dashed var(--color-gray);
    border-radius: 0.25rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-gray);
    font-weight: bold;
    gap: 0.5rem;
    background: white;
  }
}

@media all and (min-width: 768px) {
  .notebook-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
