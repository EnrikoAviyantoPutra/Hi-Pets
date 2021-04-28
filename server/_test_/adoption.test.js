const request = require('supertest')
const app = require('../app')
const { generateToken } = require('../helpers/jwt')
const { Adoption, User, sequelize } = require('../models')

let dataUser = {
  name: 'testing jest',
  email: 'testing@mail.com',
  password: 'test123456',
  phoneNumber: '0988838389298'
}
 
let dataPet = {
  name: 'Molly',
  species: 'cat',
  gender: 'female',
  dob: '2020-04-13',
  image_url: 'https://storage.googleapis.com/halo-pets/1616128681157cat2.jpg'
}

let updatedDataPet = {
  name: 'Mickey',
  species: 'dog',
  gender: 'male',
  dob: '2020-08-14',
  image_url: 'https://storage.googleapis.com/halo-pets/1616128681157cat2.jpg'
}

let testSpecies = updatedDataPet.species

let id = 0
let invalidId = 999

let access_token = ''

afterAll(done => {
  Adoption.destroy({
    where: {}
  }).then(data => {
    return User.destroy({
      where: {}
    })
  }).catch(err => {
    done(err)
  }).finally(() => {
    sequelize.close()
    done()
  })
})

beforeAll(done => {
  User.findOne({
    where: { email: dataUser.email }
  })
    .then(foundUser => {
      if (foundUser) {
        request(app)
          .post('/users/login')
          .send({
            email: dataUser.email,
            password: dataUser.password
          })
          .end((err, res) => {
            if (err) {
              console.log(err);
            } else {
              access_token = res.body.access_token;
            }
          })
      } else {
        return User.create(dataUser)
      }
    })
    .then(newUser => {
      request(app)
        .post('/users/login')
        .send({
          email: dataUser.email,
          password: dataUser.password
        })
        .end((err, res) => {
          if (err) {
            console.log(err);
            done(err);
          } else {
            access_token = res.body.access_token;
            done();
          }
        })
    })
    .catch(err => console.log(err))
})

describe('POST/adoptions', function () {
  it('should return status 201 with data of adoption', (done) => {
    request(app)
      .post('/adoptions')
      .send(dataPet)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(201)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('species')
        expect(res.body).toHaveProperty('gender')
        expect(res.body).toHaveProperty('dob')
        expect(res.body).toHaveProperty('image_url')
        id = res.body.id

        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            species: expect.any(String),
            gender: expect.any(String),
            dob: expect.any(String),
            image_url: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          })
        )

        done()
      })
  })
})

// FAILED - CREATE ADOPTION
describe('POST/adoptions', function () {
  it ('should return error is user is not logged in', (done) => {
    request(app)
      .post('/adoptions')
      .send(dataPet)
      .set('access_token', '')
      .end((err, res) => {
        if (err) {
          done(err)
        }

        expect(res.status).toEqual(401);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toEqual('You must login first');

        done()
      })
  })
})

describe('POST/adoptions', function () {
  it ('should return failed if name is empty', (done) => {
    let body = {...dataPet, name: ''}
    request(app)
      .post('/adoptions')
      .send(body)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('msg');
        expect(Array.isArray(res.body.msg)).toEqual(true);
        expect(res.body.msg[0]).toEqual('Please enter pet name');

        done()
      })
  })
})

describe('POST/adoptions', function () {
  it ('should return failed if species is empty', (done) => {
    let body = {...dataPet, species: ''}
    request(app)
      .post('/adoptions')
      .send(body)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('msg');
        expect(Array.isArray(res.body.msg)).toEqual(true);
        expect(res.body.msg[0]).toEqual('Please enter pet species');
        
        done()
      })
  })
})

describe('POST/adoptions', function () {
  it ('should return failed if gender is empty', (done) => {
    let body = {...dataPet, gender: ''}
    request(app)
      .post('/adoptions')
      .send(body)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(400);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty('msg');
        expect(Array.isArray(res.body.msg)).toEqual(true);
        expect(res.body.msg[0]).toEqual('Please enter pet gender');
        
        done()
      })
  })
})

describe('POST/adoptions', function () {
  it ('should return failed if dob is empty', (done) => {
    let body = {...dataPet, dob: ''}
    request(app)
      .post('/adoptions')
      .send(body)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(400);
        expect(typeof res.body).toEqual('string');
        expect(res.body).toEqual('invalid input syntax for type timestamp with time zone: \"Invalid date\"');
        
        done()
      })
  })
})

