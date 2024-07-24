import autoBind from 'auto-bind'

class LikesHandler {
  constructor (service) {
    this._service = service

    autoBind(this)
  }

  async postLikeHandler (request, h) {
    const { id: albumId } = request.params

    const { id: userId } = request.auth.credentials

    await this._service.addLike(userId, albumId)

    const response = h.response({
      status: 'success',
      message: 'Like added successfully.'
    })

    response.code(201)

    return response
  }

  async getLikesHandler (request, h) {
    const { id: albumId } = request.params

    const likes = await this._service.countLikes(albumId)

    return h.response({
      status: 'success',
      data: { likes }
    })
  }

  async deleteLikeHandler (request, h) {
    const { id: albumId } = request.params

    const { id: userId } = request.auth.credentials

    await this._service.deleteLike(userId, albumId)

    return h.response({
      status: 'success',
      message: 'Like removed successfully.'
    })
  }
}

export default LikesHandler
