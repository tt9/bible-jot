import { JsonBibleDownloader } from './JsonBibleDownloader'

export class KjvBibleDownloader extends JsonBibleDownloader {
  static downloadPromise: Promise<boolean> | null = null

  async isBibleDownloaded(): Promise<boolean> {
    return this.isBibleVersionDownloaded('kjv')
  }
  protected async fetchBibleData(): Promise<string> {
    const response = await fetch('/bibles/KJV.json')
    return response.text()
  }
  downloadBibleAndStoreInIndexDb(): Promise<boolean> {
    if (!KjvBibleDownloader.downloadPromise) {
      KjvBibleDownloader.downloadPromise =
        this.downloadBibleAsJsonAndStoreInIndexDb('kjv')
    }
    return KjvBibleDownloader.downloadPromise
  }
}
