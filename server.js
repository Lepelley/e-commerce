const express = require('express')
const path = require('path')

const config = require('./app/config')
const routes = require('./app/routes')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'templates'))
app.set('view engine', 'pug')

app.use('/', routes)

app.listen(process.argv[2] || config.port, () => {
  console.log(`Server listening at http://localhost:${config.port}`)
  // console.log(`Connected to ${config.database}`)
  console.log('App is running ...')
  console.log('Press CTRL + C to stop the process.')
})
