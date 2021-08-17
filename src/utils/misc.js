function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function isNumeric(value) {
  return /^\d+$/.test(value)
}
