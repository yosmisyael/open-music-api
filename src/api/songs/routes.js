const routes = (handler) => [
  {
    method: 'GET',
    path: '/songs',
    handler: handler.postSongHandler
  }
]

export default routes
