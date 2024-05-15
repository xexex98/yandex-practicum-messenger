/**
 *
 * const objects = [{ a: 1 }, { b: 2, c: 3 }];
 * const deep = cloneDeep(objects);
 * deep[0] === objects[0] => false
 */
function cloneDeep<T>(obj: T): T {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => cloneDeep(item)) as T;
  }

  if (obj instanceof Map) {
    const clonedMap = new Map();

    obj.forEach((value, key) => {
      clonedMap.set(cloneDeep(key), cloneDeep(value));
    });
    return clonedMap as T;
  }

  if (obj instanceof Set) {
    const clonedSet = new Set();

    obj.forEach((value) => {
      clonedSet.add(cloneDeep(value));
    });
    return clonedSet as T;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  const clone = {} as T;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = cloneDeep(obj[key]);
    }
  }
  return clone;
}

export default cloneDeep;
