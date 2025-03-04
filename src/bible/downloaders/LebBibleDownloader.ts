import { JsonBibleDownloader } from './JsonBibleDownloader'

export class LebBibleDownloader extends JsonBibleDownloader {
  static downloadPromise: Promise<boolean> | null = null

  async isBibleDownloaded(): Promise<boolean> {
    return this.isBibleVersionDownloaded('leb')
  }
  protected async fetchBibleData(): Promise<string> {
    const response = await fetch('/bibles/LEB.json')
    return response.text()
  }
  downloadBibleAndStoreInIndexDb(): Promise<boolean> {
    if (!LebBibleDownloader.downloadPromise) {
      LebBibleDownloader.downloadPromise =
        this.downloadBibleAsJsonAndStoreInIndexDb('leb')
    }
    return LebBibleDownloader.downloadPromise
  }
}
