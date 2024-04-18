process.env.NODE_ENV = 'test'

const request = require('supertest')
const { v4: uuid } = require('uuid')

const app = require('../../../app')
const database = require('../../../models')
const login = require('../../helper/userLogin')

const { TutorService } = require('../../../services')
const tutorService = new TutorService()

describe('Security', () => {
  let profile
  let user
  const auth = {}

  beforeAll(async () => {
    user = await tutorService.create({
      name: 'Jack Sparrow',
      email: 'sparrow@pirates.sea',
      password: 'jack123',
    })

    profile = await database.Profile.create({
      id: uuid(),
      name: 'tutor',
      description: 'A tutor profile',
    })

    await database.Permission.create({
      id: uuid(),
      name: 'read',
      description: 'permission to read contents',
    })

    await login(auth, request, app)
  })

  afterAll(async () => {
    await database.Profile.destroy({ where: {} })
    await database.Permission.destroy({ where: {} })
    await database.User.destroy({ where: {} })
  })


  describe('Profile permissions', () => {
    describe('POST /security/profile/permissions/id', () => {

      it('should add permissions to one profile', async () => {
        const res = await request(app)
          .post('/api/security/profile/permissions')
          .set('Authorization', `Bearer ${auth.token}`)
          .send({
            profile: 'tutor',
            permissions: ['read'],
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
              }),
            ],
          })
        )
      })
    })

    
    describe('GET /security/profile/permissions', () => {
    
      it('returns all profiles with their permissions', async () => {
        const res = await request(app)
          .get('/api/security/profile/permissions')
          .set('Authorization', `Bearer ${auth.token}`)

        expect(res.status).toEqual(200)
        expect(res.body).toHaveLength(1)
        expect(res.body[0]).toHaveProperty('profilePermissions')
        expect(res.body[0].profilePermissions).toEqual([
          expect.objectContaining({
            name: 'read',
            description: expect.any(String),
          }),
        ])
      })
    })


    describe('GET /security/profile/permissions/id', () => {
    
      it('returns one profile with your permissions', async () => {
        const res = await request(app)
          .get(`/api/security/profile/permissions/id/${profile.id}`)
          .set('Authorization', `Bearer ${auth.token}`)

        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('profilePermissions')
        expect(res.body.profilePermissions).toEqual([
          expect.objectContaining({
            name: 'read',
            description: expect.any(String),
          }),
        ])
      })
    })
  })


  describe('ACL', () => {
    describe('POST /security/acl', () => {
      
      it('should register one profile to an user', async () => {
        const res = await request(app)
          .post('/api/security/acl')
          .set('Authorization', `Bearer ${auth.token}`)
          .set('Accept', 'application/json')
          .send({
            userId: user.id,
            profileId: profile.id,
          })

        expect(res.status).toEqual(201)
        expect(res.body).toHaveProperty('userProfile')
        expect(res.body.userProfile[0].name).toMatch(profile.name)
      })
    })
  })
})
