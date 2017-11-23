require('babel-polyfill')

const validateJoi = require('./validate-joi')
const loadConfig = require('./resolve-config')
const validatePlain = require('./validate-plain')

const DEFAULT_PARAMS = {
  path: process.cwd(),
  context: process.env
}

/**
 * Check if the config is using joi.
 * @param  {Object}  config
 * @return {Boolean}
 */
const isUsingJoi = (config = {}) => config.isJoi

module.exports = {
  /**
   * Load the configuration. This function is only exposed for testing.
   *
   * @param  {String}  path Path of the config (set of rules for the env.)
   * @return {Promise}
   */
  config: async ({ path } = DEFAULT_PARAMS) => {
    return loadConfig({ path })
  },

  /**
   *  Validate the context (generally `process.env`.)
   *
   * @param  {String}  path
   * @param  {Object}  [context=process.env]
   * @return {Promise}
   */
  validate: async ({ path, context = process.env } = DEFAULT_PARAMS) => {
    // Load the config (using cosiconfig.)
    const { config } = await loadConfig({ path })

    // Check if it should use the plan validation or with joi.
    return isUsingJoi(config)
      ? validateJoi(config, context)
      : validatePlain(config, context)
  }
}
