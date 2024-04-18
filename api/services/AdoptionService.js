const database = require('../models')

class AdoptionService {

  async create(dto, petId) {
    try {
      const adoption = await database.Adoption.create(dto)

      await database.Pet.update({ status: 'Adopted' }, { where: { id: petId } })

      return adoption
    } catch (err) {
      console.log(err);
      throw new Error(err)
    }
  }

  async delete(id) {
    try {
      await database.Adoption.destroy({ where: { animal: id } })
    } catch (err) {
      throw new Error(err)
    }
  }

}

module.exports = AdoptionService
