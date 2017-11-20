'use strict';

const fs = require('fs');
const cosmiconfig = require('cosmiconfig');

// Set the default path as the current working directory.
const DEFAULT_PATH = process.cwd();

/**
 * Transform for the config file, mapping the defaults values
 * that were written using the simplified form into the standard form.
 * @param  {Object} config
 * @return {Object}
 */
const cleanConfig = config => {
  // Check if the config is using `joi` instead of a plain object.
  if (config.isJoi) {
    // Bypass the transformation.
    return config;
  }

  return Object.keys(config).reduce((collection, item) => {
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
const explorer = cosmiconfig('lookenv', {
  transform: async ({ config, filepath }) => {
    return { config: cleanConfig(config), filepath };
  }
});

/**
 * Check if the path is a directory.
 * @param  {String}  path
 * @return {Boolean}
 */
const isDir = path => fs.statSync(path).isDirectory();

module.exports = async ({ path = DEFAULT_PATH }) => {
  const [directory, pathToConfigFile] = isDir(path)
    ? [path, undefined]
    : [null, path];

  try {
    // Load the config.
    const { config, filepath } = await explorer.load(
      directory,
      pathToConfigFile
    );

    // Return the config and filepath.
    return { config, filepath };
  } catch (parsingError) {
    // Log any errors.
    console.error('Parsing error:', parsingError);
    return parsingError;
  }
};
