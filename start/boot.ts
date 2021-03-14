/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import https from 'https'

import Site from 'App/Models/Site'

const SECOND = 1000
const timeout = 120 * SECOND

setInterval(async () => {
  const sites = await Site.all()

  sites.forEach((site) => {
    const info = {}

    site &&
      https
        .get(`${site?.address}`)
        .on('response', async (response) => {
          const port = site?.address.startsWith('https') ? 443 : 80

          Object.assign(info, { port })

          const { statusCode } = response
          Object.assign(info, { online: true })

          if (statusCode !== 200) {
            Object.assign(info, { online: false })
          }

          await site?.related('siteInfo').create(info)
        })
        .on('error', () => {})
  })
}, timeout)
