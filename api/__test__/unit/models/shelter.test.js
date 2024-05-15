process.env.NODE_ENV = 'test'
const db = require('../../../database/models')

describe('Testing Shelter model', () => {

  let shelterObject

  beforeAll(async () => {
    // Initialize the database
    await db.Shelter.sync()
  }, 20000)

  beforeEach(async () => {
    // Object containing Shelter proprieties to be tested
    shelterObject = {
      name: 'Caribbean Crazy Animals',
      email: 'contact@crazyanimals.sea',
      phone: '+08898985421',
      city: 'Port Royal',
      state: 'Caribbean'
    }
  })

  afterAll(async () => {
    // Drop the Shelter table
    await db.Shelter.drop()

    // Closes the db connection
    await db.sequelize.close()
  }, 10000)

  describe('Create Shelter', () => {
    it('should create a new instance of shelter', () => {
      const shelter = db.Shelter.build(shelterObject)
      expect(shelter).toEqual(
        expect.objectContaining(shelterObject)
      )
    })

    it('should save Shelter on the database', async () => {
      const shelter = await db.Shelter.create(shelterObject)
      expect(shelter).toEqual(
        expect.objectContaining(
          {
            id: expect.any(Number),
            ...shelterObject,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
          }
        )
      )
    })
  })

  describe('Validate Shelter properties', () => {
    test.each([
      ['name'],
      ['email'],
      ['phone'],
      ['city'],
      ['state']
    ]
    )('should throw an error if property %s is null', async (param) => {
      shelterObject[param] = null
      try {
        await db.Shelter.create(shelterObject)
      } catch (err) {
        expect(err).toHaveProperty('errors')
        expect(err.errors[0].type).toEqual('notNull Violation')
        expect(err.errors[0].message).toEqual(`${param} field is required`)
      }
    })

    test.each([
      ['name'],
      ['email'],
      ['phone'],
      ['city'],
      ['state']
    ])('should throw an error if property %s is empty', async (param) => {
      shelterObject[param] = ''
      try {
        await db.Shelter.create(shelterObject)

      } catch (err) {
        expect(err).toHaveProperty('errors')
        expect(err.errors[0].type).toEqual('Validation error')
        expect(err.errors[0].message).toEqual(`${param} field cannot be empty`)
      }
    })

    it('should throw an error if property email has an invalid format', async () => {
      shelterObject.email = 'invalid_email_format'
      try {
        await db.Shelter.create(shelterObject)
      } catch (err) {
        expect(err).toHaveProperty('errors')
        expect(err.errors[0].message).toEqual('invalid email format')
      }
    })
  })
})