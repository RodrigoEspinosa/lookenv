const test = require('ava')
const dotenv = require('dotenv')
const lookenv = require('../lib')

const PATH_TO_DOT_ENV = `${__dirname}/.env-for-defaults`
const PATH_TO_LOOK_ENV = `${__dirname}/lookenv-for-defaults.config.js`

test('import .env file', t => {
  dotenv.config({ path: PATH_TO_DOT_ENV })

  t.is(process.env.A_NUMBER, '1')
  t.is(process.env.A_STRING, 'testing')
  t.is(process.env.AN_OBJECT, '{ testing: true }')

  t.pass()
})

test('import .config file', async t => {
  dotenv.config({ path: PATH_TO_DOT_ENV })

  await lookenv.validate({ path: PATH_TO_LOOK_ENV })

  t.is(process.env.A_NUMBER, '1')
  t.is(process.env.A_STRING, 'testing')
  t.is(process.env.AN_OBJECT, '{ testing: true }')

  t.is(process.env.A_NUMBER_WITH_DEFAULTS, '7')
  t.is(process.env.A_STRING_WITH_DEFAULTS, 'seven')
  t.deepEqual(JSON.parse(process.env.AN_OBJECT_WITH_DEFAULTS), {
    testing: true
  })

  t.pass()
})
