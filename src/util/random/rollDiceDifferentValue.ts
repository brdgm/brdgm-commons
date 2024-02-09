import rollDice from './rollDice'

/**
 * Rolls a dice, and ensures to return a different value than the given current value.
 * @param maxValue Max. dice value
 * @param currentValue Current value
 * @returns Dice value
 */
export default function rollDiceDifferentValue(maxValue: number, currentValue: number) : number {  
  if (maxValue < 2) {
    throw new Error(`Unable to roll a dice ${maxValue} with a different value`)
  }
  const newNumber = rollDice(maxValue)
  if (newNumber != currentValue) {
    return newNumber
  }
  else {
    return rollDiceDifferentValue(maxValue, currentValue)
  }
}
