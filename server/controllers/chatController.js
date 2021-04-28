const { ChatRoom, User } = require('../models')
const { Op } = require('sequelize')

class ChatController {
  static async createChatRoomUser(req, res, next) {
    try {
      const { doctor_id } = req.body
      const user_id = req.decoded.id
      
      console.log({doctor_id, user_id});

      const chatRoomExist = await ChatRoom.findOne({
        where: {
          [Op.and]: [{ user_id }, { doctor_id }]
        }
      })

      console.log(chatRoomExist, '<<< chat room exist');

      if (!chatRoomExist) {
        const newChatRoom = await ChatRoom.create({
          doctor_id,
          user_id
        })
        res.status(201).json(newChatRoom) // id chat
      } else {
        res.status(200).json(chatRoomExist)
      }

    } catch (err) {
      next(err)
    }
  }

  static async createChatRoomDoctor(req, res, next) {
    try {
      const { user_id } = req.body
      const doctor_id = req.decodedDoctor.id

      const chatRoomExist = await ChatRoom.findOne({
        where: {
          [Op.and]: [{ user_id }, { doctor_id }]
        }
      })

      if (!chatRoomExist) {
        const newChatRoom = await ChatRoom.create({
          doctor_id,
          user_id
        })
        res.status(201).json(newChatRoom) // id chat
      } else {
        res.status(200).json(chatRoomExist)
      }

    } catch (err) {
      next(err)
    }
  }

  static async getListChatUser(req, res, next) {
    try {
      const doctor_id = req.decodedDoctor.id

      const listChatWithUser = await ChatRoom.findAll({
        where: { doctor_id },
        include: User
      })

      res.status(200).json(listChatWithUser)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ChatController