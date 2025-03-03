import {
  BibleObjectStoreName,
  BibleVersionIndexName,
  getDb,
} from '../../data/AppIndexDb'

export abstract class BibleDownloader {
  public abstract isBibleDownloaded(): Promise<boolean>

  public abstract downloadBibleAndStoreInIndexDb(): Promise<boolean>

  protected abstract fetchBibleData(): Promise<string>

  /**
   * Checks the indexdb object store if a record for
   * this bible version already exists.
   * Unfortunately this doesn't check for data corruption
   * and if the records is in the db but not correct
   * we won't know.
   */
  protected async isBibleVersionDownloaded(version: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const db = await getDb()
      const store = db
        .transaction(BibleObjectStoreName)
        .objectStore(BibleObjectStoreName)
      const versionIndex = store.index(BibleVersionIndexName)
      const versionCountRequest = versionIndex.count(version)
      versionCountRequest.onsuccess = (event) => {
        const countResult = (event.target as IDBRequest).result
        if (countResult > 0) {
          resolve(true)
        } else {
          resolve(false)
        }
      }

      versionCountRequest.onerror = (event) => {
        console.error('Error counting records:', event)
        reject(false)
      }
    })
  }
}
