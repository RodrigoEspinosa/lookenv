const applyRules = require('./apply-rules');
const loadConfig = require('./resolve-config');
const statusForVar = require('./status-for-var');

const getVarEnvs = config => Object.keys(config);

const getRuleForVarEnv = (config, varName) => config[varName];

const DEFAULT_PARAMS = {
  path: process.cwd(),
  context: process.env
};

module.exports = {
  /**
   * Load the configuration. This function is only exposed for testing.
   *
   * @param  {String}  path Path of the config (set of rules for the env.)
   * @return {Promise}
   */
  config: async ({ path } = DEFAULT_PARAMS) => {
    return loadConfig({ path });
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
    const { config } = await loadConfig({ path });

    // Get the variables (with rules) that are present in the config.
    const varEnvs = getVarEnvs(config);

    // Iterate over all the set of rules.
    const status = varEnvs.map(varName => {
      // Get the rules for the current variable.
      const rule = getRuleForVarEnv(config, varName);

      // If the set of rules is empty, continue to the next variable.
      if (!rule) {
        return statusForVar(varName);
      }

      // Apply the rules to the current variable.
      return applyRules(rule, varName, context);
    });

    // Filter the status of those that contains errors.
    const hasErrors = status.filter(({ status }) => status === 'error');

    // Check if there are errors in the status.
    if (hasErrors.length > 0) {
      throw new Error(hasErrors.map(({ error }) => error.message).join('\n'));
    }

    // Return the status.
    return status;
  }
};
