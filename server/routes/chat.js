const express = require('express')
const Controller = require('../controllers/chatController')
const chat = express.Router()
const authenticationUser = require('../middlewares/authenticationUser')
const authenticationDoctor = require('../middlewares/authenticationDoctor')

// chat.use(authenticationDoctor)
// chat.get('/chat', Controller.getChatRoom)
// chat.use(authenticationUser)
chat.post('/chat/user', authenticationUser, Controller.createChatRoomUser)
chat.post('/chat/doctor', authenticationDoctor, Controller.createChatRoomDoctor)
chat.get('/chat/doctor', authenticationDoctor, Controller.getListChatUser)

module.exports = chat