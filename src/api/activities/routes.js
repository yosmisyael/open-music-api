const routes = (handler) => [
  {
    method: 'GET',
    path: '/playlist/{id}/activities',
    handler: handler.getActivitiesHandler
  }
]

export default routes
