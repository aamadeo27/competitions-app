import axios from 'axios'
import { logger } from './logger'

import { setupCache } from 'axios-cache-adapter'

const cache = setupCache({
  maxAge: 15 * 60 * 1000,
})

const api = axios.create({
  adapter: cache.adapter,
})

export async function request(url: string, options = {}, useCache) {
  const requestFunction = useCache ? api : axios
  const response = await requestFunction({
    url,
    ...options,
  })

  if (response.status > 299) {
    logger.info(response.statusText)
    throw Error('Network Error in Request: ' + response.statusText)
  }

  return response.data
}
