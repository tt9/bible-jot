import { useNotebook } from './useNotebook'

describe('useNotebook', () => {
  describe('activeNotebook', () => {
    it('should throw if trying to access notebook before its loaded', () => {
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
})
