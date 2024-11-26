const Joi = require('joi')

const schemas = {
  calculator: Joi.object().keys({
    expression: Joi.string().required()
  })
}

module.exports = schemas
