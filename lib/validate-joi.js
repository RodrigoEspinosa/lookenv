'use strict';

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step('next', value);
            },
            function(err) {
              step('throw', err);
            }
          );
        }
      }
      return step('next');
    });
  };
}

var statusForVar = require('./status-for-var');

var JOI_OPTIONS = {
  stripUnknown: true
};

module.exports = (function() {
  var _ref = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(config, context) {
      var value, res;
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return config.validate(context, JOI_OPTIONS);

              case 3:
                value = _context.sent;

                // Iterate over all the values after the config.
                res = Object.keys(value).map(function(name) {
                  // Ensure that every value after the validation, exist in the context (generally `process.env`).
                  // This is so the default values created after the validation, are present there.
                  context[name] = value[name];

                  // Append the variable using the common status object.
                  return statusForVar(name);
                });

                // Return the collection of all the variables' status. Same as in the plain validation.

                return _context.abrupt('return', res);

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](0);
                throw new Error(
                  _context.t0.details
                    .map(function(error) {
                      return error.message;
                    })
                    .join('\n')
                );

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        undefined,
        [[0, 8]]
      );
    })
  );

  return function(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
