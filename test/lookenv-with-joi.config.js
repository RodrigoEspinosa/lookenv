const Joi = require('joi')

module.exports = Joi.object().keys({
  TESTING: Joi.string().required(),
  A_NUMBER: Joi.number().required(),
  A_STRING: Joi.string().required(),
  AN_OBJECT: Joi.string().required(),

  A_PORT: Joi.number()
    .positive()
    .default(3000),

  A_NUMBER_WITH_DEFAULTS: Joi.number().default(7),
  A_STRING_WITH_DEFAULTS: Joi.string().default('seven')
})
