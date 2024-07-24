import { createClient } from 'redis'
import config from '../utils/config.js'
import NotFoundError from '../exceptions/NotFoundError.js'

class CacheService {
  constructor () {
    this._client = createClient({
      socket: config.redis.host
    })

    this._client.on('error', (error) => {
      console.error(error)
    })
  }

  async set (key, value, expirationInSeconds = 108000) {
    await this._client.set(key, value, {
      EX: expirationInSeconds
    })
  }

  async get (key) {
    const result = await this._client.get(key)

    if (!result) {
      throw new NotFoundError('Cache not found.')
    }

    return result
  }

  delete (key) {
    return this._client.del(key)
  }
}

export default CacheService
