var express = require('express')
var app = express()

app.use(express.static('./'))

app.get('/', function(req, res) {
  return res.sendFile('index.html')
})

app.listen(3003)
