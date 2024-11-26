const { faker } = require('@faker-js/faker')

const ExpressionCalculator = require('../../src/services/ExpressionCalculator')

const randomInt = () => faker.number.int({ min: -100000, max: 100000 })
const randomFloat = () => faker.number.float({ min: -100000, max: 100000 })

describe('ExpressionCalculator', () => {
  const calculator = new ExpressionCalculator()
  describe('calculateExpression', () => {
    it('should return correct sum when adding two numbers', () => {
      const firstNumber = randomInt()
      const secondNumber = randomInt()

      const nums = [firstNumber.toString(), secondNumber.toString()]
      const operator = '+'

      const result = calculator.calculateExpression(nums, operator)

      expect(result).toBe(firstNumber + secondNumber)
    })
    it('should return correct subtraction when subtracting two numbers', () => {
      const firstNumber = randomInt()
      const secondNumber = randomInt()

      const nums = [firstNumber.toString(), secondNumber.toString()]
      const operator = '-'

      const result = calculator.calculateExpression(nums, operator)

      expect(result).toBe(firstNumber - secondNumber)
    })
    it('should return correct multiplication when multiplying two numbers', () => {
      const firstNumber = randomInt()
      const secondNumber = randomInt()

      const nums = [firstNumber.toString(), secondNumber.toString()]
      const operator = '*'

      const result = calculator.calculateExpression(nums, operator)

      expect(result).toBe(firstNumber * secondNumber)
    })
    it('should return correct division when dividing two numbers', () => {
      const firstNumber = randomInt()
      const secondNumber = randomInt()

      const nums = [firstNumber.toString(), secondNumber.toString()]
      const operator = '/'

      const result = calculator.calculateExpression(nums, operator)

      expect(result).toBe(firstNumber / secondNumber)
    })
    it('should return correct sum when adding two float numbers', () => {
      const firstNumber = randomFloat()
      const secondNumber = randomFloat()

      const nums = [firstNumber.toString(), secondNumber.toString()]
      const operator = '+'

      const result = calculator.calculateExpression(nums, operator)

      expect(result).toBe(firstNumber + secondNumber)
    })
    it('should return correct subtraction when subtracting two float numbers', () => {
      const firstNumber = randomFloat()
      const secondNumber = randomFloat()

      const nums = [firstNumber.toString(), secondNumber.toString()]
      const operator = '-'

      const result = calculator.calculateExpression(nums, operator)

      expect(result).toBe(firstNumber - secondNumber)
    })
    it('should return correct multiplication when multiplying two float numbers', () => {
      const firstNumber = randomFloat()
      const secondNumber = randomFloat()

      const nums = [firstNumber.toString(), secondNumber.toString()]
      const operator = '*'

      const result = calculator.calculateExpression(nums, operator)

      expect(result).toBe(firstNumber * secondNumber)
    })
    it('should return correct division when dividing two float numbers', () => {
      const firstNumber = randomFloat()
      const secondNumber = randomFloat()

      const nums = [firstNumber.toString(), secondNumber.toString()]
      const operator = '/'

      const result = calculator.calculateExpression(nums, operator)

      expect(result).toBe(firstNumber / secondNumber)
    })
  })

  describe('calculateOperations', () => {
    it('should calculate result for array with two numbers and one operator', () => {
      const firstNumber = randomInt()
      const secondNumber = randomFloat()
      const executionOrder = [firstNumber, secondNumber, '+']
      const result = calculator.calculateOperations(executionOrder)
      expect(result).toBe(firstNumber + secondNumber)
    })
    it('should calculate result for array with four numbers and three operators', () => {
      const firstNumber = randomInt()
      const secondNumber = randomFloat()
      const thirdNumber = randomInt()
      const fourthNumber = randomFloat()

      const executionOrder = [firstNumber, secondNumber, thirdNumber, '*', fourthNumber, '+', '*']
      const result = calculator.calculateOperations(executionOrder)
      expect(result).toBe(firstNumber * ((secondNumber * thirdNumber) + fourthNumber))
    })
  })

  describe('processOperators', () => {
    it('should push operator to empty stack when processing first operator', () => {
      const operators = []
      const output = []

      calculator.processOperators('+', operators, output)

      expect(operators).toEqual(['+'])
      expect(output).toEqual([])
    })
    it('should add operator to empty operators stack without affecting output', () => {
      const operators = []
      const output = ['5', '3']

      calculator.processOperators('*', operators, output)

      expect(operators).toEqual(['*'])
      expect(output).toEqual(['5', '3'])
    })
    it('should pop operators with higher or equal priority from stack to output', () => {
      const operators = ['*', '+']
      const output = []

      calculator.processOperators('-', operators, output)

      expect(operators).toEqual(['-'])
      expect(output).toEqual(['+', '*'])
    })
    it('should pop operator from stack and push to output when processing operator with equal priority', () => {
      const operators = ['+']
      const output = []

      calculator.processOperators('+', operators, output)

      expect(operators).toEqual(['+'])
      expect(output).toEqual(['+'])
    })
    it('should process operators in correct order based on priority', () => {
      const operators = ['+', '*']
      const output = []

      calculator.processOperators('-', operators, output)

      expect(operators).toEqual(['-'])
      expect(output).toEqual(['*', '+'])
    })
  })

  describe('calculateOperationOrder', () => {
    it('should convert arithmetic expression to postfix notation when given numbers and operators', () => {
      const expression = '3+4*2'
      const result = calculator.calculateOperationOrder(expression)
      expect(result).toEqual(['3', '4', '2', '*', '+'])
    })
    it('should convert expression with decimal numbers to postfix notation', () => {
      const expression = '3.5+4.2*2'
      const result = calculator.calculateOperationOrder(expression)
      expect(result).toEqual(['3.5', '4.2', '2', '*', '+'])
    })
    it('should convert complex arithmetic expression to postfix notation when given numbers, operators, and parentheses', () => {
      const expression = '3+4*(2-1)'
      const result = calculator.calculateOperationOrder(expression)
      expect(result).toEqual(['3', '4', '2', '1', '-', '*', '+'])
    })
    it('should handle parentheses by correctly ordering operations', () => {
      const expression = '(3+4)*2'
      const result = calculator.calculateOperationOrder(expression)
      expect(result).toEqual(['3', '4', '+', '2', '*'])
    })
    it('should handle multi-digit numbers correctly when given an expression with multi-digit numbers', () => {
      const expression = '123+456*78'
      const result = calculator.calculateOperationOrder(expression)
      expect(result).toEqual(['123', '456', '78', '*', '+'])
    })
  })

  describe('sanitizeExpression', () => {
    it('should remove all whitespace characters from expression', () => {
      const expression = '2 +  3   * 4'
      const result = calculator.sanitizeExpression(expression)
      expect(result).toBe('2+3*4')
    })
  })

  describe('calculate', () => {
    it('should correctly calculate expression with multiple operators', () => {
      const result = calculator.calculate('2 + 3 * 4 - 6')
      expect(result).toBe(8)
    })
    it('should correctly calculate expression with parentheses', () => {
      const result = calculator.calculate('(2 + 3) * 4')
      expect(result).toBe(20)
    })
    it('should correctly calculate expression with decimal numbers', () => {
      const result = calculator.calculate('3.5 + 2.1 * 4.2 - 1.3')
      expect(result).toBe(11.02)
    })
    it('should correctly process expression with mixed operators and precedence', () => {
      const result = calculator.calculate('3 + 5 * 2 - 8 / 4')
      expect(result).toBe(11)
    })
    it('should correctly process expression with whitespace characters', () => {
      const result = calculator.calculate(' 2 + 3 * 4 - 6 ')
      expect(result).toBe(8)
    })
  })
})