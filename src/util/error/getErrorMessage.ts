import TranslatableError from './TranslatableError'

/**
 * Get error message for error
 * @param err Error object
 * @param translateError Translate error message
 * @returns Error message
 */
export default function(err : unknown, translateError: (error : TranslatableError) => string) : string {
  let message
  if (err instanceof TranslatableError) {
    message = translateError(err)
  }
  else if (err instanceof Error) {
    message = err.message
  }
  else {
    message = err as string
  }
  return message
}
