const express = require('express')
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/zc-blog')

const router = require('./router')
const handlers = require('./router/handlers')
const config = require('./config')

app.use('/static', express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
  secret: 'zc-blog',
  resave: false,
  saveUninitialized: true
}))

app.set('view engine', 'pug')
app.locals.appName = 'zc-blog'
app.locals.appConfig = config

app.use(router)
app.use(handlers.notFoundHandler)
app.use(handlers.errorHandler)

app.listen(3000, () => console.log('app runing at http://localhost:3000'))
