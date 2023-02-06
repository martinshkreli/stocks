export function getRandomElement<T>(arr: T[]): T {
  const min = 0
  const max = arr.length
  const randIndex = Math.floor(Math.random() * (max - min) + min)
  return arr[randIndex]
}
