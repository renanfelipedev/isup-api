import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import User from 'App/Models/User'

export default class AdminUserSeeder extends BaseSeeder {
  public async run() {
    const user = await User.create({
      name: 'Admin',
      email: 'admin@email.com',
      password: 'admin@123',
    })

    await user.related('sites').createMany([
      {
        address: 'www.google.com.br',
        time: 10,
      },
      {
        address: 'www.facebook.br',
        time: 10,
      },
      {
        address: 'www.twitch.com',
        time: 10,
      },
    ])
  }
}
