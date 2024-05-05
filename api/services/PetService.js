const Services = require('./Services')
const dataSource = require('../models')
const { v4: uuid } = require('uuid')

class PetService extends Services {
  constructor() {
    super('Pet')
  }
  
  async newAdoption(dto) {
    const pet = await super.getRecordById(dto.pet_id)

    if (!pet) {
      throw new Error('pet not found')
    }
    
    const adoption = await pet.createAdoption({
      id: uuid(),
      tutor_id: dto.tutor_id,
      pet_id: dto.pet_id,
      date: dto.date
    })

    await super.updateRecord({ status: 'Adopted' }, dto.pet_id)

    return adoption
  }

  async removeAdoption(id) {
    const pet = await dataSource[this.model].scope('adopted').findByPk(id)

    if (!pet) {
      // is already recovered 
      throw new Error('pet not found')
    }
    
    // update status to available
    const isUpdated = await dataSource[this.model]
      .scope('adopted')
      .update({ status: 'Available' }, { where: { id }})
    
    // delete adoption
    if (isUpdated) {
      pet.getAdoption().then((adoption) => {
        dataSource['Adoption'].destroy({ where: { id: adoption.id }})
      })
    }
    
    return true 
  }
}

module.exports = PetService
