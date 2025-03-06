export enum ViewportSizeCategory {
  ExtraSmall,
  Small,
  Medium,
  Large,
  ExtraLarge,
}

export function getViewportSize(): ViewportSizeCategory {
  const width = window.innerWidth

  if (width < 576) {
    return ViewportSizeCategory.ExtraSmall
  } else if (width < 768) {
    return ViewportSizeCategory.Small
  } else if (width < 992) {
    return ViewportSizeCategory.Medium
  } else if (width < 1200) {
    return ViewportSizeCategory.Large
  } else {
    return ViewportSizeCategory.ExtraLarge
  }
}
