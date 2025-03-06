import { KjvBibleVersionReader } from './readers/indexdb/KjvBibleVersionReader'
import { MkjvBibleVersionReader } from './readers/indexdb/MkjvBibleVersionReader'
import { LitvBibleVersionReader } from './readers/indexdb/LitvBibleVersionReader'
import { LebBibleVersionReader } from './readers/indexdb/LebBibleVersionReader'

export const BibleVersionRegistry = [
  {
    version: 'kjv',
    name: 'King James Version',
    reader: KjvBibleVersionReader,
    local: true,
  },
  {
    version: 'mkjv',
    name: 'Modern King James Version',
    reader: MkjvBibleVersionReader,
    local: true,
  },
  {
    version: 'leb',
    name: 'Lexham English Bible',
    reader: LebBibleVersionReader,
    local: true,
  },
  {
    version: 'litv',
    name: "Green's Literal Version",
    reader: LitvBibleVersionReader,
    local: true,
  },
]

export const BibleVersionRegistryMap = BibleVersionRegistry.reduce(
  (map, entry) => {
    map[entry.version] = entry
    return map
  },
  {} as Record<string, (typeof BibleVersionRegistry)[number]>,
)
