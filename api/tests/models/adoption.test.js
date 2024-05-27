process.env.NODE_ENV = 'test'
const db = require('../../../database/models')

describe.skip('Testing Adoption model', () => {

  let adoptionObject
  let shelter
  let user
  let pet

  beforeAll(async () => {
    // Initialize the databases
    await db.sequelize.sync()

    // Create entities to be used in Adoption
    user = await db.User.create({
      name: 'Jack Sparrow',
      email: 'jack@mail.com',
      password: 'jack123',
      phone: '+7712345678',
      city: 'Tortuga',
      profilePictureUrl: 'https://images.com/jack-sparrow',
      role: 'standard'
    })

    shelter = await db.Shelter.create({
      name: 'Caribbean Crazy Animals',
      email: 'contact@crazyanimals.sea',
      phone: '+08898985421',
      city: 'Port Royal',
      state: 'Caribbean'
    })

    pet = await db.Pet.create({
      name: 'Cotton',
      birthday: '2023-01-01',
      size: 'Mini',
      personality: 'He chatty and cute.',
      species: 'Dog',
      status: 'New',
      profilePictureUrl: 'http://images.com/cotton',
      shelter_id: shelter.id
    })
  }, 20000)

  beforeEach(async () => {
    // Object containing Adoption proprieties to be tested
    adoptionObject = {
      animal: pet.id,
      tutor: user.id,
      date: new Date('2023-04-01')
    }
  })

  afterAll(async () => {
    // Drop all databases
    await db.Adoption.drop()
    await db.Pet.drop()
    await db.Shelter.drop()
    await db.User.drop()

    // Closes the db connection
    await db.sequelize.close()
  }, 20000)

  describe('Create Adoption', () => {
    it('should create a new instance of adoption', () => {
      const adoption = db.Adoption.build(adoptionObject)
      expect(adoption).toEqual(
        expect.objectContaining(adoptionObject)
      )
    })

    it('should save adoption on the database', async () => {
      const adoption = await db.Adoption.create(adoptionObject)
      expect(adoption).toEqual(
        expect.objectContaining(
          {
            id: expect.any(Number),
            ...adoptionObject,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
          }
        )
      )
    })
  })

  describe('Validate Adoption properties', () => {
    test.each([
      ['animal'],
      ['tutor'],
      ['date'],
    ])('should throw an error if property %s is null', async (param) => {
      adoptionObject[param] = null
      try {
        await db.Adoption.create(adoptionObject)
      } catch (err) {
        expect(err).toHaveProperty('errors')
        expect(err.errors[0].type).toEqual('notNull Violation')
        expect(err.errors[0].message).toEqual(`${param} field is required`)
      }
    })

    test.each([
      ['animal'],
      ['tutor'],
      ['date'],
    ])('should throw an error if property %s is empty', async (param) => {
      adoptionObject[param] = ''
      try {
        await db.Adoption.create(adoptionObject)

      } catch (err) {
        expect(err).toHaveProperty('errors')
        expect(err.errors[0].type).toEqual('Validation error')
        expect(err.errors[0].message).toEqual(`${param} field cannot be empty`)
      }
    })

    it('should throw an error if try to adopt a pet already adopted', async () => {
      try {
        await db.Adoption.create(adoptionObject)
        await db.Adoption.create(adoptionObject)
      } catch (err) {
        expect(err).toHaveProperty('errors')
        expect(err.errors[0].message).toEqual('this pet was already adopted')
      }
    })
  })
})