import {
  BibleObjectStoreName,
  BibleVersionIndexName,
  getDb,
} from '../../../data/AppIndexDb'
import {
  addressToParts,
  bookNameToBookKey,
  getBibleBookDefinition,
  type BibleVerse,
} from '../../Bible'

import type { BibleVersionReader } from '../BibleVersionReader'

export abstract class IndexDbJsonBibleVersionReader
  implements BibleVersionReader
{
  abstract getRawBibleJsonData(): Promise<any>

  abstract get version(): string

  protected async getBibleJsonData(
    bibleVersion: string,
  ): Promise<BibleVerse[]> {
    return new Promise(async (resolve, reject) => {
      const db = await getDb()

      const store = db
        .transaction(BibleObjectStoreName)
        .objectStore(BibleObjectStoreName)

      const versionIndex = store.index(BibleVersionIndexName)
      const request = versionIndex.get(bibleVersion)

      request.onsuccess = (event) => {
        const result = (event.target as IDBRequest).result

        resolve(JSON.parse(result.data))
      }
      request.onerror = (event) => {
        console.error('Error getting record:', event)
        reject(null)
      }
    })
  }

  protected getBibleBookDataFromRawJson(rawData: any, bookKey: string) {
    const bookData = rawData.books.find((book: any) => {
      const currentBookKey = bookNameToBookKey(book.name)
      if (!currentBookKey) {
        return false
      }
      return currentBookKey === bookKey
    })

    if (!bookData) {
      console.error(`Could not find book data for ${bookKey}`)
    }

    return bookData
  }

  protected getBibleChapterDataFromRawJson(
    rawData: any,
    bookKey: string,
    chapterNumber: number,
  ) {
    const bookData = this.getBibleBookDataFromRawJson(rawData, bookKey)
    if (!bookData) {
      return null
    }

    const chapterData = bookData.chapters.find((chapter: any) => {
      return chapter.chapter === chapterNumber
    })

    if (!chapterData) {
      console.error(
        `Could not find chapter data for ${bookKey} ${chapterNumber}`,
      )
    }

    return chapterData
  }

  protected getBibleVerseDataFromRawJson(
    rawData: any,
    bookKey: string,
    chapter: number,
    verseNumber: number,
  ) {
    const chapterData = this.getBibleChapterDataFromRawJson(
      rawData,
      bookKey,
      chapter,
    )
    if (!chapterData) {
      return null
    }

    const verseData = chapterData.verses.find((verse: any) => {
      return verse.verse === verseNumber
    })

    if (!verseData) {
      console.error(
        `Could not find verse data for ${bookKey} ${chapter} ${verseNumber}`,
      )
    }

    return verseData
  }

  public async getVerses(
    address: string | string[],
  ): Promise<BibleVerse[] | null> {
    const rawData = await this.getRawBibleJsonData()

    const addresses = Array.isArray(address) ? address : [address]

    let verses: BibleVerse[] = []

    addresses.forEach((address) => {
      const parts = addressToParts(address)

      const bibleBookDefinition = getBibleBookDefinition(parts.bookKey)
      if (!bibleBookDefinition) {
        return
      }
      const verseData = this.getBibleVerseDataFromRawJson(
        rawData,
        parts.bookKey,
        parts.chapter,
        parts.verseNumber,
      )
      if (verseData) {
        verses.push({
          bookKey: parts.bookKey,
          chapter: parts.chapter,
          verseNumber: parts.verseNumber,
          version: this.version,
          bookName: bibleBookDefinition.bookName,
          text: verseData.text,
        })
      }
    })

    return verses
  }
  public async getVersesInChapter(
    bookKey: string,
    chapter: number,
  ): Promise<BibleVerse[]> {
    const rawBibleData = await this.getRawBibleJsonData()

    const bibleBookDefinition = getBibleBookDefinition(bookKey)
    if (!bibleBookDefinition) {
      return []
    }

    const chapterData = this.getBibleChapterDataFromRawJson(
      rawBibleData,
      bookKey,
      chapter,
    )
    if (!chapterData) {
      return []
    }

    const verses: BibleVerse[] = []

    chapterData.verses.forEach((verse: any) => {
      verses.push({
        bookKey,
        chapter,
        verseNumber: verse.verse,
        version: this.version,
        bookName: bibleBookDefinition.bookName,
        text: verse.text,
      })
    })

    return verses
  }
  public async searchVerses(_: string): Promise<BibleVerse[]> {
    // await this.verifyLocalDownload()

    // const verses = await this.queryVerseIndexDb('kjv', (record) => {
    //   return record.verseText.toLowerCase().includes(query.toLowerCase())
    // })

    // return verses
    return []
  }
}
