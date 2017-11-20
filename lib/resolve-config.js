'use strict';

var _slicedToArray = (function() {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (
        var _i = arr[Symbol.iterator](), _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i['return']) _i['return']();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  return function(arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance'
      );
    }
  };
})();

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

var fs = require('fs');
var cosmiconfig = require('cosmiconfig');

// Set the default path as the current working directory.
var DEFAULT_PATH = process.cwd();

/**
 * Transform for the config file, mapping the defaults values
 * that were written using the simplified form into the standard form.
 * @param  {Object} config
 * @return {Object}
 */
var cleanConfig = function cleanConfig(config) {
  // Check if the config is using `joi` instead of a plain object.
  if (config.isJoi) {
    // Bypass the transformation.
    return config;
  }

  return Object.keys(config).reduce(function(collection, item) {
    // Check if the value of the item is not an object with the rules,
    // but a literal value.
    if (['string', 'number', 'boolean'].includes(typeof config[item])) {
      // In that case, assing the literal value as the variable default.
      collection[item] = {
        default: config[item]
      };

      // Otherwise, use the set of rules for the
      // variable as stablished in the config file.
    } else {
      collection[item] = config[item];
    }

    // Return the modified collection.
    return collection;
  }, {});
};

// Load the config for the package name `lookenv`.
var explorer = cosmiconfig('lookenv', {
  transform: (function() {
    var _ref2 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee(_ref) {
        var config = _ref.config,
          filepath = _ref.filepath;
        return regeneratorRuntime.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  return _context.abrupt('return', {
                    config: cleanConfig(config),
                    filepath
                  });

                case 1:
                case 'end':
                  return _context.stop();
              }
            }
          },
          _callee,
          undefined
        );
      })
    );

    function transform(_x) {
      return _ref2.apply(this, arguments);
    }

    return transform;
  })()
});

/**
 * Check if the path is a directory.
 * @param  {String}  path
 * @return {Boolean}
 */
var isDir = function isDir(path) {
  return fs.statSync(path).isDirectory();
};

module.exports = (function() {
  var _ref4 = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(_ref3) {
      var _ref3$path = _ref3.path,
        path = _ref3$path === undefined ? DEFAULT_PATH : _ref3$path;

      var _ref5, _ref6, directory, pathToConfigFile, _ref7, config, filepath;

      return regeneratorRuntime.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                (_ref5 = isDir(path) ? [path, undefined] : [null, path]),
                  (_ref6 = _slicedToArray(_ref5, 2)),
                  (directory = _ref6[0]),
                  (pathToConfigFile = _ref6[1]);
                _context2.prev = 1;
                _context2.next = 4;
                return explorer.load(directory, pathToConfigFile);

              case 4:
                _ref7 = _context2.sent;
                config = _ref7.config;
                filepath = _ref7.filepath;
                return _context2.abrupt('return', { config, filepath });

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](1);

                // Log any errors.
                console.error('Parsing error:', _context2.t0);
                return _context2.abrupt('return', _context2.t0);

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        },
        _callee2,
        undefined,
        [[1, 10]]
      );
    })
  );

  return function(_x2) {
    return _ref4.apply(this, arguments);
  };
})();
