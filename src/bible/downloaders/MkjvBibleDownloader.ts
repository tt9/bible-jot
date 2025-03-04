import { JsonBibleDownloader } from './JsonBibleDownloader'

export class MkjvBibleDownloader extends JsonBibleDownloader {
  static downloadPromise: Promise<boolean> | null = null

  async isBibleDownloaded(): Promise<boolean> {
    return this.isBibleVersionDownloaded('mkjv')
  }
  protected async fetchBibleData(): Promise<string> {
    const response = await fetch('/bibles/MKJV.json')
    return response.text()
  }
  downloadBibleAndStoreInIndexDb(): Promise<boolean> {
    if (!MkjvBibleDownloader.downloadPromise) {
      MkjvBibleDownloader.downloadPromise =
        this.downloadBibleAsJsonAndStoreInIndexDb('mkjv')
    }
    return MkjvBibleDownloader.downloadPromise
  }
}
