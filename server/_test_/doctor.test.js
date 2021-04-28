const request = require('supertest')
const app = require('../app')
const { generateToken } = require('../helpers/jwt')
const { Doctor, sequelize } = require('../models')

let dataTest = {
  email: 'testing@mail.com',
  password: 'test123456',
  name: 'testing jest',
  phoneNumber: '0988838389298'
}
let access_token = ""
let {email, name, phoneNumber} = dataTest
let id = 1

afterAll(done => {
    sequelize.close()
    done()
})

beforeAll(done => {
  access_token = generateToken({
    email,
    name,
    phoneNumber
  })
  done()
})

// SUCCESS-GET ALL DOCTOR
describe('GET/doctors', function () {
  it('should return status 200 with array of data', (done) => {
    request(app)
      .get('/doctors')
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(200)
        expect(Array.isArray(res.body)).toEqual(true)
        expect(typeof res.body[0]).toEqual('object')
        expect(res.body[0]).toHaveProperty('name')
        expect(res.body[0]).toHaveProperty('email')
        expect(res.body[0]).toHaveProperty('password')
        expect(res.body[0]).toHaveProperty('phoneNumber')
        expect(res.body[0]).toHaveProperty('createdAt')
        expect(res.body[0]).toHaveProperty('updatedAt')
        done()
      })
  })
})

//SUCCESS LOGIN DOCTOR
describe('POST/doctors', function () {
  it('should return status 200 with access token data', (done) => {
    let body = {
      email: 'wiyono.vet@test.com',
      password: '123456789'
    }
    request(app)
      .post('/doctors/login')
      .send(body)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('access_token')
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('email')
        expect(typeof res.body.access_token).toEqual('string')
        done()
      })
  })
})

//FAILED LOGIN DOCTOR
describe('POST/doctors', function () {
  it('should return status failed if email is incorrect', (done) => {
    let body = {
      email: 'vet@test.com',
      password: '123456789'
    }
    request(app)
      .post('/doctors/login')
      .send(body)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(typeof res.body.msg).toEqual('string')
        expect(res.body.msg).toEqual('Bad Request')
        done()
      })
  })
})

describe('POST/doctors', function () {
  it('should return status failed if email is correct but password is incorrect', (done) => {
    let body = {
      email: 'wiyono.vet@test.com',
      password: '123456'
    }
    request(app)
      .post('/doctors/login')
      .send(body)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(typeof res.body.msg).toEqual('string')
        expect(res.body.msg).toEqual('Bad Request')
        done()
      })
  })
})

//SUCCESS GET DOCTOR BY ID

describe('GET/doctors/:id', function () {
  it('should return ok with doctor data', (done) => {
    request(app)
      .get(`/doctors/${id}`)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('email')
        expect(res.body).toHaveProperty('phoneNumber')
        expect(res.body).toHaveProperty('createdAt')
        expect(res.body).toHaveProperty('updatedAt')
        done()
      })
  })
})

//FAILED GET DOCTOR BY ID

describe('GET/doctors/:id', function () {
  it('should return failed if id is incorrect', (done) => {
    request(app)
      .get(`/doctors/0`)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(404)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toEqual('Doctor Not Found')
        done()
      })
  })
})

