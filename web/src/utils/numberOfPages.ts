export function calculateNumberOfPages(lastPage: number) {
  let i = 1
  const pages = []
  while (i <= lastPage) {
    pages.push(i)
    i++
  }
  return pages
}
