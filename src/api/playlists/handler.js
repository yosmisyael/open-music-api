import autoBind from 'auto-bind'

class PlaylistsHandler {
  constructor (service, validator) {
    this._service = service

    this._validator = validator

    autoBind(this)
  }

  async postPlaylistHandler (request, h) {
    this._validator.validatePostPlaylistsPayload(request.payload)

    const playlistId = await this._service.addPlaylist(request.payload)

    const response = h.response({
      status: 'success',
      result: { playlistId }
    })

    return response
  }
}

export default PlaylistsHandler
