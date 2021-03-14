import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Site from 'App/Models/Site'

export default class SiteInfosController {
  public async index({ params }: HttpContextContract) {
    const { siteId } = params

    const site = await Site.findOrFail(siteId)

    await site?.preload('siteInfo')

    return site?.siteInfo
  }
}
