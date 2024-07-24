import LikesHandler from './handler.js'
import routes from './routes.js'

export default {
  name: 'likes',
  version: '1.0.0',
  register: (server, { likesService, albumsService }) => {
    const likesHandler = new LikesHandler(likesService, albumsService)

    server.route(routes(likesHandler))
  }
}
