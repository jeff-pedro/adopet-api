process.env.NODE_ENV = 'test'

const app = require('../../../app')
const db = require('../../../models')
const request = require('supertest')

describe('Pets', () => {
  let petId
  let petObj
  let shelter

  beforeAll(async () => {
    // Initialize the databases    
    await db.sequelize.sync()

    // Clean the database
    await db.Pet.destroy({ where: {} })

    // Create one shelter
    shelter = await db.Shelter.create({
      name: 'Caribbean Crazy Animals',
      email: 'contact@crazyanimals.sea',
      phone: '+08898985421',
      city: 'Port Royal',
      state: 'Caribbean'
    })

  })

  beforeEach(() => {
    petObj = {
      name: 'Cotton',
      birthday: new Date('2023-01-01'),
      size: 'Mini',
      personality: 'He chatty and cute.',
      species: 'Dog',
      status: 'New',
      profilePictureUrl: 'http://images.com/cotton',
      shelter_id: shelter.id
    }
  })

  describe('GET /pets', () => {
    it('should list all pets', async () => {
      const res = await request(app)
        .get('/pets')
        .set('Accept', 'application/json')
      expect(res.headers['content-type']).toMatch(/json/)
      expect(res.status).toEqual(200)
      expect(res.body).toHaveLength(0)
    })
  })

  describe('POST /pets', () => {
    it('should create a new pet', async () => {
      const res = await request(app)
        .post('/pets')
        .send(petObj)
        .expect(200)
      petId = res.body.id
    })

    it('should return an error if the request body is empty', async () => {
      const res = await request(app)
        .post('/pets')
        .set('Accept', 'application/json')
        .send({})

      expect(res.status).toBe(422)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('empty request body')
    })

    test.each([
      ['name'],
      ['size'],
      ['personality'],
      ['species'],
      ['status'],
    ]
    )('should return an error if %s field is empty', async (param) => {

      petObj[param] = ''

      const res = await request(app)
        .post('/pets')
        .set('Accept', 'application/json')
        .send(petObj)

      expect(res.status).toBe(422)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual(`${param} field cannot be empty`)
    })

    test.each([
      ['birthday'],
      ['profilePictureUrl']
    ])('should return an error if %s is has an invalid format', async (param) => {

      petObj[param] = 'invalid_format'

      const res = await request(app)
        .post('/pets/')
        .send(petObj)

      expect(res.status).toBe(422)
    })

    test.each([
      ['shelter_id'],
    ])('should return an error if %s is null', async (param) => {

      petObj[param] = null

      const res = await request(app)
        .post('/pets/')
        .send(petObj)

      expect(res.status).toBe(422)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual(`${param} field is required`)

    })
  })

  describe('GET /pets/{id}', () => {
    it('should return one pet', async () => {
      const res = await request(app)
        .get(`/pets/${petId}`)

      expect(res.status).toBe(200)
      expect(res.body.name).toEqual('Cotton')
    })

    it('should return status 404 if any data is found', async () => {
      const pet = await request(app)
        .get('/pets/0')

      expect(pet.status).toBe(404)
      expect(pet.body).toHaveProperty('error')
      expect(pet.body.error).toEqual('Pet not found')
    })
  })

  describe('PUT /pets/{id}', () => {
    it('should update some fields', async () => {
      const res = await request(app)
        .put(`/pets/${petId}`)
        .send({
          name: 'Jack',
          status: 'Available',
        })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual('pet updated')
    })

    test.each([
      ['empty body', {}],
      ['undefined field', { somefield: 'some value' }]
    ])('should not update if provided an %s', async (_, param) => {
      const res = await request(app)
        .put(`/pets/${petId}`)
        .send(param)

      expect(res.status).toBe(422)
      expect(res.body.error).toEqual(`pet with id:${petId} wasn't updated`)
    })

    it('should return an error if id do not exists', async () => {
      const res = await request(app)
        .patch('/pets/0')
        .send({
          species: 'Cat'
        })

      expect(res.status).toBe(422)
      expect(res.body.error).toEqual('pet with id:0 wasn\'t updated')
    })
  })

  describe('PATCH /pets/{id}', () => {
    it('should update only one field', async () => {
      const res = await request(app)
        .patch(`/pets/${petId}`)
        .send({
          status: 'Quarentine'
        })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual('pet updated')
    })

    it('should return an error if try update more than one field', async () => {
      const res = await request(app)
        .patch(`/pets/${petId}`)
        .send({
          species: 'Cat',
          personality: 'She is very cute'
        })

      expect(res.status).toBe(422)
    })

    it('should return an error if id do not exists', async () => {
      const res = await request(app)
        .patch('/pets/0')
        .send({
          species: 'Cat'
        })

      expect(res.status).toBe(422)
      expect(res.body.error).toEqual('pet with id:0 wasn\'t updated')
    })

    test.each([
      ['empty body', {}],
      ['undefined field', { somefield: 'some value' }]
    ])('should return an error if provided an %s', async (_, param) => {
      const res = await request(app)
        .put(`/pets/${petId}`)
        .send(param)

      expect(res.status).toBe(422)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual(`pet with id:${petId} wasn't updated`)
    })
  })

  describe('DELETE /pets/{id}', () => {
    it('should delete one pet', async () => {
      await request(app)
        .delete(`/pets/${petId}`)
        .expect(200)
    })
  })

  describe('POST /pets/{id}/adoption', () => {

  })

  describe('DELETE /pets/:id/adoption/cancel', () => {
    
  })
})