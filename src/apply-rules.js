const statusForVar = require('./status-for-var')

/**
 * Get the value of a variable from the environment.
 * @param  {String} varName
 * @param  {Object} [context=process.env]
 * @return {Object}
 */
const getValueFromEnv = (varName, context = process.env) => context[varName]

/**
 * Mutate the state of `context` (generally `process.env`)
 * to set the value of the missing var env.
 *
 * @param  {String} varName
 * @param  {Object} varDefault
 * @param  {Object} context
 * @return {Object}
 */
const processDefault = (varName, varDefault, context) => {
  context[varName] = varDefault
  return varDefault
}

/**
 * Apply the set of rules for the variable in question.
 * @param  {Object} rules
 * @param  {String} varName
 * @param  {Object} context
 * @return {String}
 */
module.exports = (rules, varName, context) => {
  // Get the current value of the variable from the environment.
  const originalValue = getValueFromEnv(varName, context)

  // Check if the variable is required and not present.
  if (rules.required && !originalValue) {
    // Return the error specifying that the variable is not present.
    return statusForVar(varName, new Error(`Missing ${varName}`))
  }

  // Check if the variable has a default and is not present.
  if (rules.default && !originalValue) {
    // Apply the fault to the variable.
    processDefault(varName, rules.default, context)
  }

  // Return the state, to give the script a reference.
  return statusForVar(varName)
}
