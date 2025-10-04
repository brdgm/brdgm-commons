/**
 * Converts a value from a form field to a number.
 * Only a real number is accepted, everything else results 0.
 * @param value Value to convert
 * @return Number value
 */
export default function toNumber(value? : unknown) : number {
  if (typeof value == 'number') {
    return value
  }
  else {
    return 0
  }
}
