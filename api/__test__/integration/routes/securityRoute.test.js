process.env.NODE_ENV = 'test'

const request = require('supertest')
const app = require('../../../app')

const database = require('../../../models')
const { v4: uuid } = require('uuid')


describe('Security', () => {
  beforeAll(async () => {
    await database.Profile.create({
      id: uuid(),
      name: 'tutor',
      description: 'A tutor profile'
    })
    
    await database.Permission.create({
      id: uuid(),
      name: 'read',
      description: 'permission to read contents'
    })
  })

  
  afterAll(async () => {
    await database.Profile.destroy({ where: {} })
    await database.Permission.destroy({ where: {} })
  })


  it('should add permissions to one profile', async () => {
    const res = await request(app)
      .post('/api/security/profile/permissions')
      .send({
        profile: 'tutor',
        permissions: [ 'read' ]
      })

    expect(res.status).toEqual(201)
    expect(res.body.profilePermissions[0].name).toEqual('read')
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        profilePermissions: [
          expect.objectContaining({
            name: expect.any(String),
            description: expect.any(String),
          })
        ],
      })
    )
  })

})