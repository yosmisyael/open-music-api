class CollaborationsHandler {
  constructor (collaborationsService, playlistsService, validator) {
    this._collaborationsService = collaborationsService

    this._playlistsService = playlistsService

    this._validator = validator
  }

  async postCollaborationHandler (request, h) {
    await this._validator.validatePostCollaborationPayload(request.payload)

    const { id: credentialId } = request.auth.credentials

    const { playlistId, userId } = request.payload

    await this._playlistsService.verifyPlaylistOwnership(playlistId, credentialId)

    const collaborationId = await this._collaborationsService.addCollaboration(playlistId, userId)

    const response = h.response({
      status: 'success',
      data: { collaborationId }
    })

    response.code(201)

    return response
  }
}

export default CollaborationsHandler
