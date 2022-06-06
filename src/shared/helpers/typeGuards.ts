export const isArrayOfStrings = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((current) => typeof current === 'string');
