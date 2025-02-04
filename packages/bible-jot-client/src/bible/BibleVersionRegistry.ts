import { KjvBibleVersionReader } from './readers/KjvBibleVersionReader'
import { MkjvBibleVersionReader } from './readers/MkjvBibleVersionReader'
import { LitvBibleVersionReader } from './readers/LitvBibleVersionReader'

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
    version: 'litv',
    name: "Green's Literal Version",
    reader: LitvBibleVersionReader,
    local: true,
  },
]
