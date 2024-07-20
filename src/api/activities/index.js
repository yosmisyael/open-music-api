import ActivitiesHandler from './handler.js'
import routes from './routes.js'

export default {
  name: 'activities',
  version: '1.0.0',
  register: (server, { activiesServices }) => {
    const activitiesHandler = new ActivitiesHandler(activiesServices)

    server.route(routes(activitiesHandler))
  }
}
