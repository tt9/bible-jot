<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getNotebooksFromIndexDb } from './NotebookService'
import type { Notebook } from './Notebook'
import MenuLayout from '../components/templates/MenuLayout.vue'
import AppIcon from '../components/atoms/AppIcon.vue'
import Modal from '../components/molecules/Modal.vue'
import CreateNotebook from './components/create-notebook/CreateNotebook.vue'

const loading = ref<boolean>(true)
const notebooks = ref<Partial<Notebook>[]>([])
const createNotebookModalOpen = ref<boolean>(false)

const handleAddItemClicked = () => {
  createNotebookModalOpen.value = true
}

const handleCreateNotebook = (formData: any) => {
  console.log('form data: ' + JSON.stringify(formData))
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
          <RouterLink
            :to="'/notes/' + notebook.id"
            v-for="notebook in notebooks"
            :key="notebook.id"
            class="notebook-grid--item"
          >
            <p class="notebook-grid--item--title">{{ notebook.name }}</p>
            <p>Last Updated: {{ notebook.updatedAt || notebook.createdAt }}</p>
          </RouterLink>
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

  &--item {
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.16);
    padding: 0.5rem;
    border-radius: 0.25rem;
    text-align: center;

    &--title {
      font-weight: bold;
      font-size: var(--font-size-3);
      margin-block-start: 0;
      margin-block-end: 0.25rem;
    }
  }
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
