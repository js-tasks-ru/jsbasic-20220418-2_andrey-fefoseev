function filterRange(arr, a, b) {
  return arr.filter((item) =>
  { return (a <= item && b >= item) })
}