//SUCCESS GET ALL ADOPTION

describe('GET/adoptions', function () {
  it('should return status 200 with array of data', (done) => {
    request(app)
      .get('/adoptions')
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(200)
        expect(Array.isArray(res.body)).toEqual(true)
        expect(res.body[0]).toHaveProperty('name')
        expect(res.body[0]).toHaveProperty('species')
        expect(res.body[0]).toHaveProperty('gender')
        expect(res.body[0]).toHaveProperty('dob')
        expect(res.body[0]).toHaveProperty('image_url')

        expect(res.body[0]).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            species: expect.any(String),
            gender: expect.any(String),
            dob: expect.any(String),
            image_url: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          })
        )
        done()
      })
  })
})

//FAILED GET ADOPTION

describe('GET/adoptions', function () {
  it('should return status failed with error message', (done) => {
    request(app)
      .get('/adoptions')
      .set('access_token', '')
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toEqual('You must login first')

        done()
      })
  })
})

//SUCCESS GET ADOPTION BY ID

describe('GET/adoptions/:id', function () {
  it('should return status 200 with data of adoption', (done) => {
    request(app)
      .get(`/adoptions/${id}`)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('user_id')
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('species')
        expect(res.body).toHaveProperty('gender')
        expect(res.body).toHaveProperty('dob')
        expect(res.body).toHaveProperty('image_url')
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            user_id: expect.any(Number),
            name: expect.any(String),
            species: expect.any(String),
            gender: expect.any(String),
            dob: expect.any(String),
            image_url: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          })
        )
        done()
      })
  })
})

//FAILED GET ADOPTION ID

describe('GET/adoptions/:id', function () {
  it('should return status failed if user is not logged in', (done) => {
    request(app)
      .get(`/adoptions/${id}`)
      .set('access_token', '')
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toEqual('You must login first')
        done()
      })
  })
})

describe('GET/adoptions/:id', function () {
  it('should return status failed if adoption is not found', (done) => {
    request(app)
      .get(`/adoptions/${invalidId}`)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(404)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toEqual('Pet for adoption not found')
        done()
      })
  })
})

// SUCCESS UPDATE ADOPTION

describe('PUT/adoptions/:id', function () {
  it('should return status ok if adoption is found and data is correct', (done) => {
    request(app)
      .put(`/adoptions/${id}`)
      .send(updatedDataPet)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('adoption')
        expect(res.body).toHaveProperty('message')
        expect(res.body.adoption).toHaveProperty('id')
        expect(res.body.adoption).toHaveProperty('user_id')
        expect(res.body.adoption).toHaveProperty('name')
        expect(res.body.adoption).toHaveProperty('species')
        expect(res.body.adoption).toHaveProperty('gender')
        expect(res.body.adoption).toHaveProperty('dob')
        expect(res.body.adoption).toHaveProperty('image_url')
        expect(res.body.adoption).toHaveProperty('dob')
        expect(res.body.adoption).toHaveProperty('image_url')
        expect(res.body.adoption).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            user_id: expect.any(Number),
            name: expect.any(String),
            species: expect.any(String),
            gender: expect.any(String),
            dob: expect.any(String),
            image_url: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          })
        )
        
        done()
      })
  })
})

//FAILED UPDATE ADOPTION
describe('PUT/adoptions/:id', function () {
  it('should return status failed if user is not logged in', (done) => {
    request(app)
      .put(`/adoptions/${id}`)
      .send(updatedDataPet)
      .set('access_token', '')
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toEqual('You must login first')
        done()
      })
  })
})

describe('PUT/adoptions/:id', function () {
  it('should return status failed if adoption is not found', (done) => {
    request(app)
      .put(`/adoptions/${invalidId}`)
      .send(updatedDataPet)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(404)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toEqual('Pet for adoption not found!')
        done()
      })
  })
})

describe('PUT/adoptions/:id', function () {
  it('should return status failed if name is empty', (done) => {
    const body = {...updatedDataPet, name: ''}
    request(app)
      .put(`/adoptions/${id}`)
      .send(body)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(Array.isArray(res.body.msg)).toEqual(true)
        expect(res.body.msg[0]).toEqual('Please enter pet name')
        done()
      })
  })
})

