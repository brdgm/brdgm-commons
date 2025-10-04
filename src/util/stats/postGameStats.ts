/**
 * Posts game stats anonymously to a Google Form.
 * This is done asynchronously to avoid blocking the UI.
 * @param data Game stats data
 * @param formsURL URL for the Google Form to post data to. If not set, not data is posted.
 * @param fieldMapping Field mapping string to map data properties to form entry IDs with syntax `fieldName:entryID;fieldName2:entryID2`.
 */
export default function postGameStats(data: object, formsURL?:string, fieldMapping?: string) : void {
  if (!formsURL) {
    // skip silently if no URL is configured
    return
  }

  const mapping = parseFieldMapping(fieldMapping)
  const formData = new FormData()

  // Map data properties to form field names
  Object.entries(data).forEach(([key, value]) => {
    const fieldName = mapping.get(key)
    if (fieldName && value !== undefined && value !== null) {
      formData.append(fieldName, String(value))
    }
  })

  // Post data asynchronously
  fetch(formsURL, {
    method: 'POST',
    body: formData,
    mode: 'no-cors' // Google Forms requires no-cors mode
  })
  .catch((error) => {
    console.error(`Failed to post game stats to ${formsURL}: `, error)
  })
}

function parseFieldMapping(fieldMapping?: string) : Map<string, string> {
  const map = new Map<string, string>()
  if (fieldMapping) {
    fieldMapping.split(';').forEach((pair: string) => {
      const [key, value] = pair.split(':')
      if (key && value) {
        map.set(key, value)
      }
    })
  }
  return map
}
