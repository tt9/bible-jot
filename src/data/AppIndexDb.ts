const dbVersion = 1
let dbPromise: Promise<IDBDatabase> | null = null

// App Database
export const AppDatabaseName = 'bible_jot'

// Bible Datastore
export const BibleObjectStoreName = 'bible_data'
export const BibleVersionIndexName = 'bible_version_index'

// Notebook Datastore
export const NotebookObjectStoreName = 'notebook_data'

const createDbV1 = (db: IDBDatabase) => {
  if (!db.objectStoreNames.contains(BibleObjectStoreName)) {
    // Create initial data store
    const bibleStore = db.createObjectStore(BibleObjectStoreName, {
      keyPath: 'id',
      autoIncrement: true,
    })

    // Create bible version index
    bibleStore.createIndex(BibleVersionIndexName, 'version', {
      unique: false,
    })
  }
  if (!db.objectStoreNames.contains(NotebookObjectStoreName)) {
    db.createObjectStore(NotebookObjectStoreName, {
      keyPath: 'id',
    })
  }
}

const openDbV1 = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open(AppDatabaseName, dbVersion)

    dbRequest.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      createDbV1(db)
    }

    dbRequest.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      resolve(db)
    }

    dbRequest.onerror = (event) => {
      console.error('Error opening database:', event)
      reject(event)
    }
  })
}

const openDb = (): Promise<IDBDatabase> => {
  switch (dbVersion) {
    case 1:
      return openDbV1()
    default:
      throw new Error('Unsupported database version')
  }
}

export const getDb = async (): Promise<IDBDatabase> => {
  if (!dbPromise) {
    dbPromise = openDb()
  }
  return dbPromise
}

export const promisifyDbRequest = <T>(request: IDBRequest<T>) => {
  return new Promise<T>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}
