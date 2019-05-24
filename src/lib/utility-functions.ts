export function purge<T>(inventory: Array<T>): Array<T> {
  return inventory.slice(2);
}
