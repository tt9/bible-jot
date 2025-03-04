import { JsonBibleDownloader } from './JsonBibleDownloader'

export class LitvBibleDownloader extends JsonBibleDownloader {
  static downloadPromise: Promise<boolean> | null = null

  async isBibleDownloaded(): Promise<boolean> {
    return this.isBibleVersionDownloaded('litv')
  }
  protected async fetchBibleData(): Promise<string> {
    const response = await fetch('/bibles/LITV.json')
    return response.text()
  }
  downloadBibleAndStoreInIndexDb(): Promise<boolean> {
    if (!LitvBibleDownloader.downloadPromise) {
      LitvBibleDownloader.downloadPromise =
        this.downloadBibleAsJsonAndStoreInIndexDb('litv')
    }
    return LitvBibleDownloader.downloadPromise
  }
}
