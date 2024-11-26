const express = require('express')
const { celebrate, Segments } = require('celebrate')

// Controllers
const calculatorController = require('../controllers/calculator')

// Schemas
const schemas = require('../schemas/calculator')

const router = express.Router()

router.post('/',
  celebrate({
    [Segments.BODY]: schemas.calculator
  }),
  calculatorController.calculateExpression)

module.exports = router
