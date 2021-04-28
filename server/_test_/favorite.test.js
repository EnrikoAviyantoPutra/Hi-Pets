const request = require('supertest')
const app = require('../app')
const { Favorite, sequelize, User, Adoption } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { expect, it } = require('@jest/globals')


let adoption
let favoriteId
let dataAdoption = {
  name: 'testKucing',
  species: 'Kucing',
  gender: 'bencong',
  dob: '2020-06-24',
  image_url : 'https://storage.googleapis.com/halo-pets/1616128681157cat2.jpg'
}


let dataUser = {
  name: "testing",
  email: "test2@mail.com",
  password: " 1234455999",
  phoneNumber: "999999999999"
}
let access_token = ""

const testFavorite = {
  adoption_id: 1
}

afterAll(done => {
  Favorite.destroy({
    where: {}
  }).then(data => {
    return User.destroy({
      where: {}
    })
  }).then(result => {
    return Adoption.destroy({
      where: {}
    })
  })
  .catch(err => {
    done(err)
  })
  .finally(final => {
    User.destroy({
      where: {}
    })
    sequelize.close()
    done()
  })
})
beforeAll(done => {
  // access_token = generateToken({
  //   id: 1,
  //   email,
  // })
  User.findOne({ where: { email: dataUser.email } })
    .then(user => {
      if (user) {
        request(app)
          .post('/users/login')
          .send({ email: dataUser.email, password: dataUser.password })
          .end((err, res) => {
            if (err) {
              done(err)
            } else {
              access_token = res.body.access_token
            }
          })
      } else {
        return User.create(dataUser)
      }
    }).then(result => {
      request(app)
        .post('/users/login')
        .send({ email: dataUser.email, password: dataUser.password })
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            access_token = res.body.access_token
            // done()
            request(app)
            .post('/adoptions')
            .send(dataAdoption)
            .set('access_token', access_token)
            .end((err, res) => {
              if (err) {
                done(err)
              }else{
                adoption = res.body
                done()
              }
            })
          }
        })
    })

})

// SUCCESS - FIND ALL
describe('GET/favorite', function () {
  test('it should return status 200 with data', (done) => {
    request(app)
      .get('/favorites')
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        console.log(res.body)
        expect(res.status).toEqual(200)
        expect(res.body).toEqual([])
        done()
      })
  })

})

// FAIL - FIND ALL
describe('GET/favorite', function () {
  test('it should return status 401 with error', (done) => {
    request(app)
      .get('/favorites')
      .set('access_token', '')
      .end((err, res) => {
        if (err) {
          done(err)
        }
        console.log(res.body)
        expect(res.status).toEqual(401)
        done()
      })
  })
})

// SUCCESS - CREATE FAVORITE
describe('POST/favorites', function () {
  test('it should return status 201 with data', (done) => {
    request(app)
      .post('/favorites')
      .set('access_token', access_token)
      .send({adoption_id: adoption.id})
      .end((err, res) => {
        if (err) {
          done(err)
        }
        favoriteId = res.body.id
        console.log(res.body, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        expect(res.status).toEqual(201)
        expect(res.body).toHaveProperty('user_id')
        expect(res.body).toHaveProperty('adoption_id')

        done()
      })
  })
})

// FAIL - CREATE FAVORITE
describe('POST/favorites', function () {
  it('it should return status 500 with wrong adoption ID', (done) => {
    request(app)
      .post('/favorites')
      .set('access_token', access_token)
      .send({adoption_id: 78})
      .end((err, res) => {
        if (err) {
          done(err)
        }
        console.log(res.body, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        expect(res.status).toEqual(500)
        expect(res.body).toHaveProperty('msg', 'Internal Server Error' )

        done()
      })
  })

  it('it should return status 401 with wrong access token', (done) => {
    request(app)
      .post('/favorites')
      .set('access_token', '')
      .send({adoption_id: adoption.id})
      .end((err, res) => {
        if (err) {
          done(err)
        }
        console.log(res.body, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        expect(res.status).toEqual(401)
        expect(res.body).toHaveProperty('msg', 'You must login first' )
        done()
      })
  })
})

// SUCCESS - REMOVE FAVORITE
describe('DELETE/favorites', function () {
  test('it should return status 200 if favorite successfuly deleted', (done) => {
    request(app)
      .delete(`/favorites/${favoriteId}`)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        console.log(res.body, '======================================')
        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('favorite')
        expect(res.body).toHaveProperty('message', 'Successfully delete pet from favorite')

        done()
      })
  })
})

// FAIL - REMOVE FAVORITE
describe('DELETE/favorites', function () {
  it('it should return status 404 if favorite not found', (done) => {
    request(app)
      .delete(`/favorites/${200}`)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        console.log(res.body, '======================================')
        expect(res.status).toEqual(404)
        expect(res.body).toHaveProperty('msg', 'Favorite not found')

        done()
      })
  })
  it('it should return status 401 if access_token not exist/wrong', (done) => {
    request(app)
      .delete(`/favorites/${favoriteId}`)
      .set('access_token', '')
      .end((err, res) => {
        if (err) {
          done(err)
        }
        console.log(res.body, '======================================')
        expect(res.status).toEqual(401)
        expect(res.body).toHaveProperty('msg', 'You must login first')
        done()
      })
  })
})

