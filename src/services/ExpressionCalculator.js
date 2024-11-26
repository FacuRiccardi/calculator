class ExpressionCalculator {
  constructor() {
    this.priority = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
    }
  }

  calculate(expression) {
    const sanitizedExpression = this.sanitizeExpression(expression)
    const executionOrder = this.calculateOperationOrder(sanitizedExpression)
    return this.calculateOperations(executionOrder)
  }

  sanitizeExpression(expression) {
    return expression.replace(/\s+/g, "")
  }

  calculateOperationOrder(expression) {
    const operators = []
    const output = []
    let buffer = ""

    for (const char of expression) {
      if (!isNaN(char) || char === ".") {
        buffer += char
      } else {
        if (buffer) {
          output.push(buffer)
          buffer = ''
        }

        if (char === '(') {
          operators.push(char)
        } else if (char === ')') {
          while (operators[operators.length - 1] !== '(') {
            output.push(operators.pop())
          }
          operators.pop()
        } else {
          this.processOperators(char, operators, output)
        }
      }
    }

    if (buffer) {
      output.push(buffer)
    }

    while (operators.length > 0) {
      output.push(operators.pop())
    }

    return output
  }

  processOperators(operator, operators, output) {
    while (
      operators.length > 0 &&
      operators[operators.length - 1] !== '(' &&
      this.priority[operators[operators.length - 1]] >= this.priority[operator]
    ) {
      output.push(operators.pop())
    }
    operators.push(operator)
  }

  calculateOperations(executionOrder, index = 0) {
    if (executionOrder.length > 1) {
      const elements = executionOrder.slice(index, index + 3)
      if (isNaN(elements.at(-1))) {
        const nums = elements.slice(0, 2)
        const operator = elements.at(-1)
        const result = this.calculateExpression(nums, operator)
        executionOrder.splice(index, 3, result)

        return this.calculateOperations(executionOrder)
      } else {
        return this.calculateOperations(executionOrder, index + 1)
      }
    } else {
      return executionOrder[0]
    }
  }

  calculateExpression(nums, operator) {
    switch (operator) {
      case '+':
        return Number(nums[0]) + Number(nums[1])
      case '-':
        return Number(nums[0]) - Number(nums[1])
      case '*':
        return Number(nums[0]) * Number(nums[1])
      case '/':
        return Number(nums[0]) / Number(nums[1])
      default:
        throw new Error(`Operador no soportado: ${operator}`)
    }
  }
}

module.exports = ExpressionCalculator
