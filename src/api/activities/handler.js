import autoBind from 'auto-bind'

class ActivitiesHandler {
  constructor (service) {
    this._activiesServices = service

    autoBind(this)
  }

  async getActivitiesHandler (request, h) {
    const { id } = request.params

    const result = await this._activiesServices.getActivities(id)

    return h.response({
      status: 'success',
      data: result
    })
  }
}

export default ActivitiesHandler
