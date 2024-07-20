import autoBind from 'auto-bind'

class ActivitiesHandler {
  constructor (service) {
    this.service = service

    autoBind(this)
  }

  async getActivitiesHandler (request, h) {
    const { id } = request.params

    const result = await this.service.getActivities(id)

    return h.response({
      status: 'success',
      data: result
    })
  }
}

export default ActivitiesHandler
