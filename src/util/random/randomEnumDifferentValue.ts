import randomEnum from './randomEnum'

/**
 * Gets a random enum value from all available enums.
 * @param anEnum Enum type
 * @param currentValue Current value(s) which will not be returned
 * @returns Random enum value
 */
export default function randomEnumDifferentValue<T extends Record<string, unknown>> (anEnum: T, ...currentValue: T[keyof T][]): T[keyof T] {
  const totalValues = Math.max(Object.keys(anEnum).length, Object.values(anEnum).length)
  if (totalValues < 2 || currentValue.length > totalValues - 1) {
    throw new Error(`Unable to randomly choose a different value from an enum with a single value.`)
  }
  const newValue = randomEnum(anEnum)
  if (!currentValue.includes(newValue)) {
    return newValue
  }
  else {
    return randomEnumDifferentValue(anEnum, ...currentValue)
  }
}
