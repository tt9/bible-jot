export type BibleVersion = 'kjv' | 'mkjv' | 'ylt' | string

export interface BibleVerse {
  version: string
  bookName: string
  bookKey: string
  chapter: number
  verseNumber: number
  text: string
}

export interface BibleChapter {
  version: string
  book: string
  chapter: number
  verses: BibleVerse[]
}

export interface BibleBookDefinition {
  bookKey: string
  bookName: string
  alternateNames?: string[]
  testament: 'OT' | 'NT'
  chapterCount: number
  searchTerms: string[]
  order: number
}

export interface VersionedBibleBook extends BibleBookDefinition {
  version: string
}

export const BibleBookDefinitions: BibleBookDefinition[] = [
  {
    bookKey: 'GEN',
    bookName: 'Genesis',
    testament: 'OT',
    chapterCount: 50,
    searchTerms: ['gen', 'genesis'],
    order: 1,
  },
  {
    bookKey: 'EXO',
    bookName: 'Exodus',
    testament: 'OT',
    chapterCount: 40,
    searchTerms: ['exo', 'exodus'],
    order: 2,
  },
  {
    bookKey: 'LEV',
    bookName: 'Leviticus',
    testament: 'OT',
    chapterCount: 27,
    searchTerms: ['lev', 'leviticus'],
    order: 3,
  },
  {
    bookKey: 'NUM',
    bookName: 'Numbers',
    testament: 'OT',
    chapterCount: 36,
    searchTerms: ['num', 'numbers'],
    order: 4,
  },
  {
    bookKey: 'DEU',
    bookName: 'Deuteronomy',
    testament: 'OT',
    chapterCount: 34,
    searchTerms: ['deu', 'deuteronomy'],
    order: 5,
  },
  {
    bookKey: 'JOS',
    bookName: 'Joshua',
    testament: 'OT',
    chapterCount: 24,
    searchTerms: ['jos', 'joshua'],
    order: 6,
  },
  {
    bookKey: 'JDG',
    bookName: 'Judges',
    testament: 'OT',
    chapterCount: 21,
    searchTerms: ['jdg', 'judges'],
    order: 7,
  },
  {
    bookKey: 'RUT',
    bookName: 'Ruth',
    testament: 'OT',
    chapterCount: 4,
    searchTerms: ['rut', 'ruth'],
    order: 8,
  },
  {
    bookKey: '1SA',
    bookName: '1 Samuel',
    alternateNames: ['I Samuel'],
    testament: 'OT',
    chapterCount: 31,
    searchTerms: ['1sa', '1 samuel'],
    order: 9,
  },
  {
    bookKey: '2SA',
    bookName: '2 Samuel',
    alternateNames: ['II Samuel'],
    testament: 'OT',
    chapterCount: 24,
    searchTerms: ['2sa', '2 samuel'],
    order: 10,
  },
  {
    bookKey: '1KI',
    bookName: '1 Kings',
    alternateNames: ['I Kings'],
    testament: 'OT',
    chapterCount: 22,
    searchTerms: ['1ki', '1 kings'],
    order: 11,
  },
  {
    bookKey: '2KI',
    bookName: '2 Kings',
    alternateNames: ['II Kings'],
    testament: 'OT',
    chapterCount: 25,
    searchTerms: ['2ki', '2 kings'],
    order: 12,
  },
  {
    bookKey: '1CH',
    bookName: '1 Chronicles',
    alternateNames: ['I Chronicles'],
    testament: 'OT',
    chapterCount: 29,
    searchTerms: ['1ch', '1 chronicles'],
    order: 13,
  },
  {
    bookKey: '2CH',
    bookName: '2 Chronicles',
    alternateNames: ['II Chronicles'],
    testament: 'OT',
    chapterCount: 36,
    searchTerms: ['2ch', '2 chronicles'],
    order: 14,
  },
  {
    bookKey: 'EZR',
    bookName: 'Ezra',
    testament: 'OT',
    chapterCount: 10,
    searchTerms: ['ezr', 'ezra'],
    order: 15,
  },
  {
    bookKey: 'NEH',
    bookName: 'Nehemiah',
    testament: 'OT',
    chapterCount: 13,
    searchTerms: ['neh', 'nehemiah'],
    order: 16,
  },
  {
    bookKey: 'EST',
    bookName: 'Esther',
    testament: 'OT',
    chapterCount: 10,
    searchTerms: ['est', 'esther'],
    order: 17,
  },
  {
    bookKey: 'JOB',
    bookName: 'Job',
    testament: 'OT',
    chapterCount: 42,
    searchTerms: ['job'],
    order: 18,
  },
  {
    bookKey: 'PSA',
    bookName: 'Psalms',
    testament: 'OT',
    chapterCount: 150,
    searchTerms: ['psa', 'psalms'],
    order: 19,
  },
  {
    bookKey: 'PRO',
    bookName: 'Proverbs',
    testament: 'OT',
    chapterCount: 31,
    searchTerms: ['pro', 'proverbs'],
    order: 20,
  },
  {
    bookKey: 'ECC',
    bookName: 'Ecclesiastes',
    testament: 'OT',
    chapterCount: 12,
    searchTerms: ['ecc', 'ecclesiastes'],
    order: 21,
  },
  {
    bookKey: 'SON',
    bookName: 'Song of Solomon',
    testament: 'OT',
    chapterCount: 8,
    searchTerms: ['son', 'song of solomon'],
    order: 22,
  },
  {
    bookKey: 'ISA',
    bookName: 'Isaiah',
    testament: 'OT',
    chapterCount: 66,
    searchTerms: ['isa', 'isaiah'],
    order: 23,
  },
  {
    bookKey: 'JER',
    bookName: 'Jeremiah',
    testament: 'OT',
    chapterCount: 52,
    searchTerms: ['jer', 'jeremiah'],
    order: 24,
  },
  {
    bookKey: 'LAM',
    bookName: 'Lamentations',
    testament: 'OT',
    chapterCount: 5,
    searchTerms: ['lam', 'lamentations'],
    order: 25,
  },
  {
    bookKey: 'EZK',
    bookName: 'Ezekiel',
    testament: 'OT',
    chapterCount: 48,
    searchTerms: ['ezk', 'ezekiel'],
    order: 26,
  },
  {
    bookKey: 'DAN',
    bookName: 'Daniel',
    testament: 'OT',
    chapterCount: 12,
    searchTerms: ['dan', 'daniel'],
    order: 27,
  },
  {
    bookKey: 'HOS',
    bookName: 'Hosea',
    testament: 'OT',
    chapterCount: 14,
    searchTerms: ['hos', 'hosea'],
    order: 28,
  },
  {
    bookKey: 'JOL',
    bookName: 'Joel',
    testament: 'OT',
    chapterCount: 3,
    searchTerms: ['jol', 'joel'],
    order: 29,
  },
  {
    bookKey: 'AMO',
    bookName: 'Amos',
    testament: 'OT',
    chapterCount: 9,
    searchTerms: ['amo', 'amos'],
    order: 30,
  },
  {
    bookKey: 'OBA',
    bookName: 'Obadiah',
    testament: 'OT',
    chapterCount: 1,
    searchTerms: ['oba', 'obadiah'],
    order: 31,
  },
  {
    bookKey: 'JON',
    bookName: 'Jonah',
    testament: 'OT',
    chapterCount: 4,
    searchTerms: ['jon', 'jonah'],
    order: 32,
  },
  {
    bookKey: 'MIC',
    bookName: 'Micah',
    testament: 'OT',
    chapterCount: 7,
    searchTerms: ['mic', 'micah'],
    order: 33,
  },
  {
    bookKey: 'NAM',
    bookName: 'Nahum',
    testament: 'OT',
    chapterCount: 3,
    searchTerms: ['nam', 'nahum'],
    order: 34,
  },
  {
    bookKey: 'HAB',
    bookName: 'Habakkuk',
    testament: 'OT',
    chapterCount: 3,
    searchTerms: ['hab', 'habakkuk'],
    order: 35,
  },
  {
    bookKey: 'ZEP',
    bookName: 'Zephaniah',
    testament: 'OT',
    chapterCount: 3,
    searchTerms: ['zep', 'zephaniah'],
    order: 36,
  },
  {
    bookKey: 'HAG',
    bookName: 'Haggai',
    testament: 'OT',
    chapterCount: 2,
    searchTerms: ['hag', 'haggai'],
    order: 37,
  },
  {
    bookKey: 'ZEC',
    bookName: 'Zechariah',
    testament: 'OT',
    chapterCount: 14,
    searchTerms: ['zec', 'zechariah'],
    order: 38,
  },
  {
    bookKey: 'MAL',
    bookName: 'Malachi',
    testament: 'OT',
    chapterCount: 4,
    searchTerms: ['mal', 'malachi'],
    order: 39,
  },
  {
    bookKey: 'MAT',
    bookName: 'Matthew',
    testament: 'NT',
    chapterCount: 28,
    searchTerms: ['mat', 'matthew'],
    order: 40,
  },
  {
    bookKey: 'MRK',
    bookName: 'Mark',
    testament: 'NT',
    chapterCount: 16,
    searchTerms: ['mrk', 'mark'],
    order: 41,
  },
  {
    bookKey: 'LUK',
    bookName: 'Luke',
    testament: 'NT',
    chapterCount: 24,
    searchTerms: ['luk', 'luke'],
    order: 42,
  },
  {
    bookKey: 'JHN',
    bookName: 'John',
    testament: 'NT',
    chapterCount: 21,
    searchTerms: ['jhn', 'john'],
    order: 43,
  },
  {
    bookKey: 'ACT',
    bookName: 'Acts',
    testament: 'NT',
    chapterCount: 28,
    searchTerms: ['act', 'acts'],
    order: 44,
  },
  {
    bookKey: 'ROM',
    bookName: 'Romans',
    testament: 'NT',
    chapterCount: 16,
    searchTerms: ['rom', 'romans'],
    order: 45,
  },
  {
    bookKey: '1CO',
    bookName: '1 Corinthians',
    alternateNames: ['I Corinthians'],
    testament: 'NT',
    chapterCount: 16,
    searchTerms: ['1co', '1 corinthians'],
    order: 46,
  },
  {
    bookKey: '2CO',
    bookName: '2 Corinthians',
    alternateNames: ['II Corinthians'],
    testament: 'NT',
    chapterCount: 13,
    searchTerms: ['2co', '2 corinthians'],
    order: 47,
  },
  {
    bookKey: 'GAL',
    bookName: 'Galatians',
    testament: 'NT',
    chapterCount: 6,
    searchTerms: ['gal', 'galatians'],
    order: 48,
  },
  {
    bookKey: 'EPH',
    bookName: 'Ephesians',
    testament: 'NT',
    chapterCount: 6,
    searchTerms: ['eph', 'ephesians'],
    order: 49,
  },
  {
    bookKey: 'PHP',
    bookName: 'Philippians',
    testament: 'NT',
    chapterCount: 4,
    searchTerms: ['php', 'philippians'],
    order: 50,
  },
  {
    bookKey: 'COL',
    bookName: 'Colossians',
    testament: 'NT',
    chapterCount: 4,
    searchTerms: ['col', 'colossians'],
    order: 51,
  },
  {
    bookKey: '1TH',
    bookName: '1 Thessalonians',
    alternateNames: ['I Thessalonians'],
    testament: 'NT',
    chapterCount: 5,
    searchTerms: ['1th', '1 thessalonians'],
    order: 52,
  },
  {
    bookKey: '2TH',
    bookName: '2 Thessalonians',
    alternateNames: ['II Thessalonians'],
    testament: 'NT',
    chapterCount: 3,
    searchTerms: ['2th', '2 thessalonians'],
    order: 53,
  },
  {
    bookKey: '1TI',
    bookName: '1 Timothy',
    alternateNames: ['I Timothy'],
    testament: 'NT',
    chapterCount: 6,
    searchTerms: ['1ti', '1 timothy'],
    order: 54,
  },
  {
    bookKey: '2TI',
    bookName: '2 Timothy',
    alternateNames: ['II Timothy'],
    testament: 'NT',
    chapterCount: 4,
    searchTerms: ['2ti', '2 timothy'],
    order: 55,
  },
  {
    bookKey: 'TIT',
    bookName: 'Titus',
    testament: 'NT',
    chapterCount: 3,
    searchTerms: ['tit', 'titus'],
    order: 56,
  },
  {
    bookKey: 'PHM',
    bookName: 'Philemon',
    testament: 'NT',
    chapterCount: 1,
    searchTerms: ['phm', 'philemon'],
    order: 57,
  },
  {
    bookKey: 'HEB',
    bookName: 'Hebrews',
    testament: 'NT',
    chapterCount: 13,
    searchTerms: ['heb', 'hebrews'],
    order: 58,
  },
  {
    bookKey: 'JAS',
    bookName: 'James',
    testament: 'NT',
    chapterCount: 5,
    searchTerms: ['jas', 'james'],
    order: 59,
  },
  {
    bookKey: '1PE',
    bookName: '1 Peter',
    alternateNames: ['I Peter'],
    testament: 'NT',
    chapterCount: 5,
    searchTerms: ['1pe', '1 peter'],
    order: 60,
  },
  {
    bookKey: '2PE',
    bookName: '2 Peter',
    alternateNames: ['II Peter'],
    testament: 'NT',
    chapterCount: 3,
    searchTerms: ['2pe', '2 peter'],
    order: 61,
  },
  {
    bookKey: '1JN',
    bookName: '1 John',
    alternateNames: ['I John'],
    testament: 'NT',
    chapterCount: 5,
    searchTerms: ['1jn', '1 john'],
    order: 62,
  },
  {
    bookKey: '2JN',
    bookName: '2 John',
    alternateNames: ['II John'],
    testament: 'NT',
    chapterCount: 1,
    searchTerms: ['2jn', '2 john'],
    order: 63,
  },
  {
    bookKey: '3JN',
    bookName: '3 John',
    alternateNames: ['III John'],
    testament: 'NT',
    chapterCount: 1,
    searchTerms: ['3jn', '3 john'],
    order: 64,
  },
  {
    bookKey: 'JUD',
    bookName: 'Jude',
    testament: 'NT',
    chapterCount: 1,
    searchTerms: ['jud', 'jude'],
    order: 65,
  },
  {
    bookKey: 'REV',
    bookName: 'Revelation',
    alternateNames: ['Revelation of John'],
    testament: 'NT',
    chapterCount: 22,
    searchTerms: ['rev', 'revelation'],
    order: 66,
  },
]

