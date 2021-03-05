import test from 'japa'

import User from 'App/Models/User'

import { rollbackMigrations, runMigrations } from '../japaFile'

test.group('User', (group) => {
  group.before(runMigrations)
  group.after(rollbackMigrations)

  test('deve assegurar que a senha seja criptografada durante a criação de usuário', async (assert) => {
    const user = await User.create({
      name: 'Test',
      email: 'teste@email.com',
      password: 'test',
    })

    assert.notEqual(user.password, 'test')
  })

  test('não deve permitir a criação de mais de um usuário com o mesmo e-mail', async (assert) => {
    try {
      await User.create({
        name: 'Test',
        email: 'teste@email.com',
        password: 'test',
      })
    } catch ({ code }) {
      assert.equal(code, 'SQLITE_CONSTRAINT')
    }
  })
})
