const dbVersion = 1
let dbPromise: Promise<IDBDatabase> | null = null

// App Database
export const AppDatabaseName = 'bible_jot'

// Bible Datastore
export const BibleObjectStoreName = 'bible_data'
export const BibleVersionIndexName = 'bible_version_index'

// Notebook Datastore
export const NotebookObjectStoreName = 'notebook_data'
export const NotebookUpdatedAtIndex = 'notebook_updated_at_index'
export const NotebookCreatedAtIndex = 'notebook_created_at_index'

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
    const notebookStore = db.createObjectStore(NotebookObjectStoreName, {
      keyPath: 'id',
    })

    notebookStore.createIndex(NotebookUpdatedAtIndex, 'updatedAt', {
      unique: false,
    })

    notebookStore.createIndex(NotebookCreatedAtIndex, 'createdAt', {
      unique: false,
    })
  }
}

const openDb = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    /**
Example for future migrations 
const request = indexedDB.open("MyDatabase", 2); // Increment version (e.g., from 1 to 2)

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const oldVersion = event.oldVersion;
  const newVersion = event.newVersion;

  console.log(`Upgrading from version ${oldVersion} to ${newVersion}`);

  if (oldVersion < 1) {
    // Initial database setup
    const store = db.createObjectStore("MyStore", { keyPath: "id" });
    store.createIndex("dateIndex", "date", { unique: false });
  }

  if (oldVersion < 2) {
    // Migration for version 2: Add a new index
    const store = event.target.transaction.objectStore("MyStore");
    store.createIndex("statusIndex", "status", { unique: false });
  }
};

     */
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
