'use strict'

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments)
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg)
          var value = info.value
        } catch (error) {
          reject(error)
          return
        }
        if (info.done) {
          resolve(value)
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step('next', value)
            },
            function(err) {
              step('throw', err)
            }
          )
        }
      }
      return step('next')
    })
  }
}

require('babel-polyfill')

var validateJoi = require('./validate-joi')
var loadConfig = require('./resolve-config')
var validatePlain = require('./validate-plain')

var DEFAULT_PARAMS = {
  path: process.cwd(),
  context: process.env

  /**
   * Check if the config is using joi.
   * @param  {Object}  config
   * @return {Boolean}
   */
}
var isUsingJoi = function isUsingJoi() {
  var config =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
  return config.isJoi
}

module.exports = {
  /**
   * Load the configuration. This function is only exposed for testing.
   *
   * @param  {String}  path Path of the config (set of rules for the env.)
   * @return {Promise}
   */
  config: (function() {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
        var _ref2 =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : DEFAULT_PARAMS,
          path = _ref2.path

        return regeneratorRuntime.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  return _context.abrupt('return', loadConfig({ path }))

                case 1:
                case 'end':
                  return _context.stop()
              }
            }
          },
          _callee,
          undefined
        )
      })
    )

    function config() {
      return _ref.apply(this, arguments)
    }

    return config
  })(),

  /**
   *  Validate the context (generally `process.env`.)
   *
   * @param  {String}  path
   * @param  {Object}  [context=process.env]
   * @return {Promise}
   */
  validate: (function() {
    var _ref3 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee2() {
        var _ref4 =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : DEFAULT_PARAMS,
          path = _ref4.path,
          _ref4$context = _ref4.context,
          context = _ref4$context === undefined ? process.env : _ref4$context

        var _ref5, config

        return regeneratorRuntime.wrap(
          function _callee2$(_context2) {
            while (1) {
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  _context2.next = 2
                  return loadConfig({ path })

                case 2:
                  _ref5 = _context2.sent
                  config = _ref5.config
                  return _context2.abrupt(
                    'return',
                    isUsingJoi(config)
                      ? validateJoi(config, context)
                      : validatePlain(config, context)
                  )

                case 5:
                case 'end':
                  return _context2.stop()
              }
            }
          },
          _callee2,
          undefined
        )
      })
    )

    function validate() {
      return _ref3.apply(this, arguments)
    }

    return validate
  })()
}
