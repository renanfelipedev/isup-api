import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import User from 'App/Models/User'

export default class AdminUserSeeder extends BaseSeeder {
  public async run() {
    await User.create({
      name: 'Admin',
      email: 'admin@email.com',
      password: 'admin@123',
    })
  }
}
