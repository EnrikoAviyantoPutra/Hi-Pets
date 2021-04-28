const request = require('supertest')
const app = require('../app')
const { generateToken } = require('../helpers/jwt')
const { User, sequelize } = require('../models')

let dataTest = {
  email: 'testing@mail.com',
  password: 'test123456',
  name: 'testing jest',
  phoneNumber: '0988838389298'
}
let access_token = ""
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
beforeAll(done => {
  access_token = generateToken({
    email,
    name,
    phoneNumber
  })
  done()
})

// SUCCESS-REGISTER
describe('POST/register', function () {
  it('should return status 201 with data', (done) => {
    request(app)
      .post('/users/register')
      .send(dataTest)
      // .expext(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }

        // console.log(res, '<<< res');
        expect(res.status).toEqual(201)
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('email')
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('phoneNumber')
        done()
      })
  })
})

// FAILED-REGISTER
describe('POST/register', function () {
  let body = {
    email: '',
    password: 'test123456',
    name: 'testing jest',
    phoneNumber: '0988838389298'
  }
  it('should return failed if email is empty', (done) => {
    request(app)
      .post('/users/register')
      .send(body)
      // .expext(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(Array.isArray(res.body.msg)).toEqual(true)
        expect(res.body.msg[0]).toEqual('Wrong email format')
        done()
      })
  })
})

describe('POST/register', function () {
  let body = {
    email: 'testing@gmail.com',
    password: '',
    name: 'testing jest',
    phoneNumber: '0988838389298'
  }
  it('should return failed if password is not 4 - 16 characters', (done) => {
    request(app)
      .post('/users/register')
      .send(body)
      // .expext(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(Array.isArray(res.body.msg)).toEqual(true)
        expect(res.body.msg[0]).toEqual('Password must be between 4 - 16 character')
        done()
      })
  })
})

describe('POST/register', function () {
  let body = {
    email: 'testing@gmail.com',
    password: 'test123456',
    name: '',
    phoneNumber: '0988838389298'
  }
  it('should return failed if name is empty', (done) => {
    request(app)
      .post('/users/register')
      .send(body)
      // .expext(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(Array.isArray(res.body.msg)).toEqual(true)
        expect(res.body.msg[0]).toEqual('Name cannot be empty')
        done()
      })
  })
})

describe('POST/register', function () {
  let body = {
    email: 'testing@gmail.com',
    password: 'test123456',
    name: 'testing jest',
    phoneNumber: ''
  }
  it('should return failed if phone number is empty', (done) => {
    request(app)
      .post('/users/register')
      .send(body)
      // .expext(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(Array.isArray(res.body.msg)).toEqual(true)
        expect(res.body.msg[0]).toEqual('Phone number cannot be empty')
        done()
      })
  })
})

describe('POST/register', function () {
  let body = {
    email: '',
    password: '',
    name: '',
    phoneNumber: ''
  }
  it('should return failed if all data is empty', (done) => {
    request(app)
      .post('/users/register')
      .send(body)
      // .expext(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(Array.isArray(res.body.msg)).toEqual(true)
        expect(res.body.msg[0]).toEqual('Name cannot be empty')
        expect(res.body.msg[1]).toEqual('Wrong email format')
        expect(res.body.msg[2]).toEqual('Password must be between 4 - 16 character')
        expect(res.body.msg[3]).toEqual('Phone number cannot be empty')
        done()
      })
  })
})


// SUCCESS-LOGIN
describe('POST/login', function () {
  it('should return status 200 with data', (done) => {
    request(app)
      .post('/users/login')
      .send(dataTest)
      // .expect(200)
      .end((err, res) => {
        if (err) {
          // sequelize.close()
          done(err)
        }
        expect(res.status).toEqual(200)
        // expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('access_token')
        // sequelize.close()
        done()

      })
  })
})

// FAILED LOGIN

describe('POST/login', function () {
  let body = {
    email: 'testing@mail.com',
    password: '1234'
  }
  test('should return failed status if email exist and password wrong', (done) => {
    request(app)
      .post('/users/login')
      .send(body)
      .end((err, res) => {
        if (err) {
          // sequelize.close()
          done(err)
        }
        expect(res.status).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toEqual('Bad Request')
        done()

      })
  })
  test('should return failed status if email does not exist in database', (done) => {
    request(app)
      .post('/users/login')
      .send({ email: 'ddddd', password: '1234' })
      .end((err, res) => {
        if (err) {
          // sequelize.close()
          done(err)
        }
        expect(res.status).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toEqual('Bad Request')
        done()
      })
  })
  // test('should return failed status if email empty and password empty', (done) => {
  //   request(app)
  //     .post('/login')
  //     .send({ email: '', password: '' })
  //     .end((err, res) => {
  //       if (err) {
  //         // sequelize.close()
  //         done(err)
  //       }
  //       expect(res.status).toEqual(404)
  //       expect(typeof res.body).toEqual('object')
  //       expect(res.body).toHaveProperty('errors', 'Invalid Email or Password')
  //       done()
  //     })
  // })
})

