const { PermissionService } = require('../services')

const permissionService = new PermissionService()

class PermissionsController {
  static async createPermission(req, res) {
    const { name, description } = req.body

    try {
      const permission = await permissionService.create({
        name,
        description,
      })
      res.status(201).json(permission)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async getAllPermissions(req, res) {
    try {
      const permissions = await permissionService.getAll()
      res.status(200).json(permissions)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async getOnePermission(req, res) {
    const { id } = req.params

    try {
      const permission = await permissionService.getOne(id)
      res.status(200).json(permission)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async updatePermission(req, res) {
    const { id } = req.params
    const data = req.body

    try {
      const permission = await permissionService.update({ id, ...data })

      res.status(200).json(permission)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async deletePermission(req, res) {
    const { id } = req.params

    try {
      await permissionService.delete(id)
      res.status(200).json({
        message: `Permission with id: ${id} was deleted.`,
      })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}

module.exports = PermissionsController
