const express = require('express')
const user = express.Router()
const Controller = require('../controllers/userController')

user.post('/users/register', Controller.register)
user.post('/users/login', Controller.login)

module.exports = user