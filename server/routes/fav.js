const express = require('express')
const Controller = require('../controllers/favController')
const authenticationUser = require('../middlewares/authenticationUser')
const fav = express.Router()

fav.use(authenticationUser)
fav.get('/favorites', Controller.getAllFav)
fav.post('/favorites', Controller.createFav)
fav.delete('/favorites/:id', Controller.removeFav)

module.exports = fav