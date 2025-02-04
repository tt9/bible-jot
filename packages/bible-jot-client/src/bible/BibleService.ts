import type { BibleVerse, BibleVersion } from './Bible'
import { BibleVersionReaderFactory } from './readers/BibleVersionReaderFactory'

export class BibleService {
  async getVerses(
    version: BibleVersion,
    verseAddress: string | string[],
  ): Promise<BibleVerse[] | null> {
    return BibleVersionReaderFactory.create(version).getVerses(verseAddress)
  }

  async getVersesByChapter(
    version: string,
    bookKey: string,
    chapterNumber: number,
  ): Promise<BibleVerse[]> {
    return BibleVersionReaderFactory.create(version).getVersesInChapter(
      bookKey,
      chapterNumber,
    )
  }

  async searchVerses(version: string, query: string): Promise<BibleVerse[]> {
    return BibleVersionReaderFactory.create(version).searchVerses(query)
  }
}

export default new BibleService()
