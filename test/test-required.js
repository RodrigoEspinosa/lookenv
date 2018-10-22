const test = require('ava')
const dotenv = require('dotenv')
const lookenv = require('../src')

const PATH_TO_DOT_ENV = `${__dirname}/.env-for-required`
const PATH_TO_LOOK_ENV = `${__dirname}/lookenv-for-required.config.js`

test('import .env file', t => {
  dotenv.config({ path: PATH_TO_DOT_ENV })

  t.is(process.env.A_NUMBER, '1')
  t.is(process.env.A_STRING, 'testing')
  t.is(process.env.AN_OBJECT, '{ testing: true }')

  t.pass()
})

test.serial('import .config file with a missing required', async t => {
  dotenv.config({ path: PATH_TO_DOT_ENV })

  const error = await t.throws(lookenv.validate({ path: PATH_TO_LOOK_ENV }))

  t.is(error.message, '"SOMETHING_ELSE_REQUIRED" is required')

  t.is(process.env.A_NUMBER, '1')
  t.is(process.env.A_STRING, 'testing')
  t.is(process.env.AN_OBJECT, '{ testing: true }')

  t.pass()
})

test('import .config file with everything present', async t => {
  dotenv.config({ path: PATH_TO_DOT_ENV })

  // Set the required variable before validation, any value is ok.
  process.env.SOMETHING_ELSE_REQUIRED = true

  await lookenv.validate({ path: PATH_TO_LOOK_ENV })

  t.is(process.env.A_NUMBER, '1')
  t.is(process.env.A_STRING, 'testing')
  t.is(process.env.AN_OBJECT, '{ testing: true }')

  t.pass()
})
