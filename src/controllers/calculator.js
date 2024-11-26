const ExpressionCalculator = require('../services/ExpressionCalculator')

const calculator = new ExpressionCalculator()

const calculateExpression = (req, res) => {
  try {
    const { expression } = req.body

    const result = calculator.calculate(expression)

    res.status(200).send({ result })
  } catch (e) {
    console.log(e)
    res.status(500).send({ message: 'Something went wrong' })
  }
}

module.exports = {
  calculateExpression
}
