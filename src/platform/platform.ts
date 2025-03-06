export enum Platform {
  Desktop,
  Tablet,
  Mobile,
}

export const getPlatform = (): Platform => {
  const userAgent = navigator.userAgent.toLowerCase()
  const isMobile = /android|webos|iphone|ipod|ipad|blackberry|iemobile/i.test(
    userAgent,
  )
  const isTablet =
    /ipad|android(?!.*mobile)|tablet/i.test(userAgent) &&
    !/android(?!.*mobile)/i.test(userAgent)

  if (isMobile) {
    return Platform.Mobile
  }

  if (isTablet) {
    return Platform.Tablet
  }

  return Platform.Desktop
}
