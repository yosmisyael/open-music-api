import autoBind from 'auto-bind'

class ActivitiesHandler {
  constructor (activitiesServices) {
    this._activiesServices = activitiesServices

    autoBind(this)
  }

  async getActivitiesHandler (request, h) {
    const { id } = request.params

    const result = await this._activiesServices.getActivies(id)

    return h.response({
      status: 'success',
      data: result
    })
  }
}

export default ActivitiesHandler
