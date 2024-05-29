const { describe, it, expect, beforeAll } = require('@jest/globals')
const { compare, genSalt, hash } = require('bcrypt')
const { sign } = require('jsonwebtoken')
const { v4: uuid } = require('uuid')
const AuthService = require('../../services/AuthService.js')
const Api404Error = require('../../errors/api404Error.js')
const UnauthorizedError = require('../../errors/unauthorizedError.js')
const InternalServerError = require('../../errors/internalServerError.js')
const dataSource = require('../../database/models')
const ValidationError = require('../../errors/validationError.js')
const InvalidArgumentError = require('../../errors/invalidArgumentError.js')

jest.mock('bcrypt')
jest.mock('jsonwebtoken')
jest.mock('uuid')
jest.mock('../../database/models', () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn()
  }
}))

describe('AuthService', () => {
  let authService

  beforeAll(() => {
    authService = new AuthService()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('register', () => {
    it('should register successfully and return new user', async () => {
      const dto = {
        email: 'newuser@example.com',
        password: 'password123'
      }
      const hashedPassword = 'hashedPassword'
      const salt = 'salt'
      const newUser = {
        id: 'uuid',
        ...dto,
        password: hashedPassword,
        salt
      }
      genSalt.mockResolvedValue(salt)
      hash.mockResolvedValue(hashedPassword)
      uuid.mockReturnValue('uuid')
      dataSource.User.create.mockResolvedValue(newUser)

      const result = await authService.register(dto)

      expect(genSalt).toHaveBeenCalled()
      expect(hash).toHaveBeenCalledWith('password123', 'salt')
      expect(dataSource.User.create).toHaveBeenCalledWith({
        id: 'uuid',
        ...dto,
        password: hashedPassword,
        salt
      }, {})
      expect(result).toEqual(newUser)
    })

    it('should throw error if password is not provided', async () => {
      const mockUser = { name: 'Test', email: 'test@mail.com' }

      const result = authService.register(mockUser)

      await expect(result).rejects.toThrow(ValidationError)
      await expect(result).rejects.toThrowError('password field is required')
    })

    it('should throw error if request body is empty', async () => {
      const mockUser = {}

      const result = authService.register(mockUser)

      await expect(result).rejects.toThrow(InvalidArgumentError)
      await expect(result).rejects.toThrowError('empty request body')
    })
  })

  describe('login', () => {
    it('should return user and token on successful login', async () => {
      const mockUser = {id: 1, email: 'test@test.com', password: 'password' }
      const token = 'hashedToken'

      dataSource.User.findOne.mockResolvedValue(mockUser)
      compare.mockResolvedValue(true)
      sign.mockReturnValue(token)

      const result = await authService.login(mockUser)

      expect(result).toEqual({
        user: {
          id: mockUser.id,
          email: mockUser.email
        },
        token: expect.any(String)
      })
    })

    it('should throw error if user not found', async () => {
      const mockUser = { id: 1, email: 'test@test.com', password: 'password' }
      dataSource.User.findOne.mockResolvedValue(null)

      const result = authService.login(mockUser)

      await expect(result).rejects.toThrow(Api404Error)
      await expect(result).rejects.toThrowError('This user not exist.')
    })

    it('should throw error if the password is invalid', async () => {
      const mockUser = { id: 1, email: 'test@test.com', password: 'wrongPassword' }
      dataSource.User.findOne.mockResolvedValue(mockUser)
      compare.mockReturnValue(false)

      const result = authService.login(mockUser)
      
      await expect(result).rejects.toThrow(UnauthorizedError)
      await expect(result).rejects.toThrowError('Invalid email or password.')
    })

    it('should throw error if JWT secret is not exist', async () => {
      const mockUser = { id: 1, email: 'test@test.com', password: 'wrongPassword' }
      dataSource.User.findOne.mockResolvedValue(mockUser)
      compare.mockReturnValue(true)
      process.env.JWT_SECRET = ''

      const result = authService.login(mockUser)

      await expect(result).rejects.toThrow(InternalServerError)
      await expect(result).rejects.toThrowError('Error creating a token: secret must have a value')
    })
  })
})