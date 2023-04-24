process.env.NODE_ENV = 'test'
const db = require('../../../models')

describe('Testing User model', () => {

  let userObject

  beforeAll(async () => {
    // Initialize the databases
    await db.sequelize.sync()
  })

  beforeEach(async () => {
    // Clean the database
    await db.User.destroy({ where: {} })

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
    it('should throw an error when name is null', async () => {
      userObject.name = null
      const user = db.User.build(userObject)
      await expect(user.validate()).rejects.toThrow('notNull Violation: name field is required')
    })

    it('should throw an error when name is empty', async () => {
      userObject.name = ''
      const user = db.User.build(userObject)
      await expect(user.validate()).rejects.toThrow('Validation error: name field cannot be empty')
    })

    it('should throw an error when email is null', async () => {
      try {
        userObject.email = null
        await db.User.create(userObject)
      } catch (err) {
        expect(err.errors[0].type).toBe('notNull Violation')
        expect(err.message).toContain('email field is required')
      }
    })

    it('should throw an error when email has an invalid format', async () => {
      userObject.email = 'invalid_email_format'
      const user = db.User.build(userObject)
      await expect(user.validate()).rejects.toThrow('Validation error: invalid email format')
    })

    it('should throw an error when a given email already exists', async () => {
      await db.User.create(userObject)
      await expect(db.User.create(userObject)).rejects.toThrow('email already exist')
    })

    it('should throw an error when password is null', async () => {
      userObject.password = null
      const user = db.User.build(userObject)
      await expect(user.validate()).rejects.toThrow('notNull Violation: password field is required')
    })

    it('should throw an error when password is empty', async () => {
      userObject.password = ''
      const user = db.User.build(userObject)
      await expect(user.validate()).rejects.toThrow('Validation error: password field cannot be empty')
    })

    it('should throw an error when role is null', async () => {
      userObject.role = null
      const user = db.User.build(userObject)
      await expect(user.validate()).rejects.toThrow('notNull Violation: role field is required')
    })

    it('should throw an error when given an invalid role option', async () => {
      userObject.role = ''
      const user = db.User.build(userObject)
      await expect(user.validate()).rejects.toThrow('Validation error: accepted options: [ administrator, standard ]')
    })

    it('should throw an error when profileUrlPicture has nan invalid format', async () => {
      userObject.profilePictureUrl = 'http://invalid_url_format'
      const user = db.User.build(userObject)
      await expect(user.validate()).rejects.toThrow('Validation error: invalid URL format')
    })
  })
  
  afterAll(async () => {
    // Closes the db connection
    await db.sequelize.close()
  })
})

