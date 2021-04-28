const express = require('express')
const routes = express()
const doctor = require('./doctor')
const user = require('./user')
const chat = require('./chat')
const fav = require('./fav')
const adoption = require('./adoption')
const midtrans = require('./midtrans')

routes.use(midtrans)
routes.use(user)
routes.use(doctor)
routes.use(chat)
routes.use(fav)
routes.use(adoption)

module.exports = routes