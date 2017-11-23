require('babel-polyfill')

const dotenv = require('dotenv')
const program = require('commander')
const { spawn } = require('child_process')

const { validate } = require('./index')
const { version } = require('../package.json')

// Define the options for the program.
program
  .version(version)
  .option('-d --dotenv [path]', 'Config dotenv before executive lookenv')
  .option('-p --path <path>', 'Path to the config file', process.cwd())

module.exports.run = async args => {
  // Parse the arguments.
  program.parse(args)

  try {
    // Check if dotenv should be loaded before, with optional path.
    if (program.dotenv) {
      // Set the dotenv path if this is specified.
      const dotenvConfig =
        program.dotenv !== true ? { path: program.dotenv } : {}

      // Load dotenv.
      dotenv.config(dotenvConfig)
    }

    // Validate (the path is the current working directory as default.)
    await validate({ path: program.path })

    // Spaw the program.
    if (program.args.length < 1) {
      // Exit the script with a `0` status code as everything went ok.
      return process.exit(0)
    }

    // Get the program and its arguments, which is everything after `--`.
    const [childProgram, ...childProgramArgs] = program.args

    // Spawn the program.
    spawn(childProgram, childProgramArgs, { stdio: 'inherit' })
  } catch (error) {
    // Log the error into the console. This specifies the variable names.
    console.error(error)

    // Exit the script with a `1` status code as there was an error.
    process.exit(1)
  }
}
