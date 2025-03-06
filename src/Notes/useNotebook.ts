import { computed, ref, toRaw, type Ref } from 'vue'
import type { Notebook } from './Notebook'
import {
  getNotebookFromIndexDb,
  updateNotebookInIndexDb,
} from './NotebookService'

const currentNotebookRef = ref<Notebook | null>(null)

/**
 * TODO: the structure of the notebook is
 * set up to support multiple pages in a notebook
 * but that functionality has not been implemented yet
 * so this will always be notebook page index 0 for now
 */
const activePageIndexRef = ref<number>(0)
const selectedNoteIdRef = ref<string | null>(null)

let showVerseSelectionModalRef: Ref<boolean>

// These variables allow us to track the modal independently
// of any specific child component, so we can use it from anywhere
// There is probably a cleaner way to do this with a
// better design pattern but for now, it works.
let selectVersesPromise: Promise<string[]> | null = null
let onVersesSelected: (verses: string[]) => void
let cancelVerseSelection: () => void

export function useNotebook() {
  let activePage = computed(() => {
    if (!currentNotebookRef.value)
      throw new Error(
        'Trying to access active page when currentNotebook is not loaded',
      )
    return currentNotebookRef.value.pages[activePageIndexRef.value]
  })

  return {
    // Nullable reference
    notebook: currentNotebookRef,

    // Guaranteed non-null reference for loading
    // into subchildren without needing a bunch of
    // null checks or assertions
    activeNotebook: computed(() => {
      if (!currentNotebookRef.value)
        throw new Error('Trying to access activeNotebook before loading it')

      return currentNotebookRef.value
    }),
    activePageIndex: activePageIndexRef,
    activePage: activePage,
    selectedNoteId: selectedNoteIdRef,
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

    orderPageNotesByIndex() {
      activePage.value.verseNotes.forEach((note, index) => {
        note.order = index
      })
    },

    setSelectedNote(noteId: string | null) {
      selectedNoteIdRef.value = noteId
      // activePage.value.verseNotes = [...activePage.value.verseNotes]
    },
  }
}
