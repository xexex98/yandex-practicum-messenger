type TIndexed<T = unknown> = {
  [key in string]: T;
};

function isEqual<T>(obj1: TIndexed<T>, obj2: TIndexed<T>): boolean {
  if (obj1 === obj2) {
    return true;
  }

  if (obj1 == null || obj2 == null) {
    return false;
  }

  if (typeof obj1 !== "object" && typeof obj2 !== "object") {
    return obj1 === obj2;
  }

  if (obj1.constructor !== obj2.constructor) {
    return false;
  }

  if (obj1 instanceof Date && obj2 instanceof Date) {
    return (obj1 as Date).getTime() === (obj2 as Date).getTime();
  }

  if (Array.isArray(obj1)) {
    if (!Array.isArray(obj2) || obj1.length !== obj2.length) {
      return false;
    }
    for (let i = 0; i < obj1.length; i++) {
      if (!isEqual(obj1[i], obj2[i])) {
        return false;
      }
    }
    return true;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }

    if (!isEqual(obj1[key] as TIndexed<T>, obj2[key] as TIndexed<T>)) {
      return false;
    }
  }

  return true;
}

export default isEqual;
