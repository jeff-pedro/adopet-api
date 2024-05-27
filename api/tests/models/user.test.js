process.env.NODE_ENV = 'test'
const db = require('../../../database/models')

describe.skip('Testing User model', () => {

  let userObject

  beforeAll(async () => {
    // Initialize the database
    await db.User.sync()
  }, 20000)

  beforeEach(async () => {
    // Object containing user proprieties to be tested
    userObject = {
      name: 'Jack Sparrow',
      email: 'jack@mail.com',
      password: 'jack123',
      phone: '+7712345678',
      city: 'Tortuga',
      profilePictureUrl: 'https://images.com/jack-sparrow',
      role: 'standard'
    }
  })

  afterAll(async () => {
    // Drop the User table
    await db.User.drop()
    
    // Closes the db connection
    await db.sequelize.close()
  })

  describe('Create User', () => {
    it('should create a new instance of user', () => {
      const user = db.User.build(userObject)
      expect(user).toEqual(
        expect.objectContaining(userObject)
      )
    })

    it('should save user on the database', async () => {
      const user = await db.User.create(userObject)
      expect(user).toEqual(
        expect.objectContaining(
          {
            id: expect.any(Number),
            ...userObject,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
          }
        )
      )
    })
  })

  describe('Validate user properties', () => {
    test.each([
      ['name'], ['email'], ['password'], ['role']
    ]
    )('should throw an error if property %s is null', async (param) => {
      userObject[param] = null
      try {
        await db.User.create(userObject)
      } catch (err) {
        expect(err).toHaveProperty('errors')
        expect(err.errors[0].type).toEqual('notNull Violation')
        expect(err.errors[0].message).toEqual(`${param} field is required`)
      }
    })

    test.each([
      ['name'], ['password'], ['email']
    ])('should throw an error if property %s is empty', async (param) => {
      userObject[param] = ''
      const user = db.User.build(userObject)
      await expect(user.validate()).rejects.toThrow(`Validation error: ${param} field cannot be empty`)
    })

    test.each([
      ['email'], ['profilePictureUrl']
    ])('should throw an error if property %s has an invalid format', async (param) => {
      userObject[param] = 'invalid_format'
      try {
        await db.User.create(userObject)
      } catch (err) {
        expect(err).toHaveProperty('errors')
        expect(err.errors[0].message).toMatch(/(i?)^(invalid)\s(\w+)\s(format)$/)
      }
    })

    it('should throw an error if a given email already exists', async () => {
      try {
        // duplicate entries
        await db.User.create(userObject)
        await db.User.create(userObject)
      } catch (err) {
        expect(err.errors[0].message).toEqual('email already in use')
      }
    })

    it('should throw an error if given an invalid role option', async () => {
      userObject.role = ''
      const user = db.User.build(userObject)
      await expect(user.validate()).rejects.toThrow('Validation error: accepted options: [ administrator, standard ]')
    })
  })
})