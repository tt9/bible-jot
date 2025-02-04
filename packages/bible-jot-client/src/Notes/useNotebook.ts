import { ref, toRaw } from 'vue'
import type { Notebook } from './Notebook'
import { getNotebookFromIndexDb, updateNotebook } from './NotebookService'

const currentNotebookRef = ref<Notebook | null>(null)

export function useNotebook() {
  return {
    async loadNotebook(notebookId: string) {
      let notebook = await getNotebookFromIndexDb(notebookId)
      currentNotebookRef.value = notebook
    },
    async saveNotebook() {
      if (!currentNotebookRef.value) return

      updateNotebook(
        currentNotebookRef.value.id,
        toRaw(currentNotebookRef.value),
      )
    },
    notebook: currentNotebookRef,
  }
}
