<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  getNotebooksFromIndexDb,
  createNotebookInIndexDb,
  deleteNotebookFromIndexDb,
} from './NotebookService'
import type { Notebook } from './Notebook'
import DefaultLayout from '../components/templates/DefaultLayout.vue'
import AppIcon from '../components/atoms/AppIcon.vue'
import Modal from '../components/molecules/Modal.vue'
import CreateNotebook from './components/create-notebook/CreateNotebook.vue'
import SelectNotebookItem from './components/SelectNotebookItem.vue'
import { NotebookUpdatedAtIndex } from '../data/AppIndexDb'

const loading = ref<boolean>(true)
const notebooks = ref<Partial<Notebook>[]>([])
const createNotebookModalOpen = ref<boolean>(false)
const router = useRouter()

const handleAddItemClicked = () => {
  createNotebookModalOpen.value = true
}

const handleCreateNotebook = async (formData: any) => {
  const notebookId = await createNotebookInIndexDb({
    name: formData.notebookName,
    version: formData.version,
  })

  router.push({ name: 'edit-note', params: { id: notebookId.toString() } })
}

const handleDeleteNotebook = async (id: string) => {
  await deleteNotebookFromIndexDb(id)

  const results = await getNotebooksFromIndexDb({
    orderByIndex: NotebookUpdatedAtIndex,
    orderDirection: 'desc',
  })
  notebooks.value = results
}

onMounted(async () => {
  const results = await getNotebooksFromIndexDb({
    orderByIndex: NotebookUpdatedAtIndex,
    orderDirection: 'desc',
  })
  notebooks.value = results
  loading.value = false
})
</script>
<template>
  <DefaultLayout>
    <div class="container p-2">
      <h4 class="p-2 mt-0 mb-2 pt-8">My Notebooks</h4>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div class="notebook-grid">
          <button class="notebook-grid__add-item" @click="handleAddItemClicked">
            <span>New Notebook</span><AppIcon name="plus-circle" />
          </button>
          <SelectNotebookItem
            v-for="notebook in notebooks"
            :notebook="notebook"
            @item:delete="handleDeleteNotebook"
          ></SelectNotebookItem>
        </div>
      </div>
    </div>
  </DefaultLayout>
  <Modal v-model="createNotebookModalOpen">
    <div class="modal-content-wrap">
      <CreateNotebook @create:notebook="handleCreateNotebook"></CreateNotebook>
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
.notebook-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.5rem;
  padding: 0.5rem;
  max-width: 100%;
  width: 100%;
  overflow: hidden;

  & > * {
    max-width: 100%;
  }
  &__add-item {
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
