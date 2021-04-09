import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import { loginSchema, registerSchema } from 'App/Validators/AuthValidator'
export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    try {
      await request.validate({
        schema: loginSchema,
      })

      const { email, password } = request.all()

      const { token } = await auth.use('api').attempt(email, password)
      const user = await User.findByOrFail('email', email)

      return {
        token,
        user: user.serialize({ fields: ['name', 'email'] }),
      }
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }

  public async register({ request, response }: HttpContextContract) {
    try {
      await request.validate({
        schema: registerSchema,
      })
      const user = await User.create(request.all())

      return user
    } catch ({ messages }) {
      return response.status(400).send(messages)
    }
  }
}
