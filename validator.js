export function validateContract(expected, actual, path = "") {
  const errors = []

  for (const key in expected) {
    const expectedType = expected[key]
    const value = actual[key]
    const currentPath = path ? `${path}.${key}` : key

    if (value === undefined) {
      errors.push(`Missing field: ${currentPath}`)
      continue
    }

    if (typeof expectedType === "object" && !Array.isArray(expectedType)) {
      errors.push(...validateContract(expectedType, value, currentPath))
    } else {
      const actualType = Array.isArray(value) ? "array" : typeof value
      if (actualType !== expectedType) {
        errors.push(
          `Type mismatch at ${currentPath}: expected ${expectedType}, got ${actualType}`
        )
      }
    }
  }

  return errors
}
