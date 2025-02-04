import { MkjvBibleDownloader } from '../downloaders/MkjvBibleDownloader'
import { type BibleVersionReader } from './BibleVersionReader'
import { IndexDbJsonBibleVersionReader } from './IndexDbJsonBibleVersionReader'

export class MkjvBibleVersionReader
  extends IndexDbJsonBibleVersionReader
  implements BibleVersionReader
{
  get version() {
    return 'mkjv'
  }
  static localDownloadVerified = false

  static bibleDataCache: any

  static rawDataPromise: Promise<any> | null = null

  async ensureLocalDownload() {
    if (!MkjvBibleVersionReader.localDownloadVerified) {
      const downloader = new MkjvBibleDownloader()
      const isDownloaded = await downloader.isBibleDownloaded()
      if (!isDownloaded) {
        await downloader.downloadBibleAndStoreInIndexDb()
      }
      MkjvBibleVersionReader.localDownloadVerified = true
    }
  }

  async getRawBibleJsonData() {
    let rawData = MkjvBibleVersionReader.bibleDataCache

    if (rawData) {
      return rawData
    }

    if (!MkjvBibleVersionReader.rawDataPromise) {
      MkjvBibleVersionReader.rawDataPromise = new Promise(async (resolve) => {
        await this.ensureLocalDownload()
        rawData = await this.getBibleJsonData(this.version)
        MkjvBibleVersionReader.bibleDataCache = rawData
        resolve(rawData)
      })
    }

    return MkjvBibleVersionReader.rawDataPromise
  }
}
