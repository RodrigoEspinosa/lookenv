'use strict'

var isRequired = function isRequired(rules) {
  return rules.required
}

var hasDefault = function hasDefault(rules) {
  return rules.default
}

/**
 * BOOK OF RULES.
 */
module.exports = {
  isRequired,
  hasDefault
}
