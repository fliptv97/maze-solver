export function Point(x, y) {
  return Object.freeze({ x, y });
}

export function Tuple(...items) {
  return Object.freeze([...items])
}
