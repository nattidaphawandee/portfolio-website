export function checkMatchStringInArray(Array1: string[], Array2: string[]) {
  return Array1.every((v) => Array2.includes(v))
}