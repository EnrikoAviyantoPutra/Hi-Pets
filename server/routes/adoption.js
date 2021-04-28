const express = require('express')
const adoption = express.Router()
const Controller = require('../controllers/adoptionController')
const authenticationUser = require('../middlewares/authenticationUser')
const authorizationAdopter = require('../middlewares/authorizationAdopter')
const multer = require('../middlewares/multer')
const { uploadFileToGCS } = require('../middlewares/gcs');

adoption.use(authenticationUser)

adoption.get('/adoptions', Controller.getAllAdoption)

adoption.post('/adoptions', multer.single('image_url'), uploadFileToGCS, Controller.createAdoption)

adoption.get('/adoptions/:id', Controller.getAdoptionById)

adoption.put('/adoptions/:id', authorizationAdopter, multer.single('image_url'), uploadFileToGCS, Controller.updateAdoption)

adoption.delete('/adoptions/:id', authorizationAdopter, Controller.deleteAdoption)

adoption.get('/adoptions/species/:species', Controller.getAdoptionsBySpecies)

module.exports = adoption