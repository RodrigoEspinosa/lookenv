const test = require('ava')
const dotenv = require('dotenv')
const lookenv = require('../lib')

const PATH_TO_DOT_ENV = `${__dirname}/.env-for-joi`
const PATH_TO_LOOK_ENV = `${__dirname}/lookenv-with-joi.config.js`

test.before('import lookenv-with-joi.config.js file', async t => {
  dotenv.config({ path: PATH_TO_DOT_ENV })
  await lookenv.validate({ path: PATH_TO_LOOK_ENV })
})

test('lookenv with joi, .env values are present', t => {
  t.is(process.env.A_NUMBER, '1')
  t.is(process.env.A_STRING, 'testing')
  t.is(process.env.AN_OBJECT, '{ testing: true }')
})

test('lookenv with joi, default values are present', t => {
  t.is(process.env.A_NUMBER_WITH_DEFAULTS, '7')
  t.is(process.env.A_STRING_WITH_DEFAULTS, 'seven')
})

test('ilookenv with joi, custom validations are working', t => {
  t.is(process.env.A_PORT, '3333')
})
