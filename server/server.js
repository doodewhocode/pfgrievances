if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
var fileUpload = require('express-fileupload');
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const authMiddleware = require('./middleware/auth')

const config = require('./config')

const server = express()
server.set("view engine", "ejs");
// Middleware
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(cors({ credentials: true }))
server.use(authMiddleware.initialize)
server.use(fileUpload({
  useTempFiles:true
}))


// Routes
server.use([require('./routes/auth'), require('./routes/user')])

// Error handling
server.use((error, req, res, next) => {
  res.json({
    error: {
      message: error.message
    }
  })
})

// Read port and host from the configuration file
server.listen(config.port, config.host, error => {
  if (error) {
    console.error('Error starting', error)
  } else {
    console.info('Express listening on port ', config.port)
  }
})