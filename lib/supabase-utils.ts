export function parseJsonFields<T extends Record<string, unknown>>(
  data: T | null,
  fields: (keyof T)[]
): T | null {
  if (!data) return data;
  for (const field of fields) {
    const val = data[field];
    if (typeof val === 'string') {
      try {
        data[field] = JSON.parse(val) as T[keyof T];
      } catch {
        data[field] = (Array.isArray(val) ? [] : {}) as T[keyof T];
      }
    }
  }
  return data;
}

export function parseJsonField<T>(value: unknown): T {
  if (typeof value === 'string') {
    try { return JSON.parse(value) as T; } catch { return value as T; }
  }
  return value as T;
}
