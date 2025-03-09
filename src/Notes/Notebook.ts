export interface GlobalNote {
  id: string
  notes: string
  notebookId: string
}

export interface VerseNote {
  id: string
  order: number
  verseAddress: string
  notes?: string | null
  notebookId: string
  version?: string
  color?: string
}

export interface NotebookPage {
  id: string
  name: string
  verseNotes: VerseNote[]
  pageNotes: GlobalNote
  notebookId: string
}

export interface NotebookMeta {
  displayBibleVersion?: boolean
}

export interface Notebook {
  id: string
  name: string
  pages: NotebookPage[]
  globalNotes: GlobalNote[]
  version?: string
  meta?: NotebookMeta
  createdAt?: Date
  updatedAt?: Date
}
