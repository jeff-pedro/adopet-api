const { v4: uuid } = require('uuid')
const dataSource = require('../models')
const Services = require('./Services.js')

class AdoptionService extends Services {
  constructor() {
    super('Adoption')
  }

  async createRecord(dto, petId) {
    const adoption = await dataSource[this.model].create({
      id: uuid(),
      ...dto
    })

    await dataSource.Pet.update({ status: 'Adopted' }, { where: { id: petId } })

    return adoption
  }

  async deleteRecord(id) {
    return dataSource[this.model].destroy({ where: { animal: id } })
  }

}

module.exports = AdoptionService
