const { describe, it, expect, afterAll } = require('@jest/globals')
const { createRandomUsers } = require('../helper/seeders.js')
const AuthService = require('../../services/AuthService.js')
const authService = new AuthService()

describe('Auth Service', () => {

  afterAll(async () => {
    // clear db
    await authService.deleteRecord({ 
      truncate: { cascade: true }, 
      force: true 
    })
  })

  describe('Testing authService.registerUser', () => {

    it('should not register a user without a password', async () => {
      const userMock = {
        name: 'Test',
        email: 'test@mail.com'
      }

      const savedUser = authService.registerUser(userMock)

      await expect(savedUser).rejects.toThrowError('password field is required')
    })

    it('should not register a user without a valid email', async () => {
      const userMock = {
        name: 'Test',
        password: 'secret123'
      }

      const savedUser = authService.registerUser(userMock)

      await expect(savedUser).rejects.toThrowError('email field is required')
    })

    it('should not register a user invalid email format', async () => {
      const userMock = {
        name: 'Test',
        password: 'secret123',
        email: 'test@'
      }

      const savedUser = authService.registerUser(userMock)

      await expect(savedUser).rejects.toThrowError('invalid email format')
    })

    it('should not register a user by passing an empty value to the email field', async () => {
      const userMock = {
        name: 'Test',
        password: 'secret123',
        email: ''
      }

      const savedUser = authService.registerUser(userMock)

      await expect(savedUser).rejects.toThrowError('email field cannot be empty')
    })

    it('should not register a user without a name', async () => {
      const userMock = {
        email: 'test@mail.com',
        password: 'secret123'
      }

      const savedUser = authService.registerUser(userMock)

      await expect(savedUser).rejects.toThrowError('name field is required')
    })

    it('should not register a user by passing an empty value to the name field', async () => {
      const userMock = {
        name: '',
        password: 'secret123',
        email: 'secret'
      }

      const savedUser = authService.registerUser(userMock)

      await expect(savedUser).rejects.toThrowError('name field cannot be empty')
    })

    it('should not be possible to register a user without providing any data', async () => {
      const userMock = {}

      const savedUser = authService.registerUser(userMock)

      await expect(savedUser).rejects.toThrowError('empty request body')
    })
    
    it('should register a user with name, email and password', async () => {
      const userMock = {
        name: 'Test',
        email: 'test4@mail.com',
        password: 'secret123'
      }

      const savedUser = await authService.registerUser(userMock)

      expect(savedUser).toEqual(
        expect.objectContaining({
          role: 'standard',
          id: expect.any(String),
          name: userMock.name,
          email: userMock.email,
          password: expect.any(String),
          salt: expect.any(String),
          updatedAt: expect.any(Date),
          createdAt: expect.any(Date)
        })
      )
    })
  })

  describe('Testing authService.login', () => {
    let userMock

    beforeEach(async () => {
      userMock = await createRandomUsers(1, 'secret123')
    })

    it('should login a user', async () => {
      userMock.password = 'secret123'

      const loggedUser = await authService.login(userMock)

      expect(loggedUser).toHaveProperty('token')
      expect(loggedUser.token).toEqual(expect.any(String))
      expect(loggedUser).toHaveProperty('user')
      expect(loggedUser.user).toEqual(
        expect.objectContaining({
          id: userMock.id,
          email: userMock.email
        })
      )
    })

    it('should try login with non-existent user', async () => {
      userMock.password = 'secret123'
      userMock.email = 'wrong@mail.com'

      const loggedUser = authService.login(userMock)

      await expect(loggedUser).rejects.toThrowError('This user not exist.')
    })

    it('should try login with an invalid password', async () => {
      userMock.password = 'wrongPassword!'

      const loggedUser = authService.login(userMock)
      
      await expect(loggedUser).rejects.toThrowError('Invalid email or password.')
    })

    it('returns an error when receiving an invalid secret env', async () => {
      userMock.password = 'secret123'
      process.env.JWT_SECRET = ''

      const result = authService.login(userMock)

      await expect(result).rejects.toThrowError('Error creating a token: secret must have a value')
    })

  })
})