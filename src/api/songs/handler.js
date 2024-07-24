import autoBind from 'auto-bind'

class SongsHandler {
  constructor (songsService, cacheService, validator) {
    this._songsService = songsService

    this._cacheService = cacheService

    this._validator = validator

    autoBind(this)
  }

  async postSongHandler (request, h) {
    this._validator.validateSongPayload(request.payload)

    const songId = await this._songsService.addSong(request.payload)

    const response = h.response({
      status: 'success',
      data: { songId }
    })

    response.code(201)

    return response
  }

  async getSongsHandler (request, h) {
    const { title = '', performer = '' } = request.query

    await this._validator.validateSongQuery({ title, performer })

    try {
      const result = await this._cacheService.get('songs')

      const songs = JSON.parse(result)

      const response = h.response({
        status: 'success',
        data: { songs }
      })

      response.header('X-Data-Source', 'cache')

      return response
    } catch (error) {
      const songs = await this._songsService.getSongs({ title, performer })

      return h.response({
        status: 'success',
        data: { songs }
      })
    }
  }

  async getSongByIdHandler (request, h) {
    const { id } = request.params

    const song = await this._songsService.getSongById(id)

    return h.response({
      status: 'success',
      data: { song }
    })
  }

  async putSongByIdHandler (request, h) {
    this._validator.validateSongPayload(request.payload)

    const { id } = request.params

    await this._songsService.editSongById(id, request.payload)

    return h.response({
      status: 'success',
      message: 'Song updated successfully.'
    })
  }

  async deleteSongByIdHandler (request, h) {
    const { id } = request.params

    await this._songsService.deleteSongById(id)

    return h.response({
      status: 'success',
      message: 'Song deleted successfully.'
    })
  }
}

export default SongsHandler
