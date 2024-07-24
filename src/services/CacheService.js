import { createClient } from 'redis'
import config from '../utils/config.js'

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

  delete (key) {
    return this._client.del(key)
  }
}

export default CacheService
