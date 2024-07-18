const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.postPlaylistHandler
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: handler.getPlaylistsHandler
  }
]

export default routes
