import { LebBibleDownloader } from '../../downloaders/LebBibleDownloader'
import { LitvBibleDownloader } from '../../downloaders/LitvBibleDownloader'
import { type BibleVersionReader } from '../BibleVersionReader'
import { IndexDbJsonBibleVersionReader } from './IndexDbJsonBibleVersionReader'

export class LebBibleVersionReader
  extends IndexDbJsonBibleVersionReader
  implements BibleVersionReader
{
  get version() {
    return 'leb'
  }
  static localDownloadVerified = false

  static bibleDataCache: any

  static rawDataPromise: Promise<any> | null = null

  async ensureLocalDownload() {
    if (!LebBibleVersionReader.localDownloadVerified) {
      const downloader = new LebBibleDownloader()
      const isDownloaded = await downloader.isBibleDownloaded()
      if (!isDownloaded) {
        await downloader.downloadBibleAndStoreInIndexDb()
      }
      LebBibleVersionReader.localDownloadVerified = true
    }
  }

  async getRawBibleJsonData() {
    let rawData = LebBibleVersionReader.bibleDataCache

    if (rawData) {
      return rawData
    }

    if (!LebBibleVersionReader.rawDataPromise) {
      LebBibleVersionReader.rawDataPromise = new Promise(async (resolve) => {
        await this.ensureLocalDownload()
        rawData = await this.getBibleJsonData(this.version)
        LebBibleVersionReader.bibleDataCache = rawData
        resolve(rawData)
      })
    }

    return LebBibleVersionReader.rawDataPromise
  }
}
