import type { BibleVersionReader } from './BibleVersionReader'
import { KjvBibleVersionReader } from './indexdb/KjvBibleVersionReader'
import { LitvBibleVersionReader } from './indexdb/LitvBibleVersionReader'
import { MkjvBibleVersionReader } from './indexdb/MkjvBibleVersionReader'

export class BibleVersionReaderFactory {
  static create(version: string): BibleVersionReader {
    switch (version) {
      case 'kjv':
        return new KjvBibleVersionReader()
      case 'mkjv':
        return new MkjvBibleVersionReader()
      case 'litv':
        return new LitvBibleVersionReader()
    }
    throw new Error(`Unknown bible version: ${version}`)
  }
}
