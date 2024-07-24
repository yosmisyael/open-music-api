import SongsHandler from './handler.js'
import routes from './routes.js'

export default {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { songsService, cacheService, validator }) => {
    const songsHandler = new SongsHandler(songsService, cacheService, validator)

    server.route(routes(songsHandler))
  }
}
