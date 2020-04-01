const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const flash = require('express-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const process = require('process')

const config = require('./app/config')
const routes = require('./app/routes')

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'templates'))
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser('keyboard cat'))
app.use(session({
  secret: config.key,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 }
}))


app.use(flash())
app.use((req, res, next) => {
  res.locals.session = req.session
  next()
})

app.use('/', routes)

require('./app/passport')(app)

mongoose.connect(
  config.mongodb,
  { connectTimeoutMS: 3000, socketTimeoutMS: 20000, useNewUrlParser: true, useUnifiedTopology: true }
)
mongoose.connection.once('open', () => {
  console.log(chalk.magenta(`Connection to MongoDB: ${chalk.green('OK')}`))
})

app.listen(process.argv[2] || config.port, () => {
  console.log(chalk.magenta(`Server listening at http://localhost:${chalk.green(config.port)}`))
  // console.log(`Connected to ${config.database}`)
  console.log('App is running ...')
  console.log('Press CTRL + C to stop the process.')
})
