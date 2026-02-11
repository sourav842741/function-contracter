import { validateContract } from "./validator.js"

function contract(name, expectedSchema, options = {}) {
  const { log = true, throwError = false } = options

  return function (data) {
    const errors = validateContract(expectedSchema, data)

    if (errors.length > 0) {
      const message = `\n❌ CONTRACT VIOLATION in "${name}"\n` +
        errors.map(e => " - " + e).join("\n")

      if (log) console.error(message)
      if (throwError) throw new Error(message)
    }

    return data
  }
}

export default contract
