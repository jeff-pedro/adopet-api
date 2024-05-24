const Services = require('./Services')
const dataSource = require('../database/models')
const { v4: uuid } = require('uuid')

class PetService extends Services {
  constructor() {
    super('Pet')
    this.userService = new Services('User')
    this.adoptionService = new Services('Adoption')
  }
  
  async newAdoption(dto) {
    return dataSource.sequelize.transaction(async (t) => {

      const adoption = await this.adoptionService.createRecord({
        id: uuid(),
        tutor_id: dto.tutor_id,
        pet_id: dto.pet_id,
        date: dto.date
      }, { transaction: t })

      await super.updateRecord({ status: 'Adopted' }, dto.pet_id, t)

      return adoption
    })
  }

  async removeAdoption(id) {
    return dataSource.sequelize.transaction(async (t) => {

      // delete adoption
      const isDeleted = await this.adoptionService.deleteRecord({
        where: { pet_id: id },
        transaction: t
      })

      if (!isDeleted) throw new Error('error when tring to delete the adoption')

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
