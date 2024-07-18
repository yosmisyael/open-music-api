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

    return h.response({
      status: 'success',
      result: { playlistId }
    })
  }

  async getPlaylistsHandler (request, h) {
    const { id } = request.auth.credentials

    const playlists = await this._service.getSongs(id)

    return h.response({
      status: 'success',
      data: { playlists }
    })
  }
}

export default PlaylistsHandler
