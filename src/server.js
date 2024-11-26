const app = require('./app')

// Settings
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Calculator running on Port ${port}`)
})
