const express = require('express')
const doctor = express.Router()
const Controller = require('../controllers/doctorController')
const authenticationUser = require('../middlewares/authenticationUser')

doctor.post('/doctors/login', Controller.login)
doctor.get('/doctors', authenticationUser, Controller.getAllDoctor)
doctor.get('/doctors/:id',authenticationUser, Controller.getDoctorById)

module.exports = doctor