
/**
 * 检测某些变量不为undefined的guard
 *
 * @export
 * @template T
 * @param {T} [obj]
 * @param {string} [errMessage]
 * @returns
 * @deprecated use assertIsDefined instead
 */
export function mustDefined<T>(obj?: T, errMessage?: string) {
  if (obj === undefined) {
    throw new Error(errMessage);
  }

  return obj;
}