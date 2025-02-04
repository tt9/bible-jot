import { BibleObjectStoreName, getDb } from '../../data/AppIndexDb'
import { BibleDownloader } from './BibleDownloader'

export abstract class JsonBibleDownloader extends BibleDownloader {
  protected async downloadBibleAsJsonAndStoreInIndexDb(
    version: string,
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const isDownloaded = await this.isBibleVersionDownloaded(version)
      if (isDownloaded) {
        resolve(true)
        return
      }

      const db = await getDb()
      let bibleData = await this.fetchBibleData()

      const addRecordsTransaction = db.transaction(
        BibleObjectStoreName,
        'readwrite',
      )
      addRecordsTransaction.oncomplete = () => {
        console.log('All records have been added to the database.')
        resolve(true)
      }

      addRecordsTransaction.onerror = (event) => {
        console.error('Error adding records to the database:', event)
        reject(false)
      }

      const addRecordsStore =
        addRecordsTransaction.objectStore(BibleObjectStoreName)

      const record = {
        version,
        data: bibleData,
      }
      addRecordsStore.add(record)
    })
  }
}
