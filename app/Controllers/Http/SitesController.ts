import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Site from 'App/Models/Site'

export default class SitesController {
  public async index({ auth }: HttpContextContract) {
    await auth.user?.preload('sites')
    return auth.user?.sites
  }

  public async store({ auth, request }: HttpContextContract) {
    const site = await auth.user?.related('sites').firstOrCreate(request.all())
    return site
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({ auth, response, params }: HttpContextContract) {
    const { id } = params

    const site = await Site.findOrFail(id)

    if (site.userId !== auth.user?.id) {
      return response.status(400).json({
        error: {
          message: 'Unauthorized',
        },
      })
    }

    await site.delete()

    return response
  }
}
