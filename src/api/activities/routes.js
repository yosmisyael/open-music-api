const routes = (handler) => [
  {
    method: 'GET',
    path: '/playlist/{id}/activities',
    handler: handler.getActivitiesHandler,
    options: {
      auth: 'openmusic_jwt'
    }
  }
]

export default routes
