const { faker } = require('@faker-js/faker')
const { hashSync, genSaltSync } = require('bcrypt')
const database = require('../../database/models')

const createRandomUsers = async (numberOfUsers = 1) => {
  const salt = genSaltSync()
  
  const createFakeUser = () => ({
    id: `'${faker.string.uuid()}'`,
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: hashSync('secret', salt).toString('hex'),
    salt: salt.toString('hex'),
    phone: faker.helpers.fromRegExp('([1-9]{2})[9?][1-9]{8}'),
    city: faker.location.city(),
    about: faker.person.bio(),
    profilePictureUrl: faker.image.avatar(),
    role: faker.helpers.arrayElement(['standard', 'administrator'])
  })

  const arrayOfUsers = faker
    .helpers
    .multiple(createFakeUser, { 
      count: Number(numberOfUsers) 
    })

  try {
    const users = await database.User.bulkCreate(arrayOfUsers) 
    return numberOfUsers === 1 ? users[0] : users
  } catch (err) {
    throw new Error(err.message)
  }
}


const createRandomShelters = async (numberOfShelters = 1) => {
  const createFakeShelter = () => ({
    id: `'${faker.string.uuid()}'`,
    name: `Shelter ${faker.person.firstName()}`,
    email: faker.internet.email().toLowerCase(),
    phone: faker.helpers.fromRegExp('([1-9]{2})[9?][1-9]{8}'),
    city: faker.location.city(),
    state: faker.location.state(),
  })

  const arrayOfShelters = faker
    .helpers
    .multiple(createFakeShelter, { 
      count: numberOfShelters
    })

  try {
    const shelters = await database.Shelter.bulkCreate(arrayOfShelters)
    return numberOfShelters === 1 ? shelters[0] : shelters
  } catch (error) {
    throw new Error(error)
  }
}


const createRandomPets = async (numberOfPets = 1) => {
  const shelter = await createRandomShelters()
  
  const createFakePet = () => ({
    id: `'${faker.string.uuid()}'`,
    name: faker.person.firstName(),
    birthday: faker.date.birthdate({ min: 0, max: 15, mode: 'age' }),
    size: faker.helpers.arrayElement(['Mini', 'Small', 'Medium', 'Large', 'Giant']),
    personality: faker.person.bio(),
    species: faker.helpers.arrayElement(['Dog', 'Cat']),
    status: faker.helpers.arrayElement(['New', 'Available', 'Adopted', 'Quarentine', 'Removed', 'Suspended']),
    profilePictureUrl: faker.image.urlLoremFlickr({ category: 'pet' }),
    shelter_id: shelter.id
  })

  const arrayOfPets = faker
    .helpers
    .multiple(createFakePet, { 
      count: numberOfPets 
    })

  try {
    const pets = await database.Pet.bulkCreate(arrayOfPets)
    return numberOfPets === 1 ? pets[0] : pets
  } catch (error) {
    throw new Error(error)
  }
}


const createRandomProfiles = async (profileName) => {
  try {
    return await database.Profile.create({
      id: faker.string.uuid(),
      name: profileName,
      description: `A ${profileName} profile`,
    })
  } catch (error) {
    throw new Error(error)
  }

}


const createRandomPermissions = async () => {
  try {
    return database.Permission.create({
      id: faker.string.uuid(),
      name: 'read',
      description: 'permission to read contents',
    })
  } catch (error) {
    throw new Error(error)
  }
}


module.exports = {
  createRandomUsers,
  createRandomShelters,
  createRandomPets,
  createRandomProfiles,
  createRandomPermissions,
}