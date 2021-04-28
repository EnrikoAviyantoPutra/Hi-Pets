
const { ChatRoom, User, Doctor, sequelize } = require('../models')
const request = require('supertest')
const app = require('../app')
const { expect } = require('@jest/globals')
const { hashPassword } = require('../helpers/bcryptjs')

let passwordCheck


let dataUser = {
  name: "testing",
  email: "test2@mail.com",
  password: " 1234455999",
  phoneNumber: "999999999999"
}
let dataUser2 = {
  name: "testing2",
  email: "test234@mail.com",
  password: " 1234455999",
  phoneNumber: "999999999999"
}
let access_token = "test"
let access_token2
let doctor_id = 1
let user_id
let access_tokenDoctor
let access_tokenDoctorTes = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IldpeW9ubyIsImVtYWlsIjoid2l5b25vLnZldEB0ZXN0LmNvbSIsInBob25lTnVtYmVyIjoiMDg5OTk5OTk5MTIiLCJpYXQiOjE2MTYyNTUxNzV9.H3SCSp9xzGef8stABVZpPrJYxE2jrzN_zCrqL-sk8dY'
let user_id2

afterAll((done) => {
  ChatRoom.destroy({
    where: {}
  }).then(data => {
    User.destroy({
      where: {}
    })
  }).catch(err => {
    done(err)
  }).finally(final => {
    sequelize.close()
    done()
  })
})



beforeAll((done) => {

  Doctor.findOne({ where: { id: doctor_id } })
  .then(doctor => {
    console.log(doctor, '================================+++++++++')
    request(app)
      .post('/doctors/login')
      .send({ email: doctor.email, password: doctor.password })
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          access_tokenDoctor = res.body.access_token
          console.log(access_tokenDoctor, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
          return
        }
      })
  })
  .then(_ => {
    return User.create(dataUser2)
  })
  .then(user2 => {
    user_id2 = user2.id
    done()
  })
  .catch(err => {
    done(err)
  })
})

// SET UP ACCESS TOKEN USER 

