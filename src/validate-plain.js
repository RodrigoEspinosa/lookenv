const applyRules = require('./apply-rules')
const statusForVar = require('./status-for-var')

/**
 * Get the variable names from the config.
 * @param  {Object} config
 * @return {Array}
 */
const getVarEnvs = config => Object.keys(config)

/**
 * Get the rules for a variable based on the name and the config.
 * @param  {Object} config
 * @param  {String} varName
 * @return {Object}
 */
const getRuleForVarEnv = (config, varName) => config[varName]

module.exports = (config, context) => {
  // Get the variables (with rules) that are present in the config.
  const varEnvs = getVarEnvs(config)

  // Iterate over all the set of rules.
  const status = varEnvs.map(varName => {
    // Get the rules for the current variable.
    const rule = getRuleForVarEnv(config, varName)

    // If the set of rules is empty, continue to the next variable.
    if (!rule) {
      return statusForVar(varName)
    }

    // Apply the rules to the current variable.
    return applyRules(rule, varName, context)
  })

  // Filter the status of those that contains errors.
  const hasErrors = status.filter(({ status }) => status === 'error')

  // Check if there are errors in the status.
  if (hasErrors.length > 0) {
    throw new Error(hasErrors.map(({ error }) => error.message).join('\n'))
  }

  // Return the status.
  return status
}
