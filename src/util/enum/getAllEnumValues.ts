/**
 * Gets all values of an enum (supports both number and string enums).
 * @param anEnum Enum type
 * @returns All enum values
 */
export default function<T extends Record<string, unknown>>(anEnum: T): T[keyof T][] {
  let enumValues = Object.keys(anEnum)
    .map(n => Number.parseInt(n))
    .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]

  if (enumValues.length == 0) {
    // seems to be a string enum - use values directly
    enumValues = Object.values(anEnum) as unknown as T[keyof T][]
  }

  return enumValues
}
