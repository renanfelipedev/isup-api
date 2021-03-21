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
    const status = {}

    site &&
      https
        .get(`${site?.address}`)
        .on('response', async (response) => {
          const port = site?.address.startsWith('https') ? 443 : 80

          Object.assign(status, { port })

          const { statusCode } = response
          Object.assign(status, { online: true })

          if (statusCode !== 200) {
            Object.assign(status, { online: false })
          }

          await site?.related('status').create(status)
        })
        .on('error', () => {})
  })
}, timeout)
