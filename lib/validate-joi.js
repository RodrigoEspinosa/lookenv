'use strict';

const statusForVar = require('./status-for-var');

const JOI_OPTIONS = {
  stripUnknown: true
};

module.exports = async (config, context) => {
  try {
    // Validate the config using Joi, passing all the context.
    const value = await config.validate(context, JOI_OPTIONS);

    // Iterate over all the values after the config.
    const res = Object.keys(value).map(name => {
      // Ensure that every value after the validation, exist in the context (generally `process.env`).
      // This is so the default values created after the validation, are present there.
      context[name] = value[name];

      // Append the variable using the common status object.
      return statusForVar(name);
    });

    // Return the collection of all the variables' status. Same as in the plain validation.
    return res;
  } catch (error) {
    // Map the error message to be the same as the plain validation, and throw the error.
    throw new Error(error.details.map(error => error.message).join('\n'));
  }
};
