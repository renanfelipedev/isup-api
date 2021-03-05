import test from 'japa'
import supertest from 'supertest'

import User from 'App/Models/User'

import { rollbackMigrations, runMigrations } from '../japaFile'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Auth', (group) => {
  group.beforeEach(runMigrations)
  group.afterEach(rollbackMigrations)

  test('deve permitir login para usuário existente', async (assert) => {
    const password = 'test'

    const { email } = await User.create({
      name: 'Test',
      email: 'teste@email.com',
      password,
    })

    const { body } = await supertest(BASE_URL).post('/login').send({ email, password }).expect(200)

    assert.isObject(body)
    assert.equal(body.type, 'bearer')
    assert.exists(body, 'token')
  })

  test('não deve permitir login para usuário não cadastrado', async (assert) => {
    const credentials = { email: 'naoexiste@email.com', password: 'teste' }

    const { body } = await supertest(BASE_URL).post('/login').send(credentials).expect(400)

    assert.exists(body, 'errors')
  })
})
