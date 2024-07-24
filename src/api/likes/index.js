import LikesHandler from './handler.js'
import routes from './routes.js'

export default {
  name: 'likes',
  version: '1.0.0',
  register: (server, { service }) => {
    const likesHandler = new LikesHandler(service)

    server.route(routes(likesHandler))
  }
}
