import autoBind from 'auto-bind'

class AlbumsHandler {
  constructor (service, validator) {
    this._service = service

    this._validator = validator

    autoBind(this)
  }

  async postAlbumHandler (request, h) {
    this._validator.validateNotePayload(request.payload)

    const { title, year } = request.payload

    const albumId = await this._service.addAlbum({ title, year })

    const response = h.response({
      status: 'success',
      message: 'Album added successfully.',
      data: {
        albumId
      }
    })
    response.code = 201
    return response
  }
}

export default AlbumsHandler
