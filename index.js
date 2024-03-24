const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/analog', (req, res) => {
  res.send('analog 132 1 898 333!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})