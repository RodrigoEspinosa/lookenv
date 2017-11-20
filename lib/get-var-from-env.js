'use strict';

module.export = function(varName) {
  var context =
    arguments.length > 1 && arguments[1] !== undefined
      ? arguments[1]
      : process.env;
  return context[varName];
};
