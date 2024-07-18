class UsersHandler {
  constructor (service, validator) {
    this._service = service

    this._validator = validator
  }

  async postUserHandler (request, h) {
    this._validator.validateUserPayload(request.payload)
    console.log('postUserHandler 1')
    const userId = await this._service.addUser(request.payload)
    console.log('postUserHandler 2')

    const response = h.response({
      status: 'success',
      data: { userId }
    })

    response.code(201)

    return response
  }
}

export default UsersHandler
