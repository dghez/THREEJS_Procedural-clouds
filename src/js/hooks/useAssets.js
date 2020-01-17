export default function useAssets(path) {
  const src = ''

  if (path) {
    try {
      return require(`~assets/${path}`)
    } catch (err) {
      console.warn(err)
    }
  }

  return src
}
