import { ref, toRaw, type Ref } from 'vue'
import type { Notebook } from './Notebook'
import {
  getNotebookFromIndexDb,
  updateNotebookInIndexDb,
} from './NotebookService'

/**
 * TODO: Currently all of the notebook editing components
 * take in the notebook as a prop. But we also have the
 * currently-being-worked-on notebook as a global ref here
 * For testing purposes I like props, but it could be better
 * to have this be the single source of truth for the notebook
 * And just have a reusable mocking system for tests
 *
 */
const currentNotebookRef = ref<Notebook | null>(null)
let showVerseSelectionModalRef: Ref<boolean>

// These variables allow us to track the modal independently
// of any specific child component, so we can use it from anywhere
// There is probably a cleaner way to do this with a
// better design pattern but for now, it works.
let selectVersesPromise: Promise<string[]> | null = null
let onVersesSelected: (verses: string[]) => void
let cancelVerseSelection: () => void

export function useNotebook() {
  return {
    notebook: currentNotebookRef,
    async loadNotebook(notebookId: string) {
      let notebook = await getNotebookFromIndexDb(notebookId)
      currentNotebookRef.value = notebook
    },
    async saveNotebook() {
      if (!currentNotebookRef.value) return
      updateNotebookInIndexDb(
        currentNotebookRef.value.id,
        toRaw(currentNotebookRef.value),
      )
    },
    registerVerseSelectorModal(modal: { showModalRef: Ref<boolean> }) {
      showVerseSelectionModalRef = modal.showModalRef
    },
    emitVersesSelected(verses: string[]) {
      if (onVersesSelected) {
        onVersesSelected(verses)
      }
    },
    emitVerseSelectionCanceled() {
      if (cancelVerseSelection) {
        cancelVerseSelection()
      }
    },
    async selectVersesWithPicker(): Promise<string[]> {
      if (!selectVersesPromise) {
        selectVersesPromise = new Promise<string[]>((resolve) => {
          onVersesSelected = (verses: string[]) => {
            showVerseSelectionModalRef.value = false
            resolve(verses)
            selectVersesPromise = null
          }

          cancelVerseSelection = () => {
            showVerseSelectionModalRef.value = false
            resolve([])
            selectVersesPromise = null
          }
        })
        showVerseSelectionModalRef.value = true
      }
      return selectVersesPromise
    },
  }
}
