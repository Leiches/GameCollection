
// Get a random value out of an array
export function randomRange<T>(values: T[]): T {
  if (values.length === 0) {
    throw new Error("The array is empty. Cannot select a random value.");
  }
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}
