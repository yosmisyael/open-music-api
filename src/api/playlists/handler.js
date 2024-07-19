import autoBind from 'auto-bind'

class PlaylistsHandler {
  constructor (service, validator) {
    this._service = service

    this._validator = validator

    autoBind(this)
  }

  async postPlaylistHandler (request, h) {
    this._validator.validatePostPlaylistPayload(request.payload)

    const { id: userId } = request.auth.credentials

    const playlistId = await this._service.addPlaylist({ name: request.payload.name, owner: userId })

    const response = h.response({
      status: 'success',
      data: { playlistId }
    })

    response.code(201)

    return response
  }

  async getPlaylistsHandler (request, h) {
    const { id: userId } = request.auth.credentials

    const playlists = await this._service.getPlaylist(userId)

    return h.response({
      status: 'success',
      data: { playlists }
    })
  }

  async deletePlaylistsHandler (request, h) {
    const { id } = request.params

    const { id: userId } = request.auth.credentials

    await this._service.verifyPlaylistOwnership(id, userId)

    await this._service.deletePlaylist(id)

    return h.response({
      status: 'success',
      message: 'Playlist deleted successfully.'
    })
  }
}

export default PlaylistsHandler
