if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const authMiddleware = require('./middleware/auth')
var expressValidator = require('express-validator');//req.checkbody()

const methodOverride = require('method-override');

const config = require('./config')
const conn = require('./models/init')
const Grid = require('gridfs-stream');
//let conn = conn.mongoose.createConnection(process.env.MONGO_URI)


var path = require("path");
const server = express()
server.use('/static', express.static(path.join(__dirname, 'assets')))
server.use('/view', express.static(path.join(__dirname, 'views')))
server.engine('html', require('ejs').renderFile);

server.set("view engine", "ejs");
server.use(methodOverride('_method'));
// Middleware
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(cors({ credentials: true }))
server.use(authMiddleware.initialize)

// Express validator
server.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.lenght) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));
// let gfs;
// conn.mongoose.connection.once('open', () => {
//   var db = conn.mongoose.connection.db, mongoDriver = conn.mongoose.mongo;
//   gfs = Grid(db, mongoDriver);
//   gfs.collection('uploads');
// })

// Routes
server.use([require('./routes/grievance'), require('./routes/query')])
server.use([require('./routes/auth'), require('./routes/user')])
server.use([require('./routes/payment')])

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