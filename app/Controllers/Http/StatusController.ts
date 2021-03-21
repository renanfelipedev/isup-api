import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Site from 'App/Models/Site'

export default class StatusController {
  public async index({ auth, params, response }: HttpContextContract) {
    const { siteId } = params

    const user = auth.user

    const site = await Site.findOrFail(siteId)

    if (site.userId !== user?.id) {
      return response.status(401).json({
        message: 'Unauthorized.',
      })
    }

    await site?.preload('status')

    return site.status
  }
}