describe('set up access token user', function () {
  it('should return status 201 with data', (done) => {
    request(app)
      .post('/users/register')
      .send(dataUser)
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
  it('should return status 200 with data', (done) => {
    request(app)
      .post('/users/login')
      .send({ email: dataUser.email, password: dataUser.password })
      // .expect(200)
      .end((err, res) => {
        if (err) {
          // sequelize.close()
          done(err)
        }
        access_token = res.body.access_token
        user_id = res.body.id
        expect(res.status).toEqual(200)
        // expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('access_token')
        // sequelize.close()
        done()

      })
  })
})

// SUCCESS - CREATE CHAT ROOM USER
describe('POST/chat', function () {
  console.log(access_token, '><><<<><><><><><><><')
  console.log(doctor_id, '><><<<><><><><><><><')
  it('it should return status 201 with data', (done) => {
    request(app)
      .post('/chat/user')
      .set('access_token', access_token)
      .send({ doctor_id: doctor_id })
      .end((err, res) => {
        if (err) {
          done(err)
        }
        // console.log(res.body, '=================================')
        expect(res.status).toEqual(201)
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('user_id')
        expect(res.body).toHaveProperty('updatedAt')
        expect(res.body).toHaveProperty('createdAt')

        // expect(res.body).toHaveProperty('l')

        done()
      })
  })
  it('if chat room exist should return status 200 with data', (done) => {
    request(app)
      .post('/chat/user')
      .set('access_token', access_token)
      .send({ doctor_id: doctor_id })
      .end((err, res) => {
        if (err) {
          done(err)
        }
        // console.log(res.body, '=================================')
        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('user_id')
        expect(res.body).toHaveProperty('doctor_id')
        expect(res.body).toHaveProperty('updatedAt')
        expect(res.body).toHaveProperty('createdAt')
        done()
      })
  })
})

// FAIL- CREATE ROOM USER
describe('POST/chat', function () {
  it('it should return status 401 if access_token user wrong', (done) => {
    request(app)
      .post('/chat/user')
      .set('access_token', '')
      .send({ doctor_id: doctor_id })
      .end((err, res) => {
        if (err) {
          done(err)
        }
        // console.log(res.body, '=================================')
        expect(res.status).toEqual(401)
        expect(res.body).toHaveProperty('msg', 'You must login first')
        // expect(res.body).toHaveProperty('user_id')
        // expect(res.body).toHaveProperty('doctor_id')
        // expect(res.body).toHaveProperty('l')
        done()
      })
  })

  it(`it should return status 500 if doctor_id wrong/doesn't exist`, (done) => {
    request(app)
      .post('/chat/user')
      .set('access_token', access_token)
      .send({ doctor_id: 99 })
      .end((err, res) => {
        if (err) {
          done(err)
        }
        // console.log(res.body, '=================================')
        expect(res.status).toEqual(500)
        done()
      })
  })
})

// SUCCESS - CREATE CHAT ROOM DOCTOR
describe('POST/chat', function () {
  console.log(access_tokenDoctor, '><><<<><><><><><><><')
  console.log(user_id, '><><<<><><><><><><><')
  it('it should return status 200 with data', (done) => {
    request(app)
      .post('/chat/doctor')
      .set('access_token', access_tokenDoctor)
      .send({ user_id: user_id })
      .end((err, res) => {
        if (err) {
          done(err)
        }
        console.log(res.body, '=================================')
        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('doctor_id')
        expect(res.body).toHaveProperty('user_id')
        done()
      })
  })
  it('it should return status 201 with data', (done) => {
    request(app)
      .post('/chat/doctor')
      .set('access_token', access_tokenDoctor)
      .send({ user_id: user_id2 })
      .end((err, res) => {
        if (err) {
          done(err)
        }
        console.log(res.body, '=================================')
        expect(res.status).toEqual(201)
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('doctor_id')
        expect(res.body).toHaveProperty('user_id')
        done()
      })
  })
})

// FAIL- CREATE ROOM DOCTOR
describe('POST/chat', function () {
  it('it should return status 401 if access_token doctor wrong', (done) => {
    request(app)
      .post('/chat/user')
      .set('access_token', '')
      .send({ user_id: user_id })
      .end((err, res) => {
        if (err) {
          done(err)
        }
        // console.log(res.body, '=================================')
        expect(res.status).toEqual(401)
        expect(res.body).toHaveProperty('msg', 'You must login first')

        done()
      })
  })

  it(`it should return status 500 if user_id wrong/doesn't exist`, (done) => {
    request(app)
      .post('/chat/user')
      .set('access_token', access_tokenDoctor)
      .send({ user_id: 99 })
      .end((err, res) => {
        if (err) {
          done(err)
        }
        // console.log(res.body, '=================================')
        expect(res.status).toEqual(500)
        done()
      })
  })
})


// SUCCESS - GET LIST CHAT USER
describe('GET/chat', function () {
  console.log(access_tokenDoctor, '><><<<><><><><><><><')
  console.log(user_id, '><><<<><><><><><><><')
  test('it should return status 200 with data', (done) => {
    request(app)
      .get('/chat/doctor')
      .set('access_token', access_tokenDoctor)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        console.log(res.body, '=================================')
        expect(res.status).toEqual(200)
        expect(res.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              user_id
            })
          ])
        )
        expect(res.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              doctor_id
            })
          ])
        )
        done()
      })
  })
})

// FAIL - GET LIST CHAT USER
describe('GET/chat', function () {
  // console.log(access_tokenDoctor, '><><<<><><><><><><><')
  // console.log(user_id, '><><<<><><><><><><><')
  test('it should return status 401 with wrong access_token', (done) => {
    request(app)
      .get('/chat/doctor')
      .set('access_token', 99999)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        console.log(res.body, '=================================')
        expect(res.status).toEqual(401)
        expect(res.body).toHaveProperty('msg', 'You must login first')
        done()
      })
  })
})