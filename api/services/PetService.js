const { v4: uuid } = require('uuid')
const Services = require('./Services')
const dataSource = require('../database/models')
const Api404Error = require('../errors/api404Error.js')

class PetService extends Services {
  constructor() {
    super('Pet')
    this.userService = new Services('User')
    this.adoptionService = new Services('Adoption')
  }
  
  async newAdoption(dto) {
    const pet = await super.getRecordById(dto.pet_id)
    const tutor = await this.userService.getRecordById(dto.tutor_id)

    if (!pet || !tutor) {
      throw new Api404Error('tutor or pet id not found.')
    }

    return dataSource.sequelize.transaction(async (t) => {
      const adoption = await this.adoptionService.createRecord({
        id: uuid(),
        tutor_id: dto.tutor_id,
        pet_id: dto.pet_id,
        date: dto.date
      }, { transaction: t })

      await super.updateRecord({ status: 'Adopted' }, { 
        where: { id: dto.pet_id }, 
        transaction: t
      })

      return adoption
    })
  }

  async removeAdoption(id) {
    const pet = await super.getRecordByScope('adopted', { id })

    if (!pet) {
      throw new Api404Error('pet id not found.')
    }

    return dataSource.sequelize.transaction(async (t) => {
      // delete adoption
      await this.adoptionService.deleteRecord({
        where: { pet_id: id },
        transaction: t
      })
      
      // update status to available
      await super.updateRecordByScope('adopted', 
        { 
          status: 'Available' 
        }, 
        { 
          where: { id }, 
          transaction: t 
        })
    })
  }
}

module.exports = PetService
