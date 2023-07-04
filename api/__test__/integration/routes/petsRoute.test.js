process.env.NODE_ENV = 'test'

const app = require('../../../app')
const db = require('../../../models')
const request = require('supertest')

jest.mock('../../../models')

describe('Pets', () => {
  let petId
  let pet

  const petObject = {
    name: 'Cotton',
    birthday: new Date('2023-01-01'),
    size: 'Mini',
    personality: 'He chatty and cute.',
    species: 'Dog',
    status: 'New',
    profilePictureUrl: 'http://images.com/cotton',
    shelter_id: 1
  }

  describe('GET /pets', () => {
    it('should list all pets', async () => {
      const res = await request(app)
        .get('/pets')
        .set('Accept', 'application/json')
      expect(res.headers['content-type']).toMatch(/json/)
      expect(res.status).toEqual(200)
      expect(res.body).toHaveLength(1)
    })
  })

  describe('POST /pets', () => {
    it('should create a new pet', async () => {
      const res = await request(app)
        .post('/pets')
        .send(petObject)
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

      expect(res.status).toBe(204)
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

    test.each([
      ['empty body', {}],
      ['undefined field', { somefield: 'some value' }]
    ])('should return an error if provided an %s', async (_, param) => {
      const res = await request(app)
        .put(`/pets/${petId}`)
        .send(param)

      expect(res.status).toBe(204)
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
    it('should do an adoption', async () => {

      const tutor = await db.User.create({
        name: 'Hector Barbosa',
        email: 'barbosa@pirates.sea',
        password: 'hector123',
        phone: '+011233334444',
        city: 'Lisbon',
        about: 'All pets loves me',
        profilePictureUrl: 'https://images.com/images/image-barbosa',
        role: 'administrator'
      })

      pet = await db.Pet.create(petObject)

      const res = await request(app)
        .post(`/pets/${pet.id}/adoption`)
        .send({
          animal: Number(pet.id),
          tutor: Number(tutor.id),
          date: '2023-01-01'
        })

      expect(res.status).toBe(200)
      expect(res.body.adoption).toHaveProperty('id')
    })
  })

  describe('DELETE /pets/:id/adoption/cancel', () => {
    it('should cancel one adoption', async () => {
      await request(app)
        .delete(`/pets/${pet.id}/adoption/cancel`)
        .expect(200)
    })
  })

})