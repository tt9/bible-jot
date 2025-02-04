import {
  getDb,
  NotebookObjectStoreName,
  promisifyDbRequest,
} from '../data/AppIndexDb'
import { v4 as uuidv4 } from 'uuid'
import type { Notebook } from './Notebook'

export const createTestNotebook = async (
  name: string,
): Promise<IDBValidKey> => {
  const id = '123456'
  const notebook: Notebook = {
    id: id,
    name: name,
    version: 'kjv',
    meta: {
      displayBibleVersion: true,
    },
    pages: [
      {
        id: '1',
        name: 'Page 1',
        notebookId: id,
        verseNotes: [],
      },
    ],
    globalNotes: [],
    createdAt: new Date().toUTCString(),
  }

  const db = await getDb()

  const store = db
    .transaction(NotebookObjectStoreName, 'readwrite')
    .objectStore(NotebookObjectStoreName)

  const result = await promisifyDbRequest(store.add(notebook))

  return result
}

export const getNotebookFromIndexDb = async (notebookId: string) => {
  const db = await getDb()

  const store = db
    .transaction(NotebookObjectStoreName)
    .objectStore(NotebookObjectStoreName)

  const result = await promisifyDbRequest(store.get(notebookId))

  return result
}

export const createNotebook = async (notebookName: string) => {
  const db = await getDb()

  const store = db
    .transaction(NotebookObjectStoreName, 'readwrite')
    .objectStore(NotebookObjectStoreName)

  const result = await promisifyDbRequest(
    store.add({ id: uuidv4(), name: notebookName }),
  )

  return result
}

export const getNotebooksFromIndexDb = async (): Promise<
  Partial<Notebook>[]
> => {
  const db = await getDb()

  return new Promise((resolve, reject) => {
    const store = db
      .transaction(NotebookObjectStoreName)
      .objectStore(NotebookObjectStoreName)

    const results: {
      id: string
      name: string
      createdAt: string
      updatedAt: string
    }[] = []

    store.openCursor().onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result
      if (cursor) {
        console.log(cursor.value)
        const { id, name, createdAt, updatedAt } = cursor.value
        results.push({
          id,
          name,
          createdAt,
          updatedAt,
        })
        cursor.continue()
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
