import { useNotebook } from './useNotebook'
import {
  getNotebookFromIndexDb,
  updateNotebookInIndexDb,
} from './NotebookService'
import { vi } from 'vitest'
import { ref } from 'vue'

vi.mock('./NotebookService', () => {
  return {
    getNotebookFromIndexDb: vi.fn(),
    updateNotebookInIndexDb: vi.fn(),
  }
})

describe('useNotebook', () => {
  describe('activeNotebook', () => {
    it('should throw if trying to access notebook before its loaded', () => {
      useNotebook().notebook.value = null
      expect(() => useNotebook().activeNotebook.value).toThrowError(
        'Trying to access activeNotebook before loading it',
      )
    })
    it('should not throw error if notebook is loaded', () => {
      useNotebook().notebook.value = {} as any
      expect(() => useNotebook().activeNotebook.value).not.toThrow()
    })
    it('should be the same reference as the loaded notebook', () => {
      useNotebook().notebook.value = { id: '1234' } as any
      expect(useNotebook().activeNotebook.value).toEqual(
        useNotebook().notebook.value,
      )
    })
  })
  describe('activePage', () => {
    it('should throw if trying to access the active page before loaded', () => {
      useNotebook().notebook.value = null
      expect(() => useNotebook().activePage.value).toThrowError(
        'Trying to access active page when currentNotebook is not loaded',
      )
    })
    it('should not throw error if notebook is loaded', () => {
      useNotebook().notebook.value = { pages: [{ id: '1234' }] } as any
      expect(() => useNotebook().activePage.value).not.toThrow()
    })
    it('should be the same reference as the loaded page', () => {
      useNotebook().notebook.value = { pages: [{ id: '1234' }] } as any
      expect(useNotebook().activePage.value).toEqual(
        useNotebook().notebook.value!.pages[0],
      )
    })
  })
  describe('loadNotebook', () => {
    it('should load a notebook from indexDb', async () => {
      const loadNotebook = useNotebook().loadNotebook
      const notebookId = '1234'
      await loadNotebook(notebookId)
      expect(getNotebookFromIndexDb).toHaveBeenCalledWith(notebookId)
    })
  })
  describe('saveNotebook', () => {
    it('should save a notebook to indexDb', async () => {
      useNotebook().notebook.value = { id: '1234' } as any
      const saveNotebook = useNotebook().saveNotebook
      const notebookId = '1234'
      const notebook = { id: '1234' } as any
      await saveNotebook()
      expect(updateNotebookInIndexDb).toHaveBeenCalledWith(notebookId, notebook)
    })
  })
  describe('selectVersesWithPicker', () => {
    it('should define the selectVersesPromise and await for the verses to be selected', async () => {
      const {
        selectVersesWithPicker,
        emitVersesSelected,
        registerVerseSelectorModal,
      } = useNotebook()

      const modal = { showModalRef: ref<boolean>(false) }
      registerVerseSelectorModal(modal)
      setTimeout(() => {
        expect(modal.showModalRef.value).toBe(true)
        emitVersesSelected(['GEN:1:1'])
      }, 0)
      const results = await selectVersesWithPicker()
      expect(modal.showModalRef.value).toBe(false)
      expect(results).toEqual(['GEN:1:1'])
    })
    it('should define the selectVersesPromise and cancelVerseSelection', async () => {
      const {
        selectVersesWithPicker,
        emitVerseSelectionCanceled,
        registerVerseSelectorModal,
      } = useNotebook()

      const modal = { showModalRef: ref<boolean>(false) }
      registerVerseSelectorModal(modal)
      setTimeout(() => {
        expect(modal.showModalRef.value).toBe(true)
        emitVerseSelectionCanceled()
      }, 0)
      const results = await selectVersesWithPicker()
      expect(modal.showModalRef.value).toBe(false)
      expect(results).toEqual([])
    })
  })
})
