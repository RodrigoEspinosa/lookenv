# lookenv

<img alt="lookenv" title="lookenv" width="256" src="https://github.com/RodrigoEspinosa/lookenv/blob/82e61a67e8f1d5fee0eb95cbbc0327dac74254f7/lookenv.png" align="right" />

> Set rules for the environment variables in your project.

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]

`lookenv` can check if all the variables you need are present before starting your app. It also can set defaults for those variables that are not present. Works fine with `dotenv` or `dotenv-safe`.


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

Then, add `lookenv` to the `package.json` start script, before the app starts but after dotenv (if you are using it!).

```json
{
  "start": "lookenv -- node index.js"
}
```

You can also specify a path to the config file, or the directory where the config file by passing `--path` or `-p`.

```json
{
  "start": "lookenv --path=lookenv.config.js -- node index.js"
}
```

### With `dotenv`

You can pass a `--dotenv` (or `-d` for short) to the cli to load `dotenv` before
validating the env vars.

```json
  "start": "lookenv --dotenv -- node index.js"
```

_You can optionally pass the location of your `.env` in the `--dotenv` option,
like `lookenv --dotenv=/path/to/custom/env -- node index.js`._

<!--
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
-->

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


## Programmatic use

```js
const lookenv = require('lookenv')

lookenv.validate()
  .then(() => {
    // ... your app goes here, basically...
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
```

_Remember that `lookenv.validate` is async._

## Development setup

This project use `ava` to run tests. Just [fork it](https://github.com/RodrigoEspinosa/lookenv/fork).

```sh
npm test

# Or with yarn
yarn test
```

## Release History

* 0.4.0
    * Add out-of-the-box `dotenv` option.

* 0.3.0
    * ADD: CLI to validate easily
    * ADD: Logo

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

**Credits of the logo goes to [@guillecura](http://guillecura.co/).**

## Contributing

1. Fork it (<https://github.com/RodrigoEspinosa/lookenv/fork>)
2. Create your feature branch (`git checkout -b feature/foo-bar`)
3. Commit your changes (`git commit -am 'Add some foo and bar'`)
4. Push to the branch (`git push origin feature/foo-bar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/lookenv.svg?style=flat-square
[npm-url]: https://npmjs.org/package/lookenv
[npm-downloads]: https://img.shields.io/npm/dm/lookenv.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/RodrigoEspinosa/lookenv/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/RodrigoEspinosa/lookenv
