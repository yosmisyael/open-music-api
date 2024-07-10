import AlbumsHandler from './handler.js'
import routes from './routes.js'

export default {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const albumHandler = new AlbumsHandler(service, validator)
    server.route(routes(albumHandler))
  }
}
