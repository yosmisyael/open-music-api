class ExportsHandler {
  constructor (exportsService, playlistsService, validator) {
    this._exportsService = exportsService

    this._playlistsService = playlistsService

    this._validator = validator
  }

  async postExportsPlaylistHandler (request, h) {
    await this._validator.validateExportsPlaylistPayload(request.payload)

    const { targetEmail } = request.payload

    const { id: userId } = request.auth.credentials

    const { playlistId } = request.params

    await this._playlistsService.verifyPlaylistOwnership(playlistId, userId)

    const message = { userId, targetEmail }

    await this._exportsService.sendMessage('exports:playlist', JSON.stringify(message))

    const response = h.response({
      status: 'success',
      message: 'We are processing your request.'
    })

    response.code(201)

    return response
  }
}

export default ExportsHandler
