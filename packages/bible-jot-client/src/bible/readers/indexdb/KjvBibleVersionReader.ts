import { KjvBibleDownloader } from '../../downloaders/KjvBibleDownloader'
import { type BibleVersionReader } from '../BibleVersionReader'
import { IndexDbJsonBibleVersionReader } from './IndexDbJsonBibleVersionReader'

export class KjvBibleVersionReader
  extends IndexDbJsonBibleVersionReader
  implements BibleVersionReader
{
  static localDownloadVerified = false

  static bibleDataCache: any

  static rawDataPromise: Promise<any> | null = null

  get version(): string {
    return 'kjv'
  }

  async ensureLocalDownload() {
    if (!KjvBibleVersionReader.localDownloadVerified) {
      const downloader = new KjvBibleDownloader()
      const isDownloaded = await downloader.isBibleDownloaded()
      if (!isDownloaded) {
        await downloader.downloadBibleAndStoreInIndexDb()
      }
      KjvBibleVersionReader.localDownloadVerified = true
    }
  }

  async getRawBibleJsonData() {
    let rawData = KjvBibleVersionReader.bibleDataCache

    if (rawData) {
      return rawData
    }

    if (!KjvBibleVersionReader.rawDataPromise) {
      KjvBibleVersionReader.rawDataPromise = new Promise(async (resolve) => {
        await this.ensureLocalDownload()
        rawData = await this.getBibleJsonData(this.version)
        KjvBibleVersionReader.bibleDataCache = rawData
        resolve(rawData)
      })
    }

    return KjvBibleVersionReader.rawDataPromise
  }
}
