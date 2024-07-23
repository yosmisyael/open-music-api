import AlbumsHandler from './handler.js'
import routes from './routes.js'

export default {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { albumsService, storageService, validator }) => {
    const albumsHandler = new AlbumsHandler(albumsService, storageService, validator)
    server.route(routes(albumsHandler))
  }
}
