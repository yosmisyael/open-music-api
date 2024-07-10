import autoBind from 'auto-bind'

class AlbumsHandler {
  constructor (service, validator) {
    this._service = service

    this._validator = validator

    autoBind(this)
  }

  async postAlbumHandler (request, h) {
    this._validator.validateAlbumPayload(request.payload)

    const { name, year } = request.payload

    const albumId = await this._service.addAlbum({ name, year })

    const response = h.response({
      status: 'success',
      message: 'Album added successfully.',
      data: {
        albumId
      }
    })
    response.code(201)
    return response
  }

  async getAlbumByIdHandler (request, h) {
    const { id } = request.params

    const album = await this._service.getAlbumById(id)

    return h.response({
      status: 'success',
      data: album
    })
  }

  async putAlbumByIdHandler (request, h) {
    this._validator.validateAlbumPayload(request.payload)

    const { id } = request.params

    const { name, year } = request.payload

    await this._service.editAlbumById(id, { name, year })

    return h.response({
      status: 'success',
      message: 'Album edited successfully.'
    })
  }
}

export default AlbumsHandler
