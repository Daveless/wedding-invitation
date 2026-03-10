export function capitalizeName(name: string): string {
  if (!name) return ''
  return name
    .toLowerCase()
    .split(' ')
    .map(word => {
      // Handle the edge case of empty strings from extra spaces
      if (!word) return ''
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}
