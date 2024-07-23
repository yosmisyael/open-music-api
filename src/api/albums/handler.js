import autoBind from 'auto-bind'
import config from '../../utils/config.js'

class AlbumsHandler {
  constructor (albumsService, storageService, validator) {
    this._albumsService = albumsService

    this._storageService = storageService

    this._validator = validator

    autoBind(this)
  }

  async postAlbumHandler (request, h) {
    this._validator.validateAlbumPayload(request.payload)

    const albumId = await this._albumsService.addAlbum(request.payload)

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

  async postAlbumCoverHandler (request, h) {
    const { cover } = request.payload

    this._validator.validateAlbumCoverHeaders(cover.hapi.headers)

    const filename = await this._storageService.writeFile(cover, cover.hapi)

    const path = `http://${config.app.host}:${config.app.port}/albums/covers/${filename}`

    const { id } = request.params

    await this._albumsService.editAlbumCover(id, path)

    const response = h.response({
      status: 'success',
      message: 'Album cover uploaded successfully.'
    })

    response.code(201)

    return response
  }

  async getAlbumByIdHandler (request, h) {
    const { id } = request.params

    const album = await this._albumsService.getAlbumById(id)

    return h.response({
      status: 'success',
      data: { album }
    })
  }

  async putAlbumByIdHandler (request, h) {
    this._validator.validateAlbumPayload(request.payload)

    const { id } = request.params

    await this._albumsService.editAlbumById(id, request.payload)

    return h.response({
      status: 'success',
      message: 'Album edited successfully.'
    })
  }

  async deleteAlbumByIdHandler (request, h) {
    const { id } = request.params

    await this._albumsService.deleteAlbumById(id)

    return h.response({
      status: 'success',
      message: 'Album deleted successfully.'
    })
  }
}

export default AlbumsHandler
