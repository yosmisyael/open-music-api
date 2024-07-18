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

    const playlists = await this._service.getPlaylist(id)

    return h.response({
      status: 'success',
      data: { playlists }
    })
  }

  async deletePlaylistsHandler (request, h) {
    const { id } = request.params

    const { id: credentialId } = request.auth.credentials

    await this._service.verifyPlaylistOwnership(id, credentialId)

    await this._service.deletePlaylist(id)

    return h.response({
      status: 'success',
      message: 'Playlist deleted successfully.'
    })
  }
}

export default PlaylistsHandler
