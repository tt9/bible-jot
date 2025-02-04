import type { BibleVerse } from '../Bible'

export interface BibleVersionReader {
  get version(): string

  getVerses(address: string | string[]): Promise<BibleVerse[] | null>

  getVersesInChapter(
    bookKey: string,
    chapterNumber: number,
  ): Promise<BibleVerse[]>

  searchVerses(query: string): Promise<BibleVerse[]>
}
