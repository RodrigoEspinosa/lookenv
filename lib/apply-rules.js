'use strict';

var statusForVar = require('./status-for-var');

var _require = require('./rules'),
  isRequired = _require.isRequired,
  hasDefault = _require.hasDefault;

/**
 * Get the value of a variable from the environment.
 * @param  {String} varName
 * @param  {Object} [context=process.env]
 * @return {Object}
 */

var getValueFromEnv = function getValueFromEnv(varName) {
  var context =
    arguments.length > 1 && arguments[1] !== undefined
      ? arguments[1]
      : process.env;
  return context[varName];
};

/**
 * Mutate the state of `context` (generally `process.env`)
 * to set the value of the missing var env.
 *
 * @param  {String} varName
 * @param  {Object} varDefault
 * @param  {Object} context
 * @return {Object}
 */
var processDefault = function processDefault(varName, varDefault, context) {
  context[varName] = varDefault;

  if (typeof varDefault === 'object') {
    context[varName] = JSON.stringify(varDefault);
  }

  return varDefault;
};

/**
 * Apply the set of rules for the variable in question.
 * @param  {Object} rules
 * @param  {String} varName
 * @param  {Object} context
 * @return {String}
 */
module.exports = function(rules, varName, context) {
  // Get the current value of the variable from the environment.
  var originalValue = getValueFromEnv(varName, context);

  // Check if the variable is required and not present.
  if (isRequired(rules) && !originalValue) {
    // Return the error specifying that the variable is not present.
    return statusForVar(varName, new Error(`"${varName}" is required`));
  }

  // Check if the variable has a default and is not present.
  if (hasDefault(rules) && !originalValue) {
    // Apply the fault to the variable.
    processDefault(varName, hasDefault(rules), context);
  }

  // Return the state, to give the script a reference.
  return statusForVar(varName);
};
