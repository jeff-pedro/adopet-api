const { v4: uuidv4 } = require('uuid')
const database = require('../models')

class PermissionService {
  async create(dto) {
    const permissionExists = await database.Permission.findOne({
      where: {
        name: dto.name
      }
    })

    if (permissionExists) {
      throw new Error('Permission already exists.')
    }

    try {
      const newPermission = await database.Permission.create({
        id: uuidv4(),
        ...dto
      })

      return newPermission
    } catch (err) {
      throw new Error(err)
    }
  }

  async getAll() {
    try {
      const permissions = await database.Permission.findAll()

      if (!permissions) {
        throw new Error('No permission found.')
      }

      return permissions
    } catch (err) {
      throw new Error(err)
    }
  }

  async getOne(id) {
    try {
      const permission = await database.Permission.findOne({
        where: { id }
      })

      if (!permission) {
        throw new Error('No permission found.')
      }

      return permission
    } catch (err) {
      throw new Error(err)
    }
  }

  async update(dto) {
    try {
      const permission = await database.Permission.findOne({
        where: {
          id: dto.id
        }
      })
  
      if (!permission) {
        throw new Error('No permission found.')
      }

      permission.name = dto.name
      permission.description = dto.description

      await permission.save()
     
      return await permission.reload() 
    } catch (err) {
      throw new Error(err)
    }
  }

  async delete (id) {
    const permission = await database.Permission.findOne({
      where: { id }
    })

    if (!permission) {
      throw new Error('No permission found.')
    }
    
    try {
      await database.Permission.destroy({
        where: { id }
      })
      
      return
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = PermissionService