export const BibleBooks = new Map<string, BibleBookDefinition>(
  BibleBookDefinitions.map((b) => [b.bookKey, b]),
)

export function getBibleBookDefinition(key: string) {
  if (!BibleBooks.has(key)) {
    return null
  }
  return BibleBooks.get(key)
}

export function searchBibleBookDefinitions(query: string) {
  const normalizedQuery = query.toLowerCase()
  return [...BibleBookDefinitions].filter(
    (b) =>
      b.searchTerms.includes(normalizedQuery) ||
      b.bookName.toLowerCase().indexOf(normalizedQuery) > -1 ||
      b.bookKey.toLowerCase().indexOf(normalizedQuery) > -1 ||
      b.alternateNames?.some(
        (n) => n.toLowerCase().indexOf(normalizedQuery) > -1,
      ),
  )
}

export function bookNameToBookKey(bookName: string) {
  const book = searchBibleBookDefinitions(bookName)[0]
  if (!book) {
    return null
  }
  return book.bookKey
}

export function verseToAddress(verse: Partial<BibleVerse>) {
  return `${verse.bookKey}:${verse.chapter}:${verse.verseNumber}`
}

export function addressToParts(address: string) {
  const parts = address.split(':')
  return {
    bookKey: parts[0],
    chapter: Number(parts[1]),
    verseNumber: Number(parts[2]),
  }
}
