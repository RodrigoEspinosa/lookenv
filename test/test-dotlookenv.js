const test = require('ava')
const lookenv = require('../lib')

const PATH_TO_DOT_LOOKENV = `${__dirname}/.lookenvrc`

test('import .lookenvrc file', async t => {
  await lookenv.validate({ path: PATH_TO_DOT_LOOKENV })

  t.is(process.env.TESTING_DEFAULT_NUMBER, '1234')
  t.is(process.env.TESTING_DEFAULT_STRING, '1234')

  t.pass()
})
