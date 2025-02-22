import BibleService from './BibleService'
import { vi } from 'vitest'
import { BibleVersionReaderFactory } from './readers/BibleVersionReaderFactory'

const mockGetVerses = vi.fn()
const mockGetVersesInChapter = vi.fn()
const mockSearchVerses = vi.fn()

describe('BibleService', () => {
  beforeAll(() => {
    vi.mock('./readers/BibleVersionReaderFactory', () => {
      const mockCreate = vi.fn(() => {
        return {
          getVerses: mockGetVerses,
          getVersesInChapter: mockGetVersesInChapter,
          searchVerses: mockSearchVerses,
        }
      })

      return {
        BibleVersionReaderFactory: {
          create: mockCreate,
        },
      }
    })
  })
  afterEach(() => vi.clearAllMocks())
  afterAll(() => vi.resetAllMocks())

  describe('getVerses', () => {
    it('should call the factory class and getVerses', async () => {
      const mockRef = mockGetVerses.mockImplementationOnce(() => [
        { bookKey: 'GEN' },
      ])

      const result = await BibleService.getVerses('kjv', 'GEN:1:1')
      expect(BibleVersionReaderFactory.create).toHaveBeenCalledWith('kjv')
      expect(mockRef).toHaveBeenCalledWith('GEN:1:1')
      expect(result!.length).toBe(1)
      expect(result![0].bookKey).toBe('GEN')
    })
  })

  describe('getVersesInChaper', () => {
    it('should call the factory class and getVersesInChapter', async () => {
      const mockRef = mockGetVersesInChapter.mockImplementationOnce(() => {
        return [
          { bookKey: 'EXO', bookName: 'Exodus' },
          { bookKey: 'EXO', bookName: 'Exodus' },
        ]
      })

      const result = await BibleService.getVersesInChapter('kjv', 'EXO:1:1', 1)
      expect(BibleVersionReaderFactory.create).toHaveBeenCalledWith('kjv')
      expect(mockRef).toHaveBeenCalledWith('EXO:1:1', 1)
      expect(result![0].bookKey).toBe('EXO')
      expect(result![1].bookKey).toBe('EXO')
      expect(result?.length).toBe(2)
    })
  })

  describe('searchVerses', () => {
    it('should call the factory calss and searchVerses', async () => {
      const mockRef = mockSearchVerses.mockImplementationOnce(() => {
        return [{ bookKey: 'LEV' }]
      })

      const result = await BibleService.searchVerses('mkjv', 'In the b')

      expect(BibleVersionReaderFactory.create).toHaveBeenCalledWith('mkjv')
      expect(mockRef).toHaveBeenCalledWith('In the b')
      expect(result.length).toBe(1)
    })
  })
})
