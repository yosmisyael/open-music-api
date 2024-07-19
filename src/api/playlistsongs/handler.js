import autoBind from 'auto-bind'

class PlaylistSongsHandler {
  constructor (playlistsService, playlistSongsService, validator) {
    this._playlistsService = playlistsService

    this._playlistSongsService = playlistSongsService

    this._validator = validator

    autoBind(this)
  }

  async postPlaylistSongHandler (request, h) {
    this._validator.validatePostPlaylistsSongPayload(request.payload)

    const { id: playlistId } = request.params

    const { id: userId } = request.auth.credentials

    const { songId } = request.payload

    await this._playlistSongsService.verifySongExist(songId)

    await this._playlistsService.verifyPlaylistOwnership(playlistId, userId)

    await this._playlistSongsService.addSongToPlaylist(playlistId, songId)

    const response = h.response({
      status: 'success',
      message: 'Song added to playlist successfully.'
    })

    response.code(201)

    return response
  }

  async getPlaylistSongsHandler (request, h) {
    const { id: userId } = request.auth.credentials

    const { id: playlistId } = request.params

    await this._playlistsService.verifyPlaylistOwnership(playlistId, userId)

    const playlist = await this._playlistSongsService.getPlaylistSongs(playlistId)

    return h.response({
      status: 'success',
      data: { playlist }
    })
  }
}

export default PlaylistSongsHandler
