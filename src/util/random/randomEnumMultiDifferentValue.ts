import randomEnumDifferentValue from './randomEnumDifferentValue'

/**
 * Gets multiple random enum values from all available enums.
 * @param anEnum Enum type
 * @param count Number of random values to return
 * @returns Random enum values
 */
export default function randomEnumMultiDifferentValue<T extends Record<string, unknown>>(anEnum: T, count: number): T[keyof T][] {
  const result : T[keyof T][] = []
  for (let i = 0; i < count; i++) {
    result.push(randomEnumDifferentValue(anEnum, ...result))
  }
  return result
}
