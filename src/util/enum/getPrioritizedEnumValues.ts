import getAllEnumValues from './getAllEnumValues'

/**
 * Get list of enum values starting with the prioritized one keeping the overall order.
 * @param priority Prioritizes enum value
 * @returns List of all enum values starting with the prioritized one
 */
export default function getPrioritizedEnumValues<T extends Record<string, unknown>>(anEnum: T, priority: T[keyof T]) : T[keyof T][] {
  const allValues = getAllEnumValues(anEnum)
  const currentIndex = allValues.indexOf(priority)
  const result : T[keyof T][] = []
  for (let i=currentIndex; i<allValues.length; i++) {
    result.push(allValues[i])
  }
  for (let i=0; i<currentIndex; i++) {
    result.push(allValues[i])
  }
  return result
}
