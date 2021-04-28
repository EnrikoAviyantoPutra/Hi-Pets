const express = require('express')
const Controller = require('../controllers/midtransController')
const midtrans = express.Router()
const authenticationUser = require('../middlewares/authenticationUser')

midtrans.get('/midtrans/:name/:amount',authenticationUser, Controller.getToken)

module.exports = midtrans