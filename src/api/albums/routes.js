const routes = (handler) => [
  {
    method: 'POST',
    path: '/api/albums',
    handler: handler.postAlbumHandler
  }
]

export default routes
