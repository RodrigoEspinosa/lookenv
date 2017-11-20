'use strict';

module.exports = (name, error) => {
  if (error) {
    return {
      name,
      status: 'error',
      error
    };
  }

  return {
    name,
    status: 'ok',
    error: null
  };
};