describe('PUT/adoptions/:id', function () {
  it('should return status failed if name is empty', (done) => {
    const body = {...updatedDataPet, name: ''}
    request(app)
      .put(`/adoptions/${id}`)
      .send(body)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(Array.isArray(res.body.msg)).toEqual(true)
        expect(res.body.msg[0]).toEqual('Please enter pet name')
        done()
      })
  })
})

describe('PUT/adoptions/:id', function () {
  it('should return status failed if species is empty', (done) => {
    const body = {...updatedDataPet, species: ''}
    request(app)
      .put(`/adoptions/${id}`)
      .send(body)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(Array.isArray(res.body.msg)).toEqual(true)
        expect(res.body.msg[0]).toEqual('Please enter pet species');
        done()
      })
  })
})

describe('PUT/adoptions/:id', function () {
  it('should return status failed if gender is empty', (done) => {
    const body = {...updatedDataPet, gender: ''}
    request(app)
      .put(`/adoptions/${id}`)
      .send(body)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(Array.isArray(res.body.msg)).toEqual(true)
        expect(res.body.msg[0]).toEqual('Please enter pet gender');
        done()
      })
  })
})

describe('PUT/adoptions/:id', function () {
  it('should return status failed if dob is empty', (done) => {
    const body = {...updatedDataPet, dob: ''}
    request(app)
      .put(`/adoptions/${id}`)
      .send(body)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(Array.isArray(res.body.msg)).toEqual(true)
        expect(res.body.msg[0]).toEqual('Please enter date of birth');
        done()
      })
  })
})

//SUCCESS GET ADOPTION BY SPECIES

describe('GET/adoptions/species/:species', function () {
  console.log(testSpecies, '============================================================')
  it('should return status 200 with data of adoption', (done) => {
    request(app)
      .get(`/adoptions/species/${testSpecies}`)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(200)
        expect(Array.isArray(res.body)).toEqual(true)
        expect(res.body[0]).toHaveProperty('id')
        expect(res.body[0]).toHaveProperty('user_id')
        expect(res.body[0]).toHaveProperty('name')
        expect(res.body[0]).toHaveProperty('species')
        expect(res.body[0]).toHaveProperty('gender')
        expect(res.body[0]).toHaveProperty('dob')
        expect(res.body[0]).toHaveProperty('image_url')
        expect(res.body[0]).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            user_id: expect.any(Number),
            name: expect.any(String),
            species: expect.any(String),
            gender: expect.any(String),
            dob: expect.any(String),
            image_url: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          })
        )
        done()
      })
  })
  it('should return fail if species is not found', (done) => {
    request(app)
      .get(`/adoptions/species/randomword`)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(404)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toEqual('Not Found')
        done()
      })
  })
  it('should return fail if user is not logged in', (done) => {
    request(app)
      .get(`/adoptions/species/${testSpecies}`)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toEqual('You must login first')
        done()
      })
  })
})

//SUCCESS DELETE ADOPTION

describe('DELETE/adoptions/:id', function () {
  it('should return ok if adoption is found', (done) => {
    request(app)
      .delete(`/adoptions/${id}`)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('adoption')
        expect(res.body).toHaveProperty('message')
        expect(res.body.adoption).toHaveProperty('id')
        expect(res.body.adoption).toHaveProperty('user_id')
        expect(res.body.adoption).toHaveProperty('name')
        expect(res.body.adoption).toHaveProperty('species')
        expect(res.body.adoption).toHaveProperty('gender')
        expect(res.body.adoption).toHaveProperty('dob')
        expect(res.body.adoption).toHaveProperty('image_url')
        expect(res.body.adoption).toHaveProperty('dob')
        expect(res.body.adoption).toHaveProperty('image_url')
        expect(res.body.adoption).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            user_id: expect.any(Number),
            name: expect.any(String),
            species: expect.any(String),
            gender: expect.any(String),
            dob: expect.any(String),
            image_url: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          })
        )
        expect(res.body.message).toEqual("Successfully delete pet data for adoption")
        done()
      })
  })
})

//FAILED DELETE ADOPTION

describe('DELETE/adoptions/:id', function () {
  it('should return failed if user is not logged in', (done) => {
    request(app)
      .delete(`/adoptions/${id}`)
      .set('access_token', '')
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toEqual('You must login first')
        done()
      })
  })
})

describe('DELETE/adoptions/:id', function () {
  it('should return failed if adoption is not found', (done) => {
    request(app)
      .delete(`/adoptions/${invalidId}`)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(404)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toEqual('Pet for adoption not found!')
        done()
      })
  })
})

