
export function assertIsDefined<T>(val?: T, message?: string): asserts val is T {
  if (val === undefined || val === null) {
    throw new Error(message);
  }
}
