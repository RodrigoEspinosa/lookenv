const program = require("commander");
const { validate } = require("./index");

const { version } = require("../package.json");

// Define the options for the program.
program
  .version(version)
  .option("-p --path <path>", "Path to the config file", process.cwd());

module.exports.run = async args => {
  // Parse the arguments.
  program.parse(args);

  try {
    // Validate (the path is the current working directory as default.)
    await validate({ path: program.path });

    // Exit the script with a `0` status code as everything went ok.
    process.exit(0);
  } catch (error) {
    // Log the error into the console. This specifies the variable names.
    console.error(error);

    // Exit the script with a `1` status code as there was an error.
    process.exit(1);
  }
};
