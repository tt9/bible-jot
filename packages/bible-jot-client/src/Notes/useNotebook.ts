import { ref } from 'vue'
import type { Notebook } from './Notebook'
import { createTestNotebook, getNotebookFromIndexDb } from './NotebookService'

const currentNotebookRef = ref<Notebook | null>(null)

export function useNotebook() {
  return {
    async loadNotebook(_: string) {
      let notebook = await getNotebookFromIndexDb('123456')
      if (!notebook) {
        const key = await createTestNotebook('Test One')
        notebook = await getNotebookFromIndexDb(key.toString())
      }
      currentNotebookRef.value = notebook
    },
    notebook: currentNotebookRef,
  }
}
