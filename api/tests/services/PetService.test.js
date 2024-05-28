const { describe, afterEach, expect } = require('@jest/globals')
const {v4: uuid } = require('uuid')
jest.mock('uuid')
const PetService = require('../../services/PetService.js')
const Api404Error = require('../../errors/api404Error.js')
const dataSource = require('../../database/models')

// Mock dos modelos e dos métodos usados
jest.mock('../../database/models', () => ({
  Pet: {
    findByPk: jest.fn(),
    update: jest.fn(),
    scope: jest.fn().mockReturnThis(),
    findOne: jest.fn()
  },
  User: {
    findByPk: jest.fn(),
  },
  Adoption: {
    create: jest.fn(),
    destroy: jest.fn(),
  },
  sequelize: {
    transaction: jest.fn()
  }
}))

describe('PetService', () => {
  let petService

  beforeAll(() => {
    petService = new PetService()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('newAdoption', () => {
    it('should throw error if pet or tutor not found', async () => {
      const dto = { pet_id: 1, tutor_id: 2, date: '2024-01-01' }

      dataSource.Pet.findByPk.mockResolvedValue(null)
      dataSource.User.findByPk.mockResolvedValue(null)

      const result = petService.newAdoption(dto)

      await expect(result).rejects.toThrow(Api404Error)
    })

    it('should create a new adoption and update pet status', async () => {
      uuid.mockReturnValue('uuid')
      const dto = { 
        pet_id: 1, 
        tutor_id: 2, 
        date: '2024-01-01' 
      }

      const mockPet = { id: 1, name: 'Fluffy' }
      const mockTutor = { id: 2, name: 'John Doe' }
      const mockAdoption = { id: 'uuid', pet_id: 1, tutor_id: 2, date: dto.date }

      dataSource.Pet.findByPk.mockResolvedValue(mockPet)
      dataSource.User.findByPk.mockResolvedValue(mockTutor)
      uuid.mockReturnValue('uuid')
      dataSource.Adoption.create.mockResolvedValue(mockAdoption)
      dataSource.Pet.update.mockResolvedValue([1])
      dataSource.sequelize.transaction.mockImplementation(async (callback) => {
        return await callback({})
      })

      const result = await petService.newAdoption(dto)

      expect(dataSource.Pet.findByPk).toHaveBeenCalledWith(dto.pet_id)
      expect(dataSource.User.findByPk).toHaveBeenCalledWith(dto.tutor_id)
      expect(dataSource.Adoption.create).toHaveBeenCalledWith({
        id: 'uuid',
        ...dto
      }, expect.any(Object))
      expect(dataSource.Pet.update).toHaveBeenCalledWith({ status: 'Adopted' }, {
        where: { id: dto.pet_id },
        transaction: expect.any(Object)
      })
      expect(result).toEqual(mockAdoption)   
    })
    
    it('should cancel an adoption and update pet status', async () => {
      const id = 1
      const mockPet = { id: 1, name: 'Fluffy', status: 'Adopted' }

      dataSource.Pet.scope.mockReturnThis()
      dataSource.Pet.findOne.mockResolvedValue(mockPet)
      dataSource.Adoption.destroy.mockResolvedValue(1)
      dataSource.Pet.update([1])
      dataSource.sequelize.transaction.mockImplementation(async (callback) => {
        return await callback({})
      })

      await petService.removeAdoption(id)

      expect(dataSource.Pet.scope).toHaveBeenCalledWith('adopted')
      expect(dataSource.Pet.findOne).toHaveBeenCalledWith({ where: { id } })
      expect(dataSource.Adoption.destroy).toHaveBeenCalledWith({ 
        where: { pet_id: id },
        transaction: expect.any(Object)
      })
      expect(dataSource.Pet.update).toHaveBeenCalledWith(
        { status: 'Available' }, 
        { where: { id }, transaction: expect.any(Object) })
    })

    it('should throw error if pet not found', async () => {
      const id = 1
        
      dataSource.Pet.scope.mockReturnThis()
      dataSource.Pet.findOne.mockResolvedValue(null)

      const result = petService.removeAdoption(id)
      
      await expect(result).rejects.toThrow(Api404Error)
    })
  })
})
