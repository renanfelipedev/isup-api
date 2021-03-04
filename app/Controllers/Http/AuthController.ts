import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({ response }: HttpContextContract) {
    return response.json({ auth: 'Login' })
  }
}
