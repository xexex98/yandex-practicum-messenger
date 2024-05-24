type Indexed = Record<string, unknown>;

/**
 * set({ foo: 5 }, 'bar.baz', 10);
 * { foo: 5, bar: { baz: 10 } };
 * set(3, 'foo.bar', 'baz');
 * 3
 */

function set<T extends Indexed>(obj: T, path: string, value: unknown): T {
  if (typeof path !== "string") {
    throw new Error("path must be string");
  }

  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const keys = path.split(".");
  let current: Indexed = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    if (!current[key] || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key] as Indexed;
  }

  current[keys[keys.length - 1]] = value;

  return obj;
}

export default set;
