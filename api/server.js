const app = require('./app.js')

const port = process.env.PORT || 9000

app.listen(port, () => {
  console.log('Server is running on port 9000.')
})