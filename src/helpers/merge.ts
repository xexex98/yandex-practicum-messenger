type Indexed<T = unknown> = {
  [key in string]: T;
};

/**
  merge({ a: { b: { a: 2 } }, d: 5 }, { a: { b: { c: 1 } } });

  {
    a: {
      b: {
        a: 2,
        c: 1
      }
    },
    d: 5
  }
*/
function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const result: Indexed = { ...lhs };

  for (const key in rhs) {
    if (typeof rhs[key] === "object" && rhs[key] !== null) {
      if (typeof lhs[key] === "object" && lhs[key] !== null) {
        result[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
      } else {
        result[key] = { ...(rhs[key] as Indexed) };
      }
    } else {
      result[key] = rhs[key];
    }
  }

  return result;
}

export default merge;
