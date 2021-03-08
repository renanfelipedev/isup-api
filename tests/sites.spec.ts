import test from 'japa'
import User from 'App/Models/User'

import { rollbackMigrations, runMigrations } from '../japaFile'

test.group('Site', (group) => {
  group.beforeEach(runMigrations)
  group.afterEach(rollbackMigrations)

  test('deve permitir a criação de um site', async (assert) => {
    const user = await User.create({
      name: 'Test',
      email: 'teste@email.com',
      password: 'test',
    })

    const site = await user.related('sites').create({
      address: 'www.test.com',
      time: 10,
    })

    assert.equal(site.address, 'www.test.com')
  })

  test('não deve permitir a criação de um site com endereço já cadastrado para um mesmo usuário', async (assert) => {
    try {
      const user = await User.create({
        name: 'Test',
        email: 'teste@email.com',
        password: 'test',
      })

      await user.related('sites').create({
        address: 'www.test.com',
        time: 10,
      })

      await user.related('sites').create({
        address: 'www.test.com',
        time: 10,
      })
    } catch ({ code }) {
      console.log(code)
      assert.isObject(code)
      assert.exists(code, 'error')
    }
  })
})
