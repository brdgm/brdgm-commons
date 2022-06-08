/**
 * Rolls a dice.
 * @param maxValue Max. dice value
 * @returns Dice value
 */
export default function(maxValue: number) : number {
  return Math.floor(Math.random() * maxValue) + 1
}
