import randomEnum from "./randomEnum"

/**
 * Gets a random enum value from all available enums.
 * @param anEnum Enum type
 * @param currentValue Current value which will not be returned
 * @returns Random enum value
 */
export default function randomEnumDifferentValue<T extends Record<string, unknown>> (anEnum: T, currentValue: T[keyof T]): T[keyof T] {
  if (Object.keys(anEnum).length < 2 && Object.values(anEnum).length < 2) {
    throw new Error(`Unable to randomly choose a different value from an enum with a single value`)
  }
  const newValue = randomEnum(anEnum)
  if (newValue != currentValue) {
    return newValue
  }
  else {
    return randomEnumDifferentValue(anEnum, currentValue)
  }
}
