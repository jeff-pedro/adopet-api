process.env.NODE_ENV = 'test'

const request = require('supertest')

const app = require('../../../app')
const login = require('../../helper/userLogin.js')
const tearDown = require('../../helper/tearDown.js')
const { 
  createRandomPets, 
  createRandomUsers, 
  createRandomShelters, 
  createRandomProfiles 
} = require('../../helper/seeders.js')

const { SecurityService } = require('../../../services')
const securityService = new SecurityService()

// jest.mock('../../../database/models')

describe('Pets', () => {
  let pet, shelter, user
  let auth = {}

  beforeAll(async () => {
    shelter = await createRandomShelters()
    user = await createRandomUsers()
    pet = await createRandomPets()
    await login(auth, request, app)
    await setProfile(auth.user, 'shelter')
  })

  afterAll(async () => {
    await tearDown()
  })

  describe('POST /api/pets/{id}/adoption', () => {
  
    it('should do an adoption', async () => {
      const res = await request(app)
        .post(`/api/pets/${pet.id}/adoption`)
        .set('Authorization', `Bearer ${auth.token}`)
        .send({
          tutor_id: user.id
        })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('id')
    })

    it('should cause error when providing invalid pet id', async () => {
      const res = await request(app)
        .post('/api/pets/00000000-0000-0000-0000-000000000000/adoption')
        .set('Authorization', `Bearer ${auth.token}`)
        .send({
          tutor_id: user.id
        })

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
    })

    it('should cause error when providing invalid tutor id', async () => {
      const res = await request(app)
        .post(`/api/pets/${pet.id}/adoption`)
        .set('Authorization', `Bearer ${auth.token}`)
        .send({
          tutor_id: '00000000-0000-0000-0000-000000000000'
        })

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
    })
  })

  
  describe('GET /api/pets/:id/adoption/cancel', () => {
   
    it('should cancel one adoption', async () => {
      await request(app)
        .get(`/api/pets/${pet.id}/adoption/cancel`)
        .set('Authorization', `Bearer ${auth.token}`)
        .expect(200)
    })

    it('should return an error when providing an invalid pet id', async () => {
      const res = await request(app)
        .get('/api/pets/00000000-0000-0000-0000-000000000000/adoption/cancel')
        .set('Authorization', `Bearer ${auth.token}`)
      
      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
    })
  })


  describe('GET /api/pets', () => {

    it('should list all pets', async () => {
      const res = await request(app)
        .get('/api/pets/?page=1')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${auth.token}`)

      expect(res.headers['content-type']).toMatch(/json/)
      expect(res.status).toEqual(200)
      expect(res.body).toBeInstanceOf(Array)
      expect(res.body.length).toBeGreaterThan(0)
    })
  })


  describe('POST /api/pets', () => {
    
    it('should create a new pet', async () => {
      await request(app)
        .post('/api/pets')
        .set('Authorization', `Bearer ${auth.token}`)
        .send({
          name: 'Cotton',
          birthday: new Date('2023-01-01'),
          size: 'Mini',
          personality: 'He chatty and cute.',
          species: 'Dog',
          status: 'New',
          profilePictureUrl: 'http://images.com/cotton',
          shelter_id: shelter.id
        })
        .expect(200)
    })

    it('should return an error if the request body is empty', async () => {
      const res = await request(app)
        .post('/api/pets')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${auth.token}`)
        .send({})

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('empty request body')
    })
  })


  describe('GET /api/pets/{id}', () => {
    
    it('should return one pet', async () => {
      const res = await request(app)
        .get(`/api/pets/${pet.id}`)
        .set('Authorization', `Bearer ${auth.token}`)

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('name')
    })

    it('should return status 404 if any data is found', async () => {
      const res = await request(app)
        .get('/api/pets/00000000-0000-0000-0000-000000000000')
        .set('Authorization', `Bearer ${auth.token}`)

      expect(res.status).toBe(404)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toMatch('record not found')
    })
  })


  describe('PUT /api/pets/{id}', () => {
   
    it('should update some fields', async () => {
      const res = await request(app)
        .put(`/api/pets/${pet.id}`)
        .set('Authorization', `Bearer ${auth.token}`)
        .send({
          name: 'Jack',
          status: 'Available',
        })
      
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual('updated')
    })

    test.each([
      ['empty body', {}],
      ['undefined field', { somefield: 'some value' }]
    ])('should not update if provided an %s', async (_, param) => {
      const res = await request(app)
        .put(`/api/pets/${pet.id}`)
        .set('Authorization', `Bearer ${auth.token}`)
        .send(param)

      expect(res.status).toBe(204)
    })
  })


  describe('PATCH /api/pets/{id}', () => {
   
    it('should update only one field', async () => {
      const res = await request(app)
        .patch(`/api/pets/${pet.id}`)
        .set('Authorization', `Bearer ${auth.token}`)
        .send({
          status: 'Quarentine'
        })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual('updated')
    })

    it('should return an error if try update more than one field', async () => {
      const res = await request(app)
        .patch(`/api/pets/${pet.id}`)
        .set('Authorization', `Bearer ${auth.token}`)
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
        .put(`/api/pets/${pet.id}`)
        .set('Authorization', `Bearer ${auth.token}`)
        .send(param)

      expect(res.status).toBe(204)
    })
  })


  describe('DELETE /api/pets/{id}', () => {
   
    it('should delete one pet', async () => {
      await request(app)
        .delete(`/api/pets/${pet.id}`)
        .set('Authorization', `Bearer ${auth.token}`)
        .expect(200)
    })
  })
})

async function setProfile(user, profileName) {
  const profile = await createRandomProfiles(profileName)

  const acl = await securityService.registerAcl({ 
    userId: user.id, 
    profileId: profile.id
  })

  return acl
}