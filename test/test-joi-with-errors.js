const test = require('ava');
const dotenv = require('dotenv');
const lookenv = require('../src');

const PATH_TO_DOT_ENV = `${__dirname}/.env-for-joi-with-errors`;
const PATH_TO_LOOK_ENV = `${__dirname}/lookenv-with-joi-errors.config.js`;

test('import lookenv-with-joi-errors.config.js and throw error on missing vars', async t => {
  dotenv.config({ path: PATH_TO_DOT_ENV });

  const error = await t.throws(lookenv.validate({ path: PATH_TO_LOOK_ENV }));

  t.is(error.message, '"SOMETHING_MISSING" is required');

  t.is(process.env.A_NUMBER, '1');
  t.is(process.env.A_STRING, 'testing');
  t.is(process.env.AN_OBJECT, '{ testing: true }');

  t.falsy(process.env.A_NUMBER_WITH_DEFAULTS);
  t.falsy(process.env.A_STRING_WITH_DEFAULTS);

  t.pass();
});
