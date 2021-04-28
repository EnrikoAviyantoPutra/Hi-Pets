const request = require('supertest')
const app = require('../app')

const { User, sequelize } = require('../models')
const { generateToken } = require('../helpers/jwt')

let access_token = ""
let dataTest = {
  email: 'testing@mail.com',
  password: 'test123456',
  name: 'testing jest',
  phoneNumber: '0988838389298'
}
let {email, name, phoneNumber} = dataTest

afterAll(done => {
  User.destroy({
    where: {}
  }).then(data => {
    sequelize.close()
    done()
  }).catch(err => {
    done(err)
  })
})

// SETUP
describe('SETUP', function () {
  it('register for setup', (done) => {
    console.log('REGISTERRRRRRRRRRRRRRRRRRRRRR')
    request(app)
      .post('/users/register')
      .send(dataTest)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(201)
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('email')
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('phoneNumber')
        done()
      })
  })
  it('login for setup', (done) => {
    console.log('LOGINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN')
    request(app)
      .post('/users/login')
      .send(dataTest)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('access_token')
        access_token = res.body.access_token
        done()
      })
  })
})

describe('SETUP', function () {
  it('it should return status 500 with error msg', (done) => {
    request(app)
      .get('/midtrans/aldo/100000')
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(500)
        expect(typeof res.body).toEqual('string')
        done()
      })
  })
})