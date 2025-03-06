const iconCacheMap = new Map<string, string>()
export function useIconCache() {
  return {
    setIconData(key: string, data: string) {
      iconCacheMap.set(key, data)
    },
    getCachedIconData(key: string) {
      return iconCacheMap.get(key)
    },
    hasIconData(key: string) {
      return iconCacheMap.has(key)
    },
  }
}
