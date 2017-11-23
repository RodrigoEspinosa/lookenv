'use strict'

var applyRules = require('./apply-rules')
var statusForVar = require('./status-for-var')

/**
 * Get the variable names from the config.
 * @param  {Object} config
 * @return {Array}
 */
var getVarEnvs = function getVarEnvs(config) {
  return Object.keys(config)
}

/**
 * Get the rules for a variable based on the name and the config.
 * @param  {Object} config
 * @param  {String} varName
 * @return {Object}
 */
var getRuleForVarEnv = function getRuleForVarEnv(config, varName) {
  return config[varName]
}

module.exports = function(config, context) {
  // Get the variables (with rules) that are present in the config.
  var varEnvs = getVarEnvs(config)

  // Iterate over all the set of rules.
  var status = varEnvs.map(function(varName) {
    // Get the rules for the current variable.
    var rule = getRuleForVarEnv(config, varName)

    // If the set of rules is empty, continue to the next variable.
    if (!rule) {
      return statusForVar(varName)
    }

    // Apply the rules to the current variable.
    return applyRules(rule, varName, context)
  })

  // Filter the status of those that contains errors.
  var hasErrors = status.filter(function(_ref) {
    var status = _ref.status
    return status === 'error'
  })

  // Check if there are errors in the status.
  if (hasErrors.length > 0) {
    throw new Error(
      hasErrors
        .map(function(_ref2) {
          var error = _ref2.error
          return error.message
        })
        .join('\n')
    )
  }

  // Return the status.
  return status
}
