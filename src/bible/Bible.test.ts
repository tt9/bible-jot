import { addressToParts, verseToAddress, type BibleVerse } from './Bible'

describe('Bible', () => {
  describe('addressToParts', () => {
    it('should parse a verse address into an object', () => {
      const address = 'GEN:1:1'
      const parts = addressToParts(address)
      expect(parts.bookKey).toBe('GEN')
      expect(parts.chapter).toBe(1)
      expect(parts.verseNumber).toBe(1)
    })
  })

  describe('verseToAddress', () => {
    it('should convert a BibleVerse to an address', () => {
      const verse = {
        bookKey: 'GEN',
        chapter: 1,
        verseNumber: 1,
      }

      const address = verseToAddress(verse as BibleVerse)

      expect(address).toBe('GEN:1:1')
    })
  })
})
