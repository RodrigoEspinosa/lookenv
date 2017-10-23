# lookenv
> Set rules for the environment variables in your project.

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]

`lookenv` can check if all the variables you need are present before starting your app. It also can set defaults for those variables that are not present. Works fine with `dotenv` or `dotenv-safe`.


<!-- ![](header.png) -->

## Installation


```sh
npm install lookenv --save

# Or with yarn
yarn add lookenv
```

## Usage example

Create a `lookenv.config.js` file, or `.lookenvrc` that exposes a JSON like the following:

```js
module.exports = {
  MY_ENV_VAR: {
    required: true
  },
  MY_SECOND_ENV_VAR: {
    default: 'testing'
  }
}
```

In order to get started with `lookenv` you need to setup a *validate* script, and call that script to know if all the env vars are present before continuing.

```js
const lookenv = require('lookenv')


lookenv.validate()
  .then(() => {
    process.exit(0)
  })
  .catch(error => {
    console.error(error)

    process.exit(1)
  })
```

You can save that file in the project root, and call it from the startup script. Or (and this is the recommended) just from the `package.json`, like:

```json
{
  "scripts": {
    "start": "node ./lookenv-validate.js && node index.js"
  }
}
```

Or, in your app entry point (but remember that `lookenv.validate` is async!):

```js
require('dotenv').config()

require('lookenv').validate()
  .then(() => {
    // ... your app goes here, basically...
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
```

_At the moment, lookenv only exposes a procedural approach for checking the rules. I will look into making a binary to test it without having to write that sample file._

#### With `dotenv`

If you have a file just for the `lookenv.validate` (as the example above), then you would need to set the `require('dotenv').config()` on the first line of both files, the `lookenv-validate.js` **and** the entry point of your app.

```js
require('dotenv').config()

lookenv.validate()
  .then(() => {
    process.exit(0)
  })
  .catch(error => {
    console.error(error)

    process.exit(1)
  })
```

#### With `dotenv-safe`

`dotenv-safe` will take care of the required ENV VARS from the `.env.example.js`, you can setup extra required variables or use `lookenv` just for setting defaults. That's actually encourage as a transition.

The code would look the same as "With `dotenv`" but replacing `dotenv` with `dotenv-safe`.

#### Using it just for setting defaults

Everything would be the same, but you can use the simplified `lookenv.config.js` (or `.lookenvrc`) json that matches every key with a default.

```json
{
  "MY_ENV_VAR": "my-default",
  "MY_2ND_ENV_VAR": "other-default"
}
```

You can also combine them!

```json
{
  "MY_ENV_VAR": "my-default",
  "MY_2ND_ENV_VAR": {
    "required": true
  }
}
```

## API

**`lookenv.config({ path })`**
This method will only call the config and return the set of rules, it won't do any validation.

**`lookenv.validate({ path, context })`**
This method will get the config for the `lookenv.config.js` (or `.lookenvrc`) from the current working directory (using `process.cwd()`), unless you specify a `path` to the config file in question.

After that, it will validate the `context` (that is `process.env` as default) and apply all the defaults.

If there is a required variable that isn't present, it will throw an error specifying the missing variables.

## Development setup

This project use `ava` to run tests. Just [fork it](https://github.com/RodrigoEspinosa/lookenv/fork).

```sh
npm test

# Or with yarn
yarn test
```

## Release History

* 0.2.0
    * ADD: Tests
    * ADD: Add simplified method for setting defaults
* 0.1.0
    * First proper release
* 0.0.1
    * Work in progress

## Meta

REC – [@reciam](https://twitter.com/reciam) – yo@rec.cool

Distributed under the MIT license. See ``LICENSE`` for more information.

[https://github.com/RodrigoEspinosa/lookenv](https://github.com/RodrigoEspinosa/lookenv)

## Contributing

1. Fork it (<https://github.com/RodrigoEspinosa/lookenv/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/lookenv.svg?style=flat-square
[npm-url]: https://npmjs.org/package/lookenv
[npm-downloads]: https://img.shields.io/npm/dm/lookenv.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/RodrigoEspinosa/lookenv/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/RodrigoEspinosa/lookenv
