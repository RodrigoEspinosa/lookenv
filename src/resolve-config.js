const cosmiconfig = require('cosmiconfig');

const explorer = cosmiconfig('lookenv');

const DEFAULT_PATH = process.cwd()

const loadConfig = async ({ path = DEFAULT_PATH }) => {
  console.log({ path })

  try {
    const { config, filepath } = await explorer.load(path)
    return { config, filepath }
  }
  catch (parsingError) {
    console.error('Parsing error:', parsingError);
    return parsingError
  }
}

module.exports = loadConfig
