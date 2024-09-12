import rollDiceDifferentValue from './rollDiceDifferentValue'

/**
 * Rolls a dice and returns multiple different values.
 * @param maxValue Max. dice value
 * @param count Number of random values to return
 * @returns Dice values
 */
export default function rollDiceMultiDifferentValue(maxValue: number, count: number) : number[] {
  const result : number[] = []
  for (let i = 0; i < count; i++) {
    result.push(rollDiceDifferentValue(maxValue, ...result))
  }
  return result
}
