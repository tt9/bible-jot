import { vi, type Mock } from 'vitest'
import {
  createNotebookInIndexDb,
  deleteNotebookFromIndexDb,
  getNotebookFromIndexDb,
  getNotebooksFromIndexDb,
  updateNotebookInIndexDb,
} from './NotebookService'
import { nextTick } from 'vue'

var mockGetDb: Mock
var mockPromisifyDbRequest: Mock

vi.mock('../data/AppIndexDb', () => {
  mockGetDb = vi.fn()
  mockPromisifyDbRequest = vi.fn()
  return {
    getDb: mockGetDb,
    promisifyDbRequest: mockPromisifyDbRequest,
    NotebookObjectStoreName: 'test',
  }
})

const setupMockDbImplementation = (promisifyResult?: any) => {
  const getMock = vi.fn()
  const addMock = vi.fn()
  const putMock = vi.fn()
  const deleteMock = vi.fn()
  const cursorMock = {
    onsuccess: (_: any) => {},
    onerror: () => {},
  }
  const openCursorMock = vi.fn(() => {
    return cursorMock
  })

  mockGetDb.mockImplementationOnce(() => {
    return {
      transaction: () => {
        return {
          objectStore: () => {
            return {
              get: getMock,
              add: addMock,
              put: putMock,
              delete: deleteMock,
              openCursor: openCursorMock,
            }
          },
        }
      },
    }
  })

  mockPromisifyDbRequest.mockImplementationOnce(() => {
    return promisifyResult
  })

  return {
    getMock,
    addMock,
    putMock,
    deleteMock,
    openCursorMock,
    cursorMock,
  }
}

describe('NotebookService', () => {
  afterAll(() => vi.resetAllMocks())
  afterEach(() => vi.clearAllMocks())

  describe('getNotebookFromIndexDb', () => {
    it('should call store.get, promisifyRequest and return result', async () => {
      const { getMock } = setupMockDbImplementation({ id: 'test' })

      const result = await getNotebookFromIndexDb('test')
      expect(mockGetDb).toHaveBeenCalled()
      expect(mockPromisifyDbRequest).toHaveBeenCalled()
      expect(getMock).toHaveBeenCalledWith('test')
      expect(result).toEqual({ id: 'test' })
    })
  })

  describe('createNotebookInIndexDb', () => {
    it('should call store.add, promisifyRequest and return result', async () => {
      const { addMock } = setupMockDbImplementation({ id: 'test' })
      const result = await createNotebookInIndexDb({ id: 'test' })
      expect(mockGetDb).toHaveBeenCalled()
      expect(mockPromisifyDbRequest).toHaveBeenCalled()
      expect(addMock).toHaveBeenCalled()
      expect(addMock.mock.calls[0][0]).toBeDefined()
      expect(result).toEqual({ id: 'test' })
    })
  })

  describe('updateNotebookInIndexDb', () => {
    it('should call store.put, promisifyRequest and return result', async () => {
      const { putMock } = setupMockDbImplementation({ id: 'test' })
      const result = await updateNotebookInIndexDb('test', {
        name: 'test_name',
      })

      expect(mockGetDb).toHaveBeenCalled()
      expect(mockPromisifyDbRequest).toHaveBeenCalled()

      expect(putMock).toHaveBeenCalled()
      expect(putMock.mock.calls[0][0].name).toBe('test_name')

      expect(result).toEqual({ id: 'test' })
    })
  })

  describe('getNotebooksFromIndexDb', () => {
    it('should open cursor and return result', () => {
      const { cursorMock } = setupMockDbImplementation([{ id: 'test' }])
      getNotebooksFromIndexDb().then((result) => {
        expect(result).toEqual([])
      })

      requestAnimationFrame(() => {
        cursorMock.onsuccess({ target: { result: null } })
      })
    })

    it('should only return limit number of results', async () => {
      const { cursorMock } = setupMockDbImplementation([])

      const createdAt = new Date()
      const updatedAt = new Date()
      getNotebooksFromIndexDb({ limit: 1 }).then((result) => {
        expect(result).toEqual([{ id: '1', name: '1', createdAt, updatedAt }])
      })

      nextTick(() => {
        cursorMock.onsuccess({
          target: {
            result: {
              value: {
                id: '1',
                name: '1',
                createdAt,
                updatedAt,
              },
            },
          },
        })
      })
    })

    it('should only return limit number of results with offset', async () => {
      const { cursorMock } = setupMockDbImplementation([])

      const mockContinue = vi.fn()
      const createdAt = new Date()
      const updatedAt = new Date()
      getNotebooksFromIndexDb({ limit: 1, offset: 1 }).then((result) => {
        expect(result).toEqual([{ id: '2', name: '2', createdAt, updatedAt }])
        expect(mockContinue).toHaveBeenCalled()
      })

      nextTick(() => {
        cursorMock.onsuccess({
          target: {
            result: {
              continue: mockContinue,
              value: {
                id: '1',
                name: '1',
                createdAt,
                updatedAt,
              },
            },
          },
        }),
          cursorMock.onsuccess({
            target: {
              result: {
                value: {
                  id: '2',
                  name: '2',
                  createdAt,
                  updatedAt,
                },
              },
            },
          })
      })
    })
  })

  describe('deleteNotebookFromIndexDb', () => {
    it('should call store.delete', async () => {
      const { deleteMock } = setupMockDbImplementation()
      await deleteNotebookFromIndexDb('test')
      expect(deleteMock).toHaveBeenCalledWith('test')
    })
  })
})
