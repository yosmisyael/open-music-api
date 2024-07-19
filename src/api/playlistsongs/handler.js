class PlaylistSongsHandler {
  constructor (playlistsService, playlistSongsService, validator) {
    this._playlistsService = playlistsService

    this._playlistSongsService = playlistSongsService

    this._validator = validator
  }

  async postPlaylistSongHandler (request, h) {
    this._validator.validatePostPlaylistsSongPayload(request.payload)

    const { id: playlistId } = request.params

    const { id: userId } = request.auth.credentials

    const { songId } = request.payload

    await this._playlistsService.verifyPlaylistOwnership(playlistId, userId)

    await this._playlistSongsService.addSongToPlaylist({ songId, playlistId })

    const response = h.response({
      status: 'success',
      message: 'Song added to playlist successfully.'
    })

    response.code(201)

    return response
  }
}

export default PlaylistSongsHandler
