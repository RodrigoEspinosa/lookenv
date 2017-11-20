'use strict';

function _toArray(arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
}

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

require('babel-polyfill');

var dotenv = require('dotenv');
var program = require('commander');

var _require = require('child_process'),
  spawn = _require.spawn;

var _require2 = require('./index'),
  validate = _require2.validate;

var _require3 = require('../package.json'),
  version = _require3.version;

// Define the options for the program.

program
  .version(version)
  .option('-d --dotenv [path]', 'Config dotenv before executive lookenv')
  .option('-p --path <path>', 'Path to the config file', process.cwd());

module.exports.run = (function() {
  var _ref = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(args) {
      var dotenvConfig, _program$args, childProgram, childProgramArgs;

      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                // Parse the arguments.
                program.parse(args);

                _context.prev = 1;

                // Check if dotenv should be loaded before, with optional path.
                if (program.dotenv) {
                  // Set the dotenv path if this is specified.
                  dotenvConfig =
                    program.dotenv !== true ? { path: program.dotenv } : {};

                  // Load dotenv.

                  dotenv.config(dotenvConfig);
                }

                // Validate (the path is the current working directory as default.)
                _context.next = 5;
                return validate({ path: program.path });

              case 5:
                if (!(program.args.length < 1)) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt('return', process.exit(0));

              case 7:
                // Get the program and its arguments, which is everything after `--`.
                (_program$args = _toArray(program.args)),
                  (childProgram = _program$args[0]),
                  (childProgramArgs = _program$args.slice(1));

                // Spawn the program.

                spawn(childProgram, childProgramArgs, { stdio: 'inherit' });
                _context.next = 15;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context['catch'](1);

                // Log the error into the console. This specifies the variable names.
                console.error(_context.t0);

                // Exit the script with a `1` status code as there was an error.
                process.exit(1);

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        undefined,
        [[1, 11]]
      );
    })
  );

  return function(_x) {
    return _ref.apply(this, arguments);
  };
})();
