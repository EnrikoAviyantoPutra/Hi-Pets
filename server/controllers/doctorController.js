const { Doctor } = require('../models')
const { comparePassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')

class DoctorController {
  static async getAllDoctor(req, res, next) {
    try {
      const doctorList = await Doctor.findAll()
      res.status(200).json(doctorList)
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next){
    try {
      const {email, password} = req.body
      const user = await Doctor.findOne({
        where: {email}
      })
      if(!user){
        throw {
          status: 400,
          name: 'BadRequest',
          msg: 'Bad Request'
        }
      }
      // const isMatch = comparePassword(password, user.password)
      // if(!isMatch){
      //   throw {
      //     status: 400,
      //     name: 'BadRequest',
      //     msg: 'Bad Request'
      //   }
      // }
      if (password === user.password) {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber
        }
        const access_token = generateToken(payload)
        res.status(200).json({ access_token, name: user.name, email: user.email })
      } else {
        throw {
          status: 400,
          name: 'BadRequest',
          msg: 'Bad Request'
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async getDoctorById(req, res, next) {
    try {
      const id = +req.params.id
      const doctor = await Doctor.findByPk(id)
      if (!doctor) throw { name: 'NotFound', status: 404, msg: 'Doctor Not Found' }

      res.status(200).json(doctor)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = DoctorController