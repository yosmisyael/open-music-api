import PlaylistSongsHandler from './handler.js'
import routes from './routes.js'

export default {
  name: 'playlistsongs',
  version: '1.0.0',
  register: (server, { playlistsService, playlistSongsService, validator }) => {
    const playlistSongsHandler = new PlaylistSongsHandler(playlistsService, playlistSongsService, validator)

    server.route(routes(playlistSongsHandler))
  }
}
