export function deepCopy<T>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepCopy(item)) as T;
  }

  const copiedObj: { [key in keyof T]?: T[key] } = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copiedObj[key] = deepCopy(obj[key]);
    }
  }
  return copiedObj as T;
}
