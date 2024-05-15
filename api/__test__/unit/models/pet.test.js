process.env.NODE_ENV = 'test'
const db = require('../../../database/models')

describe('Testing Pet model', () => {

  let petObject
  let shelter

  beforeAll(async () => {
    // Initialize the database
    await db.Shelter.sync()
    await db.Pet.sync()

    // Create one Shelter to use in Pet (shelter_id) 
    shelter = await db.Shelter.create({
      name: 'Caribbean Crazy Animals',
      email: 'contact@crazyanimals.sea',
      phone: '+08898985421',
      city: 'Port Royal',
      state: 'Caribbean'
    })
  }, 20000)

  beforeEach(async () => {
    // Object containing pet proprieties to be tested
    petObject = {
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

  afterAll(async () => {
    // Drop the Pet table
    await db.Pet.drop()

    // Close the db connection
    await db.sequelize.close()
  }, 20000)

  describe('Create Pet', () => {
    it('should create a new instance of pet', () => {
      const pet = db.Pet.build(petObject)
      expect(pet).toEqual(
        expect.objectContaining(petObject)
      )
    })

    it('should save pet on the database', async () => {
      const pet = await db.Pet.create(petObject)
      expect(pet).toEqual(
        expect.objectContaining(
          {
            id: expect.any(Number),
            ...petObject,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
          }
        )
      )
    })
  })

  describe('Validate Pet properties', () => {
    test.each([
      ['name'],
      ['birthday'],
      ['size'],
      ['personality'],
      ['species'],
      ['status'],
      ['profilePictureUrl'],
      ['shelter_id']
    ]
    )('should throw an error if property %s is null', async (param) => {
      petObject[param] = null
      try {
        await db.Pet.create(petObject)
      } catch (err) {
        expect(err).toHaveProperty('errors')
        expect(err.errors[0].type).toEqual('notNull Violation')
        expect(err.errors[0].message).toEqual(`${param} field is required`)
      }
    })

    test.each([
      ['name'],
      ['birthday'],
      ['size'],
      ['personality'],
      ['species'],
      ['status'],
      ['profilePictureUrl'],
      ['shelter_id']
    ])('should throw an error if property %s is empty', async (param) => {
      petObject[param] = ''
      const pet = db.Pet.build(petObject)
      await expect(pet.validate()).rejects.toThrow(`Validation error: ${param} field cannot be empty`)
    })

    test.each([
      ['birthday'],
      ['profilePictureUrl'],
    ])('should throw an error if property %s has an invalid format', async (param) => {
      petObject[param] = 'invalid_format'
      try {
        await db.Pet.create(petObject)
      } catch (err) {
        expect(err).toHaveProperty('errors')
        expect(err.errors[0].message).toMatch(/(i?)^(invalid)\s(\w+)\s(format)$/)
      }
    })

    test.each([
      ['size'], ['species'], ['status']
    ])('should throw an error if property %s has an invalid entry', async (param) => {
      petObject[param] = 'invalid_entry'
      try {
        await db.Pet.create(petObject)
      } catch (err) {
        expect(err).toHaveProperty('errors')
        expect(err.errors[0].message).toContain('accepted options')
      }
    })
  })
})