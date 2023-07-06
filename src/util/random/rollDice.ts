/**
 * Rolls a dice.
 * @param maxValue Max. dice value
 * @returns Dice value
 */
export default function rollDice(maxValue: number) : number {
  if (maxValue < 1) {
    throw new Error(`Unable to roll a dice ${maxValue}`)
  }
  return Math.floor(Math.random() * maxValue) + 1
}
