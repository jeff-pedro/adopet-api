const { v4: uuidv4 } = require('uuid')
const Services = require('../../services/Services.js')
const dataSource = require('../../database/models')
const BadRequestError = require('../../errors/badRequestError.js')

jest.mock('uuid')
jest.mock('../../database/models', () => ({
  MyModel: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    restore: jest.fn(),
    scope: jest.fn().mockReturnThis(),
  }
}))

describe('Services', () => {
  let service

  beforeAll(() => {
    service = new Services('MyModel')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getAllRecords should call findAll with correct options', async () => {
    const options = { where: { name: 'test' } }
    await service.getAllRecords(options)
    expect(dataSource.MyModel.findAll).toHaveBeenCalledWith(options)
  })

  test('getRecordById should call findByPk with correct id', async () => {
    const id = 1
    await service.getRecordById(id)
    expect(dataSource.MyModel.findByPk).toHaveBeenCalledWith(id)
  })

  test('getOneRecord should call findOne with correct options', async () => {
    const options = { where: { name: 'test' } }
    await service.getOneRecord(options)
    expect(dataSource.MyModel.findOne).toHaveBeenCalledWith(options)
  })

  test('getRecordByScope should call scope and findOne with correct scope and where', async () => {
    const scopeName = 'defaultScope'
    const where = { id: 1 }
    await service.getRecordByScope(scopeName, where)
    expect(dataSource.MyModel.scope).toHaveBeenCalledWith(scopeName)
    expect(dataSource.MyModel.findOne).toHaveBeenCalledWith({ where })
  })

  test('createRecord should throw error if dto is empty', async () => {
    const dto = {}
    const result = service.createRecord(dto)
    await expect(result).rejects.toThrow(BadRequestError)
  })

  test('createRecord should call create with correct dto and options', async () => {
    const dto = { name: 'test' }
    const options = {}
    uuidv4.mockReturnValue('uuid')
    await service.createRecord(dto, options)
    expect(dataSource.MyModel.create).toHaveBeenCalledWith({ id: 'uuid', ...dto }, options)
  })

  test('createRecord should handle database errors', async () => {
    const dto = { name: 'test' }
    const options = {}
    uuidv4.mockReturnValue('uuid')
    dataSource.MyModel.create.mockRejectedValue(new Error('Database Error'))
    await expect(service.createRecord(dto, options)).rejects.toThrow('Database Error')
  })

  test('updateRecordByScope should call scope and update with correct scope, dto, and options', async () => {
    const scopeName = 'defaultScope'
    const dto = { name: 'updated' }
    const options = { where: { id: 1 } }
    await service.updateRecordByScope(scopeName, dto, options)
    expect(dataSource.MyModel.scope).toHaveBeenCalledWith(scopeName)
    expect(dataSource.MyModel.update).toHaveBeenCalledWith(dto, options)
  })

  test('updateRecord should call update and findOne with correct dto and options', async () => {
    const dto = { name: 'updated' }
    const options = { where: { id: 1 } }
    dataSource.MyModel.update.mockResolvedValue([1])
    await service.updateRecord(dto, options)
    expect(dataSource.MyModel.update).toHaveBeenCalledWith(dto, options)
    expect(dataSource.MyModel.findOne).toHaveBeenCalledWith(options)
  })

  test('updateRecord should return false if no records were updated', async () => {
    const dto = { name: 'updated' }
    const options = { where: { id: 1 } }
    dataSource.MyModel.update.mockResolvedValue([0])
    const result = await service.updateRecord(dto, options)
    expect(result).toBe(false)
  })

  test('updateRecord should handle database errors', async () => {
    const dto = { name: 'updated' }
    const options = { where: { id: 1 } }
    dataSource.MyModel.update.mockRejectedValue(new Error('Database Error'))
    await expect(service.updateRecord(dto, options)).rejects.toThrow('Database Error')
  })

  test('deleteRecord should call destroy with correct options', async () => {
    const options = { where: { id: 1 } }
    await service.deleteRecord(options)
    expect(dataSource.MyModel.destroy).toHaveBeenCalledWith(options)
  })

  test('deleteRecord should handle database errors', async () => {
    const options = { where: { id: 1 } }
    dataSource.MyModel.destroy.mockRejectedValue(new Error('Database Error'))
    await expect(service.deleteRecord(options)).rejects.toThrow('Database Error')
  })

  test('restoreRecord should call restore with correct options', async () => {
    const options = { where: { id: 1 } }
    await service.restoreRecord(options)
    expect(dataSource.MyModel.restore).toHaveBeenCalledWith(options)
  })

  test('restoreRecord should handle database errors', async () => {
    const options = { where: { id: 1 } }
    dataSource.MyModel.restore.mockRejectedValue(new Error('Database Error'))
    await expect(service.restoreRecord(options)).rejects.toThrow('Database Error')
  })
})
