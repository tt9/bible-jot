import { LitvBibleDownloader } from '../downloaders/LitvBibleDownloader'
import { type BibleVersionReader } from './BibleVersionReader'
import { IndexDbJsonBibleVersionReader } from './IndexDbJsonBibleVersionReader'

export class LitvBibleVersionReader
  extends IndexDbJsonBibleVersionReader
  implements BibleVersionReader
{
  get version() {
    return 'litv'
  }
  static localDownloadVerified = false

  static bibleDataCache: any

  static rawDataPromise: Promise<any> | null = null

  async ensureLocalDownload() {
    if (!LitvBibleVersionReader.localDownloadVerified) {
      const downloader = new LitvBibleDownloader()
      const isDownloaded = await downloader.isBibleDownloaded()
      if (!isDownloaded) {
        await downloader.downloadBibleAndStoreInIndexDb()
      }
      LitvBibleVersionReader.localDownloadVerified = true
    }
  }

  async getRawBibleJsonData() {
    let rawData = LitvBibleVersionReader.bibleDataCache

    if (rawData) {
      return rawData
    }

    if (!LitvBibleVersionReader.rawDataPromise) {
      LitvBibleVersionReader.rawDataPromise = new Promise(async (resolve) => {
        await this.ensureLocalDownload()
        rawData = await this.getBibleJsonData(this.version)
        LitvBibleVersionReader.bibleDataCache = rawData
        resolve(rawData)
      })
    }

    return LitvBibleVersionReader.rawDataPromise
  }
}
