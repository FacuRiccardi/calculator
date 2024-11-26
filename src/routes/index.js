const express = require('express')

// Routes
const calculatorRoutes = require('./calculator')

const router = express.Router()

router.use('/calculator', calculatorRoutes)

module.exports = router
