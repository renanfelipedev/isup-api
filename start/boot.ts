import axios from 'axios'

import Site from 'App/Models/Site'

const SECOND = 1000
const MINUTE = 60 * SECOND
const interval = 1 * MINUTE

const VerifyOnline = async () => {
  const sites = await Site.all()

  sites.forEach(async (site) => {
    const statusInfo = {}

    try {
      const response = await axios.get(site.address)
      const { request } = response

      Object.assign(statusInfo, {
        online: response.status === 200 && true,
        port: request.agent.defaultPort,
      })
    } catch ({ port, isAxiosError }) {
      Object.assign(statusInfo, { online: !isAxiosError, port: port })
    }

    await site?.related('status').create(statusInfo)
  })
}

setInterval(VerifyOnline, interval)
