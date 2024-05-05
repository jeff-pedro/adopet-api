process.env.NODE_ENV = 'test'

const app = require('../../../app')
const request = require('supertest')
const { v4: uuid } = require('uuid')

const login = require('../../helper/userLogin')
const database = require('../../../models')

const { 
  TutorService, 
  ProfileService, 
  SecurityService } = require('../../../services')

const tutorService = new TutorService()
const profileService = new ProfileService()
const securityService = new SecurityService()

// jest.mock('../../../models')

describe('Pets', () => {
  let petId
  let pet
  // let shelter
  let user
  let auth = {}

  beforeAll(async () => {
    // shelter = await createShelter()
    user = await createUser()
    pet = await createPet(user)
    
    await setProfile(user)
    
    await login(auth, request, app)
  })

  afterAll(async () => {
    try {
      await database.User.destroy({ where: {} })
      await database.Pet.destroy({ where: {} })
      await database.Profile.destroy({ where: {} })
      // await database.Shelter.destroy({ where: {} })
    } catch (error) {
      console.log(error)
    }
  })


  describe('GET /api/pets', () => {
    it('should list all pets', async () => {
      const res = await request(app)
        .get('/api/pets')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${auth.token}`)

      expect(res.headers['content-type']).toMatch(/json/)
      expect(res.status).toEqual(200)
      // expect(res.body).toHaveLength(1)
    })

    it('should show 10 results per page', async () => {
      const res = await request(app)
        .get('/api/pets/?page=1')
        .set('Authorization', `Bearer ${auth.token}`)

      expect(res.status).toEqual(200)
      // expect(res.body).toHaveLength(10)
    })
  })


  describe('POST /api/pets', () => {
    
    it('should create a new pet', async () => {
      const res = await request(app)
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
          shelter_id: user.id
        })
        .expect(200)

      petId = res.body.id
    })

    it.skip('should return an error if the request body is empty', async () => {
      const res = await request(app)
        .post('/api/pets')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${auth.token}`)
        .send({})

      expect(res.status).toBe(422)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('empty request body')
    })
  })


  describe('GET /api/pets/{id}', () => {
    
    it('should return one pet', async () => {
      const res = await request(app)
        .get(`/api/pets/${petId}`)
        .set('Authorization', `Bearer ${auth.token}`)

      expect(res.status).toBe(200)
      expect(res.body.name).toEqual('Cotton')
    })

    it.skip('should return status 404 if any data is found', async () => {
      const res = await request(app)
        .get('/api/pets/0')
        .set('Authorization', `Bearer ${auth.token}`)

      expect(res.status).toBe(404)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('Error: Pet not found')
    })
  })


  describe('PUT /api/pets/{id}', () => {
   
    it('should update some fields', async () => {
      const res = await request(app)
        .put(`/api/pets/${petId}`)
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
        .put(`/api/pets/${petId}`)
        .set('Authorization', `Bearer ${auth.token}`)
        .send(param)

      expect(res.status).toBe(204)
    })
  })


  describe('PATCH /api/pets/{id}', () => {
   
    it('should update only one field', async () => {
      const res = await request(app)
        .patch(`/api/pets/${petId}`)
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
        .patch(`/api/pets/${petId}`)
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
        .put(`/api/pets/${petId}`)
        .set('Authorization', `Bearer ${auth.token}`)
        .send(param)

      expect(res.status).toBe(204)
    })
  })


  describe('DELETE /api/pets/{id}', () => {
   
    it('should delete one pet', async () => {
      await request(app)
        .delete(`/api/pets/${petId}`)
        .set('Authorization', `Bearer ${auth.token}`)
        .expect(200)
    })
  })

  
  describe('POST /api/pets/{id}/adoption', () => {
  
    it('should do an adoption', async () => {
      const res = await request(app)
        .post(`/api/pets/${pet.id}/adoption`)
        .set('Authorization', `Bearer ${auth.token}`)
        .send({
          tutor_id: user.id
        })

      console.log(res.body)

      expect(res.status).toBe(200)
      expect(res.body.adoption).toHaveProperty('id')
    })
  })

  describe.skip('GET /api/pets/:id/adoption/cancel', () => {
   
    it('should cancel one adoption', async () => {
      await request(app)
        .get(`/api/pets/${pet.id}/adoption/cancel`)
        .set('Authorization', `Bearer ${auth.token}`)
        .expect(200)
    })
  })
})


async function createPet(shelter) {
  try {
    return await database.Pet.create({
      id: uuid(),
      shelter_id: shelter.id,
      name: 'Nala',
      birthday: '2023-01-01',
      size: 'Small',
      personality: 'Brava!',
      species: 'Cat',
      status: 'Available',
      profilePictureUrl: 'http://image.com/Nala.png'
    })
  } catch (error) {
    console.log(error)
  }
}

// async function createShelter() {
//   try {
//     return (await database.Shelter.create({
//       id: uuid(),
//       name: 'Caribbean Crazy Animals',
//       email: 'contact2@crazyanimals.sea',
//       phone: '+08898985421',
//       city: 'Port Royal',
//       state: 'Caribbean'
//     }))
//   } catch (error) {
//     console.log(error)
//   }
// }

async function createUser() {
  const userObject = {
    id: uuid(),
    name: 'Will Turner',
    email: 'tuner@pirates.sea',
    password: 'tuner123',
    phone: '+011233334444',
    city: 'England',
    about: 'I am cute and love all animals of world',
    profilePictureUrl: 'https://images.com/images/image-turner',
    role: 'standard'
  }

  let user

  try {
    user = await database.User.findOne({
      where: {
        email: userObject.email
      }
    })
    
    if (!user) {
      user = await tutorService.createRecord(userObject)
    }

    return user
  } catch (err) {
    throw new Error(err.message)
  }
}

async function setProfile(user) {
  const profile = await profileService.createRecord({
    id: uuid(),
    name: 'shelter',
    description: 'a shelter profile'
  })

  const acl = await securityService.registerAcl({ 
    userId: user.id, 
    profileId: profile.id
  })

  return acl
}