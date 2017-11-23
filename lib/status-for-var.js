'use strict'

module.exports = function(name, error) {
  if (error) {
    return {
      name,
      status: 'error',
      error
    }
  }

  return {
    name,
    status: 'ok',
    error: null
  }
}
