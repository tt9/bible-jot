import {
  getDb,
  NotebookObjectStoreName,
  promisifyDbRequest,
} from '../data/AppIndexDb'
import { v4 as uuidv4 } from 'uuid'
import type { Notebook } from './Notebook'

const createDefaultNotebook = (partialNotebook: Partial<Notebook>) => {
  const notebookId = uuidv4()

  const notebook = {
    id: notebookId,
    name: partialNotebook.name,
    version: partialNotebook.version,
    createdAt: new Date().toUTCString(),
    pages: [
      {
        name: '_',
        notebookId: notebookId,
        verseNotes: [],
        pageNotes: { id: uuidv4(), notes: '', notebookId: notebookId },
      },
    ],
    meta: {
      displayBibleVersion: true,
    },
  }
  return notebook
}

export const getNotebookFromIndexDb = async (notebookId: string) => {
  const db = await getDb()

  const store = db
    .transaction(NotebookObjectStoreName)
    .objectStore(NotebookObjectStoreName)

  const result = await promisifyDbRequest(store.get(notebookId))

  return result
}

export const createNotebookInIndexDb = async (
  partialNotebook: Partial<Notebook>,
) => {
  const db = await getDb()

  const store = db
    .transaction(NotebookObjectStoreName, 'readwrite')
    .objectStore(NotebookObjectStoreName)

  const result = await promisifyDbRequest(
    store.add(createDefaultNotebook(partialNotebook)),
  )

  return result
}

export const updateNotebookInIndexDb = async (
  notebookId: string,
  partialNotebook: Partial<Notebook>,
) => {
  const db = await getDb()

  const store = db
    .transaction(NotebookObjectStoreName, 'readwrite')
    .objectStore(NotebookObjectStoreName)

  const result = await promisifyDbRequest(
    store.put({
      ...partialNotebook,
      id: notebookId,
      updatedAt: new Date(),
    } as Partial<Notebook>),
  )

  return result
}

export const getNotebooksFromIndexDb = async (
  options: {
    limit?: number
    offset?: number
    orderByIndex?: string
    orderDirection?: 'asc' | 'desc'
  } = {},
): Promise<Partial<Notebook>[]> => {
  const db = await getDb()

  const { limit, offset, orderByIndex, orderDirection } = options

  return new Promise((resolve, reject) => {
    const store = db
      .transaction(NotebookObjectStoreName)
      .objectStore(NotebookObjectStoreName)

    const results: {
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
    }[] = []

    let cursor: IDBRequest<IDBCursorWithValue | null>

    if (orderByIndex) {
      cursor = store
        .index(orderByIndex)
        .openCursor(null, orderDirection === 'desc' ? 'prev' : 'next')
    } else {
      cursor = store.openCursor()
    }

    let offsetCounter = offset
    cursor.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result
      if (cursor) {
        const { id, name, createdAt, updatedAt } = cursor.value
        if (offsetCounter) {
          offsetCounter--
        } else {
          results.push({
            id,
            name,
            createdAt,
            updatedAt,
          })
        }
        if (results.length !== limit) {
          cursor.continue()
        } else {
          resolve(results)
        }
      } else {
        resolve(results)
      }
    }

    store.openCursor().onerror = (event) => {
      console.error('Error opening cursor:', event)
      reject(event)
    }
  })
}

export const deleteNotebookFromIndexDb = async (id: string) => {
  const db = await getDb()

  const store = db
    .transaction(NotebookObjectStoreName, 'readwrite')
    .objectStore(NotebookObjectStoreName)

  await promisifyDbRequest(store.delete(id))
}

export const downloadNotebook = async (notebookId: string) => {
  const notebook = await getNotebookFromIndexDb(notebookId)
  if (!notebook) {
    return false
  }

  const filename = `${notebook.name}.jot`
  const data = btoa(JSON.stringify(notebook))
  const blob = new Blob([data], { type: 'application/json' })

  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename

  document.body.appendChild(a)
  a.click()

  document.body.removeChild(a)
  URL.revokeObjectURL(a.href)
